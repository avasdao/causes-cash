/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import {
    ripemd160,
    sha256,
} from '@nexajs/crypto'

/* Initialize databases. */
const rainmakerCampaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_campaigns`)
const rainmakerReceiversDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_receivers`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let address
    let body
    let campaign
    let campaignid
    let error
    let pkg
    let ownerid
    let receiverid
    let receivers
    let response
    let session
    let sessionid

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('RAINMAKER (body):', body)

    // campaign = body.campaign
    // console.log('CAMPAIGN', campaign)

    campaignid = body?.campaignid
    // console.log('CAMPAIGNID', campaignid)

    address = body?.address
    // console.log('ADDRESS', address)

    sessionid = body?.sessionid
    // console.log('SESSION ID', sessionid)

    /* Validate session id. */
    if (!sessionid || typeof sessionid === 'undefined') {
        return {
            error: 'Session NOT found!',
            body,
        }
    }

    /* Request session. */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => {
            console.error(err)
            error = err
        })
    // console.log('SESSION', session)

    // TODO Validate session.

    /* Set profile id. */
    // NOTE: This is typically a (33-byte) public key.
    ownerid = session.profileid
    // console.log('OWNERID', ownerid)

    receiverid = ripemd160(sha256(`${ownerid}:${address}`))
    // console.log('RECEIVERID', receiverid)

    response = await rainmakerReceiversDb
        .get(receiverid)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    /* Validate response. */
    // if (response) {
    //     pkg = {
    //         id: response._id,
    //         ...response
    //     }

    //     delete pkg._id
    //     delete pkg._rev

    //     return pkg
    // }

    if (!response) {
        /* Build (profile) package. */
        pkg = {
            _id: receiverid,
            campaignid,
            address,
            txs: [], // NOTE: Will hold txidems.
            createdAt: moment().unix(),
        }
        // console.log('RECEIVER PKG', pkg)

        /* Add profile to database. */
        response = await rainmakerReceiversDb
            .put(pkg)
            .catch(err => console.error(err))
        // console.log('RESPONSE', response)
    }

    campaign = await rainmakerCampaignsDb
        .get(campaignid)
        .catch(err => console.error(err))
    // console.log('CAMPAIGN', campaign)

    receivers = campaign?.receivers
    // console.log('RECEIVERS-1', receivers)

    /* Validate receivers. */
    if (!receivers) {
        receivers = {}
    }

    receivers[receiverid] = {
        satoshis: campaign.satoshis,
        tokens: campaign.tokens,
    }
    // console.log('RECEIVERS-2', receivers)

    /* Update receivers. */
    campaign.receivers = receivers

    /* Update database. */
    response = await rainmakerCampaignsDb
        .put(campaign)
        .catch(err => console.error(err))

    /* Return response. */
    return campaign
})

/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/logs`)
const rainmakerReceiversDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/rainmaker_receivers`)
const rainmakerTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/rainmaker_txs`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let address
    let body
    let campaign
    let campaignid
    let ownerid
    let profiles
    let receivers
    let response
    let session
    let sessionid
    let txidem
    let txPkg

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('BROADCAST (body):', body)

    campaign = body.campaign
    campaignid = campaign.id

    receivers = body.receivers

    txidem = body.txidem

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
    console.log('OWNERID', ownerid)

    /* Save (database) session. */
    // campaigns = await rainmakerCampaignsDb
    //     .query('api/byOwner', {
    //         key: profileid,
    //         include_docs: true,
    //     })
    //     .catch(err => {
    //         console.error(err)
    //         error = err
    //     })
    // console.log('CAMPAIGNS', campaigns)

    /* Validate campaigns. */
    // if (campaigns) {
    //     campaigns = campaigns.rows.map(_campaign => {
    //         /* Initialize locals. */
    //         let doc

    //         /* Set document. */
    //         doc = _campaign.doc

    //         /* Re-format document. */
    //         doc = {
    //             id: doc._id,
    //             ...doc,
    //         }

    //         /* Cleanup document. */
    //         delete doc._id
    //         delete doc._rev

    //         /* Return document. */
    //         return doc
    //     })
    // }
    // console.log('CAMPAIGNS', campaigns)

    // profiles = receivers.map(_receiver => {
    //     let profileid

    //     profileid = sha256(`${ownerid}:${_receiver.address}`)

    //     return profileid
    // })

    // for (let i = 0; i < profiles.length; i++) {
    //     const profileid = profiles[i]

    //     const profile = await rainmakerReceiversDb
    //         .get(profileid)
    //         .catch(err => console.error(err))
    //     // console.log('PROFILE-1', profile)

    //     /* Validate profile. */
    //     if (profile) {
    //         profile.txs.push(txidem)
    //         profile.updatedAt = moment().unix()
    //         // console.log('PROFILE-2', profile)

    //         response = await rainmakerReceiversDb
    //             .put(profile)
    //             .catch(err => console.error(err))
    //         // console.log('UPDATE PROFILE', response)
    //     }
    // }

    txPkg = {
        _id: txidem,
        campaignid,
        profiles,
        createdAt: moment().unix(),
    }
    // console.log('TX PKG', txPkg)

    // response = await rainmakerTxsDb
    //     .put(txPkg)
    //     .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    return txidem
})

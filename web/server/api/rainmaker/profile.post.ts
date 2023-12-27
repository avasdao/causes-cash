/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const rainmakerProfilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_profiles`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let address
    let body
    let campaign
    let campaignid
    let error
    let pkg
    let profileid
    let ownerid
    let response
    let session
    let sessionid

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('RAINMAKER (body):', body)

    campaign = body.campaign
    // console.log('CAMPAIGN', campaign)

    campaignid = campaign.id
    // console.log('CAMPAIGNID', campaignid)

    address = body.address
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
    console.log('OWNERID', ownerid)

    profileid = sha256(`${ownerid}:${address}`)
    console.log('PROFILEID', profileid)

    response = await rainmakerProfilesDb
        .get(profileid)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    /* Validate response. */
    if (response) {
        pkg = {
            id: response._id,
            ...response
        }

        delete pkg._id
        delete pkg._rev

        return pkg
    }

    /* Build (profile) package. */
    pkg = {
        _id: profileid,
        campaignid,
        address,
        txs: [], // NOTE: Will hold txidems.
        createdAt: moment().unix(),
    }
    // console.log('PROFILE PKG', pkg)

    /* Add profile to database. */
    response = await rainmakerProfilesDb
        .put(pkg)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    pkg = {
        id: pkg._id,
        ...pkg
    }

    delete pkg._id

    /* Return response. */
    return pkg
})

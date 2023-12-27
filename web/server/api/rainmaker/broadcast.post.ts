/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const rainmakerProfilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_profiles`)
const rainmakerTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_txs`)

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

    profiles = receivers.map(_receiver => {
        let profileid

        profileid = sha256(`${ownerid}:${_receiver.address}`)

        return profileid
    })

    for (let i = 0; i < profiles.length; i++) {
        const profileid = profiles[i]

        const profile = await rainmakerProfilesDb
            .get(profileid)
            .catch(err => console.error(err))
        // console.log('PROFILE-1', profile)

        /* Validate profile. */
        if (profile) {
            profile.txs.push(txidem)
            profile.updatedAt = moment().unix()
            // console.log('PROFILE-2', profile)

            response = await rainmakerProfilesDb
                .put(profile)
                .catch(err => console.error(err))
            // console.log('UPDATE PROFILE', response)
        }
    }

    txPkg = {
        _id: txidem,
        campaignid,
        profiles,
        createdAt: moment().unix(),
    }
    // console.log('TX PKG', txPkg)

    response = await rainmakerTxsDb
        .put(txPkg)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    return txidem
})

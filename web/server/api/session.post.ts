/* Import modules. */
import { ethers } from 'ethers'
import moment from 'moment'
import PouchDB from 'pouchdb'

/* Import (local) modules. */
import createSession from '../shared/createSession.js'
// import getProfile from '../shared/getProfile.js'

/* Initialize databases. */
// const logsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/logs`)
const profilesDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.AVASDAODB_ENDPOINT}/profiles`)
const sessionsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

/**
 * Manage Session
 *
 * TBD...
 */
const manageSession = async () => {
    const monitor = setInterval(() => {
        console.log('monitoring sessions...')
    }, 60000)
}

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let response
    let session
    let sessionid
    let success

    let publicKey
    let signature
    let timestamp

    let message
    let profile
    let result
    let sig
    let profileid

    /* Set (request) body. */
    body = await readBody(event)
    console.log('SESSIONS.POST (body):', body)

    /* Set session id. */
    sessionid = body?.sessionid
    console.log('SESSION ID', sessionid)

    if (!sessionid) {
        /* Validate session. */
        if (!session?.isActive) {
            const source = event.node.req?.url
            const headers = event.node.req?.headers

            session = await createSession(source, headers)
        } else {
            /* Update timestamp. */
            session = {
                ...session,
                expiresAt: moment().add(1, 'days').unix(),
                updatedAt: moment().unix(),
            }

            /* Save (updated) session. */
            success = await sessionsDb
                .put(session)
                .catch(err => console.error(err))
        }

        /* Save session to database. */
        response = await sessionsDb
            .put(session)
            .catch(err => console.error(err))
        console.log('SAVE/UPDATE SESSION (api):', response)

        /* Update session. */
        session = {
            id: session?._id,
            ...session,
        }

        delete session._id
        delete session._rev

        /* Return session. */
        return session
    }

    /* Request session (if available). */
    // session = await sessionsDb
    //     .get(sessionid)
    //     .catch(err => console.error(err))
    // console.log('SESSION (api):', session)





    /* Set profile parameters. */
    sessionid = body.sessionid
    publicKey = body.publicKey
    signature = body.signature
    timestamp = body.timestamp

    message = body.message
    sig = body.sig

    // console.log({
    //     sessionid,
    //     message,
    //     sig,
    // })

    /* Request session. */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    console.log('SESSION', session)

    if (!session) {
        return `Authorization FAILED!`
    }

    /* Validate message. */
    if (message) {
        // FIXME Validate TIME!!
        if (!message.includes('Causes Cash Authorization')) {
            return `Authorization FAILED!`
        }

        profileid = ethers.verifyMessage(message, sig)
        console.log('VERIF (profileid)', profileid)

        /* Verify profile id. */
        if (typeof profileid === 'undefined') {
            return `Authorization FAILED!`
        }

        /* Add profile (address + signature) to session. */
        session = {
            profileid,
            auth: sig,
            ...session,
            updatedAt: moment().unix(),
        }
    } else {
        /* Add profile (address + signature) to session. */
        session = {
            ...session,
            updatedAt: moment().unix(),
        }
    }

    /* Request session update. */
    result = await sessionsDb
        .put(session)
        .catch(err => console.error(err))
    console.log('SESSION UPDATE:', result)

    /* Validate profile ID. */
    if (profileid) {
        /* Request profile. */
        profile = await profilesDb
            .get(profileid)
            .catch(err => console.error(err))
        // console.log('PROFILE:', profile)

        /* Validate profile. */
        if (!profile) {
            /* Create NEW profile. */
            profile = {
                _id: profileid,
                nickname: null,
                auths: 1,
                createdAt: moment().unix(),
            }
        } else {
            profile = {
                ...profile,
                auths: profile.auths + 1,
                updatedAt: moment().unix(),
            }
        }

        /* Request profile update. */
        result = await profilesDb
            .put(profile)
            .catch(err => console.error(err))
        console.log('PROFILE UPDATE:', result)
    }

    if (profile) {
        /* Sanitize to profile. */
        profile = {
            id: profile._id,
            ...profile,
        }
        delete profile._id
        delete profile._rev

        /* Return profile. */
        return profile
    } else {
        /* Sanitize to session. */
        session = {
            id: session._id,
            ...session,
        }
        delete session._id
        delete session._rev

        /* Return session. */
        return session
    }

    // return getProfile(
    //     sessionid,
    //     publicKey,
    //     signature,
    //     timestamp,
    // )
})

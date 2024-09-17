/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const profilesDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/profiles`)
const sessionsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let address
    let adminid
    let body
    let campaignid
    let error
    let pkg
    let profileid
    let response
    let session
    let sessionid

    /* Set (request) body. */
    body = await readBody(event)
    console.log('PROFILES (body):', body)

    sessionid = body?.sessionid
    console.log('SESSION ID', sessionid)

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
    adminid = session.profileid
    console.log('ADMINID', adminid)
    console.log('ADMINS', process.env.ADMINS)

    if (!process.env.ADMINS?.includes(adminid)) {
        return {
            error: 'User is NOT authorized to access this data.',
            adminid,
        }
    }

    response = await profilesDb
        .allDocs({
            include_docs: true,
        })
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

    /* Build (profile) package. */
    pkg = {
        numProfiles: response.total_rows,
        data: response.rows,
        // _id: profileid,
        // campaignid,
        // address,
        // txs: [], // NOTE: Will hold txidems.
        createdAt: moment().unix(),
    }
    console.log('PROFILE PKG', pkg)

    /* Return response. */
    return pkg
})

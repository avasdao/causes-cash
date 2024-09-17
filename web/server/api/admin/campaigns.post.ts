/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const campaignsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/campaigns`)
const sessionsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let adminid
    let admins
    let body
    let data
    let error
    let pkg
    let response
    let session
    let sessionid

// FOR DEV PURPOSES ONLY
admins = [
    '0xE2266286745fEFdDeC42D895abC85a33710a2078',
]
console.log('ADMINS', admins)

    /* Set (request) body. */
    body = await readBody(event)
    console.log('CAMPAIGNS (body):', body)

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
    console.log('SESSION', session)

    /* Validate session id. */
    if (!session) {
        return {
            error: 'Session NOT found!',
            sessionid,
        }
    }

    /* Set profile id. */
    // NOTE: This is typically a (33-byte) public key.
    adminid = session?.profileid
    console.log('ADMINID', adminid)

    /* Validate administrator. */
    if (!admins || !admins.includes(adminid)) {
        return {
            error: 'User is NOT authorized to access this data.',
            adminid,
        }
    }

    /* Request ALL campaigns. */
    response = await campaignsDb
        .allDocs({
            include_docs: true,
        })
        .catch(err => console.error(err))
    console.log('CAMPAIGNS (allDocs)', response)

    /* Validate response. */
    if (response) {
        data = response.rows.map(_entry => {
            return _entry.doc
        })
    }

    /* Return response. */
    return data
})

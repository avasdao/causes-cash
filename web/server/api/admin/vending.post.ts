/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const vendingDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/vending`)
const vendingPayoutsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/vending_payouts`)
const sessionsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let adminid
    let admins
    let body
    let data
    let doc
    let error
    let pkg
    let response
    let session
    let sessionid

// FOR DEV PURPOSES ONLY
admins = [
    '0xE2266286745fEFdDeC42D895abC85a33710a2078',
]
// console.log('ADMINS', admins)

    /* Set (request) body. */
    body = await readBody(event)
    console.log('VENDING (body):', body)

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
    // console.log('ADMINID', adminid)

    /* Validate administrator. */
    if (!admins || !admins.includes(adminid)) {
        return {
            error: 'User is NOT authorized to access this data.',
            adminid,
        }
    }

    /* Request ALL vending. */
    response = await vendingDb
        .allDocs({
            include_docs: true,
        })
        .catch(err => console.error(err))
    // console.log('CAMPAIGNS', response)

    /* Validate response. */
    if (response) {
        if (!data) {
            data = {}
        }

        data.campaigns = response.rows.map(_entry => {
            /* Set document. */
            doc = _entry.doc

            /* Sanitize document. */
            delete doc._id
            delete doc._rev

            /* Return document. */
            return doc
        })
    }

    response = await vendingPayoutsDb
        .query('api/byCreation', {
            include_docs: true,
            limit: 10,
            descending: true,
        })
        .catch(err => console.error(err))
    // console.log('PAYOUTS', response)

    /* Validate response. */
    if (response) {
        if (!data) {
            data = {}
        }

        data.payouts = response.rows.map(_entry => {
            /* Set document. */
            doc = _entry.doc

            /* Sanitize document. */
            delete doc._id
            delete doc._rev

            /* Return document. */
            return doc
        })
    }

    /* Return response. */
    return data
})

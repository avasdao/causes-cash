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
    let campaign
    let campaignDetail
    let txidem
    let payouts
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
    console.log('AUDITOR (body):', body)

    sessionid = body?.sessionid
    // console.log('SESSION ID', sessionid)

    txidem = body?.txidem
    // console.log('TXIDEM', txidem)

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

    /* Initialize response handler. */
    response = {}

    response = await vendingPayoutsDb
        .get(txidem)
        .catch(err => console.error(err))
    // console.log('PAYOUT', response)

    // /* Validate response. */
    // if (response) {
    //     if (!data) {
    //         data = {}
    //     }

    //     data.payouts = response.rows.map(_entry => {
    //         /* Set document. */
    //         doc = _entry.doc

    //         /* Sanitize document. */
    //         delete doc._id
    //         delete doc._rev

    //         /* Return document. */
    //         return doc
    //     })
    // }

    /* Return response. */
    return response
})

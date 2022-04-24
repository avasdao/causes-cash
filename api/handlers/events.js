/* Initialize modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const util = require('util')

/* Initialize databases. */
const eventsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/events`)

/* Initialize results limit. */
const RESULTS_LIMIT = 20

/**
 * Get Events
 */
const getEvents = async function (req, res) {

    /* Initailize results. */
    let results = null

    /* Initialize profile id. */
    let profileid = null

    /* Request timestamp. */
    const timestamp = req.params.timestamp
    // console.log('TIMESTAMP', timestamp)

    let endkey = null

    if (timestamp !== null && Number(timestamp)) {
        endkey = Number(timestamp) - 2
    } else {
        endkey = 0
    }

    /* Request owner. */
    results = await eventsDb.query('api/byTimestamp', {
        // key: timestamp,
        startkey: endkey,
        limit: RESULTS_LIMIT,
        descending: true,
        include_docs: true,
    }).catch(err => console.error('EVENTS ERROR:', err))
    // console.log('RESULT (bySlug)', util.inspect(results, false, null, true))

    // if (!results || (results.rows && results.rows.length === 0)) {
    //     results = await eventsDb.query('api/byAddress', {
    //         key: profileid,
    //         include_docs: true,
    //     }).catch(err => console.error('PROFILES ERROR:', err))
    //     console.log('RESULT (byAddress)', util.inspect(results, false, null, true))
    // }

    let details = results.rows.map(row => {
        const detail = {
            id: row.doc._id,
            ...row.doc,
        }

        /* Remove id. */
        delete detail._id

        /* Remove revision id. */
        delete detail._rev

        return detail
    })
    // console.log('DETAILS', details)

    /* Return details. */
    res.json(details)
}

/* Export module. */
module.exports = getEvents

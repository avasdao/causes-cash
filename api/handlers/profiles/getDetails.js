/* Initialize modules. */
const moment = require('moment')
const PouchDB = require('pouchdb')
const util = require('util')

/* Initialize databases. */
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Get (Profile) Details
 */
const getDetails = async function (req, res) {

    /* Initailize results. */
    let results = null

    /* Initialize profile id. */
    let profileid = null

    /* Set owner id. */
    profileid = req.params.profileid
    console.log('PROFILE ID', profileid)

    /* Validate profile id. */
    if (profileid && profileid.indexOf('bitcoincash:') !== -1) {
        /* Remove prefix. */
        profileid = profileid.slice(12)
    }

    /* Request owner. */
    results = await profilesDb.query('api/bySlug', {
        key: profileid,
        include_docs: true,
    }).catch(err => console.error('PROFILES ERROR:', err))
    console.log('RESULT (bySlug)', util.inspect(results, false, null, true))

    if (!results || (results.rows && results.rows.length === 0)) {
        results = await profilesDb.query('api/byAddress', {
            key: profileid,
            include_docs: true,
        }).catch(err => console.error('PROFILES ERROR:', err))
        console.log('RESULT (byAddress)', util.inspect(results, false, null, true))
    }

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
module.exports = getDetails

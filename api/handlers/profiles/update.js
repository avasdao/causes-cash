/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const Nito = require('nitojs')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Update Profile
 */
const update = async function (req, res) {
    /* Initialize results. */
    let results = null

    /* Initialize address. */
    let address = null

    /* Set body. */
    const body = req.body
    console.log('PUT BODY', body)

    /* Request / message authorization. */
    const message = await require('./_messageAuth')(req, res)

    /* Validate message. */
    if (!message) {
        return // NOTE: `_messageAuth` will handle response delivery.
    }

    /* Set address. */
    address = body.address

    /* Validate profile id. */
    if (address && address.indexOf('bitcoincash:') !== -1) {
        /* Remove prefix. */
        address = address.slice(12)
    }

    results = await profilesDb.query('api/byAddress', {
        key: address,
        include_docs: true,
    }).catch(err => console.error('UPDATE ERROR:', err))
    // console.log('RESULT (byAddress)', util.inspect(results, false, null, true))

    /* Validate results. */
    if (!results) {
        /* Set status code. */
        res.status(400)

        return res.json({
            error: 'This profile is missing from the database.'
        })
    }

    /* Set profile. */
    const profile = results.rows[0].doc
    // console.log('UPDATE (profile):', profile)

    /* Validate profile. */
    if (!profile) {
        /* Set status code. */
        res.status(400)

        return res.json({
            error: 'This profile is missing from the database.'
        })
    }

    /* Handle metadata update. */
    if (message.iv && message.body) {
        /* Build new profile. */
        const newProfile = {
            ...profile,
            meta: message,
            updatedAt: moment().valueOf()
        }

        /* Retrieve results. */
        results = await profilesDb.put(newProfile)
            .catch(err => console.error('UPDATE ERROR:', err))
        console.log('UPDATE RESULTS', results)

        /* Return response. */
        return res.json(newProfile)
    }

    const response = {
        message,
        results,
        profile,
    }
    console.log('RESPONSE', response)

    /* Return response. */
    res.json(response)
}

/* Export module. */
module.exports = update

/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const Nito = require('nitojs')
const util = require('util')
const uuidv4 = require('uuid/v4')

/* Initialize databases. */
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Add New Profile
 */
const addNew = async function (req, res) {
    /* Set body. */
    const body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (!body) {
        /* Set status code. */
        res.status(400)

        return res.json({
            error: 'A BODY is required with this request.'
        })
    }

    /* Initialize address. */
    let address = null

    /* Set address. */
    if (body.address.indexOf('bitcoincash:') !== -1) {
        address = body.address.slice(12)
    } else {
        address = body.address
    }
    console.log('ADDRESS', address)

    /* Validate address. */
    if (!address) {
        /* Set status code. */
        res.status(400)

        return res.json({
            error: 'Your MUST include an address with your request.',
        })
    }

    /* Initialize result. */
    let result = null

    /* Request / message authorization. */
    const message = await require('./_messageAuth')(req, res)

    /* Validate message. */
    if (!message) {
        return // NOTE: `_messageAuth` will handle response delivery.
    }

    /* Set action. */
    const action = message.action
    console.log('ACTION', action)

    /* Validate action. */
    if (!action) {
        /* Set status code. */
        res.status(400)

        return res.json({
            error: 'Your MUST include an action with your request.',
        })
    }

    /* Handle email signin. */
    if (action === 'SIGNIN_EMAIL') {
        return require('./signinEmail')(req, res, address, message)
    }

    /* Return result. */
    res.json(result)
}

/* Export module. */
module.exports = addNew

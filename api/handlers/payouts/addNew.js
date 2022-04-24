/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const Nito = require('nitojs')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const payoutsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/payouts`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Calculate Miner Fee
 */
const _calcMinerFee = function (_recipientCount, _contributionCount) {
    // Aim for two satoshis per byte to get a clear margin for error and priority on fullfillment.
    const TARGET_FEE_RATE = 2

    // Define byte weights for different transaction parts.
    const TRANSACTION_METADATA_BYTES = 10
    const AVERAGE_BYTE_PER_RECIPIENT = 69
    const AVERAGE_BYTE_PER_CONTRIBUTION = 296

    // Calculate the miner fee necessary to cover a fullfillment transaction with the next (+1) contribution.
    const minerFee = (
        TRANSACTION_METADATA_BYTES
        + (AVERAGE_BYTE_PER_RECIPIENT * _recipientCount)
        + (AVERAGE_BYTE_PER_CONTRIBUTION * (_contributionCount + 1))
    ) * TARGET_FEE_RATE

    // Return the calculated miner fee.
    return minerFee
}

/**
 * Assurance Manager
 */
const payouts = async function (req, res) {
    /* Initialize results. */
    let results = null

    /* Initialize owner. */
    let owner = null

    /* Set body. */
    const body = req.body
    console.log('BODY', body)

    /* Validate body. */
    if (!body.message || !body.address || !body.signature) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing message authentication.'
        })
    }

    /* Perform message authentication. */
    // NOTE: Message authentication (equivalent to HMAC).
    const verified = Nito.Message
        .verify(`${body.message}:${body.nonce}`, body.address, body.signature)
    console.log('MESSAGE VERIFICATION', verified)

    /* Validate message. */
    if (!verified) {
        /* Set status. */
        res.status(401)

        /* Return error. */
        return res.json({
            error: 'Message authentatication failed.'
        })
    }

    /* Set (body) message. */
    const message = JSON.parse(body.message)

    /* Initialize address. */
    let address = null

    /* Set address. */
    if (body.address.indexOf('bitcoincash:') !== -1) {
        address = body.address.slice(12)
    } else {
        address = body.address
    }

    /* Request profile. */
    results = await profilesDb.query('api/byAddress', {
        key: address,
        include_docs: true,
    }).catch(err => console.error('PROFILE ERROR:', err))
    // console.log('RESULT (byAddress)', util.inspect(results, false, null, true))

    /* Validate message. */
    if (!results || !results.rows) {
        /* Set status. */
        res.status(404)

        /* Return error. */
        return res.json({
            error: 'Profile was not found.'
        })
    }

    /* Set document. */
    const doc = results.rows[0].doc
    // console.log('DOCUMENT', doc)

    /* Set profile id. */
    const profileid = doc._id

    /* Set campaign id. */
    const campaignid = message.campaignid
    console.log('CAMPAIGN ID', campaignid)

    /* Retrieve results. */
    results = await payoutsDb.get(campaignid)
        .catch(err => console.error('CAMPAIGN ERROR:', err))
    // console.log('RESULT', util.inspect(results, false, null, true))

    /* Set public key hash. */
    const publicKeyHash = message.publicKeyHash

    /* Set alias. */
    const alias = message.alias || ''

    /* Set comment. */
    const comment = message.comment || ''

    /* Set monthly pledge amount. */
    const monthlyPledgeAmt = message.monthlyPledgeAmt

    /* Set minimum valid block. */
    const minValidBlock = message.minValidBlock

    /* Set script version. */
    const scriptVer = message.scriptVer

    /* Set created at. */
    const createdAt = moment().unix()

    /* Build funder. */
    const funder = {
        profileid,
        publicKeyHash,
        alias,
        comment,
        monthlyPledgeAmt,
        minValidBlock,
        scriptVer,
        payouts: null,
        createdAt,
    }

    /* Validate funders. */
    if (!results.funders) {
        results.funders = {}
    }

    /* Set funder id. */
    const funderid = `${funder.publicKeyHash}:${funder.monthlyPledgeAmt}:${funder.minValidBlock}`

    /* Validate duplicate. */
    if (!results.funders[funderid]) {
        /* Add funder. */
        results.funders[funderid] = funder

        console.log('UPDATED ENTRY', results)

        results = await payoutsDb.put(results)
            .catch(err => console.error('ADD PLEDGE LOG ERROR:', err, funder))
        // debug('Add funder log response:', response)
    }

    /* Return results. */
    return res.json(results)
}

/* Export module. */
module.exports = payouts

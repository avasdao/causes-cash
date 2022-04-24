/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const Nito = require('nitojs')
const Slack = require('../slack')
const util = require('util')
const uuidv4 = require('uuid/v4')

/* Initialize databases. */
const queueDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/queue`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Calculate Miner Fee
 */
// const _calcMinerFee = function (_recipientCount, _contributionCount) {
//     // Aim for two satoshis per byte to get a clear margin for error and priority on fullfillment.
//     const TARGET_FEE_RATE = 2
//
//     // Define byte weights for different transaction parts.
//     const TRANSACTION_METADATA_BYTES = 10
//     const AVERAGE_BYTE_PER_RECIPIENT = 69
//     const AVERAGE_BYTE_PER_CONTRIBUTION = 296
//
//     // Calculate the miner fee necessary to cover a fullfillment transaction with the next (+1) contribution.
//     const minerFee = (
//         TRANSACTION_METADATA_BYTES
//         + (AVERAGE_BYTE_PER_RECIPIENT * _recipientCount)
//         + (AVERAGE_BYTE_PER_CONTRIBUTION * (_contributionCount + 1))
//     ) * TARGET_FEE_RATE
//
//     // Return the calculated miner fee.
//     return minerFee
// }

/**
 * Flipstarter Manager
 */
const assurance = async function (req, res) {
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
    console.log('FLIPSTARTER MESSAGE', message)

    message._id = uuidv4()
    message.createdAt = moment().unix()
    message.completedAt = null

    results = await queueDb.put(message)
        .catch(err => console.error('QUEUE LOG ERROR:', err, message))
    // debug('Add pledge log response:', response)

    /* Post response to Slack. */
    Slack(`
*New Flipstarter Pledge*
---
    `, {
        campaignid: message.campaignid,
        ...message.data,
        satoshis: message.satoshis,
        flipstarter: message.flipstarter,
    })

    /* Return results. */
    return res.json(results)
}

/* Export module. */
module.exports = assurance

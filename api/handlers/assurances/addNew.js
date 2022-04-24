/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const Nito = require('nitojs')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const assurancesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/assurances`)
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

    /* Set document. */
    const doc = results.rows[0].doc
    // console.log('DOCUMENT', doc)

    /* Set profile id. */
    const profileid = doc._id

    /* Set campaign id. */
    const campaignid = message.campaignid
    console.log('CAMPAIGN ID', campaignid)

    /* Retrieve results. */
    results = await assurancesDb.get(campaignid)
        .catch(err => console.error('CAMPAIGN ERROR:', err))
    // console.log('RESULT', util.inspect(results, false, null, true))

    /* Set pledges. */
    // const pledges = results.pledges

    /* Validate pledges. */
    if (!results.pledges) {
        // pledges = {}
        results.pledges = {}
    }
    // console.log('PLEDGES', pledges)
    // console.log('PLEDGES-2', results.pledges)

    /* Set previous transaction hash. */
    const previousTransactionHash = message.inputs[0].previous_output_transaction_hash

    /* Set previous transaction index. */
    const previousOutputIndex = message.inputs[0].previous_output_index

    /* Query spent status. */
    const isSpent = await Nito.Blockchain.Query
        .isSpent(previousTransactionHash, previousOutputIndex)
        .catch(err => console.error('ASSURANCED ERROR:', err))
    console.log('ASSURANCE STATUS (isSpent)',
        isSpent, previousTransactionHash, previousOutputIndex)

    /* Set sequence number. */
    const sequenceNumber = message.inputs[0].sequence_number

    /* Set unlock script. */
    const unlockScript = message.inputs[0].unlocking_script

    /* Request transaction details. */
    const txDetails = await Nito.Transaction
        .details(previousTransactionHash)
        .catch(err => console.error(err))
    // console.log('TX DETAILS', txDetails)
    // console.log('UTXO DETAILS', txDetails.outputs[previousOutputIndex])

    /* Validate transaction details. */
    if (!txDetails) {
        /* Set status. */
        res.status(404)

        /* Return error. */
        return res.json({
            error: 'No transaction details found.'
        })
    }

    /* Set UTXO satoshis. */
    const satoshis = txDetails.outputs[previousOutputIndex].satoshis

    /* Set alias. */
    const alias = message.data.alias || ''

    /* Set comment. */
    const comment = message.data.comment || ''

    /* Set created at. */
    const createdAt = moment().unix()

    /* Build pledge. */
    const pledge = {
        profileid,
        previousTransactionHash,
        previousOutputIndex,
        sequenceNumber,
        unlockScript,
        satoshis,
        alias,
        comment,
        isSpent,
        createdAt,
    }

    /* Set pledge id. */
    const pledgeid = `${pledge.previousTransactionHash}:${pledge.previousOutputIndex}`

    /* Validate duplicate. */
    if (!results.pledges[pledgeid]) {
        const pledgeid = `${pledge.previousTransactionHash}:${pledge.previousOutputIndex}`

        /* Add pledge. */
        results.pledges[pledgeid] = pledge

        console.log('UPDATED ENTRY', results)

        results = await assurancesDb.put(results)
            .catch(err => console.error('ADD PLEDGE LOG ERROR:', err, pledge))
        // debug('Add pledge log response:', response)
    }

    /* Return results. */
    return res.json(results)
}

/* Export module. */
module.exports = assurance

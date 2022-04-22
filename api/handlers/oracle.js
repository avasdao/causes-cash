/* Import core modules. */
const moment = require('moment')
const Nito = require('nitojs')
const superagent = require('superagent')

/* Import local modules. */
const PriceOracle = require('../libs/PriceOracle')

// TEMP FOR DEV ONLY
const BITBOX = require('bitbox-sdk').BITBOX
const bitbox = new BITBOX()

/**
 * Oracle
 */
const oracle = async function (req, res) {
    /* Initialize response. */
    let response = null

    /* Set action. */
    const action = req.params.action
    // console.log('ACTION', action)

    /* Validate action. */
    if (!action) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: `You are missing an 'action' for the Oracle.`
        })
    }

    /* Set pledge amount. */
    let pledgeAmount = req.params.pledgeAmount
    // console.log('PLEDGE AMOUNT', pledgeAmount)

    /* Validate pledge amount. */
    if (!pledgeAmount) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: `You are missing a 'pledge amount' for the Oracle.`
        })
    }

    /* Parse pledge amount. */
    pledgeAmount = parseInt(pledgeAmount)

    /* Set mnemonic. */
    // DEV phrase: husband skate sword dress misery decide glove spawn spend foil team evil
    const mnemonic = process.env.MNEMONIC
    // console.log('MNEMONIC', mnemonic)

    /* Set seed buffer. */
    const seedBuffer = bitbox.Mnemonic.toSeed(mnemonic)

    /* Set HD node. */
    const hdNode = bitbox.HDNode.fromSeed(seedBuffer)

    /* Set oracle keypair. */
    const oracleKeypair = bitbox.HDNode
        .toKeyPair(bitbox.HDNode.derivePath(hdNode, `m/44'/145'/0'`))

    /* Set oracle public key. */
    const oraclePublicKey = bitbox.ECPair.toPublicKey(oracleKeypair)

    /* Initialize oracle. */
    const oracle = new PriceOracle(oracleKeypair)

    /* Retrieve block height. */
    const blockHeight = await Nito.Blockchain.getBlockHeight()
    // console.log('BLOCK HEIGHT', blockHeight)

    const priceUrl = 'https://api.telr.io/v1/ticker/price/BCH'
    response = await superagent.get(priceUrl)

    /* Validate response. */
    if (!response || !response.text) {
        /* Set status. */
        res.status(500)

        /* Return error. */
        return res.json({
            error: `Oops! There was an error processing your request. Please try again..`
        })
    }

    /* Set price. */
    const price = parseInt(response.text * 100)
    // console.log('PRICE', price)

    /* Calculate satoshis per cent. */
    // NOTE: Value is rounded to the "nearest" integer.
    const satoshisPerCent = Math.round(100000000 / price)
    // console.log('SATOSHIS PER CENT', satoshisPerCent)

    /* Set days in month. */
    const daysInMonth = moment().daysInMonth()

    /* Calculate monthly payout amount. */
    const monthlyPayoutAmount = pledgeAmount * satoshisPerCent
    // console.log('MONTHLY PAYOUT AMOUNT', monthlyPayoutAmount)

    /* Calculate daily payout amount. */
    // NOTE: Value is rounded to the "nearest" integer.
    const dailyPayoutAmount = Math
        .round(pledgeAmount * satoshisPerCent / daysInMonth)
    // console.log('DAILY PAYOUT AMOUNT', dailyPayoutAmount)

    // Produce new oracle message and signature
    const oracleMessage = oracle
        .createMessage(blockHeight, pledgeAmount, dailyPayoutAmount)
    // console.log('ORACLE MESSAGE', oracleMessage)

    const oracleSignature = oracle.signMessage(oracleMessage)
    // console.log('ORACLE SIGNATURE', oracleSignature)

    /* Set timestamp. */
    const createdAt = moment().unix()

    /* Build Oracle signed package. */
    const pkg = {
        action,
        blockHeight,
        price,
        satoshisPerCent,
        daysInMonth,
        pledgeAmount,
        monthlyPayoutAmount,
        dailyPayoutAmount,
        oraclePublicKey: oraclePublicKey.toString('hex'),
        oracleMessage: oracleMessage.toString('hex'),
        oracleSignature: oracleSignature.toString('hex'),
        createdAt,
    }

    /* Return Oracle signed package. */
    return res.json(pkg)
}

module.exports = oracle

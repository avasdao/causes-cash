#!/usr/bin/env node

/* global BigInt */

const bchaddr = require('bchaddrjs-slp')
// const BITBOX = require('bitbox-sdk').BITBOX
// const bitbox = new BITBOX()
const bitcore = require('bitcore-lib-cash')
const Mnemonic = require('bitcore-mnemonic')
const PouchDB = require('pouchdb')
const moment = require('moment')
const superagent = require('superagent')
// const util = require('util')

/* Set dust amount. */
const DUST_AMOUNT = 546

let mnemonic = require('./.mnemonic')

/* Initialize databases. */
const mcpTicketsDb = new PouchDB('http://nito:dnPDbAR3WR8ApR3QUeHh@localhost:5984/mcp_tickets')

/* Set required number of signatures. */
const REQ_NUM_SIGS = 2

const TOKEN_ID = 'fcc68073e8c70c70386fd41c51b61a74897e953d1c774d281dcc9127dc97221c' // MyCoinParty Tickets
// const TICKET_VENDING_ADDR = 'qzpwncftddx7f59z93w4qv4hnj4as335vvz8gftqvr'
const FINAL_BLOCK = 673000 // 1/31

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Ticket Calculator
 *
 * NOTE: We are using the USD value from the time for the ticket transaction.
 *       In the case of delayed delivery, the sender is still credited at the
 *       value from the time of sending.
 */
const ticketCalc = async function (_satoshis, _usd) {
    /* Set normalized USD price. */
    const usd = Number(_usd / 100.0) // convert to decimal value
    console.log('\nBCH/USD:', usd) // eslint-disable-line no-console

    // const usdSpent = 200
    const usdSpent = (_satoshis / 100000000) * usd
    console.log('\nUSD spent:', usdSpent) // eslint-disable-line no-console

    /* Request current block height. */
    const response = await superagent
        .get('https://bitdb.bch.sx/q/ewogICAgICAgICAgICAidiI6IDMsCiAgICAgICAgICAgICJxIjogewogICAgICAgICAgICAgICAgImRiIjogWyJjIl0sCiAgICAgICAgICAgICAgICAiZmluZCI6IHt9LAogICAgICAgICAgICAgICAgImxpbWl0IjogMQogICAgICAgICAgICB9LAogICAgICAgICAgICAiciI6IHsKICAgICAgICAgICAgICAgICJmIjogIlsgLltdIHwgLmJsay5pIF0iCiAgICAgICAgICAgIH0KICAgICAgICB9')

    const currentBlock = response.body.c[0] || null
    console.log('\nCurrent block:', currentBlock) // eslint-disable-line no-console
    console.log('\nFinal block:', FINAL_BLOCK) // eslint-disable-line no-console

    /* Set stage bonus. */
    // FIXME: This MUST be dynamically tied to the current block height.
    const stageBonus = 10
    console.log('\nStage bonus:', stageBonus) // eslint-disable-line no-console

    const remainingBlocks = FINAL_BLOCK - currentBlock
    console.log('\nRemaining blocks:', remainingBlocks) // eslint-disable-line no-console

    // const blockBonus = (remainingBlocks / 144) + 1.00
    const blockBonus = 1.00 // NO BONUS
    console.log('\nBlock bonus:', blockBonus) // eslint-disable-line no-console

    // const numTickets = stageBonus * blockBonus * (usdSpent / 100.0)
    const numTickets = stageBonus * blockBonus * usdSpent
    const numTicketsBI = BigInt((numTickets * 10000).toFixed(0)) * BigInt(10000)
    // NOTE: We split the multiplication to prevent integer overflow.
    console.log('\nExpected # tickets:', numTickets, numTicketsBI) // eslint-disable-line no-console

    return numTicketsBI
}

/**
 * Mint (New) Tokens
 */
const mint = async (_baton, _privateKeys, _doc, _amountToMint, _isLive) => {
    /* Initialize mint to. */
    const mintTo = bchaddr.toCashAddress(_doc.incoming.sender)
    console.log('\nMinting to:', mintTo)

    /* Set public keys. */
    const publicKeys = _privateKeys.map(bitcore.PublicKey)

    /* Set address. */
    const address = new bitcore.Address(publicKeys, REQ_NUM_SIGS)
    // console.log('\nMINT ADDRESS:', address.toString())

    /* Set txid. */
    // NOTE: UTXO location of Mint Baton
    const txId = _baton.txid

    /* Set input size. */
    const satoshis = DUST_AMOUNT

    /* Set UTXO. */
    const utxo = {
        txId,
        outputIndex: 2,
        address: address.toString(),
        script: new bitcore.Script(address).toHex(),
        satoshis,
    }
    // console.log('\nUTXO', utxo)

    /* Set txid. */
    // NOTE: Contains BCH for mining fees.
    const txId2 = _baton.txid

    /* Set input size. */
    // FIXME: Pull the UTXO value dynamically
    const satoshis2 = _baton.v

    /* Set UTXO. */
    const utxo2 = {
        txId: txId2,
        outputIndex: 3,
        address: address.toString(),
        script: new bitcore.Script(address).toHex(),
        satoshis: satoshis2,
    }
    // console.log('\nUTXO2', utxo2)

    /* Calculate byte count. */
    const byteCount = 1000

    /* Calc (tx) send value. */
    // const sendValue = satoshis - DUST_AMOUNT - DUST_AMOUNT - parseInt(byteCount * 1.1)
    const sendValue = satoshis + satoshis2 - DUST_AMOUNT - DUST_AMOUNT - parseInt(byteCount * 1.1)

    // v5
    const buf1 = Buffer.from('6a04534c50000101', 'hex') // SLPv1
    const buf2 = Buffer.from('044d494e54', 'hex') // MINT
    const buf3 = Buffer.from('20' + TOKEN_ID, 'hex')
    const buf4 = Buffer.from('0102', 'hex') // minting baton vout
    const buf5 = Buffer.alloc(9)
    buf5.writeUInt8(0x08) // length (8-bytes)
    buf5.writeBigUInt64BE(_amountToMint, 1)

    const arr = [ buf1, buf2, buf3, buf4, buf5 ]
    const buf = Buffer.concat(arr)

    const script = new bitcore.Script(buf)
    // console.log('\nSCRIPT (decoded)', script.toString())

    /* Create transaction. */
    const transaction = new bitcore.Transaction()
        .from(utxo, publicKeys, REQ_NUM_SIGS)
        .from(utxo2, publicKeys, REQ_NUM_SIGS) // NOTE: Used for mining fees (when necessary?)
        .addOutput(new bitcore.Transaction.Output({
            script: script,
            satoshis: 0
        }))
        .to(mintTo, DUST_AMOUNT) // (token) receiver address
        .to(address.toString(), DUST_AMOUNT) // (baton) receiver address
        .to(address.toString(), sendValue) // (change) receiver address
        .sign([_privateKeys[0], _privateKeys[1]])

    // console.log('\nTRANSACTION (isFullySigned)', transaction.isFullySigned())
    console.log('\nTRANSACTION (HEX)', transaction.toString())

    // const decodeRawTransaction = await bitbox
    //     .RawTransactions.decodeRawTransaction(transaction.toString())
    //     .catch(err => console.error('DECODE ERROR:', err))
    // console.log('\nDECODED', decodeRawTransaction)
    // console.log('\nDECODED (OP_RETURN)', decodeRawTransaction.vout[0].scriptPubKey)

    if (_isLive) {
        /* Broadcast the transaction. */
        // const sendRawTransaction = await bitbox.RawTransactions
        //     .sendRawTransaction(transaction.toString())
        //     .catch(err => console.error('TX SEND ERROR:', err))
        // console.log('\nTX SEND', sendRawTransaction)

        /* Set target. */
        const target = 'https://insomnia.devops.cash/v1/tx/broadcast'

        /* Call remote API. */
        const broadcast = await superagent
            .post(target)
            .set('Content-Type', 'text/plain')
            .send(transaction.toString())
            .catch(err => console.error(err)) // eslint-disable-line no-console
        // console.log('\nBROADCAST', broadcast)
        console.log('\nBROADCAST', broadcast.body)

        /* Initialize transaction id. */
        const txid = broadcast.body.txid || ''

        // FIXME: We should have better validation here
        if (!txid || txid.length !== 64) {
            return false
        }

        try {
            /* Clone document. */
            const pkg = JSON.parse(JSON.stringify(_doc))

            pkg.outgoing = {
                txid,
                mcp: Number(_amountToMint.toString()),
                // remaining: FINAL_BLOCK - tx.blk
            }

            pkg.processedBy = 'mcp-minting'
            pkg.completedAt = moment().unix()

            console.log('\nNEW DB PACKAGE', pkg)

            /* Retrieve results. */
            const results = await mcpTicketsDb.put(pkg)
                .catch(err => console.error('EVENT ERROR:', err))
            console.log('UPDATE RESULT', results)

            return results
        } catch (e) {
            console.error(e)

            return e
        }

    }

    return false
}

/**
 * Baton Query
 */
const batonQuery = async function () {
    let query = {
        v: 3,
        q: {
            db: ['t'],
            find: {
                'tokenDetails.tokenIdHex': TOKEN_ID
            }
        }
    }
    let b64 = Buffer.from(JSON.stringify(query)).toString('base64')
    // let url = 'https://slpdb.fountainhead.cash/q/' + b64
    let url = 'https://slpdb.devops.cash/q/' + b64

    // Make an HTTP request to bitdb.fountainhead.cash public endpoint
    const batonDetails = await superagent.get(url)
    console.log('\nBaton details:', batonDetails.body)

    const outpoint = batonDetails.body.t[0].mintBatonUtxo
    // console.log('\nBaton outpoint:', outpoint)

    const txid = outpoint.split(':')[0]

    query = {
        v: 3,
        q: {
            db: ['c', 'u'],
            find: {
                'tx.h': txid
            }
        }
    }
    b64 = Buffer.from(JSON.stringify(query)).toString('base64')
    // url = 'https://bitdb.bch.sx/q/' + b64
    url = 'https://bitdb.devops.cash/q/' + b64

    // Make an HTTP request to bitdb.fountainhead.cash public endpoint
    const batonTx = await superagent.get(url)
    // console.log('BATON TX', batonTx.body)

    let baton = null

    if (batonTx.body.c.length) {
        baton = batonTx.body.c[0].out[3].e
    }

    if (batonTx.body.u.length) {
        baton = batonTx.body.u[0].out[3].e
    }

    if (baton) {
        baton.txid = txid
    }
    // console.log('BATON', baton)

    return baton
}

/**
 * Mint Pending
 */
const mintPending = async function (_isLive) {
    let results = null

    /* Retrieve campaigns. */
    results = await mcpTicketsDb.query('api/isPending', {
        // keys: searchKeys,
        include_docs: true,
    }).catch(err => console.error(err))
    // console.log('\nSEARCH RESULTS', results)

    if (results && results.rows) {
        for (let i = 0; i < results.rows.length; i++) {
            /* Set transaction details. */
            const pendingDoc = results.rows[i].doc
            console.log('PENDING DOC', pendingDoc)

            const baton = await batonQuery()
            // console.log('BATON', baton)

            /* Initialize number of tickets. */
            let numTickets = null

            if (pendingDoc.incoming.tickets) {
                /* Set number of tickets. */
                numTickets = pendingDoc.incoming.tickets

                /* Conver to satoshis. */
                numTickets = BigInt((numTickets * 10000).toFixed(0)) * BigInt(10000)
            } else {
                /* Calculate number of tickets. */
                numTickets = await ticketCalc(
                    pendingDoc.incoming.satoshis, pendingDoc.usd)
            }
            console.log('\nNum tickets:', numTickets)

            const isMinted = await mint(baton, privateKeys, pendingDoc, numTickets, _isLive)
                .catch(err => console.error(err))
            console.log('\nIs minted:', isMinted)

            /* Delay for blockchain updates. */
            await delay(5000)
        }
    }

}

/* Reset mnemonic. */
mnemonic = Mnemonic(mnemonic)
// console.log('\nMnemonic:', mnemonic.toString())

/* Initialize HD node. */
const hdNode = mnemonic.toHDPrivateKey()
// console.log('\nHDNODE:', hdNode)

/* Return (hardened) derivation path prefix. */
const pathPrefix = `m/44'/145'/0'/0/`

/* Initialize child node. */
const childNode0 = hdNode.deriveChild(pathPrefix + '0')
const childNode1 = hdNode.deriveChild(pathPrefix + '1')
const childNode2 = hdNode.deriveChild(pathPrefix + '2')

// FIXME: Split private keys onto 3 independent nodes/servers.
const privateKeys = [
    bitcore.PrivateKey(childNode0.privateKey),
    bitcore.PrivateKey(childNode1.privateKey),
    bitcore.PrivateKey(childNode2.privateKey),
]
const mappedKeys = privateKeys.map(bitcore.PublicKey)
// console.log('\nMAPPED KEYS', mappedKeys)

const address = new bitcore.Address(mappedKeys, REQ_NUM_SIGS)
console.log('\nTreasury address:', address.toString())

mintPending(false)

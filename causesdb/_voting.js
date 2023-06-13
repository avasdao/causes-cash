#!/usr/bin/env node

/* Import core modules. */
const numeral = require('numeral')
const moment = require('moment')
const Nito = require('nitojs')
const PouchDB = require('pouchdb')
const util = require('util')
const uuidv4 = require('uuid/v4')

/* Initialize databases. */
const mcpTicketsDb = new PouchDB('http://nito:dnPDbAR3WR8ApR3QUeHh@localhost:5984/mcp_tickets')

const TICKET_VENDING_ADDR = 'qzpwncftddx7f59z93w4qv4hnj4as335vvz8gftqvr'
const FINAL_BLOCK = 668543 // 12/31

// const addrs = {
//     v: 3,
//     q: {
//         find: {
//             $or: [
//                 { 'in.e.a': 'qzpwncftddx7f59z93w4qv4hnj4as335vvz8gftqvr' },
//                 { 'out.e.a': 'qzpwncftddx7f59z93w4qv4hnj4as335vvz8gftqvr' },
//             ]
//         },
//     }
// }

/* Set page loading delay. */
// const LOAD_DELAY = 3000
// const CLOSE_DELAY = 2000

console.log('\n\nMyCoinParty MCP Manager Starting')
console.log('--------------------------------\n')

// TODO: Will monitor registered wallet addresses

/**
 * Query
 */
const query = async function () {
    const usd = await Nito.Markets.getTicker('BCH', 'USD')
    console.log('\nBCH/USD:', usd) // eslint-disable-line no-console

    let results = null

    const request = {
        v: 3,
        q: {
            find: {
                'out.e.a': 'qzpwncftddx7f59z93w4qv4hnj4as335vvz8gftqvr',
            },
        }
    }

    const ticketActivity = await Nito.Blockchain.Query.request(request)
    console.log('TICKET ACTIVITY (all)', ticketActivity)

    if (!ticketActivity) {
        return console.log('\n\nFAILED to retrieve blockchain data.\n\n')
    }

    /* Initialize search keys. */
    const searchKeys = []

    /* Initialize found keys. */
    const foundKeys = []

    /* Initialize ticket transactions. */
    const ticketTxs = []

    /* Initialize (pending) ticket transactions. */
    let pendingTxs = []

    Object.keys(ticketActivity.c).forEach(txNum => {
        const tx = ticketActivity.c[txNum]
        // console.log('\nTICKET TRANSACTION', tx)
        // console.log('\nTICKET TRANSACTION (in.e)', tx.in[0].e)
        // console.log('\nTICKET TRANSACTION (out.e)', tx.out[0].e)

        tx.out.forEach(async txOutput => {
            const txid = tx.tx.h
            const edge = txOutput.e

            // console.log('\nTICKET TRANSACTION (e)', txid, edge)

            /* Validate ticket vending address. */
            if (edge.a === TICKET_VENDING_ADDR) {
                const sKey = `${txid}:${edge.i}`

                /* Build ticket package. */
                const pkg = {
                    sKey,
                    txid,
                    txIndex: edge.i,
                    satoshis: edge.v,
                    usd: ((edge.v / 100000000) * (usd)).toFixed(2),
                    sender: tx.in[0].e.a,
                    blk: tx.blk.i,
                    timestamp: tx.blk.t,
                }

                /* Add to ticket transactions. */
                ticketTxs.push(pkg)

                /* Add search key to list. */
                searchKeys.push(sKey)
            }
        })

    })

    // console.log('\nSearch keys:', searchKeys)

    ticketTxs.sort((a, b) => {
        return b.timestamp - a.timestamp
    })

    /* Retrieve campaigns. */
    results = await mcpTicketsDb.query('api/byOutpoint', {
        keys: searchKeys,
        include_docs: true,
    }).catch(err => console.error(err))
    // console.log('\nSEARCH RESULTS', results)

    if (results && results.rows) {
        results.rows.forEach(ticket => {
            foundKeys.push(ticket.key)
        })

        pendingTxs = ticketTxs.filter(tx => {
            return !foundKeys.includes(tx.sKey)
        })
    }

    // console.log('\nALL Ticket Txs (found in db):', foundKeys)

    // console.log('\nALL Ticket Txs (sorted):', ticketTxs)

    console.log('\nALL Ticket Txs (pending):', pendingTxs)

    pendingTxs.forEach(async tx => {
        const pkg = {
          _id: uuidv4(),
          usd: parseInt((usd * 100).toFixed(0)),
          incoming: {
            txid: tx.txid,
            txIndex: tx.txIndex,
            satoshis: tx.satoshis,
            sender: tx.sender,
            blk: tx.blk,
            remaining: FINAL_BLOCK - tx.blk
          },
          outgoing: null,
          processedBy: null,
          createdAt: moment().unix(),
          completedAt: null
        }
        console.log('PENDING TX', pkg)

        /* Retrieve results. */
        // results = await mcpTicketsDb.put(pkg)
        //     .catch(err => console.error('EVENT ERROR:', err))
        // console.log('INSERT RESULT', results)
    })

}

// mint()
query()
// load(CAMPAIGN_URL)

/* Import modules. */
import fetch from 'node-fetch'
import moment from 'moment'
import PouchDB from 'pouchdb'
import {
    binToHex,
    decodeAddress,
} from 'nexajs'
import { sleep } from '@nexajs/utils'
import { Wallet } from '@nexajs/wallet'
import { v4 as uuidv4 } from 'uuid'

/* Import libraries. */
import parseTx from './libs/parseTx.js'

/* Set (REST) API endpoints. */
const ROSTRUM_ENDPOINT = 'https://nexa.sh/v1/rostrum'

/* Set constants. */
const ROSTRUM_METHOD = 'POST'

/* Initialize globals. */
let body
let response

const headers = new Headers()
headers.append('Content-Type', 'application/json')

const getAddressHistory = async (_address) => {
    body = JSON.stringify({
        request: 'blockchain.address.get_history',
        params: _address,
    })

    // NOTE: Native `fetch` requires Node v21+.
    response = await fetch(ROSTRUM_ENDPOINT, {
        method: ROSTRUM_METHOD,
        headers,
        body,
    }).catch(err => console.error(err))
    response = await response.json()
    // console.log('RESPONSE', response)

    return response
}

// import getInfo from './src/getInfo.js'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/logs`)
const systemDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/system`)
const vendingDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/vending`)
const vendingPayoutsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/vending_payouts`)

console.info('Causes Cash DB is starting...')

// const AVAS_TOKEN_ID = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000'
// const AVAS_TOKEN_GROUP = 'nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x'
const AVAS_TOKEN_DECIMALS = 8 // TODO: Pull from `getInfo` dynamically
const TRANSACTION_DELAY = 5000
const PROCESSING_DELAY = 3000

/**
 * Do Work
 *
 * Handle the rewards processing.
 */
const doWork = async (
    _vmid,
    _campaignid,
    _tokenid,
    _receiver,
    _rate,
    _history,
    _startIdx
) => {
    /* Initialize locals. */
    let address
    let payout
    let pkScriptHash
    let queue
    let response
    let reward
    let snapshot
    let source
    let txidem
    let wallet

    queue = _history.slice(_startIdx)
    console.log('QUEUE', queue.length, queue)

    const { hash } = decodeAddress(_receiver)
    // console.log('HASH', binToHex(hash))

    pkScriptHash = binToHex(hash)

    source = await parseTx(pkScriptHash, queue[0].tx_hash)
    console.log('SOURCE', source)

    /* Validate source. */
    // NOTE: Will occur when SENDING coins from address.
    if (!source) {
        snapshot = await vendingDb
            .get(_vmid)
            .catch(err => console.error(err))
        // console.log('SNAPSHOT-1', snapshot)

        snapshot.txCount++
        snapshot.updatedAt = moment().unix()

        response = await vendingDb
            .put(snapshot)
            .catch(err => console.error(err))
        // console.log('UPDATE', response)

        return console.log('Skipping! SENT assets.')
    }

    reward = parseInt(source.satoshis * _rate)
    console.log('REWARD', _rate, reward)
// return

    try {
        wallet = await Wallet.init(process.env.MNEMONIC)
        // console.log('WALLET', wallet)

        address = wallet.address
        console.log('ADDRESS', address)

        response = await wallet.send(_tokenid, source.sender, BigInt(reward))
        console.log('Send UTXO (response):', response)

        /* Handle response. */
        if (response?.txidem) {
            txidem = response.txidem
        } else {
            // TODO Add ADMIN email notifcation.
            return console.error(response?.error)
        }
    } catch (err) {
        console.error(err)
        // TODO Add ADMIN email notifcation.
        return console.error('Oops! We tried to send tokens??')
    }

    /* Validate transaction idem. */
    if (txidem.length === 64) {
        snapshot = await vendingDb
            .get(_vmid)
            .catch(err => console.error(err))
        // console.log('SNAPSHOT-1', snapshot)

        snapshot.paid = parseInt(snapshot.paid + reward)
        snapshot.txCount++
        snapshot.updatedAt = moment().unix()

        response = await vendingDb
            .put(snapshot)
            .catch(err => console.error(err))
        console.log('UPDATE (vending):', response)

        payout = {
            _id: source.txidem,
            campaignid: _campaignid,
            // txid: source.txid,
            amount: source.satoshis / 100.0,
            satoshis: source.satoshis,
            payout: {
                receiver: source.sender,
                tokens: parseFloat(reward) / Math.pow(10, AVAS_TOKEN_DECIMALS),
                satoshis: parseInt(reward),
                txidem,
            },
            createdAt: moment().unix(),
        }
        // console.log('PAYOUT', payout)

        response = await vendingPayoutsDb
            .put(payout)
            .catch(err => console.error(err))
        console.log('UPDATE (payout):', response)

        await sleep(TRANSACTION_DELAY) // 5-second pause
    }
}

/**
 * Run Daemon
 *
 * Start the automated process handling procedures.
 */
const run = async () => {
    /* Initialize locals. */
    let campaignid
    let history
    let rate
    let receiver
    let results
    let tokenid
    let txCount
    let vm
    let vmid
    let vms

    /* Request "active" vending machines. */
    results = await vendingDb
        .query('api/isActive', {
            include_docs: true,
        })
        .catch(err => console.error(err))
    // console.log('RESULTS', results)

    /* Parse virtual machines. */
    vms = results.rows.map(_row => {
        return _row.doc
    })
    // console.log('VENDING MACHINES', vms)

    /* Handle each vending machine. */
    for (let i = 0; i < vms.length; i++) {
        /* Set vending machine. */
        vm = vms[i]

        /* Assign variables. */
        vmid       = vm._id
        campaignid = vm.campaignid
        tokenid    = vm.tokenid
        rate       = vm.rate
        receiver   = vm.receiver
        txCount    = vm.txCount

        /* Request history. */
        history = await getAddressHistory(receiver)
            .catch(err => console.error(err))
        // console.log('HISTORY for', receiver, history)

        historyLen = history.length
        console.log('HISTORY LENGTH', historyLen, 'vs', txCount)

        /* Validate transaction count. */
        if (historyLen > txCount) {
            /* Do work! */
            await doWork(
                vmid,
                campaignid,
                tokenid,
                receiver,
                rate,
                history,
                txCount
            )
        } else {
            console.log(campaignid, 'is all caught up!')
        }

        /* Validate "next" VM. */
        if ((i + 1) < vms.length) {
            await sleep(PROCESSING_DELAY) // 3-second pause
        }
    }
}

while (true) {
    /* Initialize response holder. */
    let response

    // console.time('\n\n\n  Starting next run...\n\n\n')
    await run()

    response = await systemDb
        .get('0')
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    if (response) {
        response.lastVendingAt = moment().unix()

        response = await systemDb
            .put(response)
            .catch(err => console.error(err))
        // console.log('UPDATED', response)
    }

    await sleep(PROCESSING_DELAY) // 3-second pause
}

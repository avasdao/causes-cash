/* Import modules. */
import fetch from 'node-fetch'
import moment from 'moment'
import PouchDB from 'pouchdb'
import { decodeAddress } from '@nexajs/address'
import {
    getAddressHistory,
    getGenesisInfo,
} from '@nexajs/rostrum'
import { Rpc } from '@nexajs/rpc'
import { binToHex } from '@nexajs/utils'
import { v4 as uuidv4 } from 'uuid'

import parseTx from './libs/parseTx.js'

/* Initialize databases. */
const vendingDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/vending`)
const vendingPayoutsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/vending_payouts`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)

console.log('Causes Cash DB is starting...')

const AVAS_TOKEN_ID = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000'
const AVAS_TOKEN_GROUP = 'nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x'
const AVAS_TOKEN_DECIMALS = 8

const CAMPAIGN_1_ADDRESS = 'nexa:nqtsq5g5kc24d57cclndrnapv3jxvl9vdjm9nh2ljgxpaw2s'
const CAMPAIGN_1_GOAL = 300_000_000_00
const CAMPAIGN_1_TOKENS = 210_000_00_000_000

setInterval(() => {
    console.log('waiting...')
}, 30000)


const runTest = async () => {
    /* Set request parameters. */
    const params = []
    console.log('AUTH PARAMS', params)

    /* Send request to (local) node. */
    const response = await Rpc
        .call('getwalletinfo', params, {
            username: 'user',
            password: 'password',
        })
        .catch(err => console.error(err))
    console.log('NODE RESPONSE', response)

}

const getInfo = async () => {
    const token = await getGenesisInfo(AVAS_TOKEN_ID)
        .catch(err => console.error(err))
    console.log('TOKEN', token)
}


const doWork = async (_vmid, _campaignid, _groupid, _receiver, _rate, _history, _startIdx) => {
    let response
    let snapshot
    let txidem

    const queue = _history.slice(_startIdx)

    console.log('QUEUE', queue.length, queue)

    const { hash } = decodeAddress(_receiver)
    // console.log('HASH', binToHex(hash))
    const pkScriptHash = binToHex(hash).slice(2)

    const source = await parseTx(pkScriptHash, queue[0].tx_hash)
    console.log('SOURCE', source)

    const reward = parseInt(source.satoshis * _rate)
    console.log('REWARD', reward)

    const cmd = `nexa-cli token send ${_groupid} ${source.sender} ${reward}`
    console.log('NODE CMD', cmd)

    try {
        // RPC send tokens
        txidem = true
    } catch (err) {
        console.error(err)
    }

    if (txidem) { // response
        snapshot = await vendingDb
            .get(_vmid)
            .catch(err => console.error(err))
        console.log('SNAPSHOT-1', snapshot)

        snapshot.paid = parseInt(snapshot.paid + reward)
        snapshot.txCount++
        snapshot.updatedAt = moment.unix()

        // response = await vendingDb
        //     .put(snapshot)
        //     .catch(err => console.error(err))
        // console.log('UPDATE', response)

        const payout = {
            _id: source.txidem,
            campaignid: _campaignid,
            txid: source.txid,
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
        console.log('PAYOUT', payout)

        // response = await vendingPayoutsDb
        //     .put(payout)
        //     .catch(err => console.error(err))
        // console.log('PAYOUT', response)
    }
}

const run = async () => {
    let campaignid
    let groupid
    let history
    let rate
    let receiver
    let results
    let txCount
    let vm
    let vmid
    let vms

    // runTest()

    // await getInfo()

    results = await vendingDb
        .query('api/isActive', {
            include_docs: true,
        })
        .catch(err => console.error(err))
    // console.log('RESULTS', results)

    vms = results.rows.map(_row => {
        return _row.doc
    })
    console.log('VENDING MACHINES', vms)

    /* Handle each vending machine. */
    for (let i = 0; i < vms.length; i++) {
        /* Set vending machine. */
        vm = vms[i]

        vmid = vm._id
        campaignid = vm.campaignid
        groupid = vm.groupid
        rate = vm.rate
        receiver = vm.receiver

        history = await getAddressHistory(receiver)
            .catch(err => console.error(err))
        // console.log('HISTORY for', receiver, history)

        txCount = vm.txCount

        if (history.length > txCount) {
            // console.log('WE GOT WORK TO DO!!!')

            doWork(vmid, campaignid, groupid, receiver, rate, history, txCount)
        } else {
            console.log('All caught up.')
        }
    }
}

run()

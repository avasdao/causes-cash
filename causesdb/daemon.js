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
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)

console.log('Causes Cash DB is starting...')

const AVAS_TOKEN_ID = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000'
const AVAS_TOKEN_GROUP = 'nexa:tptlgmqhvmwqppajq7kduxenwt5ljzcccln8ysn9wdzde540vcqqqcra40x0x'

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


const doWork = async (_receiver, _history, _startIdx) => {
    const queue = _history.slice(_startIdx)

    console.log('QUEUE', queue.length, queue)

    const parsed = await parseTx(_receiver, queue[0].tx_hash)
    console.log('PARSED', parsed)
}

const run = async () => {

    let receiver
    let results
    let txsCount
    let vendingMachines

    // runTest()

    // await getInfo()

    results = await vendingDb
        .query('api/isActive', {
            include_docs: true,
        })
        .catch(err => console.error(err))
    // console.log('RESULTS', results)

    vendingMachines = results.rows.map(_row => {
        return _row.doc
    })
    console.log('VENDING MACHINES', vendingMachines)

    /* Handle each vending machine. */
    for (let i = 0; i < vendingMachines.length; i++) {
        receiver = vendingMachines[i].receiver

        const history = await getAddressHistory(receiver)
            .catch(err => console.error(err))
        // console.log('HISTORY for', receiver, history)

        txsCount = vendingMachines[i].txsCount

        if (history.length > txsCount) {
            // console.log('WE GOT WORK TO DO!!!')

            const { hash } = decodeAddress(receiver)
            // console.log('HASH', binToHex(hash))

            doWork(binToHex(hash).slice(2), history, txsCount)
        } else {
            console.log('All caught up.')
        }
    }
}

run()

/* Import modules. */
import fetch from 'node-fetch'
import moment from 'moment'
import PouchDB from 'pouchdb'
import { Rpc } from '@nexajs/rpc'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/campaigns`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)

console.log('Causes Cash DB is starting...')

setInterval(() => {
    console.log('waiting...')
}, 30000)


const test = async () => {
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

test()

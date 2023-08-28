/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const rainmakerTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_txs`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let coins
    let nexaAddress
    let nullData
    let publicKey
    let publicKeyHash
    let receivers
    let response
    let scriptPubKey
    let scriptPushPubKey
    let tokens
    let txResult
    let userData
    let wif

    /* Set (request) body. */
    body = await readBody(event)
    console.log('BROADCAST (body):', body)

    // TODO Update profile records...

})

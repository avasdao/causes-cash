/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'
import { sendUtxo } from 'nexajs'

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/campaigns`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let purse
    let response

    /* Set (request) query. */
    // const query = getQuery(event)
    // console.log('QUERY', query)

    // const campaignid = query?.id

    // const campaign = await campaignsDb
    //     .get(campaignid)
    //     .catch(err => console.error(err))
    // console.log('CAMPAIGN (api):', campaign)

    // if (!campaign) {
    //     return {}
    // }

    const NEXA_TEST_ADDRESS = 'nexa:nqtsq5g57qupnngwws0rlvsevggu6zxqc0tmk7d3v5ulpfh6'

    /* Build parameters. */
    const params = {
        dbUser: process.env.COUCHDB_USER,
        dbPassword: process.env.COUCHDB_PASSWORD,
        mnemonic: process.env.MNEMONIC,
        receiver: NEXA_TEST_ADDRESS,
    }
    console.log('PARAMS', params)

    /* Send UTXO request. */
    // response = await sendUtxo(params)
    //     .catch(err => {
    //         console.error('UTXO ERROR:', err)
    //     })
    // console.log('Send UTXO (response):', response)

    /* Build purse package. */
    purse = {
        balance: 1337,
    }

    /* Return purse. */
    return purse
})

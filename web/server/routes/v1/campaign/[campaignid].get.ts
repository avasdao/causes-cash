/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import {
    getAddressHistory,
    getTransaction,
} from '@nexajs/rostrum'

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/campaigns`)

/* Initialize (data) cache. */
let cache = {}

const CACHE_REFRESH_DELAY = 30 // default: 30 seconds

export default defineEventHandler(async (event) => {
    let campaign
    let campaignid
    let goals
    let history
    let receiver
    let response
    let txs

    /* Set campaign id. */
    campaignid = event.context.params?.campaignid
    // console.log('CAMPAIGNID', campaignid)

    if (!campaignid) {
        return {}
    }

    response = await campaignsDb
        .get(campaignid)
        .catch(err => console.error(err))
    // console.log('CAMPAIGN', response)

    if (!response) {
        return {}
    }

    campaign = {
        id: campaignid,
        ...response,
    }

    /* Delete database fields. */
    delete campaign._id
    delete campaign._rev

    goals = campaign.goals

    receiver = campaign.receiver

    if (!cache[campaignid]?.updatedAt || cache[campaignid].updatedAt + CACHE_REFRESH_DELAY < moment().unix()) {
        history = await getAddressHistory(receiver)
            .catch(err => console.error(err))
        // console.log('HISTORY', history)

        txs = []

        for (let i = 0; i < history.length; i++) {
            const txid = history[i].tx_hash

            const tx = await getTransaction(txid)
                .catch(err => console.error(err))

            txs.push({
                hash: tx.hash,
                height: tx.height,
                fee: tx.fee,
            })
        }

        cache[campaignid] = {
            txs,
            updatedAt: moment().unix(),
        }
    } else {
        console.log('***LOADED FROM CACHE***')
    }

    /* Update cache. */
    campaign.cache = cache[campaignid]

    /* Return campaigns. */
    return campaign
})

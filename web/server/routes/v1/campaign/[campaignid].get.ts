/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'
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
const MARKET_UPDATE_DELAY = 30000 // default: 30 seconds

const campaignGoalIdx = 0 // FIXME: FOR DEV ONLY

let usd

const updateMarket = async () => {
    usd = Number(await $fetch(`https://nexa.exchange/mex`))
    console.log('USD (mex):', usd)
}

/**
 * Requested Display
 */
const requestedDisplay = (_campaignGoals, _isMex = false) => {
    /* Validate funding goal. */
    if (!_campaignGoals || !usd) return '0.00'

    /* Set satoshis value. */
    const satoshis = _campaignGoals.amount

    /* Set NEXA value. */
    const nexValue = Number(satoshis / 100)

    /* Return (formatted) value. */
    if (_isMex) {
        return numeral(nexValue / 1000000).format('0,0.00[00]')
    } else {
        return numeral(nexValue).format('0,0.00[00]')
    }
}

/**
 * Requesed Display (USD)
 */
const requestedDisplayUsd = (_campaignGoals) => {
    /* Validate pledge balance. */
    if (!_campaignGoals || !usd) return '$0.00'

    const usdValue = (_campaignGoals.amount / 100000000) * usd

    /* Return (formatted) value. */
    return numeral(usdValue).format('$0,0.00')
}

setInterval(updateMarket, MARKET_UPDATE_DELAY)


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

    if (!usd) {
        await updateMarket()
    }

    campaign.goals.forEach(_goal => {
        _goal.displayAmount = requestedDisplay(_goal)
        _goal.displayAmountMex = requestedDisplay(_goal, true) // isMex
        _goal.displayAmountUsd = requestedDisplayUsd(_goal)
    })

    /* Return campaigns. */
    return campaign
})

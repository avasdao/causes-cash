/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'
import PouchDB from 'pouchdb'

import {
    decodeAddress,
} from '@nexajs/address'

import {
    getAddressBalance,
    getAddressHistory,
    getTransaction,
} from '@nexajs/rostrum'

import {
    binToHex,
} from '@nexajs/utils'

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/campaigns`)

const CACHE_REFRESH_DELAY = 30 // default: 30 seconds
const MARKET_UPDATE_DELAY = 30000 // default: 30 seconds

/* Initialize (data) cache. */
let cache = {}

let campaignGoalIdx = 0 // FIXME: FOR DEV ONLY

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

/**
 * Funded Display
 */
const fundedDisplay = (_goal) => {
    /* Validate pledge balance. */
    if (!_goal.received) return '0.0'

    /* Set satoshis value. */
    const satoshis = _goal.received

    // /* Set NEXA value. */
    const nexValue = Number(satoshis / 100)

    // /* Return (formatted) value. */
    return numeral(nexValue / 1000000)
        .format('0,0.00[00]')
}

/**
 * Funded Display (USD)
 */
const fundedDisplayUsd = (_goal) => {
    /* Validate pledge balance. */
    if (!_goal.received || !usd) return '$0.00'

    const usdValue = (_goal.received / 100000000) * usd

    /* Return (formatted) value. */
    return numeral(usdValue).format('$0,0.00')
}

/**
 * Percentage Completed
 */
const pctCompleted = (_goal) => {
    /* Validate funding goal. */
    if (!_goal) return '0.0%'

    /* Set percentage. */
    const pct = numeral(_goal.received / _goal.amount).format('0.0[0]%')
    console.log('PCT COMPLETE', pct)

    /* Return percentage. */
    return pct
}

/**
 * Expiration Display
 *
 * Show the time remaining in the campaign.
 */
const expirationDisplay = (_expiration) => {
    /* Validate expiration. */
    if (!_expiration) return 'n/a'

    /* Return (formatted) expiration. */
    return moment.unix(_expiration).fromNow(true)
}

const requestReceived = async (_campaign, _index) => {
    let received

    received = _campaign.received

    if (_index > 0) {
        for (let i = 0; i < _index; i++) {
            received -= _campaign.goals[i].amount
        }
    }

    if (received < 0) {
        received = 0
    }

    return received
}

setInterval(updateMarket, MARKET_UPDATE_DELAY)


export default defineEventHandler(async (event) => {
    let campaign
    let campaignid
    let goals
    let history
    let received
    let receiver
    let response
    // let txs

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

    goals = campaign.goals

    receiver = campaign.receiver

    if (!usd) {
        await updateMarket()
    }

    if (campaign.goals?.length > 1) {
        let checkpoint
        let decoded
        let history
        let output
        let scriptPubKey
        let tx
        let txid

        if (!cache[campaignid]) {
            cache[campaignid] = {}
        }

        /* Clear transactions. */
        cache[campaignid].txs = []

        decoded = decodeAddress(campaign.receiver)
        // console.log('DECODED', decoded)

        scriptPubKey = binToHex(decoded.hash).slice(2)
        // console.log('scriptPubKey', scriptPubKey)

        checkpoint = campaign?.checkpoint || 0

        if (!cache[campaignid]?.updatedAt || cache[campaignid].updatedAt + CACHE_REFRESH_DELAY < moment().unix()) {
            history = await getAddressHistory(receiver)
                .catch(err => console.error(err))
            console.log('HISTORY', history)

            history = history.filter(_tx => {
                return _tx.height > checkpoint
            })
            console.log('HISTORY (filtered)', history)

            /* Handle NEW history. */
            for (let i = 0; i < history.length; i++) {
                /* Set transaction id. */
                txid = history[i].tx_hash

                /* Request campaign details. */
                tx = await getTransaction(txid)
                    .catch(err => console.error(err))

                /* Add campaign to cache. */
                cache[campaignid].txs.push({
                    hash: tx.hash,
                    height: tx.height,
                    fee: tx.fee,
                    vout: tx.vout,
                })

                /* Validate transaction height. */
                if (tx.height > checkpoint) {
                    checkpoint = tx.height
                }
            }

            /* Update timestamp. */
            cache[campaignid].updatedAt = moment().unix()
        } else {
            // console.log('***LOADED FROM CACHE***')
        }

        /* Initialize received amount (in satoshis). */
        received = campaign?.received || 0

        // console.log('CACHE CAMPAIGN', cache[campaignid])

        for (let i = 0; i < cache[campaignid].txs.length; i++) {
            tx = cache[campaignid].txs[i]

            for (let j = 0; j < tx.vout.length; j++) {
                output = tx.vout[j]
                // console.log('OUTPUT', output)

                if (output.scriptPubKey.hex === scriptPubKey) {
                    received += output.value_satoshi
                    // console.log('RECEIVED', received)
                }

                /* Add received amount to transaction. */
                tx.received = received
            }
        }

        /* Update received (balance). */
        campaign.received = received

        campaign.checkpoint = checkpoint

        campaign.updatedAt = moment().unix()

        response = await campaignsDb
            .put(campaign)
            .catch(err => console.error(err))
        console.error('DB UPDATE', response)

        /* Delete database fields. */
        delete campaign._id
        delete campaign._rev

        /* Update cache. */
        // campaign.cache = cache[campaignid]

        // delete campaign.cache.txs

        // FIXME Handle campaign index (using campaign.goals)
        campaignGoalIdx = 0
    } else {
        /* Request (receiver) address balance. */
        campaign.received = await getAddressBalance(campaign.receiver)
            .catch(err => console.error(err))
        // console.log('RECEIVED', campaign.received)

        // FIXME Handle campaign index (using campaign.goals)
        campaignGoalIdx = 0
    }

    campaign.expirationDisplay = expirationDisplay(campaign.expiresAt)

    if (!campaign.goals) {
        return campaign
    }

    for (let i = 0; i < campaign.goals.length; i++) {
        const goal = campaign.goals[i]

        goal.received = await requestReceived(campaign, i)

        goal.displayAmount = requestedDisplay(goal)
        goal.displayAmountMex = requestedDisplay(goal, true) // isMex
        goal.displayAmountUsd = requestedDisplayUsd(goal)
        goal.fundedDisplay = fundedDisplay(goal)
        goal.fundedDisplayUsd = fundedDisplayUsd(goal)
        goal.pctCompleted = pctCompleted(goal)
    }

    /* Return campaigns. */
    return campaign
})

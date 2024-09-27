/* Import modules. */
import PouchDB from 'pouchdb'
import moment from 'moment'
import { Wallet } from '@nexajs/wallet'

/* Initialize databases. */
const vendingDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/vending`)
const vendingPayoutsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/vending_payouts`)
const sessionsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

const AVAS_TOKEN_DECIMALS = 8 // TODO: Pull from `getInfo` dynamically

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let adminid
    let body
    let campaign
    let campaignDetail
    let campaignid
    let mnemonic
    let payout
    let rate
    let receiver
    let response
    let reward
    let satoshis
    let session
    let sessionid
    let snapshot
    let tokenid
    let txidemDst
    let txidemSrc

// FOR DEV PURPOSES ONLY
const admins = [
    '0xE2266286745fEFdDeC42D895abC85a33710a2078',
]
console.log('ADMINS', admins)

    /* Set (request) body. */
    body = await readBody(event)
    console.log('VENDING DETAILS (body):', body)

    sessionid = body?.sessionid
    console.log('SESSION ID', sessionid)

    campaignid = body?.campaignid
    console.log('CAMPAIGN ID', campaignid)

    mnemonic = body?.mnemonic
    console.log('MNEMONIC', mnemonic)

    tokenid = body?.tokenid
    console.log('TOKEN ID', tokenid)

    receiver = body?.receiver
    console.log('RECEIVER', receiver)

    satoshis = body?.satoshis
    console.log('SATOSHIS', satoshis)

    rate = body?.rate
    console.log('REWARD RATE', rate)

    txidemSrc = body?.txidem
    console.log('TXIDEM (source)', txidemSrc)

    /* Validate session id. */
    if (!sessionid || typeof sessionid === 'undefined') {
        return {
            error: 'Session NOT found!',
            body,
        }
    }

    /* Request session. */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => {
            console.error(err)
            error = err
        })
    console.log('SESSION', session)

    /* Validate session id. */
    if (!session) {
        return {
            error: 'Session NOT found!',
            sessionid,
        }
    }

    /* Set profile id. */
    // NOTE: This is typically a (33-byte) public key.
    adminid = session?.profileid
    console.log('ADMINID', adminid)

    /* Validate administrator. */
    if (!admins || !admins.includes(adminid)) {
        return {
            error: 'User is NOT authorized to access this data.',
            adminid,
        }
    }

    if (mnemonic && tokenid && receiver && satoshis) {
        const wallet = await Wallet.init(mnemonic)
            .catch(err => console.error(err))
        console.log('WALLET', wallet)

        reward = parseInt(satoshis * rate)
        console.log('REWARD', rate, reward)

        console.log(tokenid, receiver, BigInt(reward))

        /* Send reward. */
        response = await wallet.send(tokenid, receiver, BigInt(reward))
        console.log('Send UTXO (response):', response)

        /* Handle response. */
        if (response?.txidem) {
            txidemDst = response.txidem
        } else {
            // TODO Add ADMIN email notifcation.
            return console.error(response?.error)
        }

        /* Validate transaction idem. */
        if (txidemDst.length === 64) {
            snapshot = await vendingDb
                .get(campaignid)
                .catch(err => console.error(err))
            console.log('SNAPSHOT', snapshot)

            snapshot.paid = parseInt(snapshot.paid + reward)
            snapshot.txCount++
            snapshot.updatedAt = moment().unix()

            response = await vendingDb
                .put(snapshot)
                .catch(err => console.error(err))
            console.log('UPDATE (vending):', response)

            payout = {
                _id: txidemSrc,
                campaignid,
                // txid: source.txid,
                amount: satoshis / 100.0,
                satoshis: satoshis,
                payout: {
                    receiver,
                    tokens: parseFloat(reward) / Math.pow(10, AVAS_TOKEN_DECIMALS),
                    satoshis: parseInt(reward),
                    txidem: txidemDst,
                },
                createdAt: moment().unix(),
            }
            console.log('PAYOUT', payout)

            response = await vendingPayoutsDb
                .put(payout)
                .catch(err => console.error(err))
            console.log('UPDATE (payout):', response)
        }

        return {
            sender: wallet.address,
            receiver,
            txidemSrc,
            txidemDst,
        }
    }

    /* Initialize response handler. */
    response = {}

    /* Request ALL vending. */
    campaign = await vendingDb.get(campaignid)
        .catch(err => console.error(err))
    console.log('CAMPAIGN', campaign)

    if (campaign) {
        /* Sanitize campaign. */
        delete campaign._id
        delete campaign._rev

        /* Set (campaign) response. */
        response.campaign = campaign
    }

    // response = await vendingPayoutsDb
    //     .query('api/byCreation', {
    //         include_docs: true,
    //         limit: 10,
    //         descending: true,
    //     })
    //     .catch(err => console.error(err))
    // console.log('PAYOUTS', response)

    // /* Validate response. */
    // if (response) {
    //     if (!data) {
    //         data = {}
    //     }

    //     data.payouts = response.rows.map(_entry => {
    //         /* Set document. */
    //         doc = _entry.doc

    //         /* Sanitize document. */
    //         delete doc._id
    //         delete doc._rev

    //         /* Return document. */
    //         return doc
    //     })
    // }

    /* Return response. */
    return response
})

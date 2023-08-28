/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const rainmakerTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_txs`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let address
    let body
    let campaign
    let campaignid
    let profiles
    let profileid
    let receivers
    let response
    let txidem
    let txPkg

    /* Set (request) body. */
    body = await readBody(event)
    console.log('BROADCAST (body):', body)

    campaign = body.campaign
    campaignid = campaign.id

    receivers = body.receivers

    txidem = body.txidem


    console.log('PARSED', {
        campaign,
        campaignid,
        receivers,
        txidem,
        profileid,
    })
    // TODO Update profile records...

    profiles = receivers.map(_receiver => {
        profileid = sha256(`${campaignid}:${_receiver.address}`)
        console.log('PROFILEID', profileid)

        return profileid
    })

    txPkg = {
        _id: txidem,
        campaignid,
        profiles,
        createdAt: moment().unix(),
    }
    console.log('TX PKG', txPkg)

    response = await rainmakerTxsDb
        .put(txPkg)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

})

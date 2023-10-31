/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const rainmakerProfilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_profiles`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let address
    let body
    let campaign
    let campaignid
    let pkg
    let profileid
    let response

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('RAINMAKER (body):', body)

    campaign = body.campaign
    // console.log('CAMPAIGN', campaign)

    campaignid = campaign.id
    // console.log('CAMPAIGNID', campaignid)

    address = body.address
    // console.log('ADDRESS', address)

    profileid = sha256(`${campaignid}:${address}`)
    // console.log('PROFILEID', profileid)

    response = await rainmakerProfilesDb
        .get(profileid)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    /* Validate response. */
    if (response) {
        pkg = {
            id: response._id,
            ...response
        }

        delete pkg._id
        delete pkg._rev

        return pkg
    }

    /* Build (profile) package. */
    pkg = {
        _id: profileid,
        campaignid,
        address,
        txs: [], // NOTE: Will hold txidems.
        createdAt: moment().unix(),
    }
    // console.log('PROFILE PKG', pkg)

    /* Add profile to database. */
    response = await rainmakerProfilesDb
        .put(pkg)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    pkg = {
        id: pkg._id,
        ...pkg
    }

    delete pkg._id

    /* Return response. */
    return pkg
})

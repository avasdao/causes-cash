/* Import modules. */
import PouchDB from 'pouchdb'
import { getAddressHistory } from '@nexajs/rostrum'

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/campaigns`)

/* Initialize (data) cache. */
let cache = {}

const CACHE_REFRESH_DELAY = 30000 // default: 30 seconds

export default defineEventHandler(async (event) => {
    let campaign
    let campaignid
    let goals
    let history
    let receiver
    let response

    /* Set campaign id. */
    campaignid = event.context.params?.campaignid
    console.log('CAMPAIGNID', campaignid)

    if (!campaignid) {
        return {}
    }

    response = await campaignsDb
        .get(campaignid)
        .catch(err => console.error(err))
    console.log('CAMPAIGN', response)

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

    history = await getAddressHistory(receiver)
        .catch(err => console.error(err))
    console.log('HISTORY', history)

    cache.history = history

    campaign.history = history

    /* Return campaigns. */
    return campaign
})

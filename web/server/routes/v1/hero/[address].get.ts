/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/campaigns`)

export default defineEventHandler(async (event) => {
    let campaign
    let campaignid

    /* Set campaign id. */
    campaignid = event.context.params?.campaignid
    console.log('CAMPAIGNID', campaignid)

    if (!campaignid) {
        return {}
    }

    campaign = await campaignsDb
        .get(campaignid)
        .catch(err => console.error(err))
    console.log('CAMPAIGN (api):', campaign)

    if (!campaign) {
        return {}
    }

    /* Add campaign id. */
    campaign.id = campaign._id

    /* Delete database fields. */
    delete campaign._id
    delete campaign._rev

    /* Return campaigns. */
    return campaign
})

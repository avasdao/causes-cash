/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/campaigns`)

export default defineEventHandler(async (event) => {
    let campaigns
    let response

    response = await campaignsDb
        .allDocs({
            limit: 100,
            include_docs: true,
        })
        .catch(err => console.error(err))
    console.log('CAMPAIGNS', response)

    if (!response?.rows.length > 0) {
        return []
    }

    /* Filter response. */
    campaigns = response?.rows.map(_campaign => {
        const doc = _campaign.doc

        const campaign = {
            id: doc._id,
            owner: doc.owner,
            title: doc.title,
            summary: doc.summary,
            fundingGoal: doc.fundingGoal,
            starting: doc.starting,
            expiration: doc.expiration,
        }

        return campaign
    })

    /* Delete database fields. */
    // delete campaign._id
    // delete campaign._rev

    /* Return campaigns. */
    return campaigns
})

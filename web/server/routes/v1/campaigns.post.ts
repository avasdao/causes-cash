/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/campaigns`)
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)

// const BOOTSTRAP_CAMPAIGNID = '475b4cfc-ae95-419d-9681-cf378c083963'

export default defineEventHandler(async (event) => {
    /* Set (request) body. */
    const body = await readBody(event)

    const campaign = {
        _id: uuidv4(),
        ...body,
    }
    console.log('API SAVE CAMPAIGN', campaign)

    const response = await campaignsDb
        .put(campaign)
        .catch(err => console.error(err))
    console.log('CAMPAIGN (api):', response)

    /* Return response. */
    return response
})

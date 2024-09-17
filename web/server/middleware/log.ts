/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/logs`)

export default defineEventHandler(async (event) => {
    let headers
    let logDetails
    let success

    /* Set headers. */
    headers = event.node.req.headers
    // console.log('HEADERS', headers)

    /* Build log details. */
    logDetails = {
        i18n: headers['accept-language'],
        client: headers['user-agent'],
        referer: headers['referer'],
        host: headers['host'],
        ip: headers['x-real-ip'],
        ip_fwd: headers['x-forwarded-for'],
        url: event.node.req.url,
    }
    // console.info('LOG (api):', logDetails)

    success = await logsDb
        .put({
            _id: uuidv4(),
            source: 'headers',
            ...logDetails,
            createdAt: moment().unix(),
        })
        .catch(err => console.error(err))
    // console.log('SUCCESS (logs):', success)
})

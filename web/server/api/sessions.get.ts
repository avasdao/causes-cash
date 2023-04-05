/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Set headers. */
    const headers = event.node.req.headers
    // console.log('HEADERS', headers)

    /* Build log details. */
    const logDetails = {
        i18n: headers['accept-language'],
        client: headers['user-agent'],
        referer: headers['referer'],
        host: headers['host'],
        ip: headers['x-real-ip'],
        ip_fwd: headers['x-forwarded-for'],
        url: event.node.req.url,
    }
    // console.info('LOG (api):', logDetails)

    /* Create (new) session. */
    const session = {
        _id: uuidv4(),
        ...logDetails,
        isActive: true,
        createdAt: moment().unix(),
    }

    /* Save session to database. */
    const success = await sessionsDb
        .put(session)
        .catch(err => console.error(err))
    console.log('SUCCESS', success)

    /* Return session. */
    return session
})

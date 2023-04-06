/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

/**
 * Create Session
 *
 * @returns session
 */
const createSession = async (_event) => {
    /* Set headers. */
    const headers = _event.node.req.headers
    // console.log('HEADERS', headers)

    /* Build log details. */
    const logDetails = {
        i18n: headers['accept-language'],
        client: headers['user-agent'],
        referer: headers['referer'],
        host: headers['host'],
        ip: headers['x-real-ip'],
        ip_fwd: headers['x-forwarded-for'],
        url: _event.node.req.url,
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
}

export default defineEventHandler(async (event) => {
    /* Set (request) body. */
    const body = await readBody(event)
    // console.log('SESSIONS.POST (body):', body)

    /* Initialize locals. */
    let session

    /* Set session id. */
    const sessionid = body?.sessionid
    // console.log('SESSION ID', sessionid)

    /* Request session (if available). */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    console.log('SESSION (api):', session)

    /* Validate session. */
    if (!session || !session?.isActive) {
        session = await createSession(event)
    } else {
        /* Update timestamp. */
        session = {
            ...session,
            updatedAt: moment().unix(),
        }

        /* Save (updated) session. */
        const success = await sessionsDb
            .put(session)
            .catch(err => console.error(err))
        // console.log('UPDATE SESSION (api):', success)
    }

    /* Return session. */
    return session
})

/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    let challenge
    let createdAt
    let dbSession
    let expiresAt
    let sessionid
    let success
    let webSession

    /* Create new session id. */
    sessionid = uuidv4()

    /* Create new challenge. */
    challenge = uuidv4()

    /* Set creation time. */
    createdAt = moment().unix()

    /* Set expiration time. */
    expiresAt = moment().add(7, 'days').unix()

    /* Build (database) session. */
    dbSession = {
        _id: sessionid,
        challenge,
        createdAt,
        expiresAt,
    }

    /* Save (database) session. */
    success = await sessionsDb
        .put(dbSession)
        .catch(err => console.error(err))
    console.log('NEW SESSION (success):', success)

    /* Build (web) session. */
    webSession = {
        id: sessionid,
        challenge,
        createdAt,
        expiresAt,
    }

    /* Return (web) session. */
    return webSession
})

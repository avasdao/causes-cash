/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const challengesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/challenges`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let challenge
    let challengeid
    let createdAt
    let dbSession
    let expiresAt
    let success
    let webSession

    /* Create new challenge id. */
    challengeid = uuidv4()

    /* Create new challenge. */
    challenge = uuidv4()

    /* Set creation time. */
    createdAt = moment().unix()

    /* Set expiration time. */
    expiresAt = moment().add(7, 'days').unix()

    /* Build (database) challenge. */
    dbSession = {
        _id: challengeid,
        challenge,
        createdAt,
        expiresAt,
    }

    /* Save (database) challenge. */
    success = await challengesDb
        .put(dbSession)
        .catch(err => console.error(err))

    /* Build (web) challenge. */
    webSession = {
        id: challengeid,
        challenge,
        createdAt,
        expiresAt,
    }

    /* Return (web) challenge. */
    return webSession
})

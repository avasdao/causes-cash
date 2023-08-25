/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const challengesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/challenges`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let challenge
    let challengeid
    let error
    let query

    /* Set (request) query. */
    query = getQuery(event)
    console.log('QUERY', query)

    /* Set challenge id. */
    challengeid = query?.sid
    console.log('CHALLENGE ID', challengeid)

    /* Validate challenge id. */
    if (!challengeid) {
        return {
            error: 'Not found',
            query,
        }
    }

    /* Save (database) challenge. */
    challenge = await challengesDb
        .get(challengeid)
        .catch(err => {
            console.error(err)
            error = err
        })
    // console.log('CHALLENGE:', challenge)

    /* Validate challenge. */
    if (!challenge) {
        return {
            error: 'Not found',
            query,
        }
    }

    /* Add ID to challenge. */
    challenge = {
        id: challenge._id,
        ...challenge,
        error,
    }

    /* Sanitize challenge. */
    delete challenge._id
    delete challenge._rev
    delete challenge.auth
    delete challenge.challenge

    /* Return challenge. */
    return challenge
})

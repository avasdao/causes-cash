/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const rainmakerProfilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_profiles`)
const rainmakerTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_txs`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let error
    let profiles
    let response
    let sessionid
    let query

    /* Set (request) query. */
    query = getQuery(event)
    console.log('QUERY', query)

    /* Set session id. */
    sessionid = query?.sid
    console.log('SESSION ID', sessionid)

    /* Validate session id. */
    // if (!sessionid) {
    //     return {
    //         error: 'Not found',
    //         query,
    //     }
    // }

    /* Save (database) session. */
    response = await rainmakerProfilesDb
        .allDocs({
            include_docs: true,
        })
        .catch(err => {
            console.error(err)
            error = err
        })
    console.log('RESPONSE (profiles):', response)

    /* Validate profiles. */
    if (!response) {
        return {
            error: 'Not found',
            query,
        }
    }

    profiles = response.rows.map(_profile => {
        const doc = _profile.doc

        doc.id = doc._id

        delete doc._id
        delete doc._rev

        return doc
    })

    /* Sanitize session. */
    // delete session._id
    // delete session._rev
    // delete session.auth
    // delete session.session

    /* Return session. */
    return profiles
})

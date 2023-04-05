/* Import modules. */
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let session

    /* Set session id. */
    const sessionid = event.context.params?.sessionid
    console.log('SESSION ID', sessionid)

    /* Request session (if available). */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    console.log('SESSION (api):', session)

    /* Validate session. */
    if (!session || !session?.isActive) {
        session = await $fetch('/api/sessions')
    } else {
        // TODO Update session `updatedAt`
    }

    /* Return session. */
    return session
})

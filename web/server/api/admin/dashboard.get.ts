/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { sha256 } from '@nexajs/crypto'

/* Initialize databases. */
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/profiles`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let pkg
    let numProfiles
    let response

    response = await profilesDb
        .allDocs({
            include_docs: true,
        })
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    pkg = {}

    /* Validate response. */
    if (response) {
        pkg.numProfiles = response.rows.length
        pkg.numProfilesChg = 0.01337

        pkg.data = response.rows

        pkg.createdAt = moment().unix()
    }
    console.log('DASHBOARD PKG', pkg)

    /* Return response. */
    return pkg
})

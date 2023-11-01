/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const rainmakerCampaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_campaigns`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let campaigns
    let error
    let profileid
    let session
    let sessionid
    let query

    /* Set (request) query. */
    query = getQuery(event)
    // console.log('CAMPAIGNS (query):', query)

    sessionid = query?.sessionid
    // console.log('SESSION ID', sessionid)

    /* Validate session id. */
    if (sessionid) {
        /* Request session. */
        session = await sessionsDb
            .get(sessionid)
            .catch(err => {
                console.error(err)
                error = err
            })
        // console.log('SESSION', session)

        /* Set profile id. */
        // NOTE: This is typically a (33-byte) public key.
        profileid = session.profileid
        // console.log('PROFILEID', profileid)

        /* Save (database) session. */
        campaigns = await rainmakerCampaignsDb
            .query('api/byOwner', {
                key: profileid,
                include_docs: true,
            })
            .catch(err => {
                console.error(err)
                error = err
            })
        // console.log('CAMPAIGNS:', campaigns)

        /* Validate campaigns. */
        if (campaigns) {
            /* Re-format campaign data. */
            campaigns = campaigns.rows.map(_campaign => {
                /* Initialize locals. */
                let doc

                /* Set document. */
                doc = _campaign.doc

                /* Re-format document. */
                doc = {
                    id: doc._id,
                    ...doc,
                }

                /* Cleanup document. */
                delete doc._id
                delete doc._rev

                /* Return document. */
                return doc
            })
        }

    }

    /* Handle error(s). */
    if (error) {
        return error
    }

    /* Validate campaigns. */
    if (!campaigns) {
        return {
            error: 'Campaign NOT found!',
            query,
        }
    }

    /* Return campaigns. */
    return campaigns
})

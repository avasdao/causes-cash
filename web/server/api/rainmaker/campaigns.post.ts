/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const rainmakerCampaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_campaigns`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let campaigns
    let error
    let ownerid
    let session
    let sessionid

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('CAMPAIGNS (body):', body)

    sessionid = body?.sessionid
    // console.log('SESSION ID', sessionid)

    /* Validate session id. */
    if (!sessionid || typeof sessionid === 'undefined') {
        return {
            error: 'Session NOT found!',
            body,
        }
    }

    /* Request session. */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => {
            console.error(err)
            error = err
        })
    // console.log('SESSION', session)

    // TODO Validate session.

    /* Set profile id. */
    // NOTE: This is typically a (33-byte) public key.
    ownerid = session.profileid
    // console.log('OWNERID', ownerid)

    /* Save (database) session. */
    campaigns = await rainmakerCampaignsDb
        .query('api/byOwner', {
            key: ownerid,
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

    /* Handle error(s). */
    if (error) {
        return error
    }

    /* Validate campaigns. */
    if (!campaigns) {
        return {
            error: 'Campaign NOT found!',
            body,
        }
    }

    /* Return campaigns. */
    return campaigns
})

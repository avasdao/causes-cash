/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const rainmakerCampaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_campaigns`)
const rainmakerProfilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_profiles`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let campaignid
    let campaigns
    let error
    let profiles
    let publickey
    let response
    let session
    let sessionid
    let query

    /* Set (request) query. */
    query = getQuery(event)
    // console.log('QUERY', query)

    /* Set session id. */
    campaignid = query?.cid
    console.log('CAMPAIGN ID', campaignid)

    sessionid = query?.sid
    console.log('SESSION ID', sessionid)

    /* Validate session id. */
    // if (!sessionid) {
    //     return {
    //         error: 'Not found',
    //         query,
    //     }
    // }

    if (sessionid) {
        session = await sessionsDb
            .get(sessionid)
            .catch(err => console.error(err))
        console.log('SESSION', session)

        /* Set public key. */
        publickey = session.profileid

        /* Save (database) session. */
        campaigns = await rainmakerCampaignsDb
            .query('api/byOwner', {
                key: publickey,
                include_docs: true,
            })
            .catch(err => {
                console.error(err)
                error = err
            })
        console.log('CAMPAIGNS:', campaigns)

        if (campaigns) {
            campaigns = campaigns.rows.map(_campaign => {
                let doc

                doc = _campaign.doc

                doc = {
                    id: doc._id,
                    ...doc,
                }

                delete doc._id
                delete doc._rev

                return doc
            })
        }

    }

    if (campaignid) {
        /* Save (database) session. */
        response = await rainmakerProfilesDb
            .query('api/byCampaignid', {
                key: campaignid,
                include_docs: true,
            })
            .catch(err => {
                console.error(err)
                error = err
            })
        // console.log('RESPONSE (profiles):', response)
    } else {
        /* Save (database) session. */
        response = await rainmakerProfilesDb
            .query('api/byUnsent', {
                include_docs: true,
            })
            .catch(err => {
                console.error(err)
                error = err
            })
        // console.log('RESPONSE (profiles):', response)
    }

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

    response = {
        campaigns,
        profiles,
    }

    /* Return session. */
    return response
})

/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const rainmakerCampaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_campaigns`)
const rainmakerProfilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_profiles`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let campaignid
    let campaigns
    let error
    let profiles
    let profileid
    let response
    let session
    let sessionid

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('PROFILES (body):', body)

    /* Set session id. */
    sessionid = body?.sessionid
    // console.log('SESSION ID', sessionid)

    /* Validate session id. */
    if (!sessionid || typeof sessionid === 'undefined') {
        return {
            error: 'Session NOT found!',
            body,
        }
    }

    /* Set campaign id. */
    campaignid = body?.campaignid
    // console.log('CAMPAIGN ID', campaignid)

    /* Validate campaign id. */
    if (!campaignid || typeof campaignid === 'undefined') {
        return {
            error: 'Campaign NOT found!',
            body,
        }
    }

    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    // console.log('SESSION', session)

    /* Set profile id. */
    profileid = session.profileid
    console.log('PROFILE ID', profileid)

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
    // console.log('CAMPAIGNS', campaigns)

    /* Validate campaigns. */
    if (campaigns) {
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

// FIXME; MUST AUTHENTICATE THIS ACCOUNT BEFORE ACCESS CAMPAIGN DATA
console.log('CAMPAIGN ID', campaignid)

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
    console.log('RESPONSE (profiles):', response)

    /* Validate profiles. */
    if (!response) {
        return {
            error: 'Not found',
            body,
        }
    }

    profiles = response.rows.map(_profile => {
        const doc = _profile.doc

        doc.id = doc._id

        delete doc._id
        delete doc._rev

        return doc
    })
    console.log('PROFILES', profiles)

    response = {
        campaigns,
        profiles,
    }

    /* Return session. */
    return response
})

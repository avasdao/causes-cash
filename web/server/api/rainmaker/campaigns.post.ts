/* Import modules. */
import { log } from 'console'
import PouchDB from 'pouchdb'

/* Initialize databases. */
const rainmakerCampaignsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/rainmaker_campaigns`)
const rainmakerReceiversDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/rainmaker_receivers`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let campaign
    let campaignid
    let campaigns
    let error
    let ownerid
    let session
    let sessionid

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('CAMPAIGNS (body):', body)

    campaignid = body?.campaignid
    console.log('CAMPAIGN ID', campaignid)

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

    if (campaignid) {
        campaign = await rainmakerCampaignsDb
            .get(campaignid)
            .catch(err => console.error(err))

        delete campaign._id
        delete campaign._rev

        let profiles
        let receiver
        let receiverid

        let ids = []

        Object.keys(campaign.receivers).map(async _receiverid => {
            // console.log('RECEIVER ID', _receiverid)

            ids.push(_receiverid)

        })
        console.log('THIS DOES NOT WAIT!!!', ids)

        profiles = await rainmakerReceiversDb
            .allDocs({
                keys: ids,
                include_docs: true,
            })
            .catch(err => console.error(err))
        // console.log('PROFILES-1', profiles)

        /* Handle profiles. */
        profiles.rows.forEach(_profile => {
            console.log('PROFILE (matching):', _profile)

            /* Set receiver address. */
            campaign.receivers[_profile.id].address = _profile.doc.address
        })
        // console.log('PROFILES-2', profiles)

        /* Return campaign. */
        return campaign
    }

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
    // console.log('CAMPAIGNS', campaigns)

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

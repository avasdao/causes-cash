/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const rainmakerCampaignsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/rainmaker_campaigns`)
const sessionsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let error
    let ownerid
    let pkg
    let response
    let session
    let sessionid

    /* Set (request) body. */
    body = await readBody(event)
    console.log('CAMPAIGNS (body):', body)

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
    // campaignid = body?.campaignid
    // console.log('CAMPAIGN ID', campaignid)

    /* Validate campaign id. */
    // if (!campaignid || typeof campaignid === 'undefined') {
    //     return {
    //         error: 'Campaign NOT found!',
    //         body,
    //     }
    // }

    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    // console.log('SESSION', session)

    /* Set profile id. */
    ownerid = session.profileid
    console.log('OWNER ID', ownerid)

    pkg = {
        _id: uuidv4(),
        ownerid,
        title: body.title,
        tokenid: body.tokenid,
        receivers: null,
        isComplete: false,
        createdAt: moment().unix(),
    }

    /* Save (database) session. */
    response = await rainmakerCampaignsDb
        .put(pkg)
        .catch(err => {
            console.error(err)
            error = err
        })
    console.log('RESPONSE', response)


    /* Return response. */
    return response
})

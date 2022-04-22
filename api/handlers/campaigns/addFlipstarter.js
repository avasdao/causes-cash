/* Initialize modules. */
const EventSource = require('eventsource')
const PouchDB = require('pouchdb')
const moment = require('moment')
const Slack = require('../slack')
const url = require('url')
const util = require('util')
const uuidv4 = require('uuid/v4')

/* Initialize databases. */
const campaignsDb = new PouchDB('data/campaigns')
const profilesDb = new PouchDB('data/profiles')

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const eventState = {}

/**
 * Parse (Running) Flipstarter Campaign
 */
const parseCampaign = function (_url) {

}

/**
 * Read (Running) Flipstarter Campaign
 */
const readCampaign = async function (_url) {
    /* Initialize socket connection. */
    const bitsocket = new EventSource('https://' + _url + '/events')

    /* Handle socket opening. */
    bitsocket.onopen = () => {
        console.log('We have started listening...')
    }

    /* Handle socket closing. */
    bitsocket.onclose = () => {
        console.log('We have stopped listening.')
    }

    /* Handle socket messages. */
    bitsocket.onmessage = (e) => {
        try {
            /* Parse JSON data. */
            const data = JSON.parse(e.data)
            console.log('DATA', data)

            /* Update output/display. */
            // this.output = JSON.stringify(data, null, 2)
            eventState[data.contribution_id] = {
                userid: data.user_id,
                alias: data.user_alias,
                comment: data.contribution_comment,
                previousTransactionHash: Buffer.from(data.previous_transaction_hash).toString('hex'),
                previousOutputIndex: data.previous_transaction_index,
                sequenceNumber: data.sequence_number,
                unlockScript: Buffer.from(data.unlock_script).toString('hex'),
                satoshis: data.satoshis,
                revocation: {
                    id: data.revocation_id,
                    transaction: data.revocation_transaction,
                    timestamp: data.revocation_timestamp,
                },
                dateAdded: data.contribution_timestamp,
            }
        } catch (err) {
            console.error(err)
        }
    }

    await delay(3000)
    console.log('CLOSING BITSOCKET')
    bitsocket.close()

    // return contributions
    return true
}

/**
 * Add Flipstarter Campaign
 */
const addFlipstarter = async function (req, res) {
    /* Initialize results. */
    let results = null

    /* Initialize owner. */
    let owner = null

    /* Set body. */
    const body = req.body
    console.log('ADD NEW (body)', body)

    /* Validate body. */
    if (!body) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign body.'
        })
    }

    /* Initialize results. */
    results = null

    /* Set campaign title. */
    const campaignid = body.campaignid

    /* Validate url. */
    if (!body.url) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign url.'
        })
    }

    /* Set campaign url. */
    const urlObj = url.parse(body.url)
    console.log('URL', urlObj)

    /* Set hostname. */
    const hostname = urlObj.hostname

    /* Validate hostname. */
    // if (!hostname) {
    //     /* Set status. */
    //     res.status(400)
    //
    //     /* Return error. */
    //     return res.json({
    //         error: 'Invalid hostname.'
    //     })
    // }

    /* Request owner. */
    // results = await campaignsDb.query('api/byHostname', {
    //     key: hostname,
    //     include_docs: true,
    // }).catch(err => console.error('CAMPAIGN ERROR:', err))
    // console.log('RESULT (byHostname)', util.inspect(results, false, null, true))

    // if (results && results.rows.length) {
    //     results = results.rows[0].doc
    // }

    /* Set owner id. */
    // const ownerid = results.rows[0] ? results.rows[0].id : null

    /* Validate owner id. */
    // if (!ownerid) {
    //     /* Set status. */
    //     res.status(400)
    //
    //     /* Return error. */
    //     return res.json({
    //         error: 'Missing campaign owner.'
    //     })
    // }

    /* Set publish flag. */
    const isPublished = false // default to unpublished

    /* Set timestamp. */
    const createdAt = moment().unix()

    /* Validate campaign id. */
    if (campaignid === 'NEW') {
        /* Build package. */
        const pkg = {
            _id: uuidv4(),
            slug,
            title,
            theme,
            category,
            ownerid,
            location,
            isPublished,
            createdAt,
        }

        /* Retrieve results. */
        // results = await campaignsDb.put(pkg)
        //     .catch(err => console.error('CAMPAIGN ERROR:', err))
        // console.log('RESULT', results)
    }

    // await readCampaign(hostname)
    // console.log('EVENT STATE', eventState)

    /* Build response. */
    const response = {
        body,
        dbState: results,
        eventState,
    }

    /* Post response to Slack. */
    Slack(`
*New Flipstarter Campaign*
${hostname}
*bold* not bold
---
    `, response)

    /* Return response. */
    return res.json(response)
}

/* Export module. */
module.exports = addFlipstarter

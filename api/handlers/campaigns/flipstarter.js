/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const util = require('util')

/* Initialize databases. */
const assurancesDb = new PouchDB('data/assurances')
const campaignsDb = new PouchDB('data/campaigns')
const directDb = new PouchDB('data/direct')
const payoutsDb = new PouchDB('data/payouts')

/**
 * Flipstarter
 */
const flipstarter = async function (req, res) {
    // console.log(req)

    /* Initailize results. */
    let results = null

    /* Retrieve campaigns. */
    results = await campaignsDb.query('api/isFlipstarter', {
        include_docs: true,
    }).catch(err => console.error(err))

    if (!results) {
        /* Set status. */
        res.status(404)

        /* Return error. */
        return res.json({
            error: 'No campaigns were found.'
        })
    }

    let details = results.rows.map(row => {
        const detail = {
            id: row.doc._id,
            ...row.doc,
        }

        /* Remove id. */
        delete detail._id

        /* Remove revision id. */
        delete detail._rev

        return detail
    })
    // console.log('DETAILS', details)

    /* Return details. */
    return res.json(details)

    const campaigns = results.rows.map(row => {
        return {
            id: row.doc._id,
            title: row.doc.title,
        }
    })

    /* Retrieve (assurance) campaigns. */
    // results = await assurancesDb.query('api/pledges')
    //     .catch(err => console.error(err))

    // const assurances = results.rows.map(row => {
    //     /* Find matching campaign. */
    //     const match = campaigns.find(campaign => {
    //         return campaign.id === row.id
    //     })
    //
    //     /* Return results. */
    //     return {
    //         id: row.id,
    //         title: match ? match.title : null,
    //         supporters: row.value.count,
    //         satoshis: row.value.satoshis,
    //     }
    // })

    /* Retrieve (payout) campaigns. */
    // results = await payoutsDb.query('api/funders')
    //     .catch(err => console.error(err))

    // const payouts = results.rows.map(row => {
    //     /* Find matching campaign. */
    //     const match = campaigns.find(campaign => {
    //         return campaign.id === row.id
    //     })
    //
    //     /* Return results. */
    //     return {
    //         id: row.id,
    //         title: match ? match.title : null,
    //         satoshis: row.value.satoshis,
    //         usd: row.value.usd,
    //     }
    // })

    res.json(campaigns)
}

module.exports = flipstarter

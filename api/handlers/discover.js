/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const Nito = require('nitojs')
const util = require('util')

/* Initialize databases. */
const eventsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/events`)
const flipstartersDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/flipstarters`)

/* Initialize results limit. */
const RESULTS_LIMIT = 20

/**
 * Discover
 */
const discover = async function (req, res) {
    // console.log(req)

    /* Initailize results. */
    let results = null

    /* Retrieve campaigns. */
    results = await flipstartersDb.query('api/isPublished', {
        limit: RESULTS_LIMIT,
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

    /* Only return published campaigns. */
    details = details.filter(detail => detail.isPublished)
    console.log('\nFOUND (# details):', details.length);

    for (let i = 0; i < details.length; i++) {
        const campaign = details[i]

        /* Initialize last pledge. */
        campaign.lastPledge = 0

        /* Create hash id. */
        const hashid = campaign.hostname + campaign.starts + campaign.expires
        console.log('\nHASHID', hashid)

        /* Initialize campaign hash. */
        const campaignHash = Nito.Crypto
            .hash(hashid, 'sha256')
            .toString('hex')
        console.log(campaign.title, campaignHash)

        /* Request owner. */
        // results = await eventsDb.query('api/byHash', {
        results = await eventsDb.query('api/isNotRevokedByHash', {
            key: campaignHash,
            include_docs: true,
        }).catch(err => console.error('EVENTS ERROR:', err))
        // console.log('RESULT (byHash)', util.inspect(results, false, null, true))
        console.log('RESULTS', results.rows.length);

        if (results && results.rows.length) {
            /* Initialize pledges. */
            const pledges = {}

            for (let j = 0; j < results.rows.length; j++) {
                const doc = results.rows[j].doc

                if (doc && doc.type === 'new_contribution') {
                    /* Build pledge. */
                    const pledge = {
                        previousTransactionHash: doc.txHash,
                        previousOutputIndex: doc.txIndex,
                        sequenceNumber: 4294967295,
                        unlockScript: doc.unlockScript,
                        satoshis: doc.satoshis,
                        alias: doc.alias,
                        comment: doc.comment,
                        isRevoked: doc.isRevoked,
                        timestamp: doc.timestamp,
                        createdAt: doc.createdAt,
                    }

                    /* Add pledge. */
                    pledges[`${doc.txHash}:${doc.txIndex}`] = pledge

                    /* Handle last pledge. */
                    if (doc.timestamp > campaign.lastPledge) {
                        /* Set last pledge. */
                        campaign.lastPledge = doc.timestamp
                    }
                }

            }

            campaign.pledges = pledges
        }

    }

    /* Return details. */
    res.json(details)
}

module.exports = discover

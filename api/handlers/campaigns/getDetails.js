/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const Nito = require('nitojs')
const util = require('util')
const uuidv4 = require('uuid/v4')

/* Initialize databases. */
const assurancesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/assurances`)
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/campaigns`)
const directDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/direct`)
const eventsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/events`)
const payoutsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/payouts`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Get (Campaign) Details
 */
const getDetails = async function (req, res) {
    /* Initialize results. */
    let results = null

    /* Initialize owner. */
    let owner = null

    /* Set owner id. */
    // ownerid = req.params.ownerid
    // console.log('OWNER ID', ownerid)

    /* Set owner slug. */
    let ownerSlug = req.params.ownerSlug
    console.log('OWNER SLUG', ownerSlug)

    /* Validate campaign id. */
    // NOTE: In UUID v4 format.
    if (ownerSlug && ownerSlug.length === 36) {
        /* Retrieve results. */
        // results = await campaignsDb.allDocs({ include_docs: true })
        //     .catch(err => console.error('CAMPAIGN ERROR:', err))
        const campaign = await campaignsDb.get(ownerSlug, {
            include_docs: true,
        }).catch(err => console.error('PROFILE ERROR:', err))
        console.log('CAMPAIGN', campaign)
        // console.log('FIRST DOC', campaign.rows[0].doc)

        if (campaign) {
            campaign.id = campaign._id

            /* Remove id. */
            delete campaign._id

            /* Remove revision id. */
            delete campaign._rev
        }

        /* Initialize campaign hash. */
        const campaignHash = Nito.Crypto.hash(campaign.hostname + campaign.starts + campaign.expires, 'sha256').toString('hex')
        console.log('Campaign', campaign.title, campaignHash)

        /* Request owner. */
        results = await eventsDb.query('api/byHash', {
            key: campaignHash,
            include_docs: true,
        }).catch(err => console.error('EVENTS ERROR:', err))
        // console.log('RESULT (byHash)', util.inspect(results, false, null, true))

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
                }

            }

            campaign.pledges = pledges

        }

        return res.json(campaign)

    }

    /* Validate owner slug. */
    if (ownerSlug && ownerSlug.indexOf('bitcoincash:') !== -1) {
        /* Remove prefix. */
        ownerSlug = ownerSlug.slice(12)
    }

    /* Set campaign slug. */
    const campaignSlug = req.params.campaignSlug
    console.log('CAMPAIGN SLUG', campaignSlug)

    /* Request owner. */
    results = await profilesDb.query('api/bySlug', {
        key: ownerSlug,
        include_docs: true,
    }).catch(err => console.error('PROFILE ERROR:', err))
    console.log('RESULT (bySlug)', util.inspect(results, false, null, true))

    /* Validate profile id. */
    if (!results || results.rows.length === 0) {
        /* Request owner. */
        results = await profilesDb.query('api/byAddress', {
            key: ownerSlug,
            include_docs: true,
        }).catch(err => console.error('PROFILE ERROR:', err))
        console.log('RESULT (byAddress)', util.inspect(results, false, null, true))
    }


    /* Validate results. */
    // if (!results || results.rows.length === 0) {
    //     /* Request owner. */
    //     results = await profilesDb.get(ownerSlug)
    //         .catch(err => console.error('PROFILE ERROR:', err))
    //     console.log('RESULT (byOwnerid)', util.inspect(results, false, null, true))
    // }

    /* Validate results. */
    if (!results || (results.rows && results.rows.length === 0)) {
        /* Set status. */
        res.status(404)

        /* Return error. */
        return res.json({
            error: 'Campaign was not found.'
        })
    }

    /* Set owner. */
    // TODO: Allow "smart" selection from duplicate slug ids for individual owners.
    owner = results.rows[0].doc

    /* Add owner id. */
    owner = {
        id: owner._id,
        ...owner
    }

    /* Remove id. */
    delete owner._id

    /* Remove revision id. */
    delete owner._rev

    console.log('OWNER', owner)

    /* Retrieve results. */
    // results = await campaignsDb.allDocs({ include_docs: true })
    //     .catch(err => console.error('CAMPAIGN ERROR:', err))
    results = await campaignsDb.query('api/byOwnerid', {
        key: owner.id,
        include_docs: true,
    }).catch(err => console.error('PROFILE ERROR:', err))
    // console.log('RESULTS', results)
    // console.log('FIRST DOC', results.rows[0].doc)

    let allCampaigns = null

    if (results.rows && results.rows.length > 0) {
        /* Map the results. */
        allCampaigns = results.rows.map(data => {
            /* Set document. */
            const doc = data.doc

            /* Set (campaign) id. */
            const id = doc._id

            /* Remove id. */
            delete doc._id
            delete doc.id

            /* Remove revision id. */
            delete doc._rev

            /* Return document. */
            return {
                id,
                ...doc,
                owner
            }
        })
    }

    if (ownerSlug && campaignSlug) {
        /* Set campaigns. */
        const campaigns = allCampaigns.filter(campaign => {
            if (campaign.owner) {
                // DEPRECATED
                return campaign.slug === campaignSlug && ownerSlug === campaign.owner.slug
            } else if (campaign.ownerid) {
                return campaign.slug === campaignSlug && owner.id === campaign.ownerid
            }
        })

        /* Validate campaigns results. */
        if (campaigns && campaigns[0]) {
            console.log('CAMPAIGN', campaigns[0])

            /* Add owner. */
            campaigns[0].owner = owner

            // TODO: Build `owner` object from `profiles` query.

            /* Set id. */
            const id = campaigns[0].id

            /* Retrieve results. */
            const assurances = await assurancesDb.get(id)
                .catch(err => console.error('CAMPAIGN ERROR:', err))
            console.log('ASSURANCES', assurances)

            /* Validate assurance. */
            if (assurances) {
                campaigns[0].assurances = []

                /* Add assurance to campaign. */
                campaigns[0].assurances[0] = assurances

                /* Remove metadata. */
                delete campaigns[0].assurances[0]['_id']
                delete campaigns[0].assurances[0]['_rev']
            }

            /* Retrieve results. */
            const direct = await directDb.get(id)
                .catch(err => console.error('CAMPAIGN ERROR:', err))
            // console.log('DIRECT', direct)

            /* Validate direct. */
            if (direct) {
                /* Add direct to campaign. */
                campaigns[0].direct = direct

                /* Remove metadata. */
                delete campaigns[0].direct['_id']
                delete campaigns[0].direct['_rev']
            }

            /* Retrieve results. */
            const payouts = await payoutsDb.get(id)
                .catch(err => console.error('CAMPAIGN ERROR:', err))
            // console.log('PAYOUTS', payouts)

            /* Validate payouts. */
            if (payouts) {
                /* Add payouts to campaign. */
                campaigns[0].payouts = payouts

                /* Remove metadata. */
                delete campaigns[0].payouts['_id']
                delete campaigns[0].payouts['_rev']
            }

            /* Return campaign. */
            return res.json(campaigns[0])
        } else {
            /* Set status. */
            res.status(404)

            /* Return error. */
            return res.json({
                error: 'Campaign was not found.'
            })
        }
    } else if (allCampaigns) {
        /* Return all campaigns. */
        return res.json(allCampaigns)
    } else if (ownerSlug) {
        /* Request owner. */
        results = await campaignsDb.query('api/byTeam', {
            key: ownerSlug,
            include_docs: true,
        }).catch(err => console.error('CAMPAIGNS ERROR:', err))
        console.log('RESULT (byTEAM)-1', util.inspect(results, false, null, true))

        /* Validate results. */
        if (!results || (results.rows && results.rows.length === 0)) {
            /* Request owner. */
            results = await campaignsDb.query('api/byTeam', {
                key: owner.id,
                include_docs: true,
            }).catch(err => console.error('CAMPAIGNS ERROR:', err))
            console.log('RESULT (byTEAM)-2', util.inspect(results, false, null, true))
        }

        /* Validate results. */
        if (!results || (results.rows && results.rows.length === 0)) {
            /* Set status. */
            res.status(404)

            /* Return error. */
            return res.json({
                error: 'No campaigns were found.'
            })
        }

        const ownerCampaigns = results.rows.map(row => {
            return row.doc
        })

        for (let i = 0; i < ownerCampaigns.length; i++) {
            let owner = await profilesDb.get(ownerCampaigns[i].ownerid)
                .catch(err => console.error('CAMPAIGN ERROR:', err))
            console.log('OWNER', owner)

            /* Validate owner. */
            if (owner) {
                /* Set owner. */
                // TODO: Allow "smart" selection from duplicate slug ids for individual owners.

                /* Add owner id. */
                owner = {
                    id: owner._id,
                    ...owner
                }

                /* Remove id. */
                delete owner._id

                /* Remove revision id. */
                delete owner._rev

                // console.log('OWNER', owner)

                ownerCampaigns[i].owner = owner
            }
        }

        /* Return (owner) campaigns. */
        return res.json(ownerCampaigns)
    } else {
        console.log('ALL PROJECTS', allCampaigns)

        /* Return all campaigns. */
        return res.json(allCampaigns)
    }
}

/* Export module. */
module.exports = getDetails

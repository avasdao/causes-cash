/* Initialize modules. */
const PouchDB = require('pouchdb')

/* Initialize databases. */
const assurancesDb = new PouchDB('data/assurances')

/**
 * Get (Assurance) Details
 */
const getDetails = async function (req, res) {
    /* Set campaign id. */
    const campaignid = req.params.campaignid
    // console.log('CAMPAIGN ID', campaignid)

    /* Request assurance. */
    const assurance = await assurancesDb.get(campaignid)
        .catch(err => console.error('ASSURANCE ERROR:', err))
    // console.log('ASSURANCE', assurance)

    /* Validate assurance. */
    if (!assurance) {
        /* Set status. */
        res.status(404)

        /* Return error. */
        return res.json({
            error: 'Assurance campaign not found.'
        })
    }

    if (req.query && typeof req.query.status !== 'undefined') {
        /* Return results. */
        return res.json({
            title: assurance.title,
            txid: assurance.txid,
            startsAt: assurance.startsAt,
            expiresAt: assurance.expiresAt,
            createdAt: assurance.createdAt,
            updatedAt: assurance.updatedAt,
            completedAt: assurance.completedAt,
        })
    } else {
        /* Remove db internals. */
        delete assurance._id
        delete assurance._rev

        /* Return results. */
        return res.json(assurance)
    }
}

/* Export module. */
module.exports = getDetails

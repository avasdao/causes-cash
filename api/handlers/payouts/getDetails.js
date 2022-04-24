/* Initialize modules. */
const PouchDB = require('pouchdb')

/* Initialize databases. */
const payoutsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/payouts`)

/**
 * Get (Assurance) Details
 */
const getDetails = async function (req, res) {
    /* Set campaign id. */
    const campaignid = req.params.campaignid
    // console.log('CAMPAIGN ID', campaignid)

    /* Request payouts. */
    const payouts = await payoutsDb.get(campaignid)
        .catch(err => console.error('ASSURANCE ERROR:', err))
    // console.log('ASSURANCE', payouts)

    /* Validate payouts. */
    if (!payouts) {
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
            title: payouts.title,
            txid: payouts.txid,
            startsAt: payouts.startsAt,
            expiresAt: payouts.expiresAt,
            createdAt: payouts.createdAt,
            updatedAt: payouts.updatedAt,
            completedAt: payouts.completedAt,
        })
    } else {
        /* Remove db internals. */
        delete payouts._id
        delete payouts._rev

        /* Return results. */
        return res.json(payouts)
    }
}

/* Export module. */
module.exports = getDetails

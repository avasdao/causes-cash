/* Initialize modules. */
const PouchDB = require('pouchdb')
const util = require('util')

/* Initialize databases. */
const assurancesDb = new PouchDB('data/assurances')

/**
 * Get (Assurance) List
 */
const getList = async function (req, res) {
    const results = await assurancesDb.query('api/isActive', {
        include_docs: true,
    }).catch(err => console.error('ASSURANCED ERROR:', err))
    console.log('RESULTS', util.inspect(results, false, null, true))

    /* Validate assurance. */
    if (!results || !results.rows || results.rows.length === 0) {
        /* Set status. */
        res.status(404)

        /* Return error. */
        return res.json({
            error: 'Assurance campaigns not found.'
        })
    }

    const filtered = results.rows.map(row => {
        return {
            title: row.doc.title,
            type: row.doc.type,
            location: row.doc.location,
        }
    })

    return res.json(filtered)

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
    // if (req.query && typeof req.query.status !== 'undefined') {
    //     /* Return results. */
    //     return res.json({
    //         title: assurance.title,
    //         txid: assurance.txid,
    //         startsAt: assurance.startsAt,
    //         expiresAt: assurance.expiresAt,
    //         createdAt: assurance.createdAt,
    //         updatedAt: assurance.updatedAt,
    //         completedAt: assurance.completedAt,
    //     })
    // } else {
    //     /* Remove db internals. */
    //     delete assurance._id
    //     delete assurance._rev
    //
    //     /* Return results. */
    //     return res.json(assurance)
    // }
}

/* Export module. */
module.exports = getList

/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/campaigns`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Add New Campaign
 */
const addNew = async function (req, res) {
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
    const campaignId = body.campaignId

    /* Validate slug. */
    if (!body.slug) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign slug.'
        })
    }

    /* Set campaign slug. */
    const slug = body.slug

    /* Validate title. */
    if (!body.title) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign title.'
        })
    }

    /* Set campaign title. */
    const title = body.title

    /* Validate theme. */
    if (!body.theme) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign theme.'
        })
    }

    /* Set campaign theme. */
    const theme = body.theme

    /* Validate category. */
    if (!body.category) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign category.'
        })
    }

    /* Set campaign category. */
    const category = body.category

    /* Validate owner. */
    if (!body.owner) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign owner.'
        })
    }

    /* Request owner. */
    results = await profilesDb.query('api/bySlug', {
        key: body.owner,
        include_docs: true,
    }).catch(err => console.error('PROFILE ERROR:', err))
    console.log('RESULT (bySlug)', util.inspect(results, false, null, true))

    /* Set owner id. */
    const ownerid = results.rows[0] ? results.rows[0].id : null

    /* Validate owner id. */
    if (!ownerid) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign owner.'
        })
    }

    /* Validate location. */
    if (!body.location) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing campaign location.'
        })
    }

    /* Set campaign location. */
    const location = body.location

    /* Set publish flag. */
    const isPublished = false // default to unpublished

    /* Set timestamp. */
    const createdAt = moment().unix()

    /* Validate campaign id. */
    if (campaignId === 'NEW') {
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
        results = await campaignsDb.put(pkg)
            .catch(err => console.error('CAMPAIGN ERROR:', err))
        console.log('RESULT', results)
    }

    /* Build response. */
    const response = {
        body,
        results,
    }

    /* Return response. */
    return res.json(response)
}

/* Export module. */
module.exports = addNew

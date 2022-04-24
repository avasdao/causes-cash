/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const Nito = require('nitojs')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/campaigns`)
const historyDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/api_history`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)

/**
 * Update Campaign
 */
const update = async function (req, res) {
    /* Initialize results. */
    let results = null

    /* Initialize owner. */
    let owner = null

    /* Set body. */
    const body = req.body
    console.log('BODY', body)

    /* Build history package. */
    const history = {
        _id: moment().valueOf().toString(),
        ...body,
    }

    /* Retrieve results. */
    results = await historyDb.put(history)
        .catch(err => console.error('HISTORY ERROR:', err))
    console.log('HISTORY RESULTS', results)

    /* Validate body. */
    if (!body.message || !body.address || !body.signature) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Missing message authentication.'
        })
    }

    /* Perform message authentication. */
    const verify = Nito.Message
        .verify(`${body.message}:${body.nonce}`, body.address, body.signature)
    console.log('MESSAGE VERIFICATION', verify)

    /* Validate message. */
    if (!verify) {
        /* Set status. */
        res.status(401)

        /* Return error. */
        return res.json({
            error: 'Message authentatication failed.'
        })
    }

    /* Set (body) message. */
    const message = JSON.parse(body.message)

    /* Initialize address. */
    let address = null

    /* Set address. */
    if (body.address.indexOf('bitcoincash:') !== -1) {
        address = body.address.slice(12)
    } else {
        address = body.address
    }

    /* Request profile. */
    results = await profilesDb.query('api/byAddress', {
        key: address,
        include_docs: true,
    }).catch(err => console.error('PROFILE ERROR:', err))
    // console.log('RESULT (byAddress)', util.inspect(results, false, null, true))

    /* Set document. */
    const doc = results.rows[0].doc
    console.log('DOCUMENT', doc)

    /* Set owner id. */
    const ownerid = doc._id

    /* Set campaign title. */
    const campaignId = message.campaignId
    console.log('CAMPAIGN ID', campaignId)

    if (campaignId !== '') {
        /* Retrieve results. */
        results = await campaignsDb.get(campaignId)
            .catch(err => console.error('CAMPAIGN ERROR:', err))
        console.log('RESULT', results)

        /* Set database value. */
        const dbValue = results

        /* Build package. */
        const pkg = {
            /* Database properties. */
            _id: dbValue._id,
            _rev: dbValue._rev,

            /* Core properties (FIXED). */
            slug: dbValue.slug,
            title: dbValue.title,
            theme: dbValue.theme,
            category: dbValue.category,
            ownerid: dbValue.ownerid,
            location: dbValue.location,
        }

        /* Validate owner. */
        // DEPRECATED on 2020.7.24
        if (!dbValue.ownerid && (message.owner || dbValue.owner)) {
            pkg.owner = message.owner || dbValue.owner
        }

        /* Validate summary. */
        if (message.summary || dbValue.summary) {
            pkg.summary = message.summary || dbValue.summary
        }

        /* Validate description. */
        if (message.description || dbValue.description) {
            pkg.description = message.description || dbValue.description
        }

        /* Validate guide. */
        if (message.guide || dbValue.guide) {
            pkg.guide = message.guide || dbValue.guide
        }

        /* Validate tags. */
        if (message.tags || dbValue.tags) {
            pkg.tags = message.tags || dbValue.tags
        }

        /* Validate media. */
        if (message.media || dbValue.media) {
            pkg.media = message.media || dbValue.media
        }

        /* Validate news. */
        if (message.news || dbValue.news) {
            pkg.news = message.news || dbValue.news
        }

        /* Validate team. */
        if (message.team || dbValue.team) {
            pkg.team = message.team || dbValue.team
        }

        /* Validate publish flag. */
        if (message.isPublished || dbValue.isPublished) {
            pkg.isPublished = message.isPublished || dbValue.isPublished
        }

        /* Add timestamp properties. */
        pkg.createdAt = dbValue.createdAt
        pkg.updatedAt = moment().unix()
        // console.log('PKG', pkg)

        /* Initialize is valid flag. */
        let isValid = false

        /* Validate ownerid. */
        if (ownerid === pkg.ownerid) {
            /* Set flag. */
            isValid = true
        }

        /* Validate team. */
        if (pkg.team) {
            // console.log('PKG TEAM:', pkg.team)

            pkg.team.forEach(member => {
                if (ownerid === member.profileid && member.role === 'ADMIN') {
                    /* Set flag. */
                    isValid = true
                }
            })
        }

        /* Validate authentication. */
        if (!isValid) {
            /* Set status. */
            res.status(401)

            /* Return error. */
            return res.json({
                error: 'Owner authentatication failed.'
            })
        } else {
            console.log('OWNER AUTHENTATION SUCCESSFUL!', ownerid)
        }

        /* Retrieve results. */
        results = await campaignsDb.put(pkg)
            .catch(err => console.error('CAMPAIGN ERROR:', err))
        console.log('RESULTS', results)

    }

    /* Build response. */
    const response = {
        body,
        results,
    }

    /* Return response. */
    res.json(response)
}

/* Export module. */
module.exports = update

/* Initialize modules. */
const Nito = require('nitojs')
const PouchDB = require('pouchdb')

/* Initialize database. */
const authDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles_auth`)

/**
 * Message Authorization
 */
const _messageAuth = async (req, res) => {
    /* Set body. */
    const body = req.body
    console.log('PROFILES (body):', body)

    /* Validate body. */
    if (!body) {
        /* Set status code. */
        res.status(400)

        res.json({
            error: 'A BODY is required with this request.'
        })

        return false
    }

    /* Initialize address. */
    let address = null

    /* Validate request. */
    // NOTE: Guard against replay attacks.
    if (body.address && body.nonce) {
        /* Normalize address. */
        if (body.address.indexOf('bitcoincash:') !== -1) {
            address = body.address.slice(12)
        } else {
            address = body.address
        }

        /* Set auth id */
        const authId = `${body.address}:${body.nonce}`
        console.log('AUTH ID', authId)

        /* Set auth hash. */
        const authHash = Nito.Crypto.hash(authId, 'sha256', true)
        console.log('AUTH HASH', authHash)

        /* Request auth id. */
        result = await authDb.get(authHash)
            .catch(err => console.error('GET AUTH ERROR:', err))
        console.log('RESULT (auth)', result)

        if (!result || result.status === 404) {
            /* Build package. */
            const pkg = {
                _id: authHash
            }

            /* Add new auth id. */
            result = await authDb.put(pkg)
                .catch(err => console.error('PUT AUTH ERROR:', err))
            console.log('RESULT (auth)', result)
        } else {
            /* Set status code. */
            res.status(400)

            res.json({
                error: 'Authorization failed! You MUST use a unique nonce for each request.',
            })

            return false
        }
    }

    /* Validate message. */
    if (!body.message) {
        /* Set status code. */
        res.status(400)

        res.json({
            error: 'Authorization failed! You are missing a `message`.',
        })

        return false
    }

    /* Validate signature. */
    if (!body.signature) {
        /* Set status code. */
        res.status(400)

        res.json({
            error: 'Authorization failed! You are missing a `signature`.',
        })

        return false
    }

    /* Request (message) authentication. */
    // NOTE: Message authentication (equivalent to HMAC).
    const verified = Nito.Message
        .verify(`${body.message}:${body.nonce}`, body.address, body.signature)

    /* Validate authentication. */
    if (!verified) {
        /* Set status code. */
        res.status(400)

        res.json({
            error: 'Authorization failed! Your message signature is INVALID.',
        })

        return false
    }

    /* Initialize message. */
    let message = null

    try {
        /* Parse message. */
        message = JSON.parse(body.message)
        // console.log('MESSAGE AUTH (message):', message)
    } catch (err) {
        console.error(err)
    }

    /* Return parsed message. */
    return message
}

/* Export module. */
module.exports = _messageAuth

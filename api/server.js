'use strict'

/* Require modules. */
const express = require('express')

/* Set constants. */
// const HOST = '0.0.0.0'
const HOST = '127.0.0.1'
const PORT = 3000

/**
 * Initialize database
 */
const initDb = function () {
    const fs = require('fs')
    const dir = './data'

    if (!fs.existsSync(dir)) {
        console.log('Creating new data directory..')

        fs.mkdirSync(dir)
    }
}
initDb()

/* Initialize application. */
const app = express()

/* Initialize JSON parser. */
app.use(express.json())

/* Initialize URL parser. */
app.use(express.urlencoded({ extended: true }))

/* Configure application. */
app.use(function (req, res, next) {
    /* Initialize headers. */
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'content-type') // superagent "case-sensitive" bug??
    res.header('Access-Control-Allow-Methods', 'PUT');

    /* Move to next process. */
    next()
})

// TODO: Replace with a "static" site.
app.get('/', (req, res) => {
    res.end('<h1>Welcome to the Causes Cash API</h1>')
})

/*******************************************************************************
 * (CashID) AUTH Endpoint
 */
app.post('/v1/cashid', require('./handlers/auth'))

/*******************************************************************************
 * ASSURANCE Endpoints
 */
app.get('/v1/assurances/active', require('./handlers/assurances/getList'))
app.get('/v1/assurances/:campaignid', require('./handlers/assurances'))
app.get('/v1/assurances/:campaignid/status', require('./handlers/assurances'))
app.post('/v1/assurances', require('./handlers/assurances'))
app.post('/v1/assurances/flipstarter', require('./handlers/assurances/flipstarter'))

/*******************************************************************************
 * CAMPAIGNS Endpoints
 */
app.get('/v1/campaigns', require('./handlers/campaigns')) // TODO: Add `limit` and `offset`.
app.get('/v1/campaigns/dashboard', require('./handlers/campaigns/dashboard')) // TODO: Add `limit` and `offset`.
app.get('/v1/campaigns/flipstarter', require('./handlers/campaigns/flipstarter')) // TODO: Add `limit` and `offset`.
app.get('/v1/campaigns/summary', require('./handlers/campaigns/summary'))
app.get('/v1/campaigns/:ownerSlug', require('./handlers/campaigns'))
app.get('/v1/campaigns/:ownerSlug/:campaignSlug', require('./handlers/campaigns'))
app.post('/v1/campaigns', require('./handlers/campaigns'))
app.post('/v1/campaigns/flipstarter', require('./handlers/campaigns/addFlipstarter'))
app.put('/v1/campaigns', require('./handlers/campaigns'))

/*******************************************************************************
 * DISCOVER Endpoints
 */
app.get('/v1/discover', require('./handlers/discover'))
app.get('/v1/discover/:category', require('./handlers/discover'))
app.get('/v1/discover/:category/:timestamp', require('./handlers/discover'))

/*******************************************************************************
 * EVENTS Endpoints
 */
app.get('/v1/events', require('./handlers/events'))
app.get('/v1/events/:timestamp', require('./handlers/events'))
app.get('/v1/events/:profile/:timestamp', require('./handlers/events'))

/*******************************************************************************
 * ORACLE Endpoints
 */
app.get('/v1/oracle', require('./handlers/oracle'))
app.get('/v1/oracle/:action', require('./handlers/oracle'))
app.get('/v1/oracle/:action/:pledgeAmount', require('./handlers/oracle'))

/*******************************************************************************
 * PAYOUTS Endpoints
 */
app.get('/v1/payouts/:campaignid', require('./handlers/payouts'))
app.get('/v1/payouts/:campaignid/status', require('./handlers/payouts'))
app.post('/v1/payouts', require('./handlers/payouts'))

/*******************************************************************************
 * PROFILES Endpoints
 */
app.get('/v1/profiles/:profileid', require('./handlers/profiles'))
app.post('/v1/profiles', require('./handlers/profiles'))
app.put('/v1/profiles', require('./handlers/profiles'))

/* Start listening for connections. */
app.listen(PORT, HOST)

/* Display current environment variables. */
console.info()
console.log(`Running on http://${HOST}:${PORT}`)
console.info()
console.info('Current Environment Variables')
console.info('-----------------------------')
console.info('  - NODE_ENV        :', process.env.NODE_ENV)
console.info('  - MNEMONIC        :', process.env.MNEMONIC)
console.info('  - API_ENDPOINT    :', process.env.API_ENDPOINT)
console.info('  - SLACK_BOT_TOKEN :', process.env.SLACK_BOT_TOKEN)
console.info()

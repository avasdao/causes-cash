const BITBOX = require('bitbox-sdk').BITBOX
const CashID = require('cashid')
const PouchDB = require('pouchdb')
const uuidv4 = require('uuid/v4')
const moment = require('moment')
// const superagent = require('superagent')

/* Initialize slack. */
const slack = require('./slack')

/* Initialize BITBOX. */
const bitbox = new BITBOX()

/* Initialize CashID. */
// const cashid = new CashID()
const cashid = new CashID('api.causes.cash', '/v1/cashid')

/* Add Mango queries to PouchDB. */
PouchDB.plugin(require('pouchdb-find'))

/* Initialize databases. */
const dbProfiles = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles`)
const dbDetails = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/profiles_details`)
const dbSessions = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/sessions`)

/**
 * Add New Profile
 */
const addNewProfile = async function (_address, _cashAccounts) {
    /* Initialize address. */
    let address = null

    /* Normalize address. */
    if (_address.includes('bitcoincash:')) {
        address = _address.slice(12)
    } else {
        address = _address
    }

    /* Set (mango) query. */
    const query = {
        selector: {
            'account.type': 'bch',
            'account.address': address,
        },
        // sort: [{'index':'asc'}]
    }

    /* Request data. */
    const result = await dbProfiles.find(query)
    console.log('ACCOUNT SEARCH', _address, _cashAccounts, result)

    /* Validate results. */
    if (!result || !result.docs || !result.docs.length > 0) {
        /* Initialize response. */
        let response = null

        /* Set profile id. */
        const profileid = uuidv4()

        /* Set detail id. */
        const detailid = uuidv4()

        /* Set account. */
        const account = {
            type: 'bch',
            address,
        }

        /* Set addresses. */
        const addresses = {
            bch: address
        }

        /* Initialize cash accounts. */
        let cashAccounts = null

        /* Validate cash accounts. */
        if (_cashAccounts.length > 0) {
            cashAccounts = _cashAccounts
        }

        /* Build new profile. */
        const profile = {
            _id: profileid,
            detailid,
            account,
            createdAt: moment().valueOf()
        }
        console.log('NEW PROFILE', profile)
        response = await dbProfiles.put(profile)
            .catch(err => console.error('NEW PROFILE ERROR:', err))
        console.log('ADD PROFILE RESPONSE', response)

        /* Build new profile details. */
        const details = {
            _id: detailid,
            addresses,
            cashAccounts,
            createdAt: moment().valueOf()
        }
        console.log('NEW PROFILE DETAILS', details)
        response = await dbDetails.put(details)
            .catch(err => console.error('NEW PROFILE DETAILS ERROR:', err))
        console.log('ADD PROFILE DETAIL RESPONSE', response)

        /* Send slack notification. */
        slack({
            profile,
            details,
        })
    } else {
        /* Send slack notification. */
        slack({
            _address,
            _cashAccounts,
        })
    }
}

/**
 * Projects
 */
const projects = async function (req, res) {
    // console.log('REQUEST', req)

    /* Set id. */
    // const baseCurrency = req.params.baseCurrency
    // const quoteCurrency = req.params.quoteCurrency
    // const symbol = req.query.symbol
    // console.log('BASE CURRENCY', baseCurrency)
    // console.log('QUOTE CURRENCY', quoteCurrency)

    /* Set headers. */
    // const headers = req.headers
    // console.log('HEADERS', headers)

    /* Set body. */
    const body = req.body
    // console.log('\nBODY', body)

    /* Validate request body. */
    const validation = cashid.validateRequest(body)
    // console.log('\nVALIDATION', validation)

    /* Parse request. */
    // const parsed = cashid.parseCashIDRequest(body.request)
    // console.log('\nPARSED', parsed)

    // TODO: We MUST validate the timestamp to within 30 seconds
    //       either before or after our server time (check clock)

    if (validation && validation.address) {
        // console.log('VALIDATION SUCCESS', validation.address, body.address)

        /* Set session id. */
        const sessionId = uuidv4()
        // console.log('SESSION ID', sessionId)

        /* Set address. */
        const address = validation.address
        // console.log('ADDRESS', address)

        /* Set signature. */
        const signature = validation.signature
        // console.log('SIGNATURE', signature)

        /* Set data. */
        const data = validation.data
        // console.log('DATA', data)

        /* Validate address. */
        if (address !== body.address) {
            return res.json({
                error: 'Address DOES NOT match.',
                statuscode: 131
            })
        }

        /* Validate signature. */
        if (signature !== body.signature) {
            return res.json({
                error: 'Signature DOES NOT match.',
                statuscode: 131
            })
        }

        /* Validate data. */
        if (data !== body.data) {
            return res.json({
                error: 'Data DOES NOT match.',
                statuscode: 131
            })
        }

        /* Set CashID buffer. */
        const cidBuf = Buffer.from(body.request)
        // console.log('CASHID REQUEST BUFFER', cidBuf)

        /* Set CashID (authorization) hash. */
        const authHash = bitbox.Crypto.sha256(cidBuf).toString('hex')
        // console.log('CASHID AUTH HASH', authHash)

        /* Initialize cash account(s). */
        let cashAccounts = []

        const reverseLookup = await bitbox.CashAccounts
            .reverseLookup(address)
            .catch(err => console.error('REVERSE LOOKUP ERROR:', err))
        console.log('REVERSE LOOKUP', reverseLookup)

        /* Validate lookup. */
        if (reverseLookup && reverseLookup.results) {
            reverseLookup.results.forEach(account => {
                /* Add cash account info. */
                cashAccounts.push({
                    accountEmoji: account.accountEmoji,
                    nameText: account.nameText,
                    accountNumber: account.accountNumber,
                })
            })

        }

        /* Add new profile. */
        addNewProfile(address, cashAccounts)

        /* Initialize response. */
        let response = null

        /* Set active flag. */
        const isActive = true

        /* Set creation date. */
        const createdAt = moment().valueOf()

        /* Set last update. */
        const updatedAt = moment().valueOf()

        try {
            response = await dbSessions.put({
                _id: sessionId,
                authHash,
                validation,
                cashAccounts,
                isActive,
                createdAt,
                updatedAt
            })
            console.log('DB RESPONSE', response)
        } catch (err) {
            console.log('DB ERROR:', err)
        }

        // FIXME: Perform more validation
        return res.json({
            statuscode: 0
            // 'status': 0
        })
    } else {
        console.log('VALIDATION FAILED!')

        // FIXME: Parse the actual status code
        // `Request domain  api.causes.cash is invalid, this service uses auth.cashid.org, statuscode:131`

        /* Set status code. */
        // res.status(131)

        return res.json({
            statuscode: 131
            // 'status': 1
            // 'status': 131
        })
    }
}

module.exports = projects

#!/usr/bin/env node

/* Import core modules. */
const debug = require('debug')('causes:flipstarterd')
const EventSource = require('eventsource')
const numeral = require('numeral')
const moment = require('moment')
const Nito = require('nitojs')
const PouchDB = require('pouchdb')
const puppeteer = require('puppeteer')
const util = require('util')
const { v4: uuidv4 } = require('uuid')

/* Initialize databases. */
const campaignsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/campaigns`)
const eventsDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/events`)
const queueDb = new PouchDB(`http://${process.env.COUCHDB_AUTH}@localhost:5984/queue`)

/* Initialize (static) sequence number. */
const SEQUENCE_NUMBER = 4294967295

/* Set page loading delay. */
const LOAD_DELAY = 3000
const CLOSE_DELAY = 2000

/* Initialize outpoints queue. */
const outpoints = []

console.log('\nStarting Flipstarter Manager...')

// TODO: Will monitor registered wallet addresses

/**
 * Broadcast
 *
 * Send the campaign details to the campaign's Flipstarter host.
 */
const broadcast = async function (_pkg, _doc) {
    // return
    const browser = await puppeteer.launch({
        // headless: false,
        args: ['--no-sandbox'],
    })
    const page = await browser.newPage()
    page.setViewport({
        width: 1024,
        height: 640,
    })

    page.on('domcontentloaded', async () => {
        console.log('DOM LOADED')
    })

    // FIXME: We MUST have a timeout set here!!
    await page.goto(`https://${_pkg.hostname}`, {
        waitUntil: 'networkidle2'
    })

    // console.log('NETWORK IS IDLE NOW');

    await page.waitForSelector('#recipientList')
        .catch(err => console.error('DID NOT SEE RECIPIENT LIST'))
    // console.log('I SEE THE RECIPIENT LIST');

    await page.waitForSelector('#recipientList > li')
        .catch(err => console.error('DID NOT SEE RECIPIENT LIST CONTENT'))
    // console.log('I SEE THE RECIPIENT LIST CONTENT');

    /* Wait a few seconds for DOM to load. */
    await page.waitForTimeout(LOAD_DELAY)
    await page.waitForTimeout(LOAD_DELAY)

    await page.evaluate(_params => {
        const alias = _params.alias
        const comment = _params.comment
        const satoshis = _params.satoshis

        // const ds = document.getElementById('donateSection')
        const ds = document.querySelector('#donateSection')

        // console.log('DS', ds);
        ds.classList.add('visible')
        ds.classList.remove('hidden')

        document
            .getElementById('donationAmount')
            .setAttribute('data-satoshis', satoshis)

        document
            .getElementById('contributionName')
            .value = alias

        document
            .getElementById('contributionComment')
            .value = comment

        setTimeout(() => {

            const dataSatoshis = document
                .getElementById('donationAmount')
                .getAttribute('data-satoshis')

            const requestObject = {
                outputs: [],
                data: {
                    alias: document.getElementById('contributionName').value,
                    comment: document.getElementById('contributionComment').value,
                },
                donation: {
                    amount: Number(dataSatoshis),
                },
                expires: this.campaign.expires,
            }

            document.querySelector('#commitTransaction').disabled = false
            document.querySelector('#commitTransaction').click()
        }, 7000)
        // }, 100)
    }, {
        alias: _pkg.alias,
        comment: _pkg.comment,
        satoshis: _pkg.satoshis,
    })

    /* Build assurance output. */
    const assuranceOutput = {
        inputs: [{
            previous_output_transaction_hash: _pkg.previous_output_transaction_hash,
            previous_output_index: _pkg.previous_output_index,
            sequence_number: SEQUENCE_NUMBER,
            unlocking_script: _pkg.unlocking_script,
        }],
        data: {
            alias: _pkg.alias,
            comment: _pkg.comment,
        },
        data_signature: null
    }
    console.info('Assurance output:', assuranceOutput) // eslint-disable-line no-console
    console.info('Assurance satoshis:', _pkg.satoshis) // eslint-disable-line no-console

    /* Encode assurance pledge. */
    const commitment = Buffer
        .from(JSON.stringify(assuranceOutput))
        .toString('base64')
    console.info('Flipstarter encoded pledge (base64):', commitment) // eslint-disable-line no-console

    await page.evaluate(_commitment => {
        document.querySelector('#commitment').value = _commitment
    }, commitment)

    // console.log('WAIT A SEC FOR FINAL UPDATE');
    await page.waitForTimeout(LOAD_DELAY)
    await page.waitForTimeout(LOAD_DELAY)
    await page.waitForTimeout(LOAD_DELAY)
    await page.waitForTimeout(LOAD_DELAY) // how long do we have to wait?
    await page.waitForTimeout(LOAD_DELAY) // this seems like too long!
    console.log('ALL DONE!')

    const status = await page.$eval('#donateStatus', e => e.innerHTML)
        .catch(err => console.error('DID NOT SEE DONATE STATUS'))
    console.log('I SEE THE DONATE STATUS', status)

    /* Close doc for update. */
    const doc = JSON.parse(JSON.stringify(_doc))

    doc.broadcastStatus = status
    doc.completedAt = moment().unix()

    /* Retrieve results. */
    const results = await queueDb.put(doc)
        .catch(err => console.error('EVENT ERROR:', err))
    console.log('UPDATE QUEUE RESULT', results)

    await page.waitForTimeout(LOAD_DELAY)
    await page.waitForTimeout(LOAD_DELAY)
    await page.waitForTimeout(LOAD_DELAY)
    await browser.close()
    console.log('BROWSER CLOSED')
    process.exit()
}

/**
 * Parse
 */
const parse = async function (_hostname, _data, _debug) {
    /* Set hostname. */
    const hostname = _hostname

    /* Set data. */
    // NOTE: Clone the data (DO WE STILL NEED THIS??).
    const data = JSON.parse(JSON.stringify(_data))

    /* Set debug. */
    const debug = _debug

    /* Initialize campaign hash. */
    // FIXME: We need to validate the hostname; getting invalid hashes created
    //        eg. 8ca826a6cbb5b8898a6ab813e8a13e6bc5135ed077f03a775221ed91813a8f72
    const campaignHash = Nito.Crypto.hash(hostname + data.starts + data.expires, 'sha256').toString('hex')
    // console.log('\nCampaign Hash', campaignHash)

    /* Set outpoint. */
    const outpoint = `${Buffer.from(data.previous_transaction_hash).toString('hex')}:${data.previous_transaction_index}`

    /* Validate running outpoint. */
    if (outpoints[outpoint]) {
        return console.log('Already running: ', campaignHash)
    } else {
        /* Set running flag. */
        outpoints[outpoint] = true
    }

    /* Retrieve market price. */
    const usd = await Nito.Markets.getTicker('BCH', 'USD')

    const formatted = `
\t  ${data.title}
\t  [ ${campaignHash} ]
\t  Starts  : ${data.starts} ${moment.unix(data.starts).format('lll')} [ ${moment.unix(data.starts).fromNow()} ]
\t  Expires : ${data.expires} ${moment.unix(data.expires).format('lll')} [ ${moment.unix(data.expires).fromNow()} ]
\t------------------------------------------------------------
\t  Contribution : ${data.contribution_id}
\t  Userid       : ${data.user_id}
\t  Alias        : ${data.user_alias}
\t  Comment      : ${data.contribution_comment}
\t  ---
\t  Satoshis     : ${data.satoshis} [ ${numeral((data.satoshis / 100000000) * usd).format('$0,0.00')} ]
\t  Timestamp    : ${data.contribution_timestamp} ${moment.unix(data.contribution_timestamp).format('lll')} [ ${moment.unix(data.contribution_timestamp).fromNow()} ]
\t  Outpoint     : ${Buffer.from(data.previous_transaction_hash).toString('hex')}:${data.previous_transaction_index}
\t  Unlocking    : ${Buffer.from(data.unlock_script).toString('hex')}
\t  ---
\t  Revocationid : ${data.revocation_id}
\t  Revoke time  : ${data.revocation_timestamp ? data.revocation_timestamp : ''} ${data.revocation_timestamp ? moment.unix(data.revocation_timestamp).format('lll') : ''} ${data.revocation_timestamp ? moment.unix(data.revocation_timestamp).fromNow() : ''}
    `

    if (_debug) {
        console.log(formatted)
        // return console.log(formatted)
    }

    /* Initailize results. */
    let results = null

    /* Retrieve campaigns. */
    results = await eventsDb.query('api/byScript', {
        key: Buffer.from(data.unlock_script).toString('hex'),
        include_docs: true,
    }).catch(err => console.error(err))
    if (_debug) {
        // console.log('DB RESULTS', results)
    }

    /* Initialize package. */
    let pkg = null

    if (!results || results.rows.length === 0) {
        let campaignid = null

        let campaignTitle = null

        /* Retrieve campaigns. */
        results = await campaignsDb.query('api/byHostname', {
            key: hostname,
            include_docs: true,
        }).catch(err => console.error(err))
        // console.log('DB RESULTS', results)
        if (_debug) {
            return console.log('DB RESULTS', results)
        }

        if (results && results.rows.length) {
            const doc = results.rows[0].doc
            // console.log('\n\nCAMPAIGN DOC', doc);

            /* Validate document. */
            if (doc) {
                campaignid = doc._id
                campaignTitle = doc.title
            }
        }

        pkg = {
            _id: uuidv4(),
            campaignid,
            campaignTitle,
            campaignHash,
            type: 'new_contribution',
            source: 'flipstarter',
            title: 'New campaign contribution',
            alias: data.user_alias,
            comment: data.contribution_comment,
            satoshis: data.satoshis,
            txHash: Buffer.from(data.previous_transaction_hash).toString('hex'),
            txIndex: data.previous_transaction_index,
            unlockScript: Buffer.from(data.unlock_script).toString('hex'),
            isRevoked: data.revocation_id !== null ? true : false,
            timestamp: data.contribution_timestamp,
            createdAt: moment().unix(),
        }
        console.log('\n\nNEW EVENTS PKG', pkg)

        /* Add new entry. */
        // FIXME: How do we prevent duplicate entries??
        results = await eventsDb.put(pkg)
            .catch(err => console.error('EVENT ERROR:', err))
        // console.log('INSERT RESULT', results)
    } else {
        const doc = results.rows[0].doc
        // console.log('\n\nLOOKING FOR REVOKED!!', doc);

        if (doc.isRevoked === false && data.revocation_id !== null) {
            // console.log('\n\nNEW REVOKED FOUND!!', data.user_alias);

            /* Update revoked flag. */
            doc.isRevoked = true

            results = await eventsDb.put(doc)
                .catch(err => console.error('EVENT ERROR:', err))
            // console.log('UPDATE (REVOKED) RESULT', results)

            pkg = {
                _id: uuidv4(),
                campaignHash,
                type: 'revoked_contribution',
                source: 'flipstarter',
                title: 'Revoked campaign contribution',
                alias: data.user_alias,
                comment: data.contribution_comment,
                satoshis: data.satoshis,
                txHash: Buffer.from(data.previous_transaction_hash).toString('hex'),
                txIndex: data.previous_transaction_index,
                unlockScript: Buffer.from(data.unlock_script).toString('hex'),
                isRevoked: true,
                timestamp: data.contribution_timestamp,
                createdAt: moment().unix(),
            }
            // console.log('\n\nREVOKED PKG', pkg)

            /* Retrieve results. */
            results = await eventsDb.put(pkg)
                .catch(err => console.error('EVENT ERROR:', err))
            // console.log('INSERT REVOKED', results)

        }
    }

    // console.log('\nPARSED DATA', data)
}

/**
 * Load (Running) Flipstarter Campaign
 */
const load = function (_hostname, _debug) {
    /* Initialize socket connection. */
    const bitsocket = new EventSource('https://' + _hostname + '/events')

    /* Handle socket opening. */
    bitsocket.onopen = () => {
        console.log(`We have started listening to [ ${_hostname} ]`)

        setTimeout(() => {
            bitsocket.close()
        }, 5000)
    }

    /* Handle socket closing. */
    bitsocket.onclose = () => {
        console.log('We have stopped listening.')
    }

    /* Handle socket messages. */
    bitsocket.onmessage = async (e) => {
        try {
            /* Parse JSON data. */
            const data = JSON.parse(e.data)
            // console.log('DATA', data)

            await parse(_hostname, data, _debug)
            // bitsocket.close()

            /* Update output/display. */
            // this.output = JSON.stringify(data, null, 2)
        } catch (err) {
            console.error(err)
        }
    }

}

/**
 * Handle Duplicate Events
 */
const handleDups = async () => {
    /* Build query options. */
    const options = {
        // keys,
        group: true,
    }

    /* Request ALL docs (by query). */
    const eventsData = await eventsDb.query('api/byDuplicate', options)
        .catch(err => console.error('QUERY ERROR:', err))
    // console.log('Events data:', eventsData)

    let count = 0
    const MAX_QUEUE = 10

    eventsData.rows.forEach(async _event => {
        if (_event.value === 1) return
        count++
    })
    console.log('NUM DUPS', count)
    count = 0

    eventsData.rows.forEach(async _event => {
        if (count >= MAX_QUEUE) return

        if (_event.value > 1) {
            console.log(_event)
            count++

            const timestamp = _event.key[0]
            console.log('EVENTID', timestamp)

            /* Request ALL docs (by query). */
            const dupData = await eventsDb.query('api/byTimestamp', {
                key: timestamp,
                include_docs: true,
            }).catch(err => console.error('QUERY ERROR:', err))
            // console.log('Timestamp data:', dupData)

            let latest = null
            const dupDocs = []

            dupData.rows.forEach(_row => {
                const doc = _row.doc
                console.log('DOC', doc)

                if (latest === null) {
                    return latest = doc
                }

                // console.log('TEST', doc.createdAt > latest.createdAt)
                if (doc.createdAt > latest.createdAt) {
                    // console.log('ADD DUP', latest._id);
                    dupDocs.push({
                        _id: latest._id,
                        _rev: latest._rev,
                    })

                    return latest = doc
                } else {
                    // console.log('ADD DUP', doc._id);
                    return dupDocs.push({
                        _id: doc._id,
                        _rev: doc._rev,
                    })
                }
            })
            console.log('DUPLICATE LIST', dupDocs)
            console.log('LATEST EVENT', latest)

            // return

            dupDocs.forEach(async _dupDoc => {
                const delResponse = await eventsDb.remove(_dupDoc)
                    .catch(err => console.error('DELETE ERROR:', err))
                console.log('DELETE DUPLICATE', delResponse)
            })

        }
    })


}

;(async () => {
    /* Initailize results. */
    let results = null

    /* Retrieve campaigns. */
    results = await queueDb.query('api/isPending', {
        include_docs: true,
    }).catch(err => console.error(err))
    // console.log('PENDING RESULTS', results)

    if (results && results.rows.length) {
        results.rows.forEach(result => {
            const doc = result.doc
            console.log('\nPENDING RESULT (doc)', doc)

            /* Set alias. */
            let alias = doc.data.alias

            /* Validate alias. */
            if (alias) {
                alias = alias.trim()
            } else {
                alias = ''
            }

            /* Set comment. */
            let comment = doc.data.comment

            /* Validate comment. */
            if (comment) {
                comment = comment.trim()
            } else {
                comment = ''
            }

            // NOTE: The following values will be injected into the "dynamic" page,
            //       using the `evaluate` method.
            const pkg = {
                hostname: doc.hostname,
                alias,
                comment,
                satoshis: doc.satoshis,
                previous_output_transaction_hash: doc.inputs[0].previous_output_transaction_hash,
                previous_output_index: doc.inputs[0].previous_output_index,
                unlocking_script: doc.inputs[0].unlocking_script,
            }
            console.log('\nBROADCAST PACKAGE', pkg)
            broadcast(pkg, doc)

        })
    } else {
        console.log('\nNothing is currently pending.')
    }

})()

return load('westpalmbch.us', true)

// return handleDups()

const campaignList = [
    'hacksmart.org',
]
campaignList.forEach(campaignUrl => {
    load(campaignUrl, false)
})

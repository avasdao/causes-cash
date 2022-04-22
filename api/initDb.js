/* Require modules. */
const PouchDB = require('pouchdb')

/**
 * Initialize database
 */
const initDb = async function () {
    /* Initialize file system. */
    const fs = require('fs')

    /* Initialize data directory (location). */
    const dir = './data'

    /* Verify data directory. */
    if (!fs.existsSync(dir)) {
        console.info('Creating new data directory..')

        /* Create a new data directory. */
        fs.mkdirSync(dir)
    }

    /* Initialize ALL databases. */
    const assurancesDb = new PouchDB('data/assurances')
    const eventsDb = new PouchDB('data/events')
    const flipstartersDb = new PouchDB('data/flipstarters')
    const payoutsDb = new PouchDB('data/payouts')

    /* Initialize DB handlers. */
    let ddoc
    let response

    /* Query for existing design document. */
    response = await flipstartersDb
        .get('_design/api')
        .catch(err => console.error(err))
    // console.log('DB RESPONSE', response)

    /* Validate DB response. */
    if (!response) {
        /* Build design document. */
        ddoc = {
            _id: '_design/api',
            views: {
                isPublished: {
                    map: function (_doc) {
                        if (_doc.isPublished) {
                            emit(_doc.name)
                        }
                    }.toString()
                },
            },
        }

        /* Save design document. */
        response = await flipstartersDb
            .put(ddoc)
            .catch(err => console.error(err))
        // console.log('DB RESPONSE', response)

        /* Validate response. */
        if (response) {
            console.info('Created new design document.', response)
        }
    }
}

module.exports = initDb

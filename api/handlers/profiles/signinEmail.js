/* Initialize modules. */
const PouchDB = require('pouchdb')
const moment = require('moment')
const uuidv4 = require('uuid/v4')

/* Initialize databases. */
const detailsDb = new PouchDB('data/profiles_details')
const profilesDb = new PouchDB('data/profiles')

/**
 * Signin Email
 */
const signinEmail = async function (req, res, _address, _message) {
    /* Initialize result. */
    let result = null

    /* Request auth id. */
    result = await profilesDb.query('api/byAddress', {
        key: _address,
        include_docs: true,
    }).catch(err => console.error('PROFILE ERROR:', err))
    // console.log('RESULT (byAddress)', result)

    /* Validate results. */
    if (!result.rows || result.rows.length === 0) {
        /* Set email. */
        const email = _message.email
        // console.log('EMAIL', email)

        /* Set profile id. */
        const profileid = uuidv4()

        /* Build profile details package. */
        const detailsPkg = {
            _id: profileid,
            email,
            addresses: {
                bch: [ _address ],
            },
            secret: uuidv4(),
            createdAt: moment().valueOf()
        }
        // console.log('DETAILS PKG', detailsPkg)

        /* Build profile package. */
        const profilePkg = {
            _id: profileid,
            account: {
                type: 'bch',
                address: _address,
            },
            createdAt: moment().valueOf()
        }
        // console.log('PROFILE PKG', profilePkg)

        /* Add new profile. */
        result = await profilesDb.put(profilePkg)
            .catch(err => console.error('PROFILES ERROR:', err))
        // console.log('RESULT (profiles)', result)

        /* Add new profile details. */
        result = await detailsDb.put(detailsPkg)
            .catch(err => console.error('DETAILS ERROR:', err))
        // console.log('RESULT (details)', result)

        return res.json({
            status: 'Adding new profile',
            result,
        })
    } else {
        /* Set document. */
        const doc = result.rows[0].doc

        /* Update timestamp. */
        doc.updatedAt = moment().valueOf()

        /* Add new profile. */
        result = await profilesDb.put(doc)
            .catch(err => console.error('PROFILES ERROR:', err))
        // console.log('RESULT (profiles)', result)

        return res.json({
            status: 'Updating existing profile',
            result,
        })
    }
}

/* Export module. */
module.exports = signinEmail

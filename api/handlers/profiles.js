/**
 * Profiles
 */
const profiles = async function (req, res) {
    // console.log(req)

    /* Set method. */
    const method = req.method
    console.log('PROFILES (method):', method)

    /* Validate method. */
    if (!method) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'A METHOD is required with this request.'
        })
    }

    /* Handle GET request. */
    if (method === 'GET') {
        require('./profiles/getDetails')(req, res)
    }

    /* Handle POST request. */
    if (method === 'POST') {
        require('./profiles/addNew')(req, res)
    }

    /* Handle PUT request. */
    if (method === 'PUT') {
        require('./profiles/update')(req, res)
    }
}

module.exports = profiles

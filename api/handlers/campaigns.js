/**
 * Campaigns
 */
const campaigns = async function (req, res) {
    // console.log(req)

    /* Set method. */
    const method = req.method
    console.log('CAMPAIGN (method):', method)

    /* Validate method. */
    if (!method) {
        /* Set status. */
        res.status(400)

        /* Return error. */
        return res.json({
            error: 'Bad request.'
        })
    }

    /* Handle GET request. */
    if (method === 'GET') {
        require('./campaigns/getDetails')(req, res)
    }

    /* Handle POST request. */
    if (method === 'POST') {
        require('./campaigns/addNew')(req, res)
    }

    /* Handle PUT request. */
    if (method === 'PUT') {
        require('./campaigns/update')(req, res)
    }
}

module.exports = campaigns

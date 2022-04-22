/**
 * Payouts
 */
const payouts = async function (req, res) {
    // console.log(req)

    /* Set method. */
    const method = req.method
    console.log('PAYOUTS (method):', method)

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
        require('./payouts/getDetails')(req, res)
    }

    /* Handle POST request. */
    if (method === 'POST') {
        require('./payouts/addNew')(req, res)
    }

    /* Handle PUT request. */
    // if (method === 'PUT') {
    //     require('./payouts/update')(req, res)
    // }
}

module.exports = payouts

/**
 * Assurances
 */
const assurances = async function (req, res) {
    // console.log(req)

    /* Set method. */
    const method = req.method
    console.log('ASSURANCE (method):', method)

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
        require('./assurances/getDetails')(req, res)
    }

    /* Handle POST request. */
    if (method === 'POST') {
        require('./assurances/addNew')(req, res)
    }

    /* Handle PUT request. */
    // if (method === 'PUT') {
    //     require('./assurances/update')(req, res)
    // }
}

module.exports = assurances

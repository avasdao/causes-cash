/**
 * Create Session
 *
 * @returns session
 */
export default async (_source, _headers) => {
    /* Initialize locals. */
    let challenge
    let headers
    let logDetails
    let session

    /* Set headers. */
    headers = _headers
    // console.log('HEADERS', headers)

    /* Build log details. */
    logDetails = {
        source: _source,
        i18n: headers['accept-language'],
        client: headers['user-agent'],
        referer: headers['referer'],
        host: headers['host'],
        ip: headers['x-real-ip'],
        ip_fwd: headers['x-forwarded-for'],
    }
    // console.info('LOG (api):', logDetails)

    /* Create new challenge (string). */
    // NOTE: Used for (optional) secure authentication.
    challenge = sha256(uuidv4()).slice(0, 40)

    /* Create (new) session. */
    session = {
        _id: uuidv4(),
        ...logDetails,
        challenge,
        isActive: true,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'days').unix(),
        killedAt: moment().add(7, 'days').unix(),
    }

    /* Return session. */
    return session
}

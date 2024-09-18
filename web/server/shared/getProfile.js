/**
 * Get Profile
 *
 * Retrieves the full profile of the (authorized) public key.
 */
export default async (
    _sessionid,
    _publicKey,
    _signature,
    _timestamp,
) => {
    /* Initialize locals. */
    let challenge
    let email
    let logPkg
    let messageHash
    let nickname
    let timestamp
    let profile
    let publicKey
    let response
    let session
    let sessionid
    let signature
    let success
    let unitSeparator

    sessionid = _sessionid
    publicKey = hexToBin(_publicKey)
    signature = hexToBin(_signature)
    timestamp = _timestamp

    /* Set unit separator. */
    unitSeparator = '1f'

    logPkg = {
        _id: uuidv4(),
        source: 'auth',
        sessionid,
        publicKey,
        signature,
        challenge,
        createdAt: moment().unix(),
    }
    // console.log('LOGS PKG', logPkg)

    response = await logsDb
        .put(logPkg)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    /* Validate session Id. */
    if (!sessionid) {
        return {
            error: 'Invalid session Id.',
        }
    }

    /* Request session. */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    // console.log('SESSION (cookie):', session)

    /* Validate session. */
    if (!session) {
        return {
            error: 'Session was NOT found!',
        }
    }

    challenge = session?.challenge
    // expiresAt = session.expiresAt

    /* Validate challenge. */
    if (!challenge) {
        return {
            error: 'FATAL: Authorization challenge was NOT found!',
        }
    }

    // TODO Verify that the timestamp is within +/- 15-second window.

    messageHash = hexToBin(`${timestamp}${unitSeparator}${challenge}`)

    success = verifySignatureSchnorr(signature, publicKey, messageHash)
    console.log('AUTH VERIFICATION SUCCESS', success)

    /* Verify challenge. */
    if (success !== true) {
        return `Authorization FAILED!`
    }

    /* Add profile (address + signature) to session. */
    session = {
        profileid: binToHex(publicKey),
        auth: binToHex(signature),
        ...session,
        updatedAt: moment().unix(),
    }
    // console.log('AUTH SESSION', session)

    /* Request session update. */
    response = await sessionsDb
        .put(session)
        .catch(err => console.error(err))
    // console.log('SESSION UPDATE:', response)

    /* Request profile. */
    profile = await profilesDb
        .get(binToHex(publicKey))
        .catch(err => console.error(err))
    // console.log('PROFILE:', profile)

    /* Validate profile. */
    if (!profile) {
        /* Create NEW profile. */
        profile = {
            _id: binToHex(publicKey),
            nickname,
            email,
            auths: 1,
            createdAt: moment().unix(),
        }
    } else {
        profile = {
            ...profile,
            auths: profile.auths + 1,
            updatedAt: moment().unix(),
        }
    }

    /* Request profile update. */
    response = await profilesDb
        .put(profile)
        .catch(err => console.error(err))
    // console.log('PROFILE UPDATE:', response)

    profile = {
        id: profile._id,
        sessionid,
        ...profile,
    }

    delete profile._id
    delete profile._rev

    /* Return profile. */
    return profile
}

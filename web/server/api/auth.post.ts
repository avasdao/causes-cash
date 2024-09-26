/* Import (local) modules. */
// import getProfile from '../../libs/getProfile.js'


export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let publicKey
    let sessionid
    let signature
    let timestamp

    /* Initialize locals. */
    let message
    let profile
    let result
    let session
    let sig
    let profileid


    /* Set (request) body. */
    body = await readBody(event)

    /* Validate body. */
    if (!body) {
        return `Authorization FAILED!`
    }

    /* Set profile parameters. */
    sessionid = body.sessionid
    publicKey = body.publicKey
    signature = body.signature
    timestamp = body.timestamp

    message = body.message
    sig = body.sig

    console.log({
        sessionid,
        message,
        sig,
    })

    /* Request session. */
    session = await sessionsDb
        .get(sessionid)
        .catch(err => console.error(err))
    console.log('SESSION', session)

    if (!session) {
        return `Authorization FAILED!`
    }





    // FIXME Validate TIME!!
    if (!message.includes('Causes Cash Authorization')) {
        return `Authorization FAILED!`
    }

    profileid = ethers.verifyMessage(message, sig)
    console.log('VERIF (profileid)', profileid)

    /* Verify profile id. */
    if (typeof profileid === 'undefined') {
        return `Authorization FAILED!`
    }

    /* Add profile (address + signature) to session. */
    session = {
        profileid,
        auth: sig,
        ...session,
        updatedAt: moment().unix(),
    }

    /* Request session update. */
    result = await sessionsDb
        .put(session)
        .catch(err => console.error(err))
    // console.log('SESSION UPDATE:', result)

    /* Request profile. */
    profile = await profilesDb
        .get(profileid)
        .catch(err => console.error(err))
    // console.log('PROFILE:', profile)

    if (!profile) {
        /* Create NEW profile. */
        profile = {
            _id: profileid,
            nickname: null,
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
    result = await profilesDb
        .put(profile)
        .catch(err => console.error(err))
    // console.log('PROFILE UPDATE:', result)

    /* Return success. */
    return `Authorization SUCCESS!`






    // NOTE: Returns a promise.
    // return getProfile(
    //     sessionid,
    //     publicKey,
    //     signature,
    //     timestamp,
    // )
})

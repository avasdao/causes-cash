/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const profilesDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/profiles`)
const sessionsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/sessions`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let addr
    let body
    let challenge
    let cookie
    let email
    let expiresAt
    let hdl
    let logPkg
    let nickname
    let params
    let profile
    let publicKey
    let response
    let session
    let sessionid
    let signature
    let success

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('BODY', body)

    /* Validate body. */
    if (!body) {
        return `Authorization FAILED!`
    }

    /* Set profile parameters. */
    sessionid = body.sessionid
    publicKey = body.publicKey
    signature = body.signature
    challenge = body.challenge

    logPkg = {
        _id: uuidv4(),
        source: 'auth',
        sessionid,
        publicKey,
        signature,
        challenge,
        createdAt: moment().unix(),
    }
    console.log('LOGS PKG', logPkg)

    response = await logsDb
        .put(logPkg)
        .catch(err => console.error(err))
    return console.log('RESPONSE', response)


    success = secp256k1.verifySignatureSchnorr(signature, this.wallet.publicKey, messageHash)
    console.log('\nSUCCESS (sig):', success)



    if (!cookie) {
        return `Authorization FAILED!`
    }

    /* Decode cookie from base64. */
    cookie = atob(cookie)
    // console.log('COOKIE (decoded):', cookie)

    /* Request session. */
    session = await sessionsDb
        .get(cookie)
        .catch(err => console.error(err))
    // console.log('SESSION (cookie):', session)

    if (!session) {
        return `Authorization FAILED!`
    }

    challenge = session.challenge
    expiresAt = session.expiresAt

    /* Set authorization parameters. */
    params = [
        addr,
        sig,
        `causes.cash_nexid_reg_${challenge}`,
    ]
    // console.log('AUTH PARAMS', params)

    /* Request message verification (from node). */
    success = await Rpc
        .call('verifymessage', params, {
            username: 'user',
            password: 'password',
        })
        .catch(err => console.error(err))
    // console.log('AUTH VERIFICATION SUCCESS', success)

    /* Verify challenge. */
    if (success !== true) {
        return `Authorization FAILED!`
    }

    /* Add profile (address + signature) to session. */
    session = {
        profileid: addr,
        auth: sig,
        ...session,
        updatedAt: moment().unix(),
    }
    // console.log('AUTH SESSION', session)

    /* Request session update. */
    result = await sessionsDb
        .put(session)
        .catch(err => console.error(err))
    // console.log('SESSION UPDATE:', result)

    /* Request profile. */
    profile = await profilesDb
        .get(addr)
        .catch(err => console.error(err))
    // console.log('PROFILE:', profile)

    if (!profile) {
        /* Create NEW profile. */
        profile = {
            _id: addr,
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
    result = await profilesDb
        .put(profile)
        .catch(err => console.error(err))
    // console.log('PROFILE UPDATE:', result)

    profile = {
        id: profile._id,
        ...profile,
    }

    delete profile._id
    delete profile._rev

    /* Return profile. */
    return profile.id ? 'Success! Welcome to Causes Cash' : 'ERROR! Please try again...'
})

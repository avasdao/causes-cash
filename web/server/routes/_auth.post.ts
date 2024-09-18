/* Import modules. */
import moment from 'moment'
import PouchDB from 'pouchdb'
import { Rpc } from '@nexajs/rpc'
import { v4 as uuidv4 } from 'uuid'

/* Initialize databases. */
const logsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/logs`)
const profilesDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/profiles`)
const sessionsDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/sessions`)

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
    let response
    let session
    let sig
    let success

    /* Set (request) body. */
    body = await readBody(event)
    // console.log('BODY', body)

    /* Validate body. */
    if (!body) {
        return `Authorization FAILED!`
    }

    /* Set profile parameters. */
    addr = body.addr
    sig = body.sig
    cookie = body.cookie
    hdl = body.hdl
    nickname = hdl        // NOTE: We use nickname instead of hdl.
    email = body.email

    logPkg = {
        _id: uuidv4(),
        source: 'nexid',
        addr,
        sig,
        cookie,
        hdl,
        email,
        createdAt: moment().unix(),
    }
    // console.log(logPkg)

    response = await logsDb
        .put(logPkg)
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

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

/* Import modules (getters). */
import getAssetSource from './system/getters/getAssetSource'
import getEternalDbAddr from './system/getters/getEternalDbAddr'
import getFlags from './system/getters/getFlags'
import getHelp from './system/getters/getHelp'
import getLocale from './system/getters/getLocale'

/* Import modules (actions). */
import updateAssetSource from './system/actions/updateAssetSource'
import updateFlags from './system/actions/updateFlags'
import updateLocale from './system/actions/updateLocale'

/* Import modules (mutations). */
import setAppStarts from './system/mutations/setAppStarts'
import setAssetSource from './system/mutations/setAssetSource'
import setFlags from './system/mutations/setFlags'
import setLocale from './system/mutations/setLocale'

/* Initialize state. */
const state = {
    /**
     * Application Starts
     */
    appStarts: 0,

    /**
     * Application Version
     */
    appVersion: null,

    /**
     * Assets (Sources)
     *
     * An object, used to retrieve the address / location of
     * our latest assets from our IPFS storage.
     */
    assets: null,

    /**
     * Authorization Hashes
     *
     * During sign in, we compute a SHA1 hash from the provided credentials.
     * In the case of a first-time use of supplied credentials, we will notify
     * the user and request confirmation.
     */
    authHashes: null,

    /**
     * Flags
     *
     * 1. Dark mode
     * 2. Unconfirmed transactions
     */
    flags: null,

    /**
     * Locale
     *
     * Controls the localization language.
     * (default is english)
     */
    locale: null,

    /**
     * Notices
     *
     * System notices that nag/remind the user of some important action or
     * information; which can be permanently disabled ("Do Not Show Again")
     * via checkbox and confirmation.
     *
     * NOTE: Unique 1-byte (hex) codes (up to 255) are used to reduce the size
     *       of this storage field.
     */
    notices: null,

    /**
     * Schema Version
     *
     * v1: Alpha (Preview) Edition
     */
    schemaVersion: 1,
}

/* Getters. */
const getters = {
    getAssetSource,
    getEternalDbAddr,
    getFlags,
    getHelp,
    getLocale,
}

/* Actions. */
const actions = {
    updateAssetSource,
    updateFlags,
    updateLocale,
}

/* Mutations. */
const mutations = {
    setAppStarts,
    setAssetSource,
    setFlags,
    setLocale,
}

/* Export. */
// NOTE: We DO NOT namespace here to allow for global use of `dispatch`.
export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}

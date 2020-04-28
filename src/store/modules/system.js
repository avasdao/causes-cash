/* Import libraries. */
// import telr from '../../api/telr'

/* Import modules (getters). */
import getFlags from './system/getters/getFlags'
import getLocale from './system/getters/getLocale'

/* Import modules (actions). */
import displayError from './system/actions/displayError'
import displayNotification from './system/actions/displayNotification'

/* Import modules (mutations). */
import setAppStarts from './system/mutations/setAppStarts'
import setError from './system/mutations/setError'
import setFlags from './system/mutations/setFlags'
import setLocale from './system/mutations/setLocale'
import setNotification from './system/mutations/setNotification'

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
     * Authorization Hashes
     *
     * During sign in, we compute a SHA1 hash from the provided credentials.
     * In the case of a first-time use of supplied credentials, we will notify
     * the user and request confirmation.
     */
    authHashes: [],

    /**
     * Error Message
     */
    errorMsg: null,

    /**
     * Flags
     *
     * 1. Dark mode
     * 2. Unconfirmed transactions
     */
    flags: {
        darkMode: false,
        unconfirmed: true,
    },

    /**
     * Locale
     *
     * Controls the localization language.
     * (default is english)
     */
    locale: 'en-US',

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
    notices: {},

    /**
     * Notification Message
     */
    notifMsg: null,

    /**
     * Schema Version
     *
     * v1: Alpha (Preview) Edition
     */
    schemaVersion: 1,
}

/* Getters. */
const getters = {
    getFlags,
    getLocale,
}

/* Actions. */
const actions = {
    displayError,
    displayNotification,
}

/* Mutations. */
const mutations = {
    setAppStarts,
    setError,
    setFlags,
    setLocale,
    setNotification,
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

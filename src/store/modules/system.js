/* Import libraries. */
// import telr from '../../api/telr'

/* Import modules (getters). */
// ...

/* Import modules (actions). */
import displayError from './system/actions/displayError'
import displayNotification from './system/actions/displayNotification'

/* Import modules (mutations). */
import setAppStarts from './system/mutations/setAppStarts'
import setError from './system/mutations/setError'
import setNotification from './system/mutations/setNotification'

/* Initialize state. */
const state = {
    /**
     * Application Starts
     */
    as: 0,

    /**
     * Application Version
     */
    av: null,

    /**
     * Error Message
     */
    em: null,

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
    n: {},

    /**
     * Notification Message
     */
    nm: null,

    /**
     * Schema Version
     *
     * v1: Developer Preview
     * v2: Cookie (Key/Value) Optimization
     */
    sv: 2,
}

/* Getters. */
const getters = {
    getDarkMode(state) {
        return state.dm
    },
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

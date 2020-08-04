/* Import modules (getters). */
// ...

/* Import modules (actions). */
import startWatching from './blockchain/actions/startWatching'

/* Import modules (mutations). */
import setWatching from './blockchain/mutations/setWatching'

/* Initialize state. */
const state = {
    /**
     * Watching
     *
     * 1. Addresses
     * 2. UTXOs
     */
    watching: null,
}

/* Getters. */
const getters = {
    //
}

/* Actions. */
const actions = {
    startWatching,
}

/* Mutations. */
const mutations = {
    setWatching,
}

/* Export. */
// NOTE: We DO NOT namespace here to allow for global use of `dispatch`.
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

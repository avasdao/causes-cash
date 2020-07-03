/* Import libraries. */
// import telr from '../../api/telr'

/* Import modules (getters). */
import getBytesFromIPFS from './utils/getters/getBytesFromIPFS'
import getCompletedPct from './utils/getters/getCompletedPct'
import getFormatFunded from './utils/getters/getFormatFunded'
import getFormattedValue from './utils/getters/getFormattedValue'
import getIPFSFromBytes from './utils/getters/getIPFSFromBytes'
import getMarkdown from './utils/getters/getMarkdown'
import getShuffledArray from './utils/getters/getShuffledArray'

/* Import modules (actions). */
import toast from './utils/actions/toast'

/* Import modules (mutations). */
// ...

/* Initialize state. */
const state = {
    //
}

/* Getters. */
const getters = {
    getBytesFromIPFS,
    getCompletedPct,
    getFormatFunded,
    getFormattedValue,
    getIPFSFromBytes,
    getMarkdown,
    getShuffledArray,
}

/* Actions. */
const actions = {
    toast,
}

/* Mutations. */
const mutations = {
    //
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

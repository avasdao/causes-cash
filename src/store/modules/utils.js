/* Import modules (getters). */
import getCompletedPct from './utils/getters/getCompletedPct'
import getCategoryDisplay from './utils/getters/getCategoryDisplay'
import getFormatFunded from './utils/getters/getFormatFunded'
import getFormattedValue from './utils/getters/getFormattedValue'
import getMarkdown from './utils/getters/getMarkdown'
import getShuffledArray from './utils/getters/getShuffledArray'

/* Import modules (actions). */
import setClipboard from './utils/actions/setClipboard'
import toast from './utils/actions/toast'

/* Import modules (mutations). */
// ...

/* Initialize state. */
const state = {
    //
}

/* Getters. */
const getters = {
    getCategoryDisplay,
    getCompletedPct,
    getFormatFunded,
    getFormattedValue,
    getMarkdown,
    getShuffledArray,
}

/* Actions. */
const actions = {
    setClipboard,
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

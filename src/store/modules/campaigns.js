/* Import libraries. */
// import telr from '../../api/telr'

/* Import modules (getters). */
import getAsset from './campaigns/getters/getAsset'
import getCampaign from './campaigns/getters/getCampaign'

/* Import modules (actions). */
import updateAsset from './campaigns/actions/updateAsset'

/* Import modules (mutations). */
import setAsset from './campaigns/mutations/setAsset'

/* Initialize state. */
const state = {
    /**
     * Assets
     *
     * These assets are stored for quick access.
     *
     * NOTE: They are regularly updated, based on timestamps.
     */
    assets: null,
}

/* Getters. */
const getters = {
    getAsset,
    getCampaign,
}

/* Actions. */
const actions = {
    updateAsset,
}

/* Mutations. */
const mutations = {
    setAsset,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

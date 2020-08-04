/* Import modules (getters). */
import getAsset from './campaigns/getters/getAsset'
import getCampaign from './campaigns/getters/getCampaign'
import getCampaigns from './campaigns/getters/getCampaigns'
import getFullfillment from './campaigns/getters/getFullfillment'

/* Import modules (actions). */
import addAssurance from './campaigns/actions/addAssurance'
import addPayout from './campaigns/actions/addPayout'
import updateAsset from './campaigns/actions/updateAsset'
import updateCampaign from './campaigns/actions/updateCampaign'

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
    getCampaigns,
    getFullfillment,
}

/* Actions. */
const actions = {
    addAssurance,
    addPayout,
    updateAsset,
    updateCampaign,
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

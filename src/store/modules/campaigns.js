/* Import modules (getters). */
import getAsset from './campaigns/getters/getAsset'
import getCampaign from './campaigns/getters/getCampaign'
import getCampaigns from './campaigns/getters/getCampaigns'
import getFullfillment from './campaigns/getters/getFullfillment'
import getSighashDigest from './campaigns/getters/getSighashDigest'
import getSummary from './campaigns/getters/getSummary'

/* Import modules (actions). */
import addAssurance from './campaigns/actions/addAssurance'
import addPayout from './campaigns/actions/addPayout'
import buildPledgeAuth from './campaigns/actions/buildPledgeAuth'
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
    getSighashDigest,
    getSummary,
}

/* Actions. */
const actions = {
    addAssurance,
    addPayout,
    buildPledgeAuth,
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

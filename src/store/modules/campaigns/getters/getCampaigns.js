/* Import modules. */
import Bugsnag from '@bugsnag/js'
import superagent from 'superagent'

/**
* Get Campaigns
*/
const getCampaigns = (state, getters, rootState, rootGetters) => async (_ownerSlug) => {
    // console.log('Retrieving campaign...', _ownerSlug, _campaignId)

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    /* Set target. */
    const target = `${API_PROVIDER}/campaigns/${_ownerSlug}`
    // console.log('TARGET', target)

    /* Request campaigns. */
    const result = await superagent
        .get(target)
        .catch(Bugsnag.notify)
    // console.log('RESULT', result)

    /* Validate result. */
    if (!result || !result.body) {
        return null
    }

    /* Return campaign. */
    return result.body
}

/* Export module. */
export default getCampaigns

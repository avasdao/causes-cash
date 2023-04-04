/* Import modules. */
import Bugsnag from '@bugsnag/js'

/**
* Get Campaign
*/
const getCampaign = (state, getters, rootState, rootGetters) => async (_ownerSlug, _campaignSlug) => {
    // console.log('Retrieving campaign...', _ownerSlug, _campaignId)

    /* Initialize campaign. */
    // let campaign = null

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    let target = null

    /* Set target. */
    if(_campaignSlug) {
        target = `${API_PROVIDER}/campaigns/${_ownerSlug}/${_campaignSlug}`
    } else {
        target = `${API_PROVIDER}/campaigns/${_ownerSlug}`
    }
    // console.log('TARGET', target)

    /* Request campaign. */
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
export default getCampaign

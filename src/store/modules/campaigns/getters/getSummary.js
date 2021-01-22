/* Import modules. */
import Bugsnag from '@bugsnag/js'
import superagent from 'superagent'

/**
* Get Summary
*/
const getSummary = async (state, getters, rootState, rootGetters) => {
    // console.log('Retrieving campaign...', _ownerSlug, _campaignId)

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    /* Set target. */
    const target = `${API_PROVIDER}/campaigns/summary`
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
export default getSummary

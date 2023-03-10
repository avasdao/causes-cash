/* Import modules. */
import Bugsnag from '@bugsnag/js'

/**
* Get Discover
*/
const getDiscover = (state, getters, rootState, rootGetters) => async (_category, _timestamp) => {
    // console.log('Retrieving campaign...', _timestamp, _campaignId)

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    /* Set target. */
    const target = `${API_PROVIDER}/discover/${_category}/${_timestamp}`
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
export default getDiscover

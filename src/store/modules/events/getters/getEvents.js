/* Import modules. */
import superagent from 'superagent'

/**
* Get Events
*/
const getEvents = (state, getters, rootState, rootGetters) => async (_timestamp) => {
    // console.log('Retrieving campaign...', _timestamp, _campaignId)

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    /* Set target. */
    const target = `${API_PROVIDER}/events/${_timestamp}`
    // console.log('TARGET', target)

    /* Request campaigns. */
    const result = await superagent.get(target)
    // console.log('RESULT', result)

    /* Validate result. */
    if (!result || !result.body) {
        return null
    }

    /* Return campaign. */
    return result.body
}

/* Export module. */
export default getEvents

/* Import modules. */
import superagent from 'superagent'

/**
 * Add Assurance
 */
const addAssurance = async ({ rootGetters }, _campaign) => {
    console.log('ADD CAMPAIGN:', _campaign)

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    let target = null

    /* Set api target. */
    if (_campaign.flipstarter) {
        target = `${API_PROVIDER}/campaigns/flipstarter`
    } else {
        target = `${API_PROVIDER}/campaigns`
    }

    const result = await superagent
        .post(target)
        .send(_campaign)
    // console.log('RESULT', result)

    /* Return result. */
    return result
}

/* Export module. */
export default addAssurance

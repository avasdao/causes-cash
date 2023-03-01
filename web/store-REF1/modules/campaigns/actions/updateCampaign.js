/* Import modules. */
import Bugsnag from '@bugsnag/js'
import superagent from 'superagent'

/**
 * Update Campaign
 */
const updateCampaign = async ({ rootGetters }, _campaign) => {
    // console.log('UPDATE CAMPAIGN:', _campaign)

    const signedPkg = rootGetters['profile/getSignedMessage'](JSON.stringify(_campaign))
    // console.log('SIGNED PACKAGE', signedPkg)

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    /* Set api target. */
    const target = `${API_PROVIDER}/campaigns`

    /* Request campaign update. */
    const result = await superagent
        .put(target)
        .send(signedPkg)
        .catch(Bugsnag.notify)
    // console.log('RESULT', result)

    /* Return result. */
    return result
}

/* Export module. */
export default updateCampaign

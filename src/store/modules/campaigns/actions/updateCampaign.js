/* Import modules. */
import superagent from 'superagent'

/**
 * Update Campaign
 */
const updateCampaign = async ({ rootGetters }, _campaign) => {
    // console.log('UPDATE CAMPAIGN:', _campaign)

    const signedPkg = rootGetters['profile/getSignedMessage'](JSON.stringify(_campaign))
    // console.log('SIGNED PACKAGE', signedPkg)

    /* Set api target. */
    const target = 'https://api.causes.cash/v1/campaigns'

    const result = await superagent
        .put(target)
        .send(signedPkg)
    // console.log('RESULT', result)

    /* Return result. */
    return result
}

/* Export module. */
export default updateCampaign

/* Import modules. */
import superagent from 'superagent'

/**
* Get Campaigns
*/
const getCampaigns = () => async (_ownerSlug) => {
    // console.log('Retrieving campaign...', _ownerSlug, _campaignId)

    /* Initialize campaign. */
    // let campaign = null

    /* Set target. */
    const target = `http://localhost:6767/v1/campaigns/${_ownerSlug}`
    // const target = `https://api.causes.cash/v1/campaigns/${_ownerSlug}`
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
export default getCampaigns

/* Import modules. */
import superagent from 'superagent'

/**
* Get Campaign
*/
const getCampaign = () => async (_ownerSlug, _campaignSlug) => {
    // console.log('Retrieving campaign...', _ownerSlug, _campaignId)

    /* Initialize campaign. */
    // let campaign = null

    /* Set target. */
    const target = `https://api.causes.cash/v1/campaigns/${_ownerSlug}/${_campaignSlug}`
    console.log('TARGET', target)

    /* Request campaign. */
    const result = await superagent.get(target)
    console.log('RESULT', result)

    /* Validate result. */
    if (!result || !result.body) {
        return null
    }

    /* Return campaign. */
    return result.body
}

/* Export module. */
export default getCampaign

/**
* Get Campaign
*/
const getCampaign = () => (_campaignId) => {
    // console.log('Retrieving campaign...', _campaignId)

    /* Initialize campaign. */
    let campaign = null

    /* Retrieve campaign. */
    campaign = require(`@/_staticDb/${_campaignId}.json`)

    return campaign
}

/* Export module. */
export default getCampaign

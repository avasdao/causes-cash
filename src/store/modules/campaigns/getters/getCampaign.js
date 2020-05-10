/**
* Get Campaign
*/
const getCampaign = () => (_campaignOwner, _campaignId) => {
    // console.log('Retrieving campaign...', _campaignId)

    /* Initialize campaign. */
    let campaign = null

    /* Retrieve campaign. */
    // FIXME: We MUST account for the owner, since slugs can be duplicated.
    campaign = require(`@/_staticDb/${_campaignId}.json`)

    return campaign
}

/* Export module. */
export default getCampaign

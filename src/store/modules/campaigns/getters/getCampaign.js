/**
* Get Campaign
*/
const getCampaign = () => (_campaignOwner, _campaignId) => {
    // console.log('Retrieving campaign...', _campaignOwner, _campaignId)

    // FIXME: FOR DEVELOPMENT PURPOSES ONLY
    if (typeof _campaignId === 'undefined') {
        _campaignId = _campaignOwner
    }

    /* Initialize campaign. */
    let campaign = null

    /* Retrieve campaign. */
    // FIXME: We MUST account for the owner, since slugs can be duplicated.
    campaign = require(`@/_staticDb/${_campaignId}.json`)

    return campaign
}

/* Export module. */
export default getCampaign

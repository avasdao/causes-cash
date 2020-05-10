/**
* Get Description
*/
const getDescription = (state, getters) => (_campaignOwner, _campaignId) => {
    // console.log('Retrieving campaign...', _campaignId)

    const campaign = getters.getCampaign(_campaignOwner, _campaignId)
    // console.log('DESCRIPTION (campaign):', campaign)
    // console.log('DESCRIPTION (ownerId):', campaign.ownerId)
    // console.log('DESCRIPTION (extSlug):', campaign.extSlug)

    /* Retrieve (stored) asset. */
    const asset = getters.getAsset(
        campaign.ownerId, campaign.extSlug, 'description')
    // console.log('DESCRIPTION (asset):', asset)

    /* Return asset. */
    return asset
}

/* Export module. */
export default getDescription

/**
* Get Summary
*/
const getSummary = (state, getters) => (_campaignOwner, _campaignId) => {
    // console.log('Retrieving campaign...', _campaignId)

    const campaign = getters.getCampaign(_campaignOwner, _campaignId)
    // console.log('SUMMARY (campaign):', campaign)
    // console.log('SUMMARY (ownerId):', campaign.ownerId)
    // console.log('SUMMARY (extSlug):', campaign.extSlug)

    /* Retrieve (stored) asset. */
    const asset = getters.getAsset(
        campaign.ownerId, campaign.extSlug, 'summary')
    // console.log('SUMMARY (asset):', asset)

    /* Return asset. */
    return asset
}

/* Export module. */
export default getSummary

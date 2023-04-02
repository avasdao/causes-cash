/**
 * Get Campaign Display
 */
const getCampaignDisplay = (state) => {
    /* Validate state. */
    if (!state || !state.campaignDisplay) {
        return null
    }

    /* Initialize campaign display. */
    const campaignDisplay = state.campaignDisplay

    /* Return campaign display. */
    return campaignDisplay
}

/* Export module. */
export default getCampaignDisplay

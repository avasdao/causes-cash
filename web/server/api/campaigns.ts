export default defineEventHandler(() => {
    /* Initialize campaigns. */
    const campaigns = []

    campaigns.push({
        id: '1',
        owner: 'nexa:nqt...',
        title: 'Test Campaign',
        createdAt: 1234567890,
    })

    /* Return campaigns. */
    return campaigns
})

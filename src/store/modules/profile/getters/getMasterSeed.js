/**
 * Get Master Seed
 */
const getMasterSeed = (state) => {
    /* Validate state. */
    if (!state || !state.masterSeed) {
        return null
    }

    /* Return master seed. */
    try {
        return Buffer.from(state.masterSeed, 'hex')
    } catch (err) {
        throw new Error('Could NOT read your master seed.')
    }
}

/* Export module. */
export default getMasterSeed

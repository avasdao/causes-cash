/**
 * Get Master Seed
 */
const getMasterSeed = (state) => {
    /* Legacy wallet format compatiblity. */
    if (state.masterSeed.length === 64) { // DEPRECATED on 2020.6.16
        return Buffer.from(state.masterSeed, 'hex')
    } else {
        return Buffer.from(state.masterSeed)
    }
}

/* Export module. */
export default getMasterSeed

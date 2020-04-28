/**
 * Set Master Seed
 *
 * This is the user's primary (private key) seed.
 */
const setMasterSeed = (state, _seed) => {
    /* Set master seed. */
    state.masterSeed = _seed
}

/* Export module. */
export default setMasterSeed

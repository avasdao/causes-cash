/**
 * Destroy Profile
 *
 * This will completely destory the user's profile.
 */
const destroyProfile = (state) => {
    /* Reset flags. */
    state.flags = null

    /* Reset locale. */
    state.locale = null

    /* Reset master seed. */
    state.masterSeed = null
}

/* Export module. */
export default destroyProfile

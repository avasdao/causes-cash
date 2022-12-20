/**
 * Destroy Profile
 *
 * This will completely destory the user's profile.
 */
const destroyProfile = (state) => {
    /* Reset email. */
    state.email = null

    /* Reset master seed. */
    state.masterSeed = null

    /* Reset metadata. */
    state.meta = null

    /* Reset nickname. */
    state.nickname = null
}

/* Export module. */
export default destroyProfile

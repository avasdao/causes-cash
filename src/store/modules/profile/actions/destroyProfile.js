/**
 * Destroy Profile
 */
const destroyProfile = ({ commit }) => {
    console.info('Destroying profile...')

    /* Commit empty wallet. */
    commit('setEmptyProfile')
}

/* Export module. */
export default destroyProfile

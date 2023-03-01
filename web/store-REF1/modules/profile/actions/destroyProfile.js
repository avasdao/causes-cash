/**
 * Destroy Profile
 */
const destroyProfile = ({ commit }) => {
    console.info('Destroying profile...') // eslint-disable-line no-console

    /* Commit empty wallet. */
    commit('setEmptyProfile')
}

/* Export module. */
export default destroyProfile

/**
 * Update Flags
 */
const updateFlags = ({ commit }, _flags) => {
    /* Commit flags. */
    commit('setFlags', _flags)
}

/* Export module. */
export default updateFlags

/**
 * Update Metadata
 */
const updateMeta = ({ commit }, _meta) => {
    /* Commit metadata. */
    commit('setMeta', _meta)
}

/* Export module. */
export default updateMeta

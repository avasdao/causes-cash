/**
 * Update Outbox
 */
const updateOutbox = ({ commit }, _outbox) => {
    /* Commit outbox. */
    commit('setOutbox', _outbox)
}

/* Export module. */
export default updateOutbox

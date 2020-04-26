/**
 * Make Error Message
 */
const displayError = ({ commit }, _error) => {
    /* Commit error message. */
    commit('setError', _error)

    /* Set automatic dismiss delay. */
    setTimeout(() => {
        commit('setError', null)
    }, 7000)
}

/* Export module. */
export default displayError

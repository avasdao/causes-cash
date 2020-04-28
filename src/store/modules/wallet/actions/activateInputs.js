/**
 * Activate Inputs
 */
const activateInputs = ({ commit }, _params) => {
    console.info('Activating inputs...', _params)

    /* Commit activated input. */
    commit('setInputs', 'a')
}

/* Export module. */
export default activateInputs

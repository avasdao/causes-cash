/**
 * Activate Accounts
 */
const activateAccounts = ({ commit }, _params) => {
    console.info('Activating accounts...', _params)

    /* Commit activated account. */
    commit()
    // commit('setAccounts', 'a')
}

/* Export module. */
export default activateAccounts

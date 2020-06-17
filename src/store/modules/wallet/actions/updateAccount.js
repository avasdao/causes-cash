/**
 * Update Accounts
 */
const updateAccounts = ({ commit, getters }, _params) => {
    console.info('Updating accounts...', _params)

    /* Set wallet. */
    const wallet = _params.wallet
    console.log('WALLET', wallet)

    /* Set (account) action. */
    const action = _params.action
    console.log('ACCOUNT ACTION', action)

    /* Set (account) indexes. */
    const indexes = _params.indexes
    console.log('ACCOUNT INDEXES', indexes)

    /* Retreive accounts. */
    const accounts = getters.getAccounts
    console.log('ALL ACCOUNTS', accounts)

    /* Retrieve wallet accounts. */
    const walletAccounts = getters.getAccountsByWallet(wallet)
    console.log('WALLET ACCOUNTS', walletAccounts)

    /* Disable applicable account indexes. */
    // FIXME: Do we verify here, OR in `sendCrypto`??
    indexes.forEach(index =>  {
        switch(action) {
        case 'activate':
            walletAccounts[index].s = 'a'
            break
        case 'disable':
            walletAccounts[index].s = 'd'
            break
        case 'lock':
            walletAccounts[index].s = 'l'
            break
        }
    })

    /* Update accounts. */
    accounts[wallet] = walletAccounts

    /* Commit updated accounts. */
    commit('setAccounts', accounts)
}

/* Export module. */
export default updateAccounts

/**
 * Get Wallet Accounts
 *
 * Returns (addresses for) ALL (in-use) receiving accounts.
 */
const getAccountsByWallet = (state, getters) => (_wallet) => {
    /* Validate accounts. */
    if (!getters.getAccounts) {
        return null
    }

    /* Initialize accounts. */
    const accounts = getters.getAccounts

    /* Initialize (wallet) accounts. */
    const walletAccounts = accounts[_wallet]

    /* Return (wallet) accounts. */
    return walletAccounts
}

/* Export module. */
export default getAccountsByWallet

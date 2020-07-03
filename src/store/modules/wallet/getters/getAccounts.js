/* Import modules. */
const Nito = require('nitojs')

/**
 * Load (Derivation) Path
 */
const loadPath = (_getters, _accounts, _chainId, _acctIdx) => {
    /* Initialize HD node. */
    const hdNode = _getters.getHDNode

    /* Set derivation path. */
    const path = _getters.getDerivationPath(_chainId, _acctIdx)
    // console.log('GET ACCOUNTS (path)', path)

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set WIF. */
    const wif = childNode.privateKey.toWIF()

    /* Set account (address). */
    const address = Nito.Address.toCashAddress(childNode)
    // console.log('GET ACCOUNTS (address)', address)

    /* Add to all receiving (pool). */
    _accounts.push({
        chainId: _chainId,
        address,
        wif,
    })

}

/**
 * Get Accounts
 *
 * Returns the full accounts for the wallet. This will return coin details
 * (incl. index and WIF) for ALL derivation paths in-use for a wallet.
 */
const getAccounts = (state, getters) => {
    /* Initialize accounts. */
    const accounts = []

    /* Validate wallet. */
    if (!getters.getWallet) {
        return null
    }

    /* Initialize wallet. */
    const wallet = getters.getWallet
    // console.log('GET ACCOUNTS (wallet):', wallet)

    /* Loop through ALL (deposit) indexes (inclusive). */
    for (let i = 0; i <= wallet.accounts.deposit; i++) {
        loadPath(getters, accounts, 0, i)
    }

    /* Loop through ALL (change) indexes (inclusive). */
    for (let i = 0; i <= wallet.accounts.change; i++) {
        loadPath(getters, accounts, 1, i)
    }

    /* Loop through ALL (change) indexes (inclusive). */
    for (let i = 0; i <= wallet.accounts.change; i++) {
        loadPath(getters, accounts, 6767, i)
    }

    /* Loop through ALL (change) indexes (inclusive). */
    for (let i = 0; i <= wallet.accounts.change; i++) {
        loadPath(getters, accounts, 7867, i)
    }
    // console.log('GET ACCOUNTS (accounts):', accounts)

    /* Return accounts. */
    return accounts
}

/* Export module. */
export default getAccounts

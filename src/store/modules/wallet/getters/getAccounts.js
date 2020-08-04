/* Import modules. */
import msgpack from 'msgpack-lite'
import Nito from 'nitojs'

/**
 * Load (Derivation) Path
 */
const loadPath = (_getters, _accounts, _chainId, _acctIdx) => {
    /* Set derivation path. */
    const path = _getters.getDerivationPath(_chainId, _acctIdx)
    // console.log('GET ACCOUNTS (path)', path)

    /* Initialize HD node. */
    const hdNode = _getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set account (address). */
    const address = Nito.Address.toCashAddress(childNode)
    // console.log('GET ACCOUNTS (address)', address)

    /* Set WIF. */
    const wif = childNode.privateKey.toWIF()

    /* Add to all receiving (pool). */
    _accounts.push({
        acctIdx: _acctIdx,
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
    /* Validate state. */
    if (!state || !state.accounts) {
        return null
    }

    /* Initialize accounts. */
    const accounts = []

    /* Initialize account indexes. */
    const acctIndexes = msgpack.decode(Buffer.from(state.accounts, 'hex'))

    /* Loop through ALL (deposit) indexes (inclusive). */
    for (let i = 0; i <= acctIndexes.deposit; i++) {
        loadPath(getters, accounts, 0, i)
    }

    /* Loop through ALL (change) indexes (inclusive). */
    for (let i = 0; i <= acctIndexes.change; i++) {
        loadPath(getters, accounts, 1, i)
    }

    /* Loop through ALL (causes) indexes (inclusive). */
    for (let i = 0; i <= acctIndexes.causes; i++) {
        loadPath(getters, accounts, 6767, i)
    }

    /* Loop through ALL (nito) indexes (inclusive). */
    for (let i = 0; i <= acctIndexes.nito; i++) {
        loadPath(getters, accounts, 7867, i)
    }
    // console.log('GET ACCOUNTS (accounts):', accounts)

    /* Return accounts. */
    return accounts
}

/* Export module. */
export default getAccounts

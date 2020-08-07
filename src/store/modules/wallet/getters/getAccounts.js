/* Import modules. */
import msgpack from 'msgpack-lite'
import Nito from 'nitojs'

/**
 * Load (Derivation) Path
 */
const loadPath = (_getters, _accounts, _chainid, _acctIdx) => {
    /* Set derivation path. */
    const path = _getters.getDerivationPath(_chainid, _acctIdx)
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
        chainid: _chainid,
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
    if (!state || !state.indicies) {
        throw new Error('Current state is invalid. Missing `wallet.indicies`.')
    }

    /* Initialize accounts. */
    const accounts = []

    /* Initialize account indicies. */
    const acctIndexes = msgpack.decode(Buffer.from(state.indicies, 'hex'))

    /* Loop through ALL (deposit) indicies (inclusive). */
    for (let i = 0; i <= acctIndexes.deposit; i++) {
        loadPath(getters, accounts, 0, i)
    }

    /* Loop through ALL (change) indicies (inclusive). */
    for (let i = 0; i <= acctIndexes.change; i++) {
        loadPath(getters, accounts, 1, i)
    }

    /* Loop through ALL (causes) indicies (inclusive). */
    for (let i = 0; i <= acctIndexes.causes; i++) {
        loadPath(getters, accounts, 6767, i)
    }

    /* Loop through ALL (nito) indicies (inclusive). */
    for (let i = 0; i <= acctIndexes.nito; i++) {
        loadPath(getters, accounts, 7867, i)
    }
    // console.log('GET ACCOUNTS (accounts):', accounts)

    /* Return accounts. */
    return accounts
}

/* Export module. */
export default getAccounts

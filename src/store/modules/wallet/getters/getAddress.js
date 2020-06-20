/* Import modules. */
const Nito = require('nitojs')

/**
 * Get Address
 *
 * Returns the next avaialble "receiving" address.
 */
const getAddress = (state, getters) => {
    // console.log('GET ADDRESS BY SESSION (sessionid)', _sessionId)
    /* Validate accounts. */
    if (!getters.getAccounts) {
        return null
    }

    /* Initialize accounts. */
    const accounts = getters.getAccounts
    // console.log('GET ADDRESS BY SESSION (accounts):', accounts)

    /* Initialize current (coin) index. */
    const currentIndex = accounts.deposit
    // console.log('GET ADDRESS BY SESSION (currentIndex):', currentIndex)

    /* Set chain. */
    const chain = 0 // receiving account

    /* Set derivation path. */
    const path = getters.getDerivationPath(chain, currentIndex)
    // console.log('GET ADDRESS BY SESSION (path)', path)

    /* Initialize HD node. */
    const hdNode = getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set (receiving) addresss. */
    const addresss = Nito.Address.toCashAddress(childNode)
    // console.log('GET ADDRESS BY SESSION (receiving addresss)', addresss)

    /* Return addresss. */
    return addresss
}

/* Export module. */
export default getAddress

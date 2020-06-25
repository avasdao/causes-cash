/* Import modules. */
const Nito = require('nitojs')

/**
 * Get Address
 *
 * Returns the next avaialble "receiving" address.
 */
const getAddress = (state, getters) => {
    /* Validate wallet. */
    if (!getters.getWallet) {
        return null
    }

    /* Initialize wallet. */
    const wallet = getters.getWallet
    // console.log('GET ADDRESS (wallet):', wallet)

    /* Set accounts. */
    const accounts = wallet.accounts

    /* Validate accounts. */
    if (!accounts) {
        return null
    }

    /* Initialize current (coin) index. */
    const currentIndex = accounts.deposit
    // console.log('GET ADDRESS (currentIndex):', currentIndex)

    /* Set chain. */
    const chain = 0 // receiving account

    /* Set derivation path. */
    const path = getters.getDerivationPath(chain, currentIndex)
    // console.log('GET ADDRESS (path)', path)

    /* Initialize HD node. */
    const hdNode = getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set (receiving) addresss. */
    const addresss = Nito.Address.toCashAddress(childNode)
    // console.log('GET ADDRESS (receiving addresss)', addresss)

    /* Return addresss. */
    return addresss
}

/* Export module. */
export default getAddress

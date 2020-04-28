/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Get (Wallet) Address
 *
 * Returns the next avaialble "receiving" (account) address,
 * for the specified wallet type.
 *
 * TODO: Add support for ALL wallet types: BAI, BCH, DAI, NITO
 */
const getAddress = (state, getters) => (_wallet) => {
    /* Validate accounts. */
    if (!getters.getAccountsByWallet(_wallet)) {
        return null
    }

    /* Initialize (wallet) accounts. */
    const walletAccounts = getters.getAccountsByWallet(_wallet)

    /* Initialize current (account) index. */
    const currentIndex = Math.max(...Object.keys(walletAccounts))

    // FIXME
    const change = 0

    /* Set derivation path. */
    const path = `${getters.getDerivationPath(_wallet)}/${change}/${currentIndex}`
    // console.log('GET ADDRESS (path)', path)

    /* Initialize HD node. */
    const hdNode = getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.derivePath(path)

    /* Set (receiving) address. */
    const address = bitbox.HDNode.toCashAddress(childNode)
    // console.log('GET ADDRESS (receiving address)', address)

    /* Return address. */
    return address
}

/* Export module. */
export default getAddress

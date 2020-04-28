/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Get (Account) Addresses
 *
 * Returns (addresses for) ALL (in-use) receiving accounts.
 */
const getAddresses = (state, getters) => (_wallet) => {
    /* Validate accounts. */
    if (!getters.getAccountsByWallet(_wallet)) {
        return null
    }

    /* Initialize (wallet) accounts. */
    const walletAccounts = getters.getAccountsByWallet(_wallet)

    /* Initialize addresses. */
    const addresses = []

    /* Add all active receiving account (addresses) to pool. */
    Object.keys(walletAccounts).forEach(index => {
        /* Initialize HD node. */
        const hdNode = getters.getHDNode

        // FIXME
        const change = 0

        /* Set derivation path. */
        const path = `${getters.getDerivationPath(_wallet)}/${change}/${index}`
        // console.log('GET ADDRESSES (path)', path)

        /* Initialize child node. */
        const childNode = hdNode.derivePath(path)

        const address = bitbox.HDNode.toCashAddress(childNode)
        // console.log('GET ADDRESSES (address)', address)

        /* Add to all receiving (pool). */
        addresses.push({
            address,
            index
        })
    })

    /* Return addresses. */
    return addresses
}

/* Export module. */
export default getAddresses

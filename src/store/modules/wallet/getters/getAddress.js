/* Import modules. */
import Nito from 'nitojs'

/**
 * Get Address
 *
 * Returns the next avaialble "receiving" address.
 */
const getAddress = (state, getters) => (_account) => {
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
    const currentIndex = accounts[_account]
    // console.log('GET ADDRESS (currentIndex):', currentIndex)

    /* Initialize chain. */
    let chain = null

    /* Select chain. */
    switch(_account) {
    case 'deposit':
        chain = 0
        break
    case 'change':
        chain = 1
        break
    case 'causes':
        chain = 6767
        break
    case 'nito':
        chain = 7867
        break
    }

    /* Validate chain. */
    if (chain === null) {
        return null
    }

    /* Set derivation path. */
    const path = getters.getDerivationPath(chain, currentIndex)
    // console.log('GET ADDRESS (path)', path)

    /* Initialize HD node. */
    const hdNode = getters.getHDNode

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set (receiving) address. */
    const address = Nito.Address.toCashAddress(childNode)
    // console.log('GET ADDRESS (receiving address)', address)

    /* Return address. */
    return address
}

/* Export module. */
export default getAddress

/* Import modules. */
import Nito from 'nitojs'

/**
 * Get Address
 */
const getAddress = (state, getters, rootState, rootGetters) => {
    /* Validate accounts. */
    if (!rootGetters['wallet/getAccounts']) {
        return null
    }

    /* Request accounts. */
    const accounts = rootGetters['wallet/getAccounts']

    /* Validate accounts. */
    if (!accounts) {
        return null
    }

    /* Set profile index. */
    const profileIndex = 0

    /* Set chain. */
    const chain = 0 // receiving account

    /* Set derivation path. */
    const path = rootGetters['wallet/getDerivationPath'](chain, profileIndex)

    /* Initialize HD node. */
    const hdNode = rootGetters['wallet/getHDNode']

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set (profile) address. */
    const address = Nito.Address.toCashAddress(childNode)

    /* Return profile address. */
    return address
}

/* Export module. */
export default getAddress

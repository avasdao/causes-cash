/* Import modules. */
import moment from 'moment'
const Nito = require('nitojs')

/**
 * Get Signed Message
 */
const getSignedMessage = (state, getters, rootState, rootGetters) => (_message) => {
    /* Validate message. */
    if (!_message || !(typeof _message === 'string')) {
        throw new Error('Signed message MUST be a string.')
    }

    /* Validate wallet. */
    if (!rootGetters['wallet/getWallet']) {
        return null
    }

    /* Initialize wallet. */
    const wallet = rootGetters['wallet/getWallet']
    // console.log('GET ADDRESS (wallet):', wallet)

    /* Set accounts. */
    const accounts = wallet.accounts

    /* Validate accounts. */
    if (!accounts) {
        return null
    }

    /* Set profile index. */
    const profileIndex = 0
    // console.log('GET ADDRESS (profileIndex):', profileIndex)

    /* Set chain. */
    const chain = 0 // receiving account

    /* Set derivation path. */
    const path = rootGetters['wallet/getDerivationPath'](chain, profileIndex)
    // console.log('GET ADDRESS (path)', path)

    /* Initialize HD node. */
    const hdNode = rootGetters['wallet/getHDNode']

    /* Initialize child node. */
    const childNode = hdNode.deriveChild(path)

    /* Set (profile) address. */
    const address = Nito.Address.toCashAddress(childNode)
    // console.log('GET SIGNED MESSAGE (address):', address)

    /* Set WIF. */
    const wif = childNode.privateKey.toWIF()
    // console.log('GET SIGNED MESSAGE (wif):', wif)

    /* Request signature. */
    const signature = Nito.Message.sign(_message, wif)
    // console.log('GET SIGNED MESSAGE (signature):', signature)

    /* Set nonce. */
    const nonce = moment().unix()
    // console.log('NONCE', nonce)

    /* Build package. */
    const pkg = {
        message: _message,
        address,
        signature,
        nonce,
    }
    // console.log('GET SIGNED MESSAGE (pkg):', pkg)

    /* Return signature package. */
    return pkg
}

/* Export module. */
export default getSignedMessage

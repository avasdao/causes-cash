/* Import modules. */
import msgpack from 'msgpack-lite'
import Nito from 'nitojs'
import superagent from 'superagent'

/**
 * Decrypt
 *
 * Recovers the plaintext string from AES-256-CBC encrypted message.
 */
function _decrypt(_encrypted, _key) {
    /* Set initilization vector. */
    const iv = Buffer.from(_encrypted.iv, 'hex')

    const encryptedText = Buffer.from(_encrypted.body, 'hex')

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(_key), iv)

    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    /* Return decrypted string. */
    return decrypted.toString()
}

/**
 * Get Metadata
 */
const getMeta = async (state, getters, rootState, rootGetters) => {
    /* Validate state. */
    if (!state || !state.meta) {
        // TODO: Attempt to retrieve metadata from cloud.

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

        /* Set target. */
        const target = `http://localhost:6767/v1/meta/${address}`
        // const target = `https://api.causes.cash/v1/meta/${address}`

        /* Set contract path. */
        const response = await superagent.get(target)
        console.log('GET META', response)

        const key = getters.getMasterSeed
        console.log('MASTER SEED (key)', key)
        console.log('GET META (decrypted)', _decrypt(response, key))

        return null
    } else {
        /* Return metadata. */
        return msgpack.decode(Buffer.from(state.meta, 'hex'))
    }
}

/* Export module. */
export default getMeta

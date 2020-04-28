/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Get HD Node
 */
const getHDNode = (state, getters, rootState, rootGetters) => {
    // console.log('GET HD NODE (rootGetters)', rootGetters)

    /* Set master seed. */
    const masterSeed = rootGetters['profile/getMasterSeed']

    /* Set locale. */
    const locale = rootGetters['profile/getLocale']

    /**
     * Create mnemonic wordlist using BIP-39.
     * (https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
     *
     * Available languages are:
     *   01. English
     *   02. Japanese
     *   03. Korean
     *   04. Spanish
     *   05. Chinese (Simplified)
     *   06. Chinese (Traditional)
     *   07. French
     *   08. Italian
     *   09. Czech
     */
    let language = null

    /* Handle language selection. */
    switch(locale) {
    case 'en-US':
        language = bitbox.Mnemonic.wordLists()['english']
        break
    default:
        language = bitbox.Mnemonic.wordLists()['english']
    }

    /* Initialize mnemonic. */
    const mnemonic = bitbox.Mnemonic.fromEntropy(masterSeed, language)
    // console.log('MNEMONIC', mnemonic)

    /* Initialize seed buffer. */
    const seedBuffer = bitbox.Mnemonic.toSeed(mnemonic)
    // console.log('SEED BUFFER', seedBuffer)

    /* Initialize HD node. */
    const hdNode = bitbox.HDNode.fromSeed(seedBuffer)
    // console.log('HD NODE', hdNode)

    /* Return HD node. */
    return hdNode
}

/* Export module. */
export default getHDNode

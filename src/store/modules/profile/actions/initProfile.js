/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Initialize Wallet
 */
const initProfile = async ({ state, commit }) => {
    /* Validate profile. */
    if (state.masterSeed) {
        console.info('Profile already exists.') // eslint-disable-line no-console

        /* Cancel initialization. */
        return
    } else {
        console.info('Initializing NEW profile...') // eslint-disable-line no-console
    }

    /**
     * Master Seed
     *
     * Generate a wallet master seed from random bytes.
     *
     * !!! WARNING !!! WARNING !!! WARNING !!!
     * We MUST properly evaluate ANY and ALL weaknesses with
     * using randomBytes via a ("mobile") web browser.
     */
    const masterSeed = bitbox.Crypto.randomBytes(32).toString('hex')

    /* Set new master (private) key. */
    commit('setMasterSeed', masterSeed)
}

/* Export module. */
export default initProfile

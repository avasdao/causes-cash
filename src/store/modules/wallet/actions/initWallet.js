/* Import modules. */
const moment = require('moment')
const Nito = require('nitojs')

/**
 * Initialize Wallet
 */
const initWallet = ({ state, commit }) => {
    console.info('Initializing wallet...') // eslint-disable-line no-console

    /* Validate wallet. */
    if (state.masterSeed) {
        console.info('Wallet already exists.') // eslint-disable-line no-console

        /* Cancel initialization. */
        return false
    } else {
        console.info('Initializing NEW wallet...') // eslint-disable-line no-console
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
    const masterSeed = Nito.Crypto.randomBytes(32)

    /* Set new master (private) key. */
    commit('setMasterSeed', masterSeed)

    /* Build metadata. */
    const meta = {
        label: 'My Causes Wallet',
        createdAt: moment().unix(),
    }

    /* Set metadata. */
    commit('setMeta', meta)

    /* Return success. */
    return true
}

/* Export module. */
export default initWallet

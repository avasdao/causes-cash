/* Import modules. */
const moment = require('moment')

/**
 * Initialize Wallet
 */
const initWallet = ({ commit }) => {
    console.info('Initializing wallet...') // eslint-disable-line no-console

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

/**
 * Destroy Wallet
 */
const destroyWallet = ({ commit }) => {
    console.info('Destroying wallet...')

    /* Commit empty wallet. */
    commit('setEmptyWallet')
}

/* Export module. */
export default destroyWallet

/**
 * Destroy Wallet
 *
 * This will completely destory the user's wallet.
 */
const destroyWallet = (state) => {
    /* Reset metadata. */
    state.meta = null

    /* Reset wallet. */
    state.wallet = null
}

/* Export module. */
export default destroyWallet

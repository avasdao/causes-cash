/**
 * Destroy Wallet
 *
 * This will completely destory the user's wallet.
 */
const destroyWallet = (state) => {
    /* Reset accounts. */
    state.accounts = null

    /* Reset metadata. */
    state.meta = null
}

/* Export module. */
export default destroyWallet

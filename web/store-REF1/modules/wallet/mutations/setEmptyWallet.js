/**
 * Destroy Wallet
 *
 * This will completely destory the user's wallet.
 */
const destroyWallet = (state) => {
    /* Reset accounts. */
    state.accounts = null

    /* Reset coins. */
    state.coins = null

    /* Reset inbox. */
    state.inbox = null

    /* Reset outbox. */
    state.outbox = null

    /* Reset wallet. */
    // DEPRECATED on 20.8.4
    state.wallet = null
}

/* Export module. */
export default destroyWallet

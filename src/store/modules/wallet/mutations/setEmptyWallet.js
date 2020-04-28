/**
 * Destroy Wallet
 *
 * This will completely destory the user's wallet,
 * as well as ALL imported seeds.
 */
const destroyWallet = (state) => {
    /* Reset accounts. */
    state.a = null

    /* Reset imported seeds. */
    state.is = null

    /* Reset metadata. */
    state.m = null
}

/* Export module. */
export default destroyWallet

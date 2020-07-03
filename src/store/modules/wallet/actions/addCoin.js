/**
 * Add Coin
 *
 * Adds new coin details to its respective session.
 */
const addCoin = ({ commit, getters }, _pkg) => {
    console.info('Adding new coin...', _pkg) // eslint-disable-line no-console

    /* Set chain id. */
    const chainId = _pkg.chainId
    // console.log('ADD NEW COIN (chainid):', chainId)

    /* Set coin. */
    const coin = _pkg.coin
    // console.log('ADD NEW COIN (coin):', coin)

    /* Set wallet. */
    const wallet = getters.getWallet
    // console.log('ADD NEW COIN (wallet):', wallet)

    /* Validate wallet. */
    if (!wallet) {
        return
    }

    /* Add coin to wallet. */
    wallet.coins[`${coin.txid}:${coin.vout}`] = coin

    /* Increment deposit account. */
    switch(chainId) {
    case 0:
        /* Increment deposit index. */
        wallet.accounts.deposit++
        break
    case 1:
        /* Increment change index. */
        wallet.accounts.change++
        break
    case 6767:
        /* Increment causes index. */
        wallet.accounts.causes++
        break
    case 7867:
        /* Increment nito index. */
        wallet.accounts.nito++
        break
    }

    /* Commit updated wallet`. */
    commit('setWallet', wallet)
}

/* Export module. */
export default addCoin

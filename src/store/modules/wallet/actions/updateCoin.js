/**
 * Update Coin
 *
 * Updates the status of a coin in its respective session.
 */
const updateCoin = ({ commit, getters }, _coin) => {
    console.info('Updating coin...', _coin) // eslint-disable-line no-console

    /* Set wallet. */
    const wallet = getters.getWallet
    // console.log('UPDATE COIN (wallet):', wallet)

    /* Validate wallet. */
    if (!wallet) {
        return
    }

    /* Add coin to session. */
    wallet.coins[`${_coin.txid}:${_coin.vout}`] = _coin

    /* Commit updated wallet. */
    commit('setWallet', wallet)
}

/* Export module. */
export default updateCoin

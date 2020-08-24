/**
 * Add Coin
 *
 * Adds new coin details to its respective session.
 */
const addCoin = ({ commit, getters }, _pkg) => {
    console.info('Adding new coin...', _pkg) // eslint-disable-line no-console

    /* Request indices. */
    const indices = getters.getIndices
    // console.log('ADD NEW COIN (indices):', indices)

    /* Validate indices. */
    if (!indices) {
        return
    }

    /* Set chain id. */
    const chainid = _pkg.chainid
    // console.log('ADD NEW COIN (chainid):', chainid)

    /* Increment deposit account. */
    switch(chainid) {
    case 0:
        /* Increment deposit index. */
        indices.deposit++
        break
    case 1:
        /* Increment change index. */
        indices.change++
        break
    case 6767:
        /* Increment causes index. */
        indices.causes++
        break
    case 7867:
        /* Increment nito index. */
        indices.nito++
        break
    }

    /* Request coins. */
    const coins = getters.getCoins
    // console.log('ADD NEW COIN (coins):', coins)

    /* Validate coins. */
    if (!coins) {
        return
    }

    /* Set coin. */
    const coin = _pkg.coin
    // console.log('ADD NEW COIN (coin):', coin)

    /* Add coin to wallet. */
    coins[`${coin.txid}:${coin.vout}`] = coin

    /* Commit updated indices`. */
    commit('setIndices', indices)

    /* Commit updated coins`. */
    commit('setCoins', coins)
}

/* Export module. */
export default addCoin

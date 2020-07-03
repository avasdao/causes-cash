/**
 * Update Coin
 *
 * Updates the status of a coin in its respective session.
 */
const updateCoin = ({ commit, getters }, _pkg) => {
    console.info('Updating coin...', _pkg) // eslint-disable-line no-console

    /* Set session id. */
    const sessionId = _pkg.sessionId
    console.log('UPDATE COIN (sessionid):', sessionId)

    /* Set coin. */
    const coin = _pkg.coin
    console.log('UPDATE COIN (coin):', coin)

    /* Set sessions. */
    const sessions = getters.getSessions
    console.log('UPDATE COIN (sessions):', sessions)

    /* Validate session id. */
    if (!sessions[sessionId]) {
        return
    }

    /* Add coin to session. */
    sessions[sessionId].coins[`${coin.txid}:${coin.vout}`] = coin

    /* Commit updated sessions. */
    commit('setSessions', sessions)
}

/* Export module. */
export default updateCoin

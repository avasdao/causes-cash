/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * (Request) Next Account Address
 * FIXME: We need a better way to detect the use of "change"
 *        addresses; so NOT to waste (un-)used accounts.
 */
const nextAccount = ({ commit, state }, _wallet) => {
    console.info('Incrementing account index...') // eslint-disable-line no-console

    /* Initialize accounts. */
    const accounts = msgpack.decode(Buffer.from(state.a))

    /* Set accounts (from wallet pool). */
    const walletAccounts = accounts[_wallet]

    /* Set current (active index). */
    const currentIndex = Math.max(...Object.keys(walletAccounts))

    /* Set next account index. */
    const nextIndex = currentIndex + 1

    /* Add next index to active accounts (pool). */
    walletAccounts[nextIndex] = {
        s: 'a',
        u: {},
    }

    /* Update accounts. */
    accounts[_wallet] = walletAccounts

    /* Commit (updated) accounts. */
    commit('setAccounts', accounts)
}

/* Export module. */
export default nextAccount

/* Import modules. */
const Nito = require('nitojs')

/**
* Get Balance by Session Id
*
* Retrieves the current (total) session balance.
*
* NOTE: Optional (market price) parameter is used to calculate fiat value,
*       and return a "formatted" value package.
*/
const getBalanceBySessionId = (
    state, getters, rootState, rootGetters
) => async (_currency) => {
    /* Initialize (search) addresses. */
    const addresses = []

    // const wallet = getters.getWallet
    // console.log('GET BALANCE (wallet)', wallet)

    // FIXME: We currently ONLY retrieve balances for index 0.

    /* Set deposit address. */
    addresses.push(getters.getAddress('deposit'))

    /* Set change address. */
    addresses.push(getters.getAddress('change'))

    /* Set Causes address. */
    addresses.push(getters.getAddress('causes'))

    /* Add all active receiving account (addresses) to pool. */
    // Object.keys(coins).forEach(txid => {
    //     /* Add to all receiving (pool). */
    //     addresses.push(coins[txid].cashAddress)
    // })
    // console.log('GET BALANCE (all accounts)', addresses)

    /* Validate search accounts. */
    if (!addresses && addresses.length) {
        return 0
    }

    /* Initialize balance. */
    let balance = 0

    /* Loop through all address. */
    // FIXME: We do not use for-each with callback here because of async.
    for (let i = 0; i < addresses.length; i++) {
        /* Set address. */
        const address = addresses[i]

        /* Retrieve (address) balances. */
        const balances = await Nito.Address.balance(address)

        /* Check unconfirmed flag. */
        if (rootGetters['getFlags'].unconfirmed) {
            balance += (balances.confirmed + balances.unconfirmed)
        } else {
            balance += balances.confirmed
        }
    }

    /* Retrieve market price. */
    const marketPrice = await Nito.Markets.getTicker('BCH', _currency)
    console.info(`Market price (${_currency})`, marketPrice) // eslint-disable-line no-console

    /* Validate market price. */
    if (marketPrice) {
        /* Format balance (for display). */
        // TODO: Support additional currencies.
        const formattedBalance =
            rootGetters['utils/getFormattedValue'](balance, marketPrice, 'USD')

        /* Return (formatted) balance. */
        return formattedBalance
    } else {
        /* Return (empty) balance. */
        return null
    }
}

/* Export module. */
export default getBalanceBySessionId

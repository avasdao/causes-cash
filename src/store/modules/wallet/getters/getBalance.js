/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
* Get (Total Wallet) Balance
*
* Retrieves the current (total) wallet balance.
*
* NOTE: Optional (market price) parameter is used to calculate fiat value,
*       and return a "formatted" value package.
*/
const getBalance = (state, getters, rootState, rootGetters) => async (_wallet, _currency) => {
    /* Validate (wallet) accounts. */
    if (!getters.getAccountsByWallet(_wallet)) {
        return null
    }

    /* Initialize account addresses. */
    const addresses = []

    /* Add all active receiving account (addresses) to pool. */
    Object.keys(getters.getAccountsByWallet(_wallet)).forEach(index => {
        /* Initialize HD node. */
        const hdNode = getters.getHDNode

        // FIXME
        const change = 0

        /* Set derivation path. */
        const path = `${getters.getDerivationPath(_wallet)}/${change}/${index}`
        // console.log('GET BALANCE (path)', path)

        /* Initialize child node. */
        const childNode = hdNode.derivePath(path)

        const address = bitbox.HDNode.toCashAddress(childNode)
        // console.log('GET WALLET BALANCE (receiving address)', address)

        /* Add to all receiving (pool). */
        addresses.push(address)
    })
    console.log('GET WALLET BALANCE (all accounts)', addresses)

    try {
        /* Initialize balance. */
        let balance = 0

        /* Retrieve (ALL) account(s) details. */
        const details = await bitbox.Address.details(addresses)
        // console.log('ALL ACCOUNTS DETAILS', JSON.stringify(details, null, 4))

        /* Validate (use of) unconfirmed transactions. */
        if (rootGetters['profile/getFlags'] && rootGetters['profile/getFlags'].ut) {
            details.forEach((address) => {
                /* Both confirmed and unconfirmed. */
                balance += (address.balanceSat + address.unconfirmedBalanceSat)
            })
        } else {
            details.forEach((address) => {
                /* Confirmed ONLY. */
                balance += address.balanceSat
            })
        }

        /* Retrieve market price. */
        const marketPrice =
            await rootGetters['blockchain/getTicker'](_wallet, _currency)
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
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default getBalance

/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Initialize Wallet
 */
const initWallet = async ({ dispatch, getters }) => {
    console.info('Initializing wallet...') // eslint-disable-line no-console

    const currentAddress = getters.getAddress('BCH')
    console.log('CURRENT ADDRESS', currentAddress)

    /* Validate current address. */
    if (!currentAddress) {
        return
    }

    /* Retrieve (ALL) account(s) details. */
    const details = await bitbox.Address.details(currentAddress)
    // console.log('CURRENT ADDRESS (details)', details)

    /* Set transactions count. */
    const numTxs = details.transactions.length

    /* Validate (account) address usage. */
    if (numTxs > 0) {
        console.info('A new receiving address will be generated now...') // eslint-disable-line no-console

        /* Request next (receiving account) address. */
        dispatch('nextAccount', 'BCH')
    }
}

/* Export module. */
export default initWallet

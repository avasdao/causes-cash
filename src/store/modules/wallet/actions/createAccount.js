/**
 * Create Account
 *
 * Adds a new account to the current purse.
 */
const createAccount = ({ commit, getters }) => {
    console.info('Creating a NEW account...') // eslint-disable-line no-console

    /**
     * Account Model
     *
     * Manages the indexes of account (addresses) and their respective
     * derivation paths.
     *
     * Deposit  : m/44'/145'/0'/0/<index>
     * Change   : m/44'/145'/0'/1/<index>
     * Reserved : m/44'/145'/0'/2/<index>
     *
     * NOTE: Reserved paths are used to "freeze" coins, for use with
     *       assurance contracts.
     */
    const accountModel = {
        deposit: 0,
        change: 0,
        reserved: 0,
    }

    /**
     * Wallet Model
     *
     * Status codes:
     *     active: Session address is ready to receive OR spend funds.
     *     disabled: Already received and spent funds (MUST be empty).
     *     locked: Session address is reserved OR has received funds currently
     *             being held in reserve for a later use.
     *             (eg. CashShuffle, CashFusion, ANYONECANPAY, etc)
     *
     * Coins are (UTXO) objects containing:
     *     - txid
     *     - vout
     *     - satoshis
     *     - wif (Wallet Import Format)
     *     - cashAddress
     *     - legacyAddress
     */
    const walletModel = {
        status: 'active',
        accounts: accountModel,
        coins: {},
    }

    try {
        /* Initialize accounts. */
        let accounts = getters.getAccounts

        /* Validate accounts. */
        if (accounts) {
            /* Set current (active index). */
            const currentIndex = Math.max(...Object.keys(accounts))

            /* Set next coin index. */
            const nextIndex = currentIndex + 1

            /* Add new account to model. */
            accounts[nextIndex] = accountModel

            /* Commit active account id. */
            commit('setActiveSessionId', nextIndex)
        } else {
            /* Initialize (first) account(s). */
            accounts = {
                0: accountModel,
            }

            /* Commit active account id. */
            commit('setActiveSessionId', 0)
        }

        /* Commit accounts. */
        commit('setAccounts', accounts)
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default createAccount

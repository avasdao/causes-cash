/**
 * Create Wallet
 */
const createWallet = ({ commit }) => {
    console.info('Creating a NEW wallet...') // eslint-disable-line no-console

    try {
        /**
         * (Wallet) Accounts Model
         *
         * (s) Status code
         * (u) Unspent transaction outputs (UTXOs)
         *
         * Status codes:
         *     (a) Active: Account address is ready to receive OR spend funds.
         *     (d) Disabled: Already received and spent funds (MUST be empty).
         *     (l) Locked: Account address is reserved OR has received funds
         *                 currently being held in reserve for a later use.
         *                 (eg. CashShuffle, CashFusion, ANYONECANPAY, etc)
         *
         * NOTE: Unspent transaction outputs (UTXOs) are objects containing the
         *       status (code) of ALL inputs held by the account.
         */
        const accountsModel = {
            /* Bitcoin Cash (BCH) */
            BCH: {
                0: {
                    s: 'a',
                    u: {},
                },
            },

            /* Ethereum (ETH) */
            ETH: {
                0: {
                    s: 'a',
                },
            },

            /* Simple Ledger Protocol (SLP) */
            SLP: {
                0: {
                    s: 'a',
                    u: {},
                },
            },
        }

        /* Initialize accounts. */
        commit('setAccounts', accountsModel)

        /* Initialize imported (wallet) seeds. */
        commit('setImportedSeeds', [])
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default createWallet

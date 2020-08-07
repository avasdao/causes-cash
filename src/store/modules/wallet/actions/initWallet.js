/**
 * Initialize Wallet
 */
const initWallet = ({ commit }) => {
    console.info('Initializing wallet...') // eslint-disable-line no-console

    /**
     * Coins Model
     *
     * Coins are (UTXO) objects containing:
     *     - txid
     *     - vout
     *     - satoshis
     *     - wif (Wallet Import Format)
     *     - cashAddress
     *     - legacyAddress
     *
     * Status codes:
     *     active: Session address is ready to receive OR spend funds.
     *     disabled: Already received and spent funds (MUST be empty).
     *     locked: Session address is reserved OR has received funds currently
     *             being held in reserve for a later use.
     *             (eg. CashShuffle, CashFusion, ANYONECANPAY, etc)
     *
     * NOTE: Reserved paths are used to "freeze" coins, for use with
     *       assurance contracts.
     */
    const coinsModel = {}

    /* Commit coins. */
    commit('setCoins', coinsModel)

    /**
     * Indicies Model
     *
     * Manages the indicies of account (addresses) and their respective
     * derivation paths.
     *
     * Deposit     : m/44'/145'/0'/0/<index>
     * Change      : m/44'/145'/0'/1/<index>
     * Causes Cash : m/44'/145'/0'/6767/<index>
     * Nito Cash   : m/44'/145'/0'/7867/<index>
     */
    const indiciesModel = {
        deposit: 0,
        change: 0,
        causes: 0,
        nito: 0,
    }

    /* Commit indicies. */
    commit('setIndicies', indiciesModel)

    /* Return success. */
    return true
}

/* Export module. */
export default initWallet

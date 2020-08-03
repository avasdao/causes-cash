/* Import modules (getters). */
import getAccounts from './wallet/getters/getAccounts'
import getAddress from './wallet/getters/getAddress'
import getBalance from './wallet/getters/getBalance'
import getChangeAddress from './wallet/getters/getChangeAddress'
import getDerivationPath from './wallet/getters/getDerivationPath'
import getDustAmount from './wallet/getters/getDustAmount'
import getHDNode from './wallet/getters/getHDNode'
import getHistory from './wallet/getters/getHistory'
import getMasterSeed from './wallet/getters/getMasterSeed'
import getMnemonic from './wallet/getters/getMnemonic'
import getWallet from './wallet/getters/getWallet'

/* Import modules (actions). */
import addCoin from './wallet/actions/addCoin'
import destroyWallet from './wallet/actions/destroyWallet'
import initWallet from './wallet/actions/initWallet'
import updateCoin from './wallet/actions/updateCoin'
import updateCoins from './wallet/actions/updateCoins'
import updateOutbox from './wallet/actions/updateOutbox'

/* Import modules (mutations). */
import setEmptyWallet from './wallet/mutations/setEmptyWallet'
import setWallet from './wallet/mutations/setWallet'

/* Initialize state. */
const state = {
    /**
     * Coins waiting to be sent out from the wallet.
     */
    outbox: null,

    /**
     * Wallet Accounts
     *
     * Deposit / receiving accounts are distributed to the public; and can
     * be pre-generated for specific purposes (eg. donation, invoice, etc).
     *
     * NOTE: Dedicated derivation paths are used for ALL deposited / received
     *       coins and tokens. The value (0) is the community standard for
     *       change accounts, therefore:
     *           - Coins: m/44'/145'/0'/0/<index>
     *           - Tokens: m/44'/245'/0'/0/<index>
     */
    wallet: null,
}

/* Getters. */
const getters = {
    getAccounts,
    getAddress,
    getBalance,
    getChangeAddress,
    getDerivationPath,
    getDustAmount,
    getHDNode,
    getHistory,
    getMasterSeed,
    getMnemonic,
    getWallet,
}

/* Actions. */
const actions = {
    addCoin,
    destroyWallet,
    initWallet,
    updateCoin,
    updateCoins,
    updateOutbox,
}

/* Mutations. */
const mutations = {
    setEmptyWallet,
    setWallet,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

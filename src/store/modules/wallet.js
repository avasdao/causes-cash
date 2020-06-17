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

/* Import modules (actions). */
import createAccount from './wallet/actions/createAccount'
import destroyWallet from './wallet/actions/destroyWallet'
import initWallet from './wallet/actions/initWallet'
import updateAccount from './wallet/actions/updateAccount'

/* Import modules (mutations). */
import setAccount from './wallet/mutations/setAccount'
import setEmptyWallet from './wallet/mutations/setEmptyWallet'
import setMeta from './wallet/mutations/setMeta'

/* Initialize state. */
const state = {
    /**
     * (Wallet) Account
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
    account: null,

    /**
     * Metadata
     *
     * Used to store (user-defined) data for:
     *     1. Individual accounts
     *     2. Individual unspent transaction outputs (UXTOs)
     *
     * NOTE: Metadata MUST be used sparingly, to avoid data storage bloat;
     *       and should be deleted when no longer needed.
     *
     * TODO: Allow this data to be stored on-chain using:
     *       1. Bitcoin Files Protocol (BFP) (https://bitcoinfiles.com/)
     *       2. Telr Locker (https://locker.telr.io)
     */
    meta: null,
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
}

/* Actions. */
const actions = {
    createAccount,
    destroyWallet,
    initWallet,
    updateAccount,
}

/* Mutations. */
const mutations = {
    setAccount,
    setEmptyWallet,
    setMeta,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

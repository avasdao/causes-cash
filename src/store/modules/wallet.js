/* Import modules (getters). */
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
import destroyWallet from './wallet/actions/destroyWallet'
import initWallet from './wallet/actions/initWallet'
import updateWallet from './wallet/actions/updateWallet'

/* Import modules (mutations). */
import setEmptyWallet from './wallet/mutations/setEmptyWallet'
import setMeta from './wallet/mutations/setMeta'
import setWallet from './wallet/mutations/setWallet'

/* Initialize state. */
const state = {
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
    destroyWallet,
    initWallet,
    updateWallet,
}

/* Mutations. */
const mutations = {
    setEmptyWallet,
    setMeta,
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

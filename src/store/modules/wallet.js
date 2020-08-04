/* Import modules (getters). */
import getAccounts from './wallet/getters/getAccounts'
import getAddress from './wallet/getters/getAddress'
import getBalance from './wallet/getters/getBalance'
import getChangeAddress from './wallet/getters/getChangeAddress'
// import getCoinById from './wallet/getters/getCoinById'
import getCoins from './wallet/getters/getCoins'
import getDerivationPath from './wallet/getters/getDerivationPath'
import getDustAmount from './wallet/getters/getDustAmount'
import getHDNode from './wallet/getters/getHDNode'
import getHistory from './wallet/getters/getHistory'
import getInbox from './wallet/getters/getInbox'
import getMnemonic from './wallet/getters/getMnemonic'
import getOutbox from './wallet/getters/getMnemonic'

/* Import modules (actions). */
import addCoin from './wallet/actions/addCoin'
import destroyWallet from './wallet/actions/destroyWallet'
import initWallet from './wallet/actions/initWallet'
import updateCoin from './wallet/actions/updateCoin'
import updateCoins from './wallet/actions/updateCoins'
import updateOutbox from './wallet/actions/updateOutbox'

/* Import modules (mutations). */
import setAccounts from './wallet/mutations/setAccounts'
import setCoins from './wallet/mutations/setCoins'
import setEmptyWallet from './wallet/mutations/setEmptyWallet'
import setInbox from './wallet/mutations/setInbox'
import setOutbox from './wallet/mutations/setOutbox'

/* Initialize state. */
const state = {
    /**
     * Accounts
     *
     * Manages the index of account addresses.
     */
    accounts: null,

    /**
     * Coins
     *
     * Manages coin info in an object:
     *   - status [ active | disabled | locked ]
     *   - txid
     *   - vout
     *   - satoshis
     *   - wif
     *   - cashAddress
     *   - legacyAddress
     */
    coins: null,

    /**
     * Inbox
     *
     * Requests waiting to be processed by the wallet.
     */
    inbox: null,

    /**
     * Outbox
     *
     * Coins waiting to be sent out from the wallet.
     */
    outbox: null,
}

/* Getters. */
const getters = {
    getAccounts,
    getAddress,
    getBalance,
    getChangeAddress,
    getCoins,
    getDerivationPath,
    getDustAmount,
    getHDNode,
    getHistory,
    getInbox,
    getMnemonic,
    getOutbox,
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
    setAccounts,
    setCoins,
    setEmptyWallet,
    setInbox,
    setOutbox,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

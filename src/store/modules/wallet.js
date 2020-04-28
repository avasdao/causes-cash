/* Import modules (getters). */
import getAccounts from './wallet/getters/getAccounts'
import getAccountsByWallet from './wallet/getters/getAccountsByWallet'
import getAddress from './wallet/getters/getAddress'
import getAddresses from './wallet/getters/getAddresses'
import getBalance from './wallet/getters/getBalance'
import getChangeAddress from './wallet/getters/getChangeAddress'
import getDerivationPath from './wallet/getters/getDerivationPath'
import getDustAmount from './wallet/getters/getDustAmount'
import getHDNode from './wallet/getters/getHDNode'
import getHistory from './wallet/getters/getHistory'
import getSignedInput from './wallet/getters/getSignedInput'

/* Import modules (actions). */
import activateAccounts from './wallet/actions/activateAccounts'
import activateInputs from './wallet/actions/activateInputs'
import addImportedSeed from './wallet/actions/addImportedSeed'
import createWallet from './wallet/actions/createWallet'
import destroyWallet from './wallet/actions/destroyWallet'
import initWallet from './wallet/actions/initWallet'
import nextAccount from './wallet/actions/nextAccount'
import sendCrypto from './wallet/actions/sendCrypto'
import updateAccounts from './wallet/actions/updateAccounts'
import updateInputs from './wallet/actions/updateInputs'

/* Import modules (mutations). */
import setAccounts from './wallet/mutations/setAccounts'
import setEmptyWallet from './wallet/mutations/setEmptyWallet'
import setImportedSeeds from './wallet/mutations/setImportedSeeds'
import setMetadata from './wallet/mutations/setMetadata'

/* Initialize state. */
const state = {
    /**
     * Active (Accounts)
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
    a: null,

    /**
     * Change (Accounts)
     *
     * Internal accounts that are kept private and are reserved for the
     * exclusive use of the wallet during transactions. Change accounts
     * are primarily used to receive "change", in the event that an entire
     * coin is NOT spent during a transaction.
     *
     * NOTE: Dedicated derivation paths are used for ALL change (returned)
     *       coins and tokens. The value (1) is the community standard for
     *       change accounts, therefore:
     *           - Coins: m/44'/145'/0'/1/<index>
     *           - Tokens: m/44'/245'/0'/1/<index>
     */
    c: null,

    /**
     * Imported Seeds
     *
     * Seeds may be imported from UUIDs embedded in the url, as a querystring
     * (eg. https://nito.cash?<uuid>).
     */
    is: null,

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
    m: null,

    /**
     * Nito Cash (Accounts)
     *
     * Used for privacy coins that have been mixed using one or more
     * anonymity protocols (eg. CashShuffle, CashFusion, Nito Exchange, etc).
     *
     * NOTE: Dedicated derivation paths are used for ALL shuffled and/or fused
     *       coins and tokens. The value (7867) is the ascii decimal
     *       representation of Nito Cash (NC), therefore:
     *           - Coins: m/44'/145'/0'/7867/<index>
     *           - Tokens: m/44'/245'/0'/7867/<index>
     *
     * TODO: A workaround of the TOR requirement is required before
     *       the current CashFusion specification can be implemented.
     *       (Nito Cash Exchange is an alternative solution)
     */
    nc: null,
}

/* Getters. */
const getters = {
    getAccounts,
    getAccountsByWallet,
    getAddress,
    getAddresses,
    getBalance,
    getChangeAddress,
    getDerivationPath,
    getDustAmount,
    getHDNode,
    getHistory,
    getSignedInput,
}

/* Actions. */
const actions = {
    activateAccounts,
    activateInputs,
    addImportedSeed,
    createWallet,
    destroyWallet,
    initWallet,
    nextAccount,
    sendCrypto,
    updateAccounts,
    updateInputs,
}

/* Mutations. */
const mutations = {
    setAccounts,
    setEmptyWallet,
    setImportedSeeds,
    setMetadata,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

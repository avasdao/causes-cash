/* Import modules (getters). */
import getAvatar from './profile/getters/getAvatar'
import getDetails from './profile/getters/getDetails'
import getEmail from './profile/getters/getEmail'
import getMasterSeed from './profile/getters/getMasterSeed'
import getMeta from './profile/getters/getMeta'
import getNickname from './profile/getters/getNickname'
import getSignedMessage from './profile/getters/getSignedMessage'

/* Import modules (actions). */
import destroyProfile from './profile/actions/destroyProfile'
import initProfile from './profile/actions/initProfile'
import updateEmail from './profile/actions/updateEmail'
import updateMasterSeed from './profile/actions/updateMasterSeed'
import updateMeta from './profile/actions/updateMeta'
import updateNickname from './profile/actions/updateNickname'

/* Import modules (mutations). */
import setEmail from './profile/mutations/setEmail'
import setEmptyProfile from './profile/mutations/setEmptyProfile'
import setMasterSeed from './profile/mutations/setMasterSeed'
import setMeta from './profile/mutations/setMeta'
import setNickname from './profile/mutations/setNickname'

/* Initialize state. */
const state = {
    /**
     * Email
     *
     * This is a valid email address.
     */
    email: null,

    /**
     * Master Seed
     *
     * A 32-byte seed, which can be generated randomly, or by importing
     * from an existing wallet.
     */
    masterSeed: null,

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
     * Nickname
     *
     * This is a public alias.
     *
     * NOTE: Only alpha-numeric characters are accepted.
     *       Both upper and lower-case characters are accepted.
     */
    nickname: null,
}

/* Getters. */
const getters = {
    getAvatar,
    getDetails,
    getEmail,
    getMasterSeed,
    getMeta,
    getNickname,
    getSignedMessage,
}

/* Actions. */
const actions = {
    destroyProfile,
    initProfile,
    updateEmail,
    updateMasterSeed,
    updateMeta,
    updateNickname,
}

/* Mutations. */
const mutations = {
    setEmail,
    setEmptyProfile,
    setMasterSeed, // WARNING: This is the highest risk attack vector.
    setMeta,
    setNickname,
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

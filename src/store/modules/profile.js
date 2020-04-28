/* Import libraries. */
// import telr from '../../api/telr'

/* Import modules (getters). */
import getMasterSeed from './profile/getters/getMasterSeed'
import getNickname from './profile/getters/getNickname'

/* Import modules (actions). */
import destroyProfile from './profile/actions/destroyProfile'
import initProfile from './profile/actions/initProfile'
import updateMasterSeed from './profile/actions/updateMasterSeed'
import updateNickname from './profile/actions/updateNickname'

/* Import modules (mutations). */
import setEmptyProfile from './profile/mutations/setEmptyProfile'
import setMasterSeed from './profile/mutations/setMasterSeed'
import setNickname from './profile/mutations/setNickname'

/* Initialize state. */
const state = {
    /**
     * Master Seed
     *
     * A 32-byte seed, which can be generated randomly, or by importing
     * from an existing wallet.
     */
    masterSeed: null,

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
    getMasterSeed,
    getNickname,
}

/* Actions. */
const actions = {
    destroyProfile,
    initProfile,
    updateMasterSeed,
    updateNickname,
}

/* Mutations. */
const mutations = {
    setEmptyProfile,
    setMasterSeed, // WARNING: This is the highest risk attack vector.
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

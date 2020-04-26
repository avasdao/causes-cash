/* Import libraries. */
// import telr from '../../api/telr'

/* Import modules (getters). */
import getIPFS from './storage/getters/getIPFS'
import getOrbitDB from './storage/getters/getOrbitDB'

/* Import modules (actions). */
// ...

/* Import modules (mutations). */
// ...

/* Initialize state. */
const state = {
    /**
     * Bitcoin Files Protocol
     *
     * An on-chain storage solution.
     */
    bfp: null,

    /**
     * InterPlanetary File System
     *
     * A peer-to-peer network for storing and sharing data in a
     * distributed file system.
     */
    ipfs: null,

    /**
     * OrbitDB
     *
     * A decentralized database solution.
     *
     * NOTE: OrbitDB requires an active connection to IPFS.
     */
    orbit: null,
}

/* Getters. */
const getters = {
    getIPFS,
    getOrbitDB,
}

/* Actions. */
const actions = {
    // 
}

/* Mutations. */
const mutations = {
    //
}

/* Export. */
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

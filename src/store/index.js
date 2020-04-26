/* Import (core) modules. */
import Vue from 'vue'
import Vuex from 'vuex'

/* Import persisted state (for vuex). */
import createPersistedState from 'vuex-persistedstate'

/* Import (local) modules. */
// import blockchain from './modules/blockchain'
import campaigns from './modules/campaigns'
// import profile from './modules/profile'
import storage from './modules/storage'
// import system from './modules/system'
// import utils from './modules/utils'
// import wallets from './modules/wallets'

/* Initialize Vuex. */
Vue.use(Vuex)

/* Set modules. */
const modules = {
    // blockchain,
    campaigns,
    // profile,
    storage,
    // system,
    // utils,
    // wallets,
}

/* Set plugins. */
// NOTE: For security reasons, cookies are NOT used in the
//       default (for-all) deployment. (default is local storage)
const plugins = [
    createPersistedState()
]

/* Set strict. */
const strict = process.env.NODE_ENV !== 'production'

/* Export store. */
export default new Vuex.Store({
    modules,
    plugins,
    strict,
})

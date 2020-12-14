/* Import (core) modules. */
import Vue from 'vue'
import Vuex from 'vuex'

/* Import persisted state (for vuex). */
import createPersistedState from 'vuex-persistedstate'

/* Import (local) modules. */
import campaigns from './modules/campaigns'
import discover from './modules/discover'
import events from './modules/events'
import profile from './modules/profile'
import system from './modules/system'
import utils from './modules/utils'
import wallet from './modules/wallet'

/* Initialize Vuex. */
Vue.use(Vuex)

/* Set modules. */
const modules = {
    campaigns,
    discover,
    events,
    profile,
    system,
    utils,
    wallet,
}

/* Set plugins. */
const plugins = [
    // createPersistedState()
    createPersistedState({
        paths: [
            'profile',
            'system.appStarts',
            'system.authHashes',
            'system.flags',
            'system.locale',
            'system.notices',
            'wallet',
        ]
    })
]

/* Set strict. */
const strict = process.env.NODE_ENV !== 'production'

/* Export store. */
export default new Vuex.Store({
    modules,
    plugins,
    strict,
})

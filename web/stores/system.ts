/* Import modules. */
import { defineStore } from 'pinia'

/**
 * System Store
 */
export const useSystemStore = defineStore('system', {
    state: () => ({
        /* Initialize description. */
        // _description: null,
        _description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        // TBD

        sponsors: 'Our beloved sponsors',

        banner: 'https://i.ibb.co/cF9kbVT/causes-for-nexa.jpg',

        currency: 'BCH',
    }),

    getters: {
        description(_state) {
            return _state._description
        },
    },

    actions: {
        // async initSession () {
        //     console.log('INIT SESSION (before):', this._session)
        //     /* Check for existing session. */
        //     if (this._session) {
        //         return this._session
        //     }

        //     /* Request new session. */
        //     const session = await $fetch('/api/newSession')
        //     console.log('INIT SESSION (after fetch):', session)

        //     /* Set session. */
        //     this._setSession(session)

        //     /* Return session. */
        //     return session
        // },

        deleteSession() {
            /* Set session. */
            this._setSession(null)
        },

        saveDescription(_description) {
            /* Set description. */
            this._description = _description
        },

        /**
         * Set Session
         *
         * @param {Object} _session Save session details.
         */
        _setSession (_session) {
            /* Set session. */
            this._session = _session
            console.log('SET SESSION', this._session)
        },
    },
    persist: true,
})

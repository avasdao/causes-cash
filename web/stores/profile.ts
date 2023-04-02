/* Import modules. */
import { defineStore } from 'pinia'

/**
 * Profile Store
 */
export const useProfileStore = defineStore('profile', {
    state: () => ({
        /* Initialize session. */
        _session: null,

        /* Initialize private key. */
        // NOTE: This is a "random" 256-bit value. */
        privateKey: null,

        // TBD
    }),

    getters: {
        session(_state) {
            return _state._session
        },

        sessionid(_state) {
            return _state._session?.id
        },

        challenge(_state) {
            return _state._session?.challenge
        },

        mnemonic(_state) {
            return 'this mnemonic must be derived from the private key'
        },

    },

    actions: {
        async initSession () {
            console.log('INIT SESSION (before):', this._session)
            /* Check for existing session. */
            if (this._session) {
                return this._session
            }

            /* Request new session. */
            const session = await $fetch('/api/newSession')
            console.log('INIT SESSION (after fetch):', session)

            /* Set session. */
            this._setSession(session)

            /* Return session. */
            return session
        },

        deleteSession() {
            /* Set session. */
            this._setSession(null)
        },

        saveSession(_session) {
            /* Set session. */
            this._setSession(_session)
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

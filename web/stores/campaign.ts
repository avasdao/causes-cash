/* Import modules. */
import { defineStore } from 'pinia'

/**
 * Campaign Store
 */
export const useCampaignStore = defineStore('campaign', {
    state: () => ({
        // TBD
    }),

    getters: {
        session(_state) {
            // return _state._session
        },

    },

    actions: {
        getCategoryById (_cateogry) {
            return 'My Category'
        },

        /**
         * Set Session
         *
         * @param {Object} _session Save session details.
         */
        // _setSession (_session) {
        //     /* Set session. */
        //     this._session = _session
        //     console.log('SET SESSION', this._session)
        // },
    },
    persist: true,
})

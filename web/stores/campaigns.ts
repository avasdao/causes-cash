/* Import modules. */
import { defineStore } from 'pinia'

/**
 * Campaigns Store
 */
export const useCampaignsStore = defineStore('campaigns', {
    state: () => ({
        // TBD
    }),

    getters: {
        session(_state) {
            // return _state._session
        },

    },

    actions: {
        load (_campaignid) {
            return {
                id: 'my-test-campaign',
            }
        },

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
})

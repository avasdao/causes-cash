/* Import modules. */
import { defineStore } from 'pinia'

import tradingPost from './campaign/tradingPost.js'

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
        load(_campaignid) {
            return {
                id: 'my-test-campaign',
            }
        },

        getCategoryById(_cateogry) {
            return 'My Category'
        },

        async tradingPost(_params) {
            console.log('***EXECUTE TRADING POST SWAP***', _params)

            const response = await tradingPost()
            console.log('RESPONSE', response)
        },

    },
})

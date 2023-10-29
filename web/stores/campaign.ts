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

        async tradingPost(_campaign) {
            /* Initialize locals. */
            let response
            let scriptArgs

            /* Set script arguments. */
            scriptArgs = _campaign.scriptArgs

            /* Request trading post (swap). */
            response = await tradingPost(scriptArgs)
                .catch(err => console.error(err))
            // console.log('RESPONSE', response)

            /* Return response. */
            return response
        },

    },
})

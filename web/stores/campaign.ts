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

        async tradingPost(_campaign, _amount) {
            /* Initialize locals. */
            let error
            let response
            let scriptArgs

            /* Set script arguments. */
            scriptArgs = _campaign.scriptArgs

            /* Handle token id. */
            if (_campaign.rewards) {
                scriptArgs.tokenidHex = _campaign.rewards[0].tokenidHex
            }

            /* Request trading post (swap). */
            response = await tradingPost(scriptArgs, _amount)
                .catch(err => {
                    console.error('ERROR', err)
                    error = err
                })
            // console.log('RESPONSE', response)

            /* Return response. */
            return error || response
        },

    },
})

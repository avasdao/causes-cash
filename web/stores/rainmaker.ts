/* Import modules. */
import { defineStore } from 'pinia'

/**
 * Rainmaker Store
 */
export const useRainmakerStore = defineStore('rainmaker', {
    state: () => ({
        _campaign: null,

        _profiles: null,
    }),

    getters: {
        campaign(_state) {
            // FIXME FOR DEV PURPOSES ONLY
            return {
                id: 'eba8c2e7-38b2-47cc-bbc5-fa37cfd9adc2',
                title: '1st $STUDIO Stakehouse Airdrop',
                createdAt: 1234567890,
            }
        },

        network(_state) {
            // FIXME FOR DEV PURPOSES ONLY
            return 'telegram'
        },

    },

    actions: {
        init() {
            return {
                id: 'my-test-campaign',
            }
        },

    },
})

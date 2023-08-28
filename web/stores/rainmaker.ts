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
                id: 'f8261cef-3148-4200-bc1b-b3d0cb4d554c',
                title: 'Telegram $AVAS Airdrop',
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

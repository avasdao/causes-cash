<template>
    <div id="guide" class="tabs markdown">
        <div v-if="guideDisplay" class="mt-3" v-html="guideDisplay" />

        <div v-else>
            <h1>Campaign Guide</h1>

            <p class="m-3">
                There is no guide available
            </p>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            ownerSlug: null,
            extSlug: null,

            guide: null,
        }
    },
    watch: {
        campaign: function (_campaign) {
            if (_campaign && _campaign.guide) {
                // console.log('CAMPAIGN HAS CHANGED, UPDATE GUIDE!!', _campaign)

                if (_campaign && _campaign.guide) {
                    /* Set guide. */
                    this.guide = _campaign.guide
                    // console.log('GUIDE', this.guide)
                }
            }
        },
    },
    computed: {
        ...mapGetters('utils', [
            'getMarkdown',
        ]),

        /**
         * Guide Display
         */
        guideDisplay() {
            /* Validate guide. */
            if (this.guide) {
                /* Return guide (in markdown). */
                return this.getMarkdown(this.guide)
            } else {
                return null
            }
        },

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

    },
    created: async function () {
        /* Validate guide. */
        if (this.campaign && this.campaign.guide) {
            /* Set summary. */
            this.guide = this.campaign.guide
            console.log('GUIDE', this.guide)
        }

    },
}
</script>

<style scoped>
/*  */
</style>

<template>
    <div id="story" class="tabs active markdown">
        <div v-if="story" v-html="story" />

        <div v-else>
            <h1>Campaign Story</h1>

            <p class="m-3">
                There is no story available
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
            description: null,
            waitTime: null,
        }
    },
    watch: {
        // campaign: function (_campaign) {
        //     if (_campaign && _campaign.funds) {
        //         console.log('CAMPAIGN HAS CHANGED, UPDATE STORY!!', _campaign)
        //
        //         /* Update story. */
        //         this.updateStory()
        //     }
        // },
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
        ]),

        ...mapGetters('utils', [
            'getMarkdown',
        ]),

        story() {
            /* Validate description. */
            if (this.description) {
                /* Return description (in markdown). */
                return this.getMarkdown(this.description)
            } else {
                return null
            }
        }

        // description() {
        //     /* Validate campaign. */
        //     if (!this.campaign) {
        //         return null
        //     }
        //
        //     /* Initialize fund id. */
        //     let fundId = null
        //
        //     if (this.fundId) {
        //         fundId = this.fundId
        //     } else {
        //         /* Find default id. */
        //         fundId = Object.keys(this.campaign.funds).find(fundId => {
        //             return this.campaign.funds[fundId].isDefault === true
        //         })
        //     }
        //
        //     /* Initialize description. */
        //     let description = null
        //
        //
        //     /* Retrieve description. */
        //     description = this.getAsset(
        //         this.campaign.owner.slug,
        //         `${this.campaign.slug}.fund.${fundId}.description`
        //     )
        //
        //     /* Validate description. */
        //     if (description) {
        //         /* Return description (in markdown). */
        //         return this.getMarkdown(description)
        //     } else {
        //         return null
        //     }
        // },

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

        getDescription() {
            /* Validate wait time. */
            if (this.waitTime > 5000) {
                return
            }

            console.log('GETTING DESCRIPTION')
            /* Validate campaign. */
            if (!this.campaign) {
                /* Increase wait time. */
                this.waitTime *= 2

                /* Wait a tick. */
                return setTimeout(this.getDescription, this.waitTime)
            }

            /* Retrieve description. */
            this.description = this.getAsset(
                this.campaign.owner.slug,
                `${this.campaign.slug}.description`
            )
            // console.log('STORY (description):', this.description)

            if (!this.description) {
                /* Increase wait time. */
                this.waitTime *= 2

                /* Wait a tick. */
                setTimeout(this.getDescription, this.waitTime)
            }
        }
    },
    created: function () {
        /* Get description. */
        this.getDescription()

        /* Initialize wait time. */
        this.waitTime = 10
    },
}
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
    color: rgba(30, 30, 30, 0.2);
}
</style>

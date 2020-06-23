<template>
    <div id="story" class="tabs active markdown">
        <!-- <h1>{{title}}</h1> -->

        <!-- <div class="row">
            <div class="col-8">
                <p v-html="summary" />
            </div>
        </div> -->

        <!-- <hr /> -->

        <!-- <h1>Readme</h1> -->
        <p v-html="description" />
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        campaign: Object,
        fundId: String,
    },
    data: () => {
        return {
            //
        }
    },
    watch: {
        campaign: function (_campaign) {
            if (_campaign && _campaign.funds) {
                console.log('CAMPAIGN HAS CHANGED, UPDATE STORY!!', _campaign)

                /* Update story. */
                this.updateStory()
            }
        },
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
        ]),

        ...mapGetters('utils', [
            'getMarkdown',
        ]),

        // title() {
        //     /* Validate campaign funds. */
        //     if (!this.campaign || !this.campaign.funds) {
        //         return null
        //     }
        //
        //     /* Return pledge title. */
        //     if (this.fundId) {
        //         return this.campaign.funds[this.fundId].title
        //     } else {
        //         const defaultId = Object.keys(this.campaign.funds).find(fundId => {
        //             return this.campaign.funds[fundId].isDefault === true
        //         })
        //
        //         /* Return default fund title. */
        //         return this.campaign.funds[defaultId].title
        //     }
        // },

        description() {
            /* Validate campaign. */
            if (!this.campaign) {
                return null
            }

            /* Initialize description. */
            let description = null

            /* Retrieve description. */
            description = this.getAsset(
                this.campaign.owner.slug,
                `${this.campaign.slug}.fund.${this.fundId}.description`
            )

            /* Validate description. */
            if (!description) {
                description = this.getAsset(
                    this.campaign.owner.slug,
                    `${this.campaign.slug}.description`
                )
            }
            // console.log('STORY (description):', description)

            /* Validate description. */
            if (description) {
                /* Return description (in markdown). */
                return this.getMarkdown(description)
            } else {
                return null
            }
        },

        // summary() {
        //     /* Validate campaign. */
        //     if (!this.campaign) {
        //         return null
        //     }
        //
        //     /* Initialize summary. */
        //     let summary = null
        //
        //     /* Retrieve summary. */
        //     summary = this.getAsset(
        //         this.campaign.owner.slug,
        //         `${this.campaign.slug}.fund.${this.fundId}.summary`
        //     )
        //
        //     /* Validate summary. */
        //     if (!summary) {
        //         summary = this.getAsset(
        //             this.campaign.owner.slug,
        //             `${this.campaign.slug}.summary`
        //         )
        //     }
        //     // console.log('STORY (summary):', summary)
        //
        //     /* Validate summary. */
        //     if (summary) {
        //         /* Return summary (in markdown). */
        //         return this.getMarkdown(summary)
        //     } else {
        //         return null
        //     }
        // },

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

        /**
         * Update Story
         */
        updateStory() {
            /* Initialize body. */
            let body = null

            /* Initialize target. */
            let target = null

            /* Validate summary. */
            if (this.campaign.summary.slice(0, 2) === 'Qm' && this.campaign.summary.length === 46) {
                target = this.campaign.summary
            } else {
                body = this.campaign.summary
            }

            /* Set summary. */
            const summary = {
                ownerSlug: this.campaign.owner.slug,
                id: `${this.campaign.slug}.summary`,
                body,
                target,
            }

            /* Request summary update. */
            this.updateAsset(summary)

            /* Initialize body. */
            body = null

            /* Initialize target. */
            target = null

            /* Validate description. */
            if (this.campaign.description.slice(0, 2) === 'Qm' && this.campaign.description.length === 46) {
                target = this.campaign.description
            } else {
                body = this.campaign.description
            }

            /* Set description. */
            const description = {
                ownerSlug: this.campaign.owner.slug,
                id: `${this.campaign.slug}.description`,
                body,
                target,
            }

            /* Request description update. */
            this.updateAsset(description)

        },
    },
    created: function () {
        //
    },
}
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
    color: rgba(30, 30, 30, 0.2);
}
</style>

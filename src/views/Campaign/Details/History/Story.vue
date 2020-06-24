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

        description() {
            /* Validate campaign. */
            if (!this.campaign) {
                return null
            }

            /* Initialize fund id. */
            let fundId = null

            if (this.fundId) {
                fundId = this.fundId
            } else {
                /* Find default id. */
                fundId = Object.keys(this.campaign.funds).find(fundId => {
                    return this.campaign.funds[fundId].isDefault === true
                })
            }

            /* Initialize description. */
            let description = null


            /* Retrieve description. */
            description = this.getAsset(
                this.campaign.owner.slug,
                `${this.campaign.slug}.fund.${fundId}.description`
            )

            /* Validate description. */
            if (description) {
                /* Return description (in markdown). */
                return this.getMarkdown(description)
            } else {
                return null
            }
        },

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

            /* Initialize default id. */
            let defaultId = null

            /* Initialize update package. */
            let pkg = null

            /* Find default id. */
            defaultId = Object.keys(this.campaign.funds).find(fundId => {
                return this.campaign.funds[fundId].isDefault === true
            })

            /* Set summary. */
            const summary = this.campaign.funds[defaultId].summary

            /* Validate summary. */
            if (summary.slice(0, 2) === 'Qm' && summary.length === 46) {
                target = summary
            } else {
                body = summary
            }

            /* Build (summary) package. */
            pkg = {
                ownerSlug: this.campaign.owner.slug,
                id: `${this.campaign.slug}.summary`,
                body,
                target,
            }

            /* Request (summary) update. */
            this.updateAsset(pkg)

            /* Initialize body. */
            body = null

            /* Initialize target. */
            target = null

            /* Find default id. */
            defaultId = Object.keys(this.campaign.funds).find(fundId => {
                return this.campaign.funds[fundId].isDefault === true
            })

            /* Set description. */
            const description = this.campaign.funds[defaultId].summary

            /* Validate description. */
            if (description.slice(0, 2) === 'Qm' && description.length === 46) {
                target = description
            } else {
                body = description
            }

            /* Build (description) package. */
            pkg = {
                ownerSlug: this.campaign.owner.slug,
                id: `${this.campaign.slug}.description`,
                body,
                target,
            }

            /* Request (description) update. */
            this.updateAsset(pkg)
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

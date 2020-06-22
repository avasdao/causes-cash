<template>
    <div id="story" class="tabs active markdown">
        <h1>Nito Cash Development</h1>

        <div class="row">
            <div class="col-8">
                <p v-html="summary" />

                <hr />

                <p>
                    Please <i class="fa fa-heart text-danger"></i> and support our cause <i class="fa fa-arrow-down"></i>
                    <br /><a :href="'https://explorer.bitcoin.com/bch/address/' + pledgeAddress" target="_blank"><strong>{{pledgeAddress}}</strong></a>
                </p>
            </div>

            <div class="col-4">
                <div class="qr-code" v-html="qr" />
            </div>
        </div>

        <hr />

        <h1>Readme</h1>
        <p v-html="description" />
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import QRCode from 'qrcode'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            // FOR DEVELOPMENT PURPOSES ONLY
            pledgeAddress: 'bitcoincash:qr5d6whmzmdw3e4x0q3j3gtftc06gc9rp5vkscm653',
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

            /* Retrieve description. */
            const description = this.getAsset(
                this.campaign.owner.slug, `${this.campaign.slug}.description`)
            // console.log('STORY (description):', description)

            /* Validate description. */
            if (description) {
                /* Return description (in markdown). */
                return this.getMarkdown(description)
            } else {
                return null
            }
        },

        summary() {
            /* Validate campaign. */
            if (!this.campaign) {
                return null
            }

            /* Retrieve summary. */
            const summary = this.getAsset(
                this.campaign.owner.slug, `${this.campaign.slug}.summary`)
            // console.log('STORY (summary):', summary)

            /* Validate summary. */
            if (summary) {
                /* Return summary (in markdown). */
                return this.getMarkdown(summary)
            } else {
                return null
            }
        },

        qr() {
            /* Initialize (string) value. */
            let strValue = ''

            /* Initialize scanner parameters. */
            const params = {
                type: 'svg',
                width: 225,
                height: 225,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }

            QRCode.toString(this.pledgeAddress, params, (err, value) => {
                if (err) {
                    return console.error('QR Code ERROR:', err)
                }

                /* Set (string) value. */
                strValue = value
            })

            /* Return (string) value. */
            return strValue
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
            /* Set description. */
            const description = {
                ownerSlug: this.campaign.owner.slug,
                id: `${this.campaign.slug}.description`,
                target: this.campaign.description,
            }

            /* Request description update. */
            this.updateAsset(description)

            /* Set summary. */
            const summary = {
                ownerSlug: this.campaign.owner.slug,
                id: `${this.campaign.slug}.summary`,
                target: this.campaign.summary,
            }

            /* Request summary update. */
            this.updateAsset(summary)
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

.qr-code {
    margin: 0;
    padding: 0;
    border: 1pt solid rgba(200, 200, 200, 0.2);
    float: right;
}
</style>

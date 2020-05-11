<template>
    <div id="story" class="tabs active markdown">
        <h1>Nito Cash Development</h1>

        <div class="row">
            <div class="col-8">
                <p v-html="summaryDisplay" />

                <hr />

                <p>
                    Please <i class="fa fa-heart text-danger"></i> and support our cause:
                    <br /><a :href="'https://explorer.bitcoin.com/bch/address/' + pledgeAddress" target="_blank"><strong>{{pledgeAddress}}</strong></a>
                </p>
            </div>

            <div class="col-4">
                <div class="qr-code" v-html="qr" />
            </div>
        </div>

        <hr />

        <h1>Readme</h1>
        <p v-html="descriptionDisplay" />
    </div>
</template>

<script>
/* Import modules. */
import QRCode from 'qrcode'

/* Initialize vuex. */
import { mapGetters } from 'vuex'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            description: null,
            summary: null,
            pledgeAddress: 'bitcoincash:qr5d6whmzmdw3e4x0q3j3gtftc06gc9rp5vkscm653',
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getDescription',
            'getSummary',
        ]),

        ...mapGetters('utils', [
            'getMarkdown',
        ]),

        descriptionDisplay() {
            /* Validate description. */
            if (this.description) {
                return this.getMarkdown(this.description)
            } else {
                return ''
            }
        },

        summaryDisplay() {
            /* Validate summary. */
            if (this.summary) {
                return this.getMarkdown(this.summary)
            } else {
                return ''
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
        //
    },
    created: function () {
        /* Set description. */
        this.description = this.getAsset(
            this.campaign.ownerId, `${this.campaign.extSlug}.description`)
        // console.log('STORY (description):', this.description)

        /* Set summary. */
        this.summary = this.getAsset(
            this.campaign.ownerId, `${this.campaign.extSlug}.summary`)
        // console.log('STORY (summary):', this.summary)

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

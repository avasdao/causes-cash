<template>
    <main>
        <hr />

        <div class="row">
            <div class="col-12 col-md-7">
                <form>
                    <div class="text-center mb-3">
                        <a :href="'https://explorer.bitcoin.com/bch/address/' + pledgeAddress" target="_blank"><strong>{{pledgeAddress}}</strong></a>
                        <h4>Your <i class="fa fa-heart text-danger"></i> and support causes cash for this campaign <i class="fa fa-arrow-down text-danger"></i></h4>
                    </div>

                    <div class="code-area float-right">
                        <div class="qr-code" v-html="qr" />

                        <div class="text-center ml-2">
                            <i class="fa fa-arrow-up text-danger"></i>
                            instant pledge address
                            <i class="fa fa-arrow-up text-danger"></i>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="form-pledge-amount">
                                    Pledge Amount in USD
                                </label>

                                <input
                                    type="range"
                                    class="form-control-range"
                                    id="form-pledge-amount"
                                    v-model="pledgeRange"
                                >
                            </div>
                        </div>

                        <div class="col-6">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="pledge amount"
                                v-model="pledgeAmount"
                             />
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="input-name" class="col-md-4 col-form-label text-right">
                            Name
                        </label>

                        <div class="col-md-8">
                            <input
                                class="form-control"
                                type="text"
                                id="input-name"
                                placeholder="(optional)"
                                v-model="pledgeName"
                             />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="input-comment" class="col-md-4 col-form-label text-right">
                            Comment
                        </label>

                        <div class="col-md-8">
                            <input
                                class="form-control"
                                type="text"
                                id="input-comment"
                                placeholder="(optional)"
                                v-model="comment"
                             />
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col">
                            <button class="btn btn-primary btn-block">Copy Details</button>
                        </div>

                        <div class="col">
                            <button class="btn btn-primary btn-block">Use Wallet</button>
                        </div>
                    </div>

                    <div class="form-group row pledge-group">
                        <label for="pledge-details">
                            Pledge Details
                        </label>

                        <textarea v-model="pledge" class="pledge-output" id="pledge-details" />
                    </div>
                </form>
            </div>

            <div class="col-12 col-md-5">
                <a href="javascript://" class="btn-danger float-right" @click="$emit('cancel')">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    Cancel Community Pledge
                </a>

                <h3>Community Pledge</h3>

                <p class="mt-3">
                    Make a pledge that will ONLY be fullfilled if the rest of the community also contributes to the full amount requrested by this campaign.
                </p>

                <p class="mt-3">
                    Install the plugin for the Electron-Cash desktop wallet and use the flipstarter tab to prepare your pledge.
                </p>
            </div>
        </div>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import QRCode from 'qrcode'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            // pledgeAmount: null,
            pledgeName: null,
            satoshis: null,
            comment: null,
            pledge: null,
            pledgeRange: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
        ]),

        pledgeAmount() {
            return this.pledgeRange * 2
        },

        pledgeAddress() {
            // FIXME
            return this.getAddress('deposit')
        },

        qr() {
            if (!this.getAddress('deposit')) {
                return null
            }

            /* Initialize (string) value. */
            let strValue = ''

            /* Initialize scanner parameters. */
            const params = {
                type: 'svg',
                width: 250,
                height: 250,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }

            QRCode.toString(this.getAddress('deposit'), params, (err, value) => {
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
            'addCampaign',
        ]),

    },
    created: function () {
        /* Initialize pledge range. */
        this.pledgeRange = 5
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
form {
    /* border: 1pt solid rgba(180, 180, 180, 0.3); */
    border-right: 1pt solid rgba(180, 180, 180, 0.3);
    padding: 15px;
    /* margin: 20px 0 10px 10px; */

    /* border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px; */
}

.code-area {
    /* border: 1pt solid rgba(180, 180, 180, 0.3); */
    border-left: 1pt solid rgba(180, 180, 180, 0.3);
    /* padding: 1px; */
    /* margin: 0 0 15px 15px; */

    /* border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px; */
}

.qr-code {
    /* border: 1pt solid rgba(180, 180, 180, 0.3); */
    /* border-left: 1pt solid rgba(180, 180, 180, 0.3); */
    /* padding: 1px; */
    margin: 0 0 -10px 10px;
    /* margin-left: 10px; */

    /* border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px; */
}

.pledge-group {
    width: 100%;
    margin: 15px;
}

.pledge-output {
    width: 90%;
    /* margin: 15px; */
}
</style>

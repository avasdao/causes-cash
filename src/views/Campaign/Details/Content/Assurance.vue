<template>
    <main>
        <hr />

        <div class="row">
            <div class="col-12 col-md-7">
                <form action="javascript://">
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
                                    @change="onRangeChange($event)"
                                >
                            </div>
                        </div>

                        <div class="col-6">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="pledge amount (usd)"
                                v-model="pledgeUSD"
                                @blur="onPledgeUpdate"
                                @keyup.enter="$refs.pledgeName.focus()"
                             />
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="input-name" class="col-md-4 col-form-label text-right">
                            Name
                        </label>

                        <div class="col-md-8">
                            <input
                                ref="pledgeName"
                                class="form-control"
                                type="text"
                                id="input-name"
                                placeholder="(optional)"
                                v-model="pledgeName"
                                @keyup.enter="$refs.pledgeComment.focus()"
                             />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="input-comment" class="col-md-4 col-form-label text-right">
                            Comment
                        </label>

                        <div class="col-md-8">
                            <input
                                ref="pledgeComment"
                                class="form-control"
                                type="text"
                                id="input-comment"
                                placeholder="(optional)"
                                v-model="pledgeComment"
                             />
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col">
                            <button class="btn btn-primary btn-block" @click="setClipboard">Copy Details</button>
                        </div>

                        <div class="col">
                            <button class="btn btn-primary btn-block">Use Wallet</button>
                        </div>
                    </div>

                    <div class="form-group row pledge-group">
                        <label for="pledge-details">
                            Pledge Details
                        </label>

                        <textarea :value="pledgeDetails" class="pledge-output" id="pledge-details" />
                    </div>

                    <div class="form-group row pledge-group">
                        <label for="pledge-auth">
                            Pledge Authorization
                        </label>

                        <input
                            ref="pledgeAuth"
                            class="form-control pledge-auth"
                            type="text"
                            id="pledge-auth"
                            placeholder="waiting for authorization message..."
                            v-model="pledgeAuth"
                            @change="handleAuth"
                            @keyup="handleAuth"
                            @paste="handleAuth"
                         />
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
import Nito from 'nitojs'
import numeral from 'numeral'
import QRCode from 'qrcode'

export default {
    props: {
        campaign: Object,
    },
    components: {
        //
    },
    data: () => {
        return {
            usd: null,
            satoshis: null,

            pledgeUSD: null,
            pledgeSatoshis: null,
            pledgeName: null,
            pledgeComment: null,
            pledgeRange: null,
            pledgeGoal: null,
            pledgeAuth: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('campaigns', [
            'getFullfillment',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
        ]),

        pledgeAddress() {
            // FIXME
            return this.getAddress('deposit')
        },

        pledgedValue() {
            /* Calculate pledged (satoshis). */
            const pledged = this.campaign.assurance.pledges
                .reduce((accumulator, pledge) => {
                    if (pledge.isSpent === true) {
                        return accumulator
                    } else {
                        return accumulator + pledge.satoshis
                    }
                }, 0)
            console.log('PLEDGED', pledged)

            return pledged
        },

        pledgeDetails() {
            /* Validate assurance. */
            if (!this.campaign.assurance) {
                return null
            }

            /* Build (pledge) package. */
            const pkg = {
                outputs: [
                    {
                        value: this.campaign.assurance.recipients[0].satoshis,
                        address: this.campaign.assurance.recipients[0].address
                    }
                ],
                data: {
                    alias: this.pledgeName || '',
                    comment: this.pledgeComment || ''
                },
                donation: {
                    amount: this.pledgeSatoshis
                },
                expires: this.campaign.assurance.expiresAt
            }

            /* Format to base-64. */
            const formatted = Buffer.from(JSON.stringify(pkg, null, 2)).toString('base64')

            /* Return formatted. */
            return formatted
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
            'addAssurance',
        ]),

        ...mapActions('utils', [
            'toast',
        ]),

        _setPledgeUSD(_satoshis) {
            /* Calculate USD. */
            const usd = (_satoshis / 100000000) * this.usd

            /* Set (formatted) value. */
            this.pledgeUSD = numeral(usd).format('$0,0.00')
        },

        onRangeChange() {
            /* Calculate remaining (satoshis). */
            const remaining = this.pledgeGoal - this.pledgedValue
            console.log('REMAINING', remaining)

            /* Calculate satoshis. */
            const satoshis = parseInt(remaining * (this.pledgeRange / 100.0))

            /* Update pledge amount (satoshis). */
            this.pledgeSatoshis = satoshis

            /* Set pledge (USD). */
            this._setPledgeUSD(satoshis)
        },

        onPledgeUpdate() {
            // console.log('UPDATE THE PLEDGE AMOUNT (USD)', this.pledgeUSD)

            /* Validate USD pledge. */
            if (!this.pledgeUSD) {
                return null
            }

            // TODO Perform a smart calculation of value units
            //        1. satoshis (no comma, decimal)
            //        2. USD (has comma or decimal)

            /* Retrieve pledge amount (usd). */
            const pledgeUSD = numeral(this.pledgeUSD).value()
            console.log('PLEDGE AMOUNT (usd)', pledgeUSD)

            /* Calculate satoshis. */
            const satoshis = parseInt((pledgeUSD / this.usd) * 100000000)
            console.log('SATOSHIS', satoshis)

            /* Update pledge amount (satoshis). */
            this.pledgeSatoshis = satoshis

            /* Update pledge display. */
            this._setPledgeUSD(satoshis)
        },

        handleAuth() {
            /* Validate pledge authorization. */
            if (!this.pledgeAuth) {
                return
            }

            /* Wait a tick. */
            setTimeout(() => {
                /* Initialize pledge authorization. */
                let pledgeAuth = null

                try {
                    /* Decode base-64. */
                    pledgeAuth = Buffer.from(this.pledgeAuth, 'base64')
                    // console.log('PLEDGE AUTH (buffer)', pledgeAuth.toString())

                    /* Parse JSON. */
                    pledgeAuth = JSON.parse(pledgeAuth)

                    /* Add campaign id. */
                    pledgeAuth.campaignid = this.campaign.id
                    console.log('PLEDGE AUTH', pledgeAuth)

                    this.addAssurance(pledgeAuth)

                    /* Calculate remaining (satoshis). */
                    const remaining = this.pledgeGoal - this.pledgedValue
                    console.log('REMAINING', remaining)

                    if (remaining <= 0) {
                        this.broadcast()
                    }
                } catch (err) {
                    console.error(err)
                }

                // const previousTransactionHash = null
                // const previousTransactionIndex = null
                // const unlockScript = null
                // const sequenceNumber = null
                // const satoshis = null
                // const alias = null
                // const comment = null
                // const createdAt = null
            }, 10)
        },

        async broadcast() {
            console.log('STARTED BROADCASTING...')

            try {
                // Assemble pledges into transaction
                const rawTransaction = this.getFullfillment(this.campaign)
                console.log('RAW TRANSACTION', rawTransaction.toString('hex'))

                const response = await Nito.Transaction
                    .sendRawTransaction(rawTransaction.toString('hex'))
                    .catch(err => console.error(err))
                console.log('BROADCAST RESPONSE', response)
            } catch (err) {
                console.error(err)
            }

        },

        /**
         * Set Clipboard
         */
        setClipboard() {
            try {
                const textArea = document.createElement('textarea')
                textArea.value = this.pledgeDetails
                document.body.appendChild(textArea)

                if (navigator.userAgent.match(/ipad|iphone/i)) {
                    const range = document.createRange()
                    range.selectNodeContents(textArea)

                    const selection = window.getSelection()
                    selection.removeAllRanges()
                    selection.addRange(range)

                    textArea.setSelectionRange(0, 999999)
                } else {
                    textArea.select()
                }

                document.execCommand('copy')
                document.body.removeChild(textArea)

                /* Set message. */
                const message = `Pledge details copied to your clipboard.`

                /* Display notification. */
                this.toast(['Done!', message, 'success'])

                return true
            } catch (err) {
                console.error(err) // eslint-disable-line no-console

                /* Bugsnag alert. */
                throw new Error(err)
            }
        },

    },
    created: async function () {
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        // console.info(`Market price (USD)`, this.usd)

        /* Initialize pledge range. */
        this.pledgeRange = 5 // FIXME

        /* Initialize pledge. */
        this.pledgeUSD = 1 // FIXME
        this.onPledgeUpdate()

        /* Validate assurance. */
        if (this.campaign.assurance) {
            /* Set pledge goal. */
            this.pledgeGoal = this.campaign.assurance.recipients[0].satoshis
            console.log('PLEDGE GOAL', this.pledgeGoal)
        }
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
    height: 100px;
}
.pledge-auth {
    width: 90%;
}

</style>

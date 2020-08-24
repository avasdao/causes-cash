<template>
    <main class="backing">
        <div class="row">
            <div class="col">
                <h3>STEP 1: Copy your pledge details</h3>

                <div class="col-9">
                    <span>
                        On the Flipstarter campaign's page, find the box that says, <strong class="text-primary">"1. Copy details"</strong> and click the green <strong class="text-primary">"COPY DETAILS"</strong> button, which will:
                    </span>

                    <ol class="ml-5">
                        <li>
                            lock-in your pledge details
                        </li>
                        <li>
                            package your pledge details
                        </li>
                        <li>
                            copy pledge package to your clipboard
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col">
                <h3>STEP 2: Paste your pledge details</h3>

                <div class="col-9">
                    <span>
                        Paste the pledge details you copied from the campaign page into the box below.
                    </span>
                </div>

                <textarea
                    class="pledge-details mt-3"
                    v-model="pledgeDetails"
                    placeholder="Paste your pledge details here">
                </textarea>

                <!-- <div v-if="userPledge" class="row mt-3 parsedJson"> -->
                <div v-if="userPledge" class="row mt-3">
                    <h3>Campaign details</h3>
                    <div class="row">
                        <div class="col-5 text-right">
                            Fulfillment address
                        </div>
                        <div class="col-7">
                            <a :href="campaignAddressLink" target="_blank">
                                <strong>{{campaignAddress}}</strong>
                            </a>
                        </div>

                        <div class="col-5 text-right">
                            Requested amount
                        </div>
                        <div class="col-7" v-html="campaignValue" />

                        <div class="col-5 text-right">
                            Expiration date
                        </div>
                        <div class="col-7" v-html="expirationDate" />
                    </div>

                    <h3>Pledge details</h3>
                    <div class="row">
                        <div class="col-5 text-right">
                            Pledge alias
                        </div>
                        <div class="col-7">
                            {{userPledge.data.alias}}
                        </div>

                        <div class="col-5 text-right">
                            Pledge comment
                        </div>
                        <div class="col-7">
                            {{userPledge.data.comment}}
                        </div>

                        <div class="col-5 text-right">
                            Donation amount
                        </div>
                        <div class="col-7" v-html="donationAmount" />
                    </div>
                </div>

            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col-12">
                <h3>STEP 3: Confirm your pledged coins</h3>

                <div class="col-9">
                    Please choose from one or more options to fund your pledge:

                    <ol class="ml-5">
                        <li>
                            Pledge directly from your Causes wallet.
                            <i class="fa fa-question-circle-o" aria-hidden="true" @click="getHelp('community/intro')"></i>
                        </li>
                        <li>
                            Pledge using a QR Code Payment Request.
                            <i class="fa fa-question-circle-o" aria-hidden="true" @click="getHelp('community/payment')"></i>
                        </li>
                    </ol>
                </div>
            </div>

            <div class="col-8">
                <h3>QR COde Payment Request</h3>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>

            <div class="col-4">
                <h3>Wallet balance: $0.00</h3>

                <input
                    class="mt-3 mb-2"
                    type="text"
                    id="title"
                    placeholder="How much from your wallet."
                    v-model="walletContribution"
                    @keyup="walletValidation($event)"
                 />

                <a
                    href="javascript://"
                    class="btn-primary btn-block mt-3"
                    @click="applyBalance"
                >
                    Apply to pledge
                </a>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col">
                <h3>STEP 4: Submit pledge authorization</h3>

                <div class="col-9">
                    <span>
                        On the Flipstarter campaign's page, find the box that says, <strong class="text-primary">"3. Paste pledge"</strong>, then paste in the clipboard you copied above, finally click the green <strong class="text-primary">"SUBMIT PLEDGE"</strong> button, which will:
                    </span>

                    <ol class="ml-5">
                        <li>
                            submit your pledge to the campaign's server
                        </li>
                        <li>
                            add your pledge to the campaign's page
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <!-- <button
            v-if="userPledge"
            class="btn-primary mt-3"
            @click="confirmFlipstarter"
            :disabled="pledgeAuth"
        >
            Confirm Flipstarter Pledge
        </button> -->
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'
import Nito from 'nitojs'
import numeral from 'numeral'

export default {
    components: {
        //
    },
    data: () => {
        return {
            usd: null,
            walletContribution: null,

            pledgeDetails: null,
            pledgeAuth: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('wallet', [
            'getAccounts',
            'getAddress',
            'getBalance',
            'getCoins',
            'getDerivationPath',
            'getHDNode',
            'getIndices',
        ]),

        /**
         * User Pledge
         */
        userPledge() {
            if (!this.pledgeDetails) {
                return null
            }

            /* Decode details to base64. */
            const b64 = Buffer.from(this.pledgeDetails, 'base64')

            /* Initialize counter. */
            let count = 0

            /* Initialize buffer. */
            const buf = Buffer.alloc(b64.length / 2)

            /* Convert from 16-bit to 8-bit. */
            // NOTE: The Flipstarter plugin encodes with 16-bit JavaScript.
            for (let i = 0; i < b64.length; i += 2) {
                buf[count++] = b64[i]
            }

            /* Parse json. */
            const json = JSON.parse(buf.toString())

            /* Return json. */
            return json
        },

        /**
         * Campaign Address
         */
        campaignAddress() {
            /* Validate fulfillment address. */
            if (this.userPledge && this.userPledge.outputs[0].address) {
                /* Initialize address. */
                let address = this.userPledge.outputs[0].address

                /* Strip prefix. */
                if (address.indexOf('bitcoincash:') !== -1) {
                    address = address.slice(12)
                }

                /* Shorten. */
                address = `${address.slice(0, 8)} ... ${address.slice(-8)}`

                /* Return fulfillment address. */
                return address
            } else {
                return null
            }
        },

        /**
         * Campaign AddressLink
         */
        campaignAddressLink() {
            /* Validate fulfillment address. */
            if (this.userPledge && this.userPledge.outputs[0].address) {
                return 'https://explorer.bitcoin.com/bch/address/' + this.userPledge.outputs[0].address
            } else {
                return null
            }
        },

        /**
         * Campaign Value
         */
        campaignValue() {
            if (this.userPledge && this.userPledge.outputs[0].value && this.usd) {
                const satoshis = numeral(this.userPledge.outputs[0].value / 100000000).format('0,0.00[000000]')

                const fiat = numeral((
                    this.userPledge.outputs[0].value / 100000000.0) * this.usd)
                    .format('$0.00')

                return `${satoshis} <small>BCH</small> <span class="text-danger">|</span> ${fiat} <small>USD</small>`
            } else {
                return null
            }

        },

        /**
         * Expiration Date
         */
        expirationDate() {
            /* Validate expiration date. */
            if (this.userPledge && this.userPledge.expires) {
                const dateTime = moment.unix(this.userPledge.expires).format('ll')

                const timeFrom = moment.unix(this.userPledge.expires).fromNow()

                return `${dateTime} <span class="text-danger">|</span> ${timeFrom}`
            } else {
                return null
            }
        },

        /**
         * Donation Amount
         */
        donationAmount() {
            /* Validate donation amount. */
            if (this.userPledge && this.userPledge.donation.amount) {
                const satoshis = numeral(this.userPledge.donation.amount / 100000000).format('0,0.00[000000]')

                const fiat = numeral((
                    this.userPledge.donation.amount / 100000000.0) * this.usd)
                    .format('$0.00')

                return `${satoshis} <small>BCH</small> <span class="text-danger">|</span> ${fiat} <small>USD</small>`
                    + `<br /><small class="text-danger">(${this.donationPct} of total campaign value)</small>`
            } else {
                return null
            }
        },

        /**
         * Donation Percentage
         */
        donationPct() {
            /* Validate donation amount. */
            if (this.userPledge && this.userPledge.donation.amount) {
                const campaign = this.userPledge.outputs[0].value
                const user = this.userPledge.donation.amount

                const pct = user / campaign

                return numeral(pct).format('0.00[00]%')
            } else {
                return null
            }
        },

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        /**
         * Apply Balance
         */
        applyBalance() {
            this.toast(['Oops!', 'Your wallet balance is too low', 'error'])

            // Swal.fire({
            //     title: 'Are you sure?',
            //     text: "You won't be able to revert this!",
            //     icon: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Yes, delete it!'
            // }).then((result) => {
            //     if (result.value) {
            //         Swal.fire(
            //             'Deleted!',
            //             'Your file has been deleted.',
            //             'success'
            //         )
            //     }
            // })
        },

        walletValidation(_evt) {
            console.log('WALLET VALIDATION', _evt)
        },

        /**
         * Cancel Pledge
         */
        cancelPledge(_coin) {
            console.log('TODO', _coin)
        },

    },
    created: async function () {
        this.walletContribution = '$0.00'

        /* Request BCH/USD market price. */
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
    },
    mounted: function () {
        // return this.toast(['Done!', 'Blank mounted successfully!', 'success'])
    },
}
</script>

<style scoped>
textarea {
    background-color: rgba(255, 0, 0, 0.2);
}

.pledge-details, .pledge-auth {
    /* width: 300px; */
    width: 100%;
    height: 100px;
    padding: 15px;
}

.parsedJson {
    padding: 5px;
    border-top: 3pt solid rgba(90, 90, 90, 0.5);
}
</style>

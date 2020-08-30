<template>
    <main class="backing">
        <div class="row">
            <div class="col">
                <h3>STEP 1: Copy your pledge details</h3>

                <div class="col-9">
                    <span>
                        On the Flipstarter campaign's page, find the box that says <strong class="text-primary">"1. Copy details"</strong> and click the green <strong class="text-primary">"COPY DETAILS"</strong> button, which will:
                    </span>

                    <ol class="ml-5">
                        <li>
                            Lock-in your pledge details
                        </li>

                        <li>
                            Package your pledge details
                        </li>

                        <li>
                            Copy pledge package to your clipboard
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col">
                <h3>STEP 2: Paste your pledge (package) details</h3>

                <div class="col-9">
                    <span>
                        Paste the pledge details you copied from the campaign page into the box below.
                        Then review the camapign and pledge details from the Flipstarter package.
                    </span>
                </div>

                <textarea
                    class="pledge-details mt-3"
                    v-model="pledgeDetails"
                    placeholder="Paste your pledge details here">
                </textarea>

                <div v-if="userPledge" class="row mt-3">
                    <div class="col-12 text-center">
                        <h2>Campaign Details</h2>
                    </div>

                    <div class="row">
                        <div class="col-5 text-right">
                            Fulfillment address
                        </div>

                        <div class="col-7 recipient-address">
                            <a :href="campaignAddressLink" target="_blank">
                                <i class="fa fa-check-circle text-success mr-1"></i>
                                <strong>{{campaignAddress}}</strong>
                            </a>

                            (<a href="javascript://">view proof</a>)
                        </div>

                        <div class="col-5 text-right">
                            Fulfillment amount
                        </div>

                        <div class="col-7" v-html="campaignValue" />

                        <div class="col-5 text-right">
                            Expiration date
                        </div>

                        <div class="col-7" v-html="expirationDate" />
                    </div>

                    <div class="col-12 text-center">
                        <h2>Pledge Details</h2>
                    </div>

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

        <hr v-if="userPledge" />

        <div v-if="userPledge" class="row">
            <div class="col-12">
                <h3>STEP 3: Confirm your pledged coins</h3>

                <div class="col-9">
                    Please choose from one or more options to fund your pledge:

                    <ol class="ml-5">
                        <li>
                            Pledge directly from your Causes wallet
                            <i class="fa fa-question-circle-o" aria-hidden="true" @click="getHelp('community/intro')"></i>
                        </li>

                        <li>
                            Pledge using a QR Code Payment Request
                            <i class="fa fa-question-circle-o" aria-hidden="true" @click="getHelp('community/payment')"></i>
                        </li>
                    </ol>
                </div>
            </div>

            <div class="col-7">
                <h3>Payment Request</h3>

                <div class="qr-code m-3" v-html="qr" @click="copyAddress" />
            </div>

            <div class="col-5">
                <h3>Wallet Balance</h3>
                <strong>{{balanceDisplay}}</strong>

                <input
                    class="mt-3 mb-2"
                    type="text"
                    placeholder="Fiat wallet value"
                    v-model="fiatContribution"
                    disabled
                 />

                <input
                    class="mt-3 mb-2"
                    type="text"
                    placeholder="Satoshi wallet value"
                    v-model="satoshiContribution"
                    disabled
                 />

                <a
                    href="javascript://"
                    class="btn-primary btn-block mt-3"
                    @click="applyBalance"
                >
                    Apply to pledge
                </a>

                <!-- <a
                    href="javascript://"
                    class="btn-warning btn-block mt-3"
                    @click="updateCoins"
                >
                    Update coins
                </a> -->
            </div>

            <div v-if="pledgeAuth" class="col-12">
                <textarea
                    class="pledge-auth mt-3"
                    v-model="pledgeAuth">
                </textarea>

                <a
                    href="javascript://"
                    class="btn-primary mt-3"
                    @click="copyAuth"
                >
                    Copy authorization to clipboard
                </a>
            </div>
        </div>

        <hr v-if="pledgeAuth" />

        <div v-if="pledgeAuth" class="row">
            <div class="col">
                <h3>STEP 4: Submit pledge authorization</h3>

                <div class="col-9">
                    <span>
                        On the Flipstarter campaign's page, find the box that says <strong class="text-primary">"3. Paste pledge"</strong>, then paste in the clipboard you copied above, finally click the green <strong class="text-primary">"SUBMIT PLEDGE"</strong> button, which will:
                    </span>

                    <ol class="ml-5">
                        <li>
                            Submit your pledge to the campaign's server
                        </li>

                        <li>
                            Add your pledge to the campaign's page
                        </li>
                    </ol>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'
import Nito from 'nitojs'
import numeral from 'numeral'
import QRCode from 'qrcode'
import Swal from 'sweetalert2'

export default {
    components: {
        //
    },
    data: () => {
        return {
            blockchain: null,
            balance: null,
            usd: null,
            fiatContribution: null,
            satoshiContribution: null,

            pledgeDetails: null,
            pledgeAuth: null,
        }
    },
    watch: {
        getCoins: async function (_coins) {
            console.log('COINS HAS CHANGED', _coins)

            if (_coins && this.userPledge) {
                /* Update balance. */
                await this.updateBalance()

                /* Apply balance. */
                this.applyBalance()
            }
        },

    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('profile', [
            'getMeta',
        ]),

        ...mapGetters('utils', [
            'getFormattedValue',
        ]),

        ...mapGetters('wallet', [
            'getAccounts',
            'getAddress',
            'getCoins',
        ]),

        balanceDisplay() {
            if (!this.balance) {
                return 'loading...'
            }

            /* Set balance. */
            const balance = `
                ${this.balance.value} ${this.balance.unit} |
                ${this.balance.fiat}
            `

            /* Return balance. */
            return balance
        },

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

        qr() {
            if (!this.getAddress('causes') || !this.userPledge) {
                return null
            }

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

            /* Calculate pledge amount (in BCH). */
            const amount = parseFloat(this.userPledge.donation.amount / 100000000.0)

            /* Set payment URL. */
            const paymentUrl = `${this.getAddress('causes')}?amount=${amount}`

            QRCode.toString(paymentUrl, params, (err, value) => {
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
            'assembleSighashDigest',
            'buildPledgeAuth',
        ]),

        ...mapActions('profile', [
            'updateMeta',
        ]),

        ...mapActions('utils', [
            'setClipboard',
            'toast',
        ]),

        ...mapActions('wallet', [
            'updateCoins',
        ]),

        /**
         * Initialize Blockchain
         */
        initBlockchain() {
            /* Initialize Nito blockchain. */
            this.blockchain = new Nito.Blockchain()
            console.log('NITO BLOCKCHAIN', this.blockchain)

            if (this.getAddress('causes')) {
                /* Subscribe to address updates. */
                const watching = this.blockchain
                    .subscribe('address', this.getAddress('causes'))
                console.log('CAUSES (watching):', watching)
            }

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.log('DEPOSIT RECEIVED BLOCKCHAIN UPDATE (msg):', _msg)

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()
            })
        },

        /**
         * Apply Balance
         */
        async applyBalance() {
            /* Request accounts. */
            const accounts = this.getAccounts
            console.log('ACCOUNTS', accounts)

            /* Validate accounts. */
            if (!accounts) {
                return null
            }

            /* Request coins. */
            const coins = this.getCoins
            console.log('COINS', coins)

            /* Validate coins. */
            if (!coins) {
                return null
            }

            /* Request metadata. */
            const meta = await this.getMeta
            console.log('FLIPSTARTER (meta):', meta)

            /* Filter spendable coins. */
            const spendable = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'active'
            })
            console.log('SPENDABLE', spendable)

            /* Filter locked coins. */
            const locked = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'locked'
            })
            console.log('LOCKED', locked)

            /* Initialize pledge coin. */
            let pledgeCoin = null

            /* Set donation amount. */
            const donation = this.userPledge.donation.amount
            console.log('DONATION', donation)

            /* Loop through all locked. */
            locked.forEach(coinid => {
                if (coins[coinid].satoshis === donation) {
                    /* Set source coin. */
                    pledgeCoin = coins[coinid]
                }
            })

            /* Validate pledge coin. */
            if (!pledgeCoin) {
                /* Loop through all spendables. */
                // FIXME FOR DEVELOPMENT ONLY
                spendable.forEach(coinid => {
                    if (coins[coinid].satoshis === donation) {
                        /* Set source coin. */
                        pledgeCoin = coins[coinid]
                    }
                })
                console.log('PLEDGE COIN', pledgeCoin)
            }

            /* Validate pledge coin. */
            if (pledgeCoin) {
                /* Set pledge. */
                const source = 'flipstarter'

                /* Build pledge package. */
                const pledgePkg = {
                    coin: pledgeCoin,
                    userPledge: this.userPledge,
                    source,
                }

                /* Request pledge authorization. */
                this.pledgeAuth = await this.buildPledgeAuth(pledgePkg)

                /* Set message. */
                const message = `Your coin has been locked!`

                /* Display notification. */
                this.toast(['Done!', message, 'success'])
            } else {
                // this.toast(['Oops!', '', 'error'])

                Swal.fire({
                    title: 'Wallet Error!',
                    text: `Your wallet is missing the exact coin amount you specified in your pledge.`,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                })
            }
        },

        /**
         * Update Balance
         */
        async updateBalance() {
            /* Initialize wallet balance. */
            let balance = 0

            /* Validate coins. */
            if (this.getCoins) {
                /* Initialize coins. */
                const coins = this.getCoins

                Object.keys(coins).forEach(async coinId => {
                    /* Initialize coin. */
                    const coin = coins[coinId]
                    // console.log('COINS (coin):', coin)

                    if (coin.status === 'active' || coin.status === 'locked') {
                        /* Add satoshis. */
                        balance += coin.satoshis
                    }
                })
            }

            /* Retrieve market price. */
            const marketPrice = await Nito.Markets.getTicker('BCH', 'USD')
            console.info(`Market price (USD)`, marketPrice) // eslint-disable-line no-console

            const formattedBalance =
                this.getFormattedValue(balance, marketPrice, 'USD')
            console.log('NEW BALANCE IS', formattedBalance)

            /* Set wallet balance. */
            this.balance = formattedBalance
        },

        walletValidation(_evt) {
            console.log('WALLET VALIDATION', _evt)
        },

        /**
         * Copy (Pledge) Authorization
         */
        copyAuth() {
            /* Set clipboard. */
            this.setClipboard(this.pledgeAuth)

            /* Set message. */
            const message = `Pledge authorization copied to your clipboard.`

            /* Display notification. */
            this.toast(['Done!', message, 'info'])
        },

        /**
         * Copy Clipboard
         */
        copyAddress() {
            /* Set clipboard. */
            this.setClipboard(this.getAddress('causes'))

            /* Set message. */
            const message = `Pledge address copied to your clipboard.`

            /* Display notification. */
            this.toast(['Done!', message, 'info'])
        },

        /**
         * Cancel Pledge
         */
        cancelPledge(_coin) {
            console.log('TODO', _coin)
        },

    },
    created: async function () {
        this.fiatContribution = '$0.00'
        this.satoshiContribution = '0'

        /* Request BCH/USD market price. */
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')

        /* Initialize blockchain. */
        this.initBlockchain()

        /* Update balance. */
        this.updateBalance()
    },
    mounted: function () {
        // return this.toast(['Done!', 'Blank mounted successfully!', 'success'])
    },
    beforeDestroy() {
        /* Validate blockchain. */
        if (this.blockchain) {
            /* Unsubscribe from blockchain. */
            this.blockchain.unsubscribe()
        }
    },
}
</script>

<style scoped>
textarea {
    background-color: rgba(141, 195, 81, 0.5);
}

.pledge-details, .pledge-auth {
    width: 100%;
    height: 100px;
    padding: 15px;
}

.parsedJson {
    padding: 5px;
    border-top: 3pt solid rgba(90, 90, 90, 0.5);
}

.recipient-address a {
    display: inline-block;
}
</style>

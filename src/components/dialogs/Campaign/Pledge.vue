<template>
    <main>
        <div v-if="!this.hasAuth" @click="signin">
            <v-card
                class="mx-auto"
                max-width="600"
                shaped
                color="#2f4858"
                :disabled="!this.hasAuth"
            >
                <v-card-text>
                    <h2 class="my-5 white--text">My Pledge Details</h2>

                    <v-row class="mb-4" justify="space-between">
                        <v-col class="text-left">
                            <span class="subheading font-weight-light white--text mr-1">$</span>
                            <span
                                class="display-3 font-weight-light white--text"
                                v-text="displayAmountUSD"
                            ></span>

                            <span class="subheading font-weight-light white--text mr-1">.00</span>
                            <span class="subheading font-weight-light white--text mr-1">USD</span>
                        </v-col>
                    </v-row>

                    <v-slider
                        v-model="pledgeAmountUSD"
                        :color="color"
                        track-color="grey"
                        always-dirty
                        :min="pledgeMin"
                        :max="pledgeMax"
                    >
                        <template v-slot:prepend>
                            <v-icon :color="color" @click="decrement">
                                mdi-minus
                            </v-icon>
                        </template>

                        <template v-slot:append>
                            <v-icon :color="color" @click="increment">
                                mdi-plus
                            </v-icon>
                        </template>
                    </v-slider>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#8dc351" @click="min()">Min</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn rounded dark outlined @click="quarter()">25%</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn rounded dark outlined @click="half()">50%</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn rounded dark outlined @click="threeQuarter()">75%</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn rounded color="#8dc351" @click="max()">Max</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>

                <v-container>
                    <v-btn x-large block dark color="#8dc351" class="my-5" @click="makePledge">
                        Make My Pledge
                    </v-btn>
                </v-container>

                <v-card-text>
                    <h3 class="white--text">(Optional) Pledge Details</h3>

                    <v-select
                        class="my-3"
                        v-model="userType"
                        :hint="userType.comment"
                        :items="userTypes"
                        item-text="label"
                        item-value="value"
                        label="Select a user type"
                        dark
                        return-object
                        single-line
                    ></v-select>

                    <v-text-field
                        class="my-3"
                        label="Your nickname or label"
                        v-model="alias"
                        hint="Enter an identity for your pledge"
                        dark
                    ></v-text-field>

                    <v-text-field
                        class="my-3"
                        label="Your pledge comment"
                        v-model="comment"
                        hint="NOTE: Your comment will be displayed in public"
                        dark
                    ></v-text-field>

                    <v-text-field
                        class="my-3"
                        label="Your web link"
                        v-model="webLink"
                        hint="This will display a (http/https) link from your pledge"
                        dark
                    ></v-text-field>
                </v-card-text>

                <v-card-text class="mt-n10">
                    <h3 class="my-5 white--text">(Optional) SLP / Token Details</h3>

                    <v-text-field
                        class="my-3"
                        label="Your SLP address"
                        v-model="slpAddress"
                        @focus="setSlpAddress"
                        hint="May be used to offer rewards for supporters"
                        dark
                    ></v-text-field>
                </v-card-text>

            </v-card>
        </div>

        <v-card
             v-if="this.hasAuth"
            class="mx-auto"
            max-width="600"
            shaped
            color="#2f4858"
            :disabled="!this.hasAuth"
        >
            <v-card-text>
                <h2 class="my-5 white--text">My Pledge Details</h2>

                <v-row class="mb-4" justify="space-between">
                    <v-col class="text-left">
                        <span class="subheading font-weight-light white--text mr-1">$</span>
                        <span
                            class="display-3 font-weight-light white--text"
                            v-text="displayAmountUSD"
                        ></span>

                        <span class="subheading font-weight-light white--text mr-1">.00</span>
                        <span class="subheading font-weight-light white--text mr-1">USD</span>
                    </v-col>
                </v-row>

                <v-slider
                    v-model="pledgeAmountUSD"
                    :color="color"
                    track-color="grey"
                    always-dirty
                    :min="pledgeMin"
                    :max="pledgeMax"
                >
                    <template v-slot:prepend>
                        <v-icon :color="color" @click="decrement">
                            mdi-minus
                        </v-icon>
                    </template>

                    <template v-slot:append>
                        <v-icon :color="color" @click="increment">
                            mdi-plus
                        </v-icon>
                    </template>
                </v-slider>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="#8dc351" @click="min()">Min</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined @click="quarter()">25%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined @click="half()">50%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined @click="threeQuarter()">75%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded color="#8dc351" @click="max()">Max</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

            <v-container>
                <v-btn x-large block dark color="#8dc351" class="my-5" @click="makePledge">
                    Make My Pledge
                </v-btn>
            </v-container>

            <v-card-text>
                <h3 class="white--text">(Optional) Pledge Details</h3>

                <v-select
                    class="my-3"
                    v-model="userType"
                    :hint="userType.comment"
                    :items="userTypes"
                    item-text="label"
                    item-value="value"
                    label="Select a user type"
                    dark
                    return-object
                    single-line
                ></v-select>

                <v-text-field
                    class="my-3"
                    label="Your nickname or label"
                    v-model="alias"
                    hint="Enter an identity for your pledge"
                    dark
                ></v-text-field>

                <v-text-field
                    class="my-3"
                    label="Your pledge comment"
                    v-model="comment"
                    hint="NOTE: Your comment will be displayed in public"
                    dark
                ></v-text-field>

                <v-text-field
                    class="my-3"
                    label="Your web link"
                    v-model="webLink"
                    hint="This will display a (http/https) link from your pledge"
                    dark
                ></v-text-field>
            </v-card-text>

            <v-card-text class="mt-n10">
                <h3 class="my-5 white--text">(Optional) SLP / Token Details</h3>

                <v-text-field
                    class="my-3"
                    label="Your SLP address"
                    v-model="slpAddress"
                    @focus="setSlpAddress"
                    hint="May be used to offer rewards for supporters"
                    dark
                ></v-text-field>
            </v-card-text>

        </v-card>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import bitcoincomLink from 'bitcoincom-link'
import Nito from 'nitojs'
import numeral from 'numeral'
import Swal from 'sweetalert2'

const SATS_PER_BCH = 100000000

export default {
    props: {
        campaign: Object,
    },
    data: () => ({
        blockchain: null,
        balance: null,
        balanceTimer: null,
        usd: null,
        fiatContribution: null,

        alias: null,
        comment: null,

        pledgeDetails: null,

        pledgeMin: null,
        pledgeMax: null,
        pledgeAmountUSD: null,

        userType: null,
        userTypes: null,
        webLink: null,
        slpAddress: null,

        hasSubmitted: null,
        isBitcoinWalletApi: null,

    }),
    watch: {
        campaign: async function (_campaign) {
            console.log('CAMPAIGN HAS CHANGED', _campaign)

            if (_campaign) {
                this.initCampaign()
            }
        },

        getCoins: async function (_coins) {
            console.log('COINS HAS CHANGED', _coins)

            if (_coins && !this.hasSubmitted) {
                /* Update balance. */
                this.updateBalance()

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
            'getNickname',
        ]),

        ...mapGetters('utils', [
            'getFormattedValue',
        ]),

        ...mapGetters('wallet', [
            'getAccounts',
            'getAddress',
            'getCoins',
        ]),

        /**
         * Has Authorization
         */
        hasAuth() {
            // TODO: Improve authorization scheme.
            if (this.getNickname) {
                return true
            } else {
                return false
            }
        },

        color () {
            if (this.pledgeAmountUSD < 50) return 'grey'
            if (this.pledgeAmountUSD < 500) return 'teal'
            if (this.pledgeAmountUSD < 5000) return 'green'
            if (this.pledgeAmountUSD < 50000) return 'orange'
            return 'red'
        },

        displayAmountUSD() {
            return numeral(this.pledgeAmountUSD).format('0,0')
        },

        donationAmount() {
            if (!this.pledgeAmountUSD) {
                return 0
            }

            // FIXME: Guard agains the `this.usd` price changing during `applyBalance` process
            // FIXME: Do we need to use bigInt lib to allow amount over 42 BCH??
            const amount = parseInt(this.pledgeAmountUSD / this.usd * 100000000)
            console.log('DONATION AMOUNT', amount)
            return amount
        },

        /**
         * User Pledge
         */
        userPledge() {
            /* Validate campaign. */
            if (!this.campaign) {
                return null
            }

            const pledge = {
                outputs: [
                    {
                        value: this.campaign.goal,
                        address: this.campaign.recipient,
                    }
                ],
                data: {
                    alias: this.alias,
                    comment: this.comment,
                },
                donation: {
                    amount: this.donationAmount
                },
                expires: this.campaign.expires
            }
            console.log('USER PLEDGE DETAILS', pledge);

            /* Return json. */
            return pledge
        },

    },
    methods: {
        ...mapActions('campaigns', [
            'addAssurance',
            'buildPledgeAuth',
        ]),

        ...mapActions('profile', [
            'updateMeta',
        ]),

        ...mapActions('utils', [
            'report',
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
            // console.log('NITO BLOCKCHAIN', this.blockchain)

            if (this.getAddress('causes')) {
                /* Subscribe to address updates. */
                this.blockchain
                    .subscribe('address', this.getAddress('causes'))
            }

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.log('PLEDGE RECEIVED BLOCKCHAIN UPDATE (msg):', _msg)

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()
            })

            /* Initialize balance timer. */
            this.balanceTimer = setInterval(() => {
                /* Update coins. */
                this.updateCoins()
            }, 15000) // 15 second interval

        },

        async initCampaign() {
            this.totalContractOutputValue = this.campaign.goal
            this.currentCommittedSatoshis = 0
            this.currentContributionCount = 0

            /* Request BCH/USD market price. */
            if (!this.usd) {
                this.usd = await Nito.Markets.getTicker('BCH', 'USD')
                console.log('USD', this.usd)
            }

            if (this.campaign.pledges) {
                /* Initialize total funds. */
                let totalFunds = 0

                /* Loop through all pledges. */
                Object.keys(this.campaign.pledges).forEach(pledgeid => {
                    /* Filter out all revoked pledges. */
                    if (!this.campaign.pledges[pledgeid].isRevoked) {
                        /* Increment contribution count. */
                        this.currentContributionCount++

                        /* Add satoshis to total funds. */
                        totalFunds += this.campaign.pledges[pledgeid].satoshis
                    }
                })

                /* Set total committed number of satoshis. */
                this.currentCommittedSatoshis = totalFunds

                // Object.keys(this.campaign.pledges).forEach(_pledgeid => {
                //     this.currentCommittedSatoshis += this.campaign.pledges[_pledgeid].satoshis
                // })
            }

            const numRecipients = 1
            this.currentMinerFee = this
                .calculateMinerFee(numRecipients, this.currentContributionCount)

            console.log('this.currentContributionCount', this.currentContributionCount);
            console.log('this.currentMinerFee', this.currentMinerFee);
            console.log('this.totalContractOutputValue', this.totalContractOutputValue);
            console.log('this.currentCommittedSatoshis', this.currentCommittedSatoshis);
            console.log('this.inputPercentModifier()', this.inputPercentModifier());

            /* Initialize current floor. */
            let currentFloor = null

            /* Validate campaign category. */
            if (this.campaign.category === 'flipstarter') {
                // Calculate the current floor
                currentFloor = Math.ceil(
                    (
                        this.totalContractOutputValue
                        + this.currentMinerFee
                        - this.currentCommittedSatoshis
                    )
                    * this.inputPercentModifier()
                )
            }

            /* Validate campaign category. */
            if (this.campaign.category === 'flipstarter-too') {
                // Calculate the current floor
                currentFloor = (1.0 / this.usd) * 100000000.0
            }

            /* Validate current floor. */
            if (!currentFloor) {
                return this.toast(['Oops!', 'Campaign failure.', 'error'])
            }

            const currentFloorUsd = Math.ceil((currentFloor / 100000000.0) * this.usd)
            console.log('CURRENT FLOOR', currentFloor, currentFloorUsd)

            // Calculate how far over (or under) committed this contribution makes the contract.
            const currentCeiling = Math.round(
              this.currentCommittedSatoshis +
                this.donationAmount -
                (this.totalContractOutputValue + this.currentMinerFee)
            ) * -1
            const currentCeilingUsd = Math.ceil((currentCeiling / 100000000.0) * this.usd)
            console.log('CURRENT CEILING', currentCeiling, currentCeilingUsd)

            this.pledgeMin = currentFloorUsd
            this.pledgeMax = currentCeilingUsd

            // this.pledgeAmountUSD = 10.00
            this.pledgeAmountUSD = currentFloorUsd

            // this.walletBalanceUSD = 3000.00

            this.fiatContribution = '$0.00'
            // this.satoshiContribution = '0'

        },

        initLinkApi() {
            bitcoincomLink.getAddress({
                protocol: 'SLP',
            })
            .then(data => {
                const {
                    address,
                    label,
                } = data

                console.log('User address: ' + address);
                console.log('User address label (Optional): ' + label);

                this.slpAddress = address
            })
            .catch((type, description, data) => {
                console.log('ERROR (type):', type)
                console.log('ERROR (description):', description)
                console.log('ERROR (data):', data)

                /* Build package. */
                const pkg = { type, description, data }

                /* Report error description. */
                this.report(new Error(JSON.stringify(pkg)))

                /* Handle type. */
                switch(type) {
                case 'NO_PROVIDER':
                    console.log('No provider available.')
                    break
                case 'PROTOCOL_ERROR':
                    console.log('The provided protocol is not supported by this wallet.')
                    break
                case 'SEND_ERROR':
                    console.log('There was an error when broadcasting this transaction to the network.')
                    break
                case 'MALFORMED_INPUT':
                    console.log('The input provided is not valid.')
                    break
                case 'CANCELED':
                    console.log('The user has canceled this transaction request.')
                    break
                }
            })
        },

        decrement () {
            this.pledgeAmountUSD--
        },

        increment () {
            this.pledgeAmountUSD++
        },

        min() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.pledgeMin
        },

        quarter() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.pledgeMax * 0.25
        },

        half() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.pledgeMax * 0.50
        },

        threeQuarter() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.pledgeMax * 0.75
        },

        max() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.pledgeMax
        },

        signin() {
            this.toast(['Oops!', 'Please sign in first', 'error'])

            this.$emit('close')
            return this.$store.commit('showProfile', true)
        },

        makePledge() {
            if (!this.hasAuth) {
                this.$emit('close')
                return this.$store.commit('showProfile', true)
            }

            console.log('DONATION AMOUNT', this.donationAmount)

            Swal.fire({
                title: 'Waiting for coins...',
                text: 'Once your coins are viewable on the network, your pledge will be prepared and broadcasted.',
                icon: 'info',
                confirmButtonColor: '#cc3333',
                confirmButtonText: 'Cancel',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
            })

            const providerStatuses = bitcoincomLink.getWalletProviderStatus()
            console.log('providerStatuses', providerStatuses)
            if (
                providerStatuses && (
                providerStatuses.badger === 'LOGGED_IN'
                || providerStatuses.android === 'AVAILABLE'
                || providerStatuses.ios === 'AVAILABLE'
            )) {
                /* Set detination address. */
                const to = this.getAddress('causes')
                // console.log('CAUSES DEPOSIT ADDRESS', to)

                /* Set protocol. */
                const protocol = 'BCH'

                /* Set transaction value. */
                const value = parseFloat(this.donationAmount / 100000000.0).toString()
                // console.log('SEND REQUEST (value):', value)

                /* Set website metadata. */
                const websiteMetadata = {
                    title: `New Contribution`,
                    description: `Please Note: Unless this campaign reaches its goal, your funds will never leave your wallet; and you can cancel your pledge at anytime.`,
                }

                /* Build package. */
                const pkg = {
                    to,
                    protocol,
                    value,
                    websiteMetadata,
                }
                console.log('SEND ASSETS (pkg):', pkg)

                /* Request assets. */
                bitcoincomLink.sendAssets(pkg)
                .then(data => {
                    const {
                        txid,
                    } = data

                    console.log('Completed transaction id: ' + txid)
                })
                .catch((type, description, data) => {
                    console.log('ERROR (type):', type)
                    console.log('ERROR (description):', description)
                    console.log('ERROR (data):', data)

                    /* Build package. */
                    const pkg = { type, description, data }

                    /* Report error description. */
                    this.report(new Error(JSON.stringify(pkg)))

                    /* Validate message. */
                    if (type && type.type === 'CANCELED') {
                        Swal.close()
                    }

                    /* Handle type. */
                    switch(type) {
                    case 'NO_PROVIDER':
                        console.log('No provider available.')
                        break
                    case 'PROTOCOL_ERROR':
                        console.log('The provided protocol is not supported by this wallet.')
                        break
                    case 'SEND_ERROR':
                        console.log('There was an error when broadcasting this transaction to the network.')
                        break
                    case 'MALFORMED_INPUT':
                        console.log('The input provided is not valid.')
                        break
                    case 'CANCELED':
                        console.log('The user has canceled this transaction request.')
                        break
                    }
                })
            }

        },

        /**
         * Apply Balance
         */
        async applyBalance() {
            console.log('APPLY BALANCE (donationAmount):', this.donationAmount)

            Swal.fire({
                title: 'Please Wait!',
                text: 'Your pledge is being added to the network. This should ONLY take a few moments...',
                imageUrl: require('@/assets/identity-setup-mobile.png'), // 500 x 320
                imageWidth: 500,
                imageHeight: 200,
                imageAlt: 'Added new Causes pledge to network...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
            })

            /* Request accounts. */
            const accounts = this.getAccounts
            // console.log('ACCOUNTS', accounts)

            /* Validate accounts. */
            if (!accounts) {
                return null
            }

            /* Request coins. */
            const coins = this.getCoins
            // console.log('COINS', coins)

            /* Validate coins. */
            if (!coins) {
                return null
            }

            /* Request metadata. */
            // const meta = await this.getMeta
            // console.log('FLIPSTARTER (meta):', meta)

            /* Filter spendable coins. */
            const spendable = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'active'
            })
            // console.log('SPENDABLE', spendable)

            /* Filter locked coins. */
            const locked = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'locked'
            })
            // console.log('LOCKED', locked)

            /* Initialize pledge coin. */
            let pledgeCoin = null

            /* Loop through all locked. */
            locked.forEach(coinid => {
                if (coins[coinid].satoshis === this.donationAmount) {
                    /* Set source coin. */
                    pledgeCoin = coins[coinid]
                    console.log('PLEDGE COIN (locked):', pledgeCoin)
                }
            })

            /* Validate pledge coin. */
            if (!pledgeCoin) {
                /* Loop through all spendables. */
                // FIXME FOR DEVELOPMENT ONLY
                spendable.forEach(coinid => {
                    if (coins[coinid].satoshis === this.donationAmount) {
                        /* Set source coin. */
                        pledgeCoin = coins[coinid]
                        console.log('PLEDGE COIN (spendables):', pledgeCoin)
                    }
                })
                // console.log('PLEDGE COIN', pledgeCoin)
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
                    json: true,
                }
                console.log('PLEDGE PKG', pledgePkg)

                /* Request pledge authorization. */
                const pledgeAuth = await this.buildPledgeAuth(pledgePkg)
                console.log('PLEDGE AUTHORIZATION', pledgeAuth)

                /* Add campaign id. */
                pledgeAuth.campaignid = this.campaign.id
                pledgeAuth.hostname = this.campaign.hostname
                pledgeAuth.satoshis = pledgeCoin.satoshis
                pledgeAuth.userType = this.userType && this.userType.value
                pledgeAuth.webLink = this.webLink
                pledgeAuth.slpAddress = this.slpAddress

                // FIXME: Detect campaign type.
                pledgeAuth.flipstarter = true
                console.log('PLEDGE AUTH', pledgeAuth)

                this.addAssurance(pledgeAuth)

                Swal.fire({
                    title: 'Success!',
                    text: `Your pledged coin is now locked in your Causes wallet. Your pledge authorization has been automatically submitted to the campaign page. It could take up to 3 minutes to update.`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Done',
                })
            } else {
                Swal.fire({
                    title: 'Wallet Error!',
                    text: `Your wallet is missing the exact coin amount you specified in your pledge. Scan the QR Code shown to send the exact pledge amount to your Causes wallet.`,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay',
                })
            }

            /* Set submitted flag. */
            this.hasSubmitted = true
        },

        /**
         * Update Balance
         */
        updateBalance() {
            /* Initialize wallet balance. */
            let balance = 0

            /* Validate coins. */
            if (this.getCoins) {
                /* Initialize coins. */
                const coins = this.getCoins

                Object.keys(coins).forEach(coinId => {
                    /* Initialize coin. */
                    const coin = coins[coinId]
                    // console.log('COINS (coin):', coin)

                    if (coin.status === 'active' || coin.status === 'locked') {
                        /* Add satoshis. */
                        balance += coin.satoshis
                    }
                })
            }

            const formattedBalance =
                this.getFormattedValue(balance, this.usd, 'USD')
            // console.log('NEW BALANCE IS', formattedBalance)

            /* Set wallet balance. */
            this.balance = formattedBalance
        },

        calculateMinerFee(RECIPIENT_COUNT, CONTRIBUTION_COUNT) {
            // Aim for two satoshis per byte to get a clear margin for error and priority on fullfillment.
            const TARGET_FEE_RATE = 2;

            // Define byte weights for different transaction parts.
            const TRANSACTION_METADATA_BYTES = 10;
            const AVERAGE_BYTE_PER_RECIPIENT = 69;
            const AVERAGE_BYTE_PER_CONTRIBUTION = 296;

            // Calculate the miner fee necessary to cover a fullfillment transaction with the next (+1) contribution.
            const MINER_FEE =
                (TRANSACTION_METADATA_BYTES +
                    AVERAGE_BYTE_PER_RECIPIENT * RECIPIENT_COUNT +
                    AVERAGE_BYTE_PER_CONTRIBUTION * (CONTRIBUTION_COUNT + 1)
                ) * TARGET_FEE_RATE;

            // Return the calculated miner fee.
            return MINER_FEE;
        },

        // Define a helper function we need to calculate the floor.
        inputPercentModifier() {
            const inputPercent = 0.75

            const commitmentsPerTransaction = 650

            // Calculate how many % of the total fundraiser the smallest acceptable contribution is at the moment.
            const remainingValue =
                this.currentMinerFee +
                (this.totalContractOutputValue - this.currentCommittedSatoshis)

            // this.contract.assembleTransaction().byteLength
            const currentTransactionSize = 42

            const minPercent =
                0 +
                (
                    remainingValue
                    / (commitmentsPerTransaction - this.currentContributionCount)
                    + 546 / SATS_PER_BCH
                ) /
                remainingValue

            const maxPercent =
                1
                - ((currentTransactionSize + 1650 + 49) * 1.0)
                / (remainingValue * SATS_PER_BCH)

            // ...

            const minValue = Math.log(minPercent * 100)
            const maxValue = Math.log(maxPercent * 100)

            // Return a percentage number on a non-linear scale with higher resolution in the lower boundaries.
            return (
                Math.exp(
                    minValue
                    + (inputPercent * (maxValue - minValue))
                    / 100
                )
                / 100
            )
        },

        setSlpAddress() {
            if (!this.slpAddress) {
                this.initLinkApi()
            }
        },

    },
    created: async function () {
        console.log('PLEDGE CAMPAIGN', this.campaign)

        /* Initialize submitted flag. */
        this.hasSubmitted = false

        this.userType = {
            label: `I'm a Bitcoin user`,
            value: 'user',
            comment: `Casual user of cryptocurrencies`
        }

        this.userTypes = [
            {
                label: `I'm a Bitcoin user`,
                value: 'user',
                comment: `Casual user of cryptocurrencies`
            },
            {
                label: `I'm a Bitcoin developer`,
                value: 'developer',
                comment: `BUIDLer of crypto services`
            },
            {
                label: `I'm a Bitcoin investor`,
                value: 'investor',
                comment: `Investor in crypto services`
            },
        ]

        /* Request BCH/USD market price. */
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        console.log('USD', this.usd)

        /* Validate user authorization. */
        if (this.hasAuth) {
            /* Initialize blockchain. */
            this.initBlockchain()

            /* Apply balance. */
            // this.applyBalance()
        }

    },
    mounted: function () {
        if (this.campaign) {
            this.initCampaign()
        }

    },
    beforeDestroy() {
        if (this.balanceTimer) {
            clearInterval(this.balanceTimer)
        }
    },
}
</script>

<style scoped>
/*  */
</style>

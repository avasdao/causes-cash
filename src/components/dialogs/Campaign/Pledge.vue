<template>
    <main>
        <v-card class="mx-auto" max-width="600" shaped color="#2f4858">
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
                    value=""
                    hint="This will display a (http/https) link from your pledge"
                    dark
                ></v-text-field>
            </v-card-text>

            <v-card-text class="mt-n10">
                <h3 class="my-5 white--text">(Optional) SLP / Token Details</h3>

                <v-text-field
                    class="my-3"
                    label="Your SLP address"
                    value=""
                    hint="May be used to offer rewards for supporters"
                    dark
                ></v-text-field>
            </v-card-text>
        </v-card>
    </main>
</template>

<script>
/* global _bitcoinWalletApi */

/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
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
        usd: null,
        fiatContribution: null,
        satoshiContribution: null,

        alias: null,
        comment: null,

        pledgeDetails: null,
        // pledgeAuth: null,

        pledgeMin: null,
        pledgeMax: null,
        pledgeAmountUSD: null,
        walletBalanceUSD: null,

        // interval: null,
        // isPlaying: false,

        userType: null,
        userTypes: null,

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

        color () {
            if (this.pledgeAmountUSD < 50) return 'grey'
            if (this.pledgeAmountUSD < 500) return 'teal'
            if (this.pledgeAmountUSD < 5000) return 'green'
            if (this.pledgeAmountUSD < 50000) return 'orange'
            return 'red'
        },

        animationDuration () {
            return `${60 / this.pledgeAmountUSD}s`
        },

        displayAmountUSD() {
            return numeral(this.pledgeAmountUSD).format('0,0')
        },

        donationAmount() {
            if (!this.pledgeAmountUSD) {
                return 0
            }

            // FIXME: Guard agains the `this.usd` price changing during `applyBalance` process
            // FIXME: We MUST use bigInt lib to allow amount over 42 BCH
            const amount = parseInt(this.pledgeAmountUSD / this.usd * 100000000)
            console.log('DONATION AMOUNT', amount)
            return amount
            // return 2431361
        },

        /**
         * User Pledge
         */
        userPledge() {
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
        },

        initCampaign() {
            this.totalContractOutputValue = this.campaign.goal
            this.currentCommittedSatoshis = 0
            this.currentContributionCount = 0

            if (this.campaign.pledges) {
                this.currentContributionCount = Object.keys(this.campaign.pledges).length

                Object.keys(this.campaign.pledges).forEach(_pledgeid => {
                    this.currentCommittedSatoshis += this.campaign.pledges[_pledgeid].satoshis
                })
            }

            const numRecipients = 1
            this.currentMinerFee = this
                .calculateMinerFee(numRecipients, this.currentContributionCount)

            console.log('this.currentContributionCount', this.currentContributionCount);
            console.log('this.currentMinerFee', this.currentMinerFee);
            console.log('this.totalContractOutputValue', this.totalContractOutputValue);
            console.log('this.currentCommittedSatoshis', this.currentCommittedSatoshis);
            console.log('this.inputPercentModifier()', this.inputPercentModifier());

            // Calculate the current floor
            const currentFloor = Math.ceil(
                (
                    this.totalContractOutputValue
                    + this.currentMinerFee
                    - this.currentCommittedSatoshis
                )
                * this.inputPercentModifier()
            )
            const currentFloorUsd = Math.ceil((currentFloor / 100000000.0) * this.usd)
            console.log('CURRENT FLOOR', currentFloor, currentFloorUsd)

            // Calculate how far over (or under) committed this contribution makes the contract.
            // const overCommitment = Math.round(
            //   this.currentCommittedSatoshis +
            //     totalSatoshis -
            //     (this.totalContractOutputValue + this.currentMinerFee)
            // );
            // console.log('OVER COMMITMENT', overCommitment)

            // this.pledgeMin = 1.00
            this.pledgeMin = currentFloorUsd
            this.pledgeMax = 5000.00

            // this.pledgeAmountUSD = 10.00
            this.pledgeAmountUSD = currentFloorUsd

            this.walletBalanceUSD = 3000.00

            this.fiatContribution = '$0.00'
            this.satoshiContribution = '0'

        },

        decrement () {
            this.pledgeAmountUSD--
        },

        increment () {
            this.pledgeAmountUSD++
        },

        min() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = 1.00
        },

        quarter() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.walletBalanceUSD * 0.25
        },

        half() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.walletBalanceUSD * 0.50
        },

        threeQuarter() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.walletBalanceUSD * 0.75
        },

        max() {
            // NOTE: Verify campaign pledge remaining
            this.pledgeAmountUSD = this.walletBalanceUSD
        },

        makePledge() {
            console.log('DONATION AMOUNT', this.donationAmount)

            if (window._bitcoinWalletApi) {
                /**
                 * Message Handler
                 *
                 * Handles incoming messages from wallet api.
                 */
                _bitcoinWalletApi.receiveMessage = (_message) => {
                    console.log('SOMETHING CAME BACK FROM THE WALLET', _message)
                    this.debugOutput = JSON.stringify(_message, null, 2)

                    try {
                        if (typeof _message === 'string') {
                            _message = JSON.parse(_message)
                        }

                        const {
                            messageId,
                            data,
                            error,
                        } = _message

                        const messageQueue = {}
                        const messageResolver = messageQueue[messageId]

                        if (messageResolver) {
                            const { resolve, timeout, reject } = messageResolver
                            timeout && clearTimeout(timeout)
                            error ? reject(error) : resolve(data)
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }

                /* Set command. */
                const command = 'sendAssets'

                /* Set message id. */
                const messageId = command + (Date.now() + Math.random()).toString()

                /* Set data. */
                const data = {
                    to: this.getAddress('causes'),
                    protocol: 'BCH',
                    value: parseFloat(this.donationAmount / 100000000.0).toString(),
                }

                /* Build message. */
                const message = {
                    messageId,
                    command,
                    data,
                    websiteMetadata: {
                        title: `New Contribution`,
                        description: `Please Note: Unless this campaign reaches its goal, your funds will never leave your wallet; and you can cancel your pledge at anytime.`,
                    },
                }

                /* Call wallet api. */
                window._bitcoinWalletApi.messageHandler(JSON.stringify(message))

                // const messageQueue = {}
                // const isBrowser = typeof window !== 'undefined';
                // const safeWindow = isBrowser ? window : global;

                // safeWindow._bitcoinWalletApi = safeWindow._bitcoinWalletApi ? safeWindow._bitcoinWalletApi : {};
                // _receiveMessage;

            } else {
                try {
                    const web4bch = new window.Web4Bch(window.web4bch.currentProvider)
                    console.log('web4bch-2', web4bch)

                    const to = this.getAddress('causes')
                    const value = this.donationAmount / 100000000.0
                    const txParams = {
                        to,
                        from: web4bch.bch.defaultAccount,
                    }
                    txParams.value = this.donationAmount.toString()
                    console.log('MATCH VALUES', value, txParams.value)

                    web4bch.bch.sendTransaction(txParams, (err, txid) => {
                        if (err) {
                            if (err.message.includes('User denied transaction signature')) {
                                // return reject({
                                //     type: 'CANCELED',
                                //     data: err.message,
                                // })
                                return console.error('DENIED:', err)
                            }

                            // return reject({
                            //     type: 'SEND_ERROR',
                            //     data: err.message,
                            // })
                            return console.error('ERROR:', err)
                        } else {
                            // resolve({txid})
                            console.log('TXID', txid)
                        }
                    })

                } catch (err) {
                    console.error(err)

                    if (this.pledgeAmount > 1000000000) {
                        this.showingInsufficientSheet = true
                        console.log('OPENING INSUFICIENT');
                    } else {
                        this.showingPledgeSheet = true
                        console.log('OPENING PLEDGE');
                    }
                }

            }

        },

        /**
         * Apply Balance
         */
        async applyBalance() {
            console.log('APPLY BALANCE (donationAmount):', this.donationAmount);
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
                // pledgeAuth.campaignid = this.campaign.id
                pledgeAuth.campaignid = this.campaign.id
                pledgeAuth.flipstarter = true
                pledgeAuth.satoshis = pledgeCoin.satoshis
                console.log('PLEDGE AUTH', pledgeAuth)

                this.addAssurance(pledgeAuth)

                Swal.fire({
                    title: 'Success!',
                    text: `Your pledged coin is now locked in your Causes wallet. Your pledge authorization has been automatically submitted to the campaign page.`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Done'
                })
            } else {
                Swal.fire({
                    title: 'Wallet Error!',
                    text: `Your wallet is missing the exact coin amount you specified in your pledge. Scan the QR Code shown to send the exact pledge amount to your Causes wallet.`,
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

    },
    created: async function () {
        console.log('PLEDGE CAMPAIGN', this.campaign)

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

        const causes = this.getAddress('causes')
        console.log('CAUSES ADDRESS', causes)

        /* Initialize blockchain. */
        this.initBlockchain()

        /* Update balance. */
        this.updateBalance()

        // this.applyBalance()

    },
    mounted: function () {
        if (this.campaign) {
            this.initCampaign()
        }

    },
}
</script>

<style scoped>
/*  */
</style>

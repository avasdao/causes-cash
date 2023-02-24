<template>
    <main class="mt-5">
        <h4 class="sr-only">Status</h4>

        <p class="text-3xl text-center font-medium text-gray-700">
            {{fundedDisplay}} of {{requestedDisplay}} sBCH
        </p>

        <p class="text-center text-base text-gray-500 font-medium">
            {{fundedDisplayUsd}} of {{requestedDisplayUsd}} USD
        </p>

        <div class="mt-6" aria-hidden="true">
            <div class="bg-gray-200 rounded-full overflow-hidden">
                <div class="h-2 bg-green-600 rounded-full" :style="{ width: pctCompleted + '%' }"></div>
            </div>

            <div class="text-sm text-center font-medium text-gray-600 mt-1 pl-5">
                <div class="text-green-600">
                    <span class="text-xl">{{pctCompleted}}%</span> complete with <span class="text-xl">{{expirationDisplay}}</span> to go
                </div>
            </div>

        </div>
    </main>
</template>

<script>
/* global BigInt */

/* Import modules. */
import { ethers } from 'ethers'
import moment from 'moment'
import numeral from 'numeral'

/* Set constants. */
const RETRY_DELAY = 500 // 0.5 seconds
const RETRY_ATTEMPTS = 10 // approx. 5 seconds

export default {
    props: {
        provider: String,
        usd: Number,
    },
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            blockNum: null,
            expiration: null,

            fundingGoal: null,
            pledgeBalance: null,
        }
    },
    watch: {
        provider: function (_provider) {
            // console.log('(STATUS) PROVIDER HAS CHANGED', _provider);

            /* Validate provider. */
            if (_provider) {
                setTimeout(() => {
                    /* Initialize blockchain. */
                    // this.initBlockchain()
                }, RETRY_DELAY)
            }
        },
    },
    computed: {
        /**
         * Funded Display
         */
        fundedDisplay() {
            /* Validate pledge balance. */
            if (!this.pledgeBalance) return '0.0'

            /* Set Wei value. */
            const weiValue = this.pledgeBalance

            /* Set BCH value. */
            const bchValue = Number(
                weiValue / BigInt(this.$store.state.ONE_BITCOIN * 100)
            )

            /* Return (formatted) value. */
            return numeral(bchValue / this.$store.state.ONE_BITCOIN)
                .format('0,0.00[00]')
        },

        /**
         * Funded Display (USD)
         */
        fundedDisplayUsd() {
            /* Validate pledge balance. */
            if (!this.pledgeBalance || !this.usd) return '$0.00'

            /* Set cents. */
            const cents = BigInt(parseInt(this.usd * 100))

            /* Set Wei value. */
            const weiValue = this.pledgeBalance * cents

            /* Set USD value. */
            const usdValue = Number(
                weiValue / BigInt(this.$store.state.ONE_SMART_BITCOIN)
            )

            /* Return (formatted) value. */
            return numeral(usdValue / 100).format('$0,0.00')
        },

        /**
         * Requested Display
         */
        requestedDisplay() {
            /* Validate funding goal. */
            if (!this.fundingGoal || !this.usd) return '0.00'

            /* Set Wei value. */
            const weiValue = this.fundingGoal

            /* Set BCH value. */
            const bchValue = Number(weiValue / BigInt(10000000000))

            /* Return (formatted) value. */
            return numeral(bchValue / 100000000).format('0,0.00[00]')
        },

        /**
         * Requesed Display (USD)
         */
        requestedDisplayUsd() {
            /* Validate funding goal. */
            if (!this.fundingGoal || !this.usd) return '$0.00'

            /* Set cents. */
            const cents = BigInt(parseInt(this.usd * 100))

            /* Set Wei value. */
            const weiValue = this.fundingGoal * cents

            /* Set USD value. */
            const usdValue = Number(
                weiValue / BigInt(this.$store.state.ONE_SMART_BITCOIN))

            /* Return (formatted) value. */
            return numeral(usdValue / 100).format('$0,0.00')
        },

        /**
         * Percentage Completed
         */
        pctCompleted() {
            /* Validate funding goal. */
            if (!this.fundingGoal || !this.pledgeBalance) return 0

            /* Set cents. */
            const cents = this.pledgeBalance * BigInt(100)

            /* Set percentage. */
            const pct = parseInt((cents / this.fundingGoal))

            /* Return percentage. */
            return pct
        },

        /**
         * Expiration Display
         *
         * Show the time remaining in the campaign.
         */
        expirationDisplay() {
            /* Validate expiration. */
            if (!this.expiration) return 'n/a'

            /* Return (formatted) expiration. */
            return moment.unix(this.expiration).fromNow(true)
        }

    },
    methods: {
        async initBlockchain() {
            /* Validate Web3 provider. */
            if (this.$store.getters.getProvider) {
                console.error('(Status) Blockchain init failed!')

                /* Validate retry attempts. */
                if (this.retries++ < RETRY_ATTEMPTS) {
                    /* Pause and try again. */
                    setTimeout(() => {
                        /* Initialize blockchain. */
                        this.initBlockchain()
                    }, RETRY_DELAY)
                }
            }

            /* Initialize provider. */
            const provider = new ethers.providers
                .JsonRpcProvider(this.$store.getters.getProvider)
            console.log('PROVIDER', provider)

            this.blockNum = await provider
                .getBlockNumber()
                .catch(err => console.error(err))
            // console.log('BLOCK NUM', this.blockNum)

            /* Set Campaign ABI. */
            const cAbi = this.$store.getters.getCampaignAbi

            // FOR DEVELOPMENT PURPOSES ONLY
            // The first campaign contract is hardcoded.
            const cAddr = this.$store.getters.getCampaignAddr

            /* Initialize campaign instance. */
            const campaign = new ethers.Contract(cAddr, cAbi, provider)
            console.log('CONTRACT (campaign):', campaign)

            /* Request campaign info. */
            const campaignInfo = await campaign
                .getCampaign()
                .catch(err => console.error(err))
            console.log('STATUS (info):', campaignInfo)

            this.fundingGoal = BigInt(campaignInfo.fundingGoal)
            // console.log('FUNDING GOAL', this.fundingGoal)

            this.pledgeBalance = BigInt(campaignInfo.pledgeBalance)
            // console.log('PLEDGE BALANCE', this.pledgeBalance)

            this.expiration = Number(campaignInfo.expiration)

        },

    },
    created: function () {
        /* Initialize block number. */
        this.blockNum = 0

        /* Initialize funding goal. */
        this.fundingGoal = BigInt(0)

        /* Initialize pledge balance. */
        this.pledgeBalance = BigInt(0)
    },
    mounted: function () {
        /* Initialize blockchain. */
        // this.initBlockchain()
    },
}
</script>

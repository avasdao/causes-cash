<template>
    <main class="max-w-3xl mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <div class="space-y-6">
            <div>
                <h1 class="text-3xl leading-6 font-medium text-gray-900">
                    Campaign Launchpad
                </h1>

                <p class="mt-3 text-lg text-gray-500">
                    Create a NEW campaign in under 5 Minutes.
                    Just complete the required information below and submit click.
                    You can then add more details later.
                </p>
            </div>

            <div>
                <label for="project-name" class="block text-xl font-medium text-gray-700">
                    <span class="text-2xl text-indigo-500">1.</span>
                    Campaign Title
                </label>

                <div class="mt-1">
                    <input
                        v-model="title"
                        type="text"
                        class="block w-full shadow-md focus:ring-sky-500 focus:border-sky-500 text-lg border-gray-300 rounded-md"
                        placeholder="Awesome Bitcoin Cash Project"
                    />
                </div>
            </div>

            <div>
                <label for="project-name" class="flex flex-row items-center">
                    <span class="text-xl font-medium text-gray-700">
                        <span class="text-2xl text-indigo-500">2.</span>
                        Funding Goal
                    </span>

                    <span class="ml-3 text-gray-500">
                        (
                        <span class="font-medium text-sm text-green-300">
                            <a href="javascript://" @click="setBCH" :class="{ 'font-bold text-base text-green-500' : currency == 'BCH'}">BCH</a>
                            <span class="text-gray-300 mx-2">|</span>
                            <a href="javascript://" @click="setUSD" :class="{ 'font-bold text-base text-green-500' : currency == 'USD' }">USD</a>
                        </span>
                        )
                    </span>
                </label>

                <div class="mt-1">
                    <input
                        v-model="fundingGoal"
                        type="text"
                        name="project-name"
                        id="project-name"
                        class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-lg border-gray-300 rounded-md"
                        placeholder="0"
                    />
                </div>
            </div>

            <Summary :summary="summary" @set-summary="setSummary" />

            <Manager class="hidden" />

            <Owner :owner="owner" @set-owner="setOwner" />

            <Recipients class="hidden" />

            <Spotlight class="hidden" />

            <section>
                <Calendar class="hidden" :starting="starting" @set-starting="setStarting" />
                <Calendar class="hidden" :expiration="expiration" @set-expiration="setExpiration" />

                <label for="calendar-date-picker" class="block text-xl font-medium text-gray-700">
                    <span class="text-2xl text-indigo-500">5.</span>
                    Campaign starting date
                </label>

                <div class="mt-1">
                    <input
                        :value="displayStarting"
                        type="text"
                        class="block w-full bg-gray-500 shadow-sm focus:ring-sky-500 focus:border-sky-500 text-lg text-gray-50 border-gray-300 rounded-md"
                        disabled
                    />
                </div>

                <label for="calendar-date-picker" class="mt-6 block text-xl font-medium text-gray-700">
                    <span class="text-2xl text-indigo-500">6.</span>
                    Set the campaign duration
                    <span class="text-base text-gray-500">( # of days )</span>
                </label>

                <div class="mt-1">
                    <input
                        v-model="duration"
                        type="text"
                        class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-lg border-gray-300 rounded-md"
                        placeholder="30 days"
                    />
                </div>

                <div class="font-bold">
                    <span class="block mt-2 ml-3 text-sm text-gray-500">CAMPAIGN EXPIRATION DATE IS</span>
                    <span class="block ml-3 text-lg text-yellow-500">{{displayExpiration}}</span>
                </div>
            </section>

            <div class="flex justify-end px-4">
                <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    Reset
                </button>

                <button
                    @click="create"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    <span class="hidden sm:block">Create Your New Campaign</span>
                    <span class="sm:hidden">Create Campaign</span>
                </button>
            </div>
        </div>
    </main>
</template>

<script>
/* global BigInt ethereum */

/* Import modules. */
import { ethers } from 'ethers'
import moment from 'moment'

/* Import components. */
import Calendar from './Launchpad/Calendar.vue'
import Owner from './Launchpad/Owner.vue'
import Manager from './Launchpad/Manager.vue'
import Recipients from './Launchpad/Recipients.vue'
import Spotlight from './Launchpad/Spotlight.vue'
import Summary from './Launchpad/Summary.vue'

export default {
    components: {
        Calendar,
        Owner,
        Manager,
        Recipients,
        Spotlight,
        Summary,
    },
    data: () => {
        return {
            currency: null,
            domain: null,
            duration: null,
            expiration: null,
            fundingGoal: null,
            owner: null,
            starting: null,
            summary: null,
            title: null,
        }
    },
    computed: {
        displayStarting() {
            return moment().format('LLLL')
        },

        displayExpiration() {
            let duration = 30

            if (this.duration) {
                duration = this.duration
            }

            return moment().add(duration, 'days').format('LLLL')
        },

    },
    methods: {
        setBCH() {
            this.currency = 'BCH'
        },

        setUSD() {
            this.currency = 'USD'
        },

        setOwner(_owner) {
            this.owner = _owner
        },

        setSummary(_summary) {
            this.summary = _summary
        },

        setStarting(_starting) {
            this.starting = _starting
        },

        setExpiration(_expiration) {
            this.expiration = _expiration
        },

        /**
         * Create Campaign
         */
        create() {
            /* Validate title. */
            if (!this.title) {
                return alert(`Please enter a campaign title.`)
            }

            /* Validate funding goal. */
            if (!this.fundingGoal) {
                return alert(`Please enter a funding goal.`)
            }

            /* Validate currency. */
            if (this.currency === 'USD') {
                return alert(`Oops! That currency is NOT supported yet.\n\nPlease take a look at our campaign to add FlexUSD stablecoin to the platform.\n\nhttps://Stablecoin.SmartBCH.Builders`)
            }

            /* Validate summary. */
            if (!this.summary) {
                return alert(`Please enter a brief summary for this campaign.\n\nNOTE: You'll be able to add a full detailed description later from the Campaign Manager.`)
            }

            /* Validate owner. */
            if (!this.owner) {
                return alert(`Please enter the campaign owner's account / address.\n\nNOTE: This is the account that will receive the funds (if the funding goal is reached before the campaign expires).`)
            }

            /* Create campaign package. */
            // NOTE: Funding goal supports values down to 0.001 BCH,
            //       or 1 (micro) mBCH
            const pkg = {
                owner: this.owner,
                title: this.title,
                summary: this.summary,
                fundingGoal: BigInt(parseInt(this.fundingGoal * 1000)) * BigInt(this.$store.state.ONE_SMART_BITCOIN.div(1000)),
                starting: this.starting,
                expiration: this.expiration,
            }

            // alert(`CREATE CAMPAIGN\n${JSON.stringify(
            //     pkg,
            //     (key, value) =>
            //         typeof value === 'bigint' ? value.toString() + 'n' : value,
            //     2
            // )}`)

            /* Deploy contract. */
            this.deployContract(pkg)
        },

        /**
         * Deploy Contract
         *
         * Deploys the new campaign to the blockchain.
         */
        async deployContract(_pkg) {
            /* Validate embedded Web3 objects. */
            if (!window.ethereum && !window.bitcoin) {
                /* Validate embedded ethereum object. */
                if (window.bitcoin) {
                    console.info('Found Bitcoin provider.')
                } else if (window.ethereum) {
                    console.info('Found Ethereum provider.')
                } else {
                    return console.error('No Web3 provider found.')
                }
            }

            /* Connect accounts. */
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })
            // console.info('Connected Web3 accounts:', accounts)

            if (!accounts || accounts.length < 1) {
                return alert('Please connect your MetaMask account to continue.')
            }

            /* Initialize provider. */
            const provider = new ethers
                .providers
                .Web3Provider(window.ethereum, 'any')

            /* Set signer. */
            const signer = provider.getSigner()
            // console.log('SIGNER', signer)

            /* Set Campaign ABI. */
            const abi = this.$store.getters.getCampaignAbi

            /* Set bytecode. */
            const bytecode = this.$store.getters.getBytecode

            /* Initialize contract factory. */
            const Contract = new ethers.ContractFactory(abi, bytecode, signer)
            // console.log('CONTRACT', Contract)

            /* Request contract deployment. */
            const deployed = await Contract.deploy(
                _pkg.owner,
                _pkg.title,
                _pkg.summary,
                _pkg.fundingGoal,
                _pkg.starting,
                _pkg.expiration,
            ).catch(err => {
                console.error(err)

                /* Validate Web3 connection. */
                if (
                    err.toString().toLowerCase().includes('unknown account')
                    || err.code.toUpperCase() === 'UNSUPPORTED_OPERATION'
                ) {
                    return alert(`Please connect your MetaMask account to continue.`)
                }

                /* Validate Web3 values. */
                if (err.code.toUpperCase() === 'INVALID_ARGUMENT') {
                    return alert(`Oops! You entered an INVALID value [ ${err.value} ].\n\nPlease correct and try your request again..`)
                }

            })
            // console.log('CONTRACT (deployed):', deployed)

            /* Validate deployed contract. */
            if (deployed) {
                console.log('ADDRESS', deployed.address)
                console.log('TRANSACTION', deployed.deployTransaction)

                alert(`Your NEW campaign has been successfully deployed onto the SmartBCH network!\n\n${deployed.address}`)
            }

        },

    },
    created: function () {
        /* Initialize currency. */
        this.currency = 'BCH'

        /* Set starting. */
        // FOR DEV PURPOSE ONLY
        this.starting = moment().unix()

        /* Initialize duration. */
        this.duration = 30

        /* Set expiration. */
        // FOR DEV PURPOSE ONLY
        this.expiration = moment().add(this.duration, 'days').unix()

    },
    mounted: function () {
        //
    },
}
</script>

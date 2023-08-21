<script setup>
/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'

/* Import components. */
import Calendar from './Calendar.vue'
import Owner from './Owner.vue'
import Manager from './Manager.vue'
import Recipients from './Recipients.vue'
import Spotlight from './Spotlight.vue'
import Summary from './Summary.vue'

/* Import stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

/* Enable BigInt serialization. */
// BigInt.prototype.toJSON = function() { return this.toString() }

/* Initialize constants. */
const DEFAULT_CAMPAIGN_DURATION = 30

/* Initialize locals. */
let currency = ref(null)
let domain = ref(null)
let duration = ref(null)
let expiration = ref(null)
let fundingGoal = ref(null)
let owner = ref(null)
let starting = ref(null)
let summary = ref(null)
let title = ref(null)
let nexUsd = ref(null)

const displayStarting = computed(() => {
    return moment().format('LLLL')
})

const displayFundingGoal = computed(() => {
    let nex
    let sats
    let usd

    if (currency.value === 'NEXA') {
        nex = fundingGoal.value ? numeral(fundingGoal.value).format('0,0[.]00') : ''
        sats = fundingGoal.value ? numeral(fundingGoal.value * 100).format('0,0') : ''
        usd = fundingGoal.value ? numeral(fundingGoal.value * nexUsd.value).format('$0,0.00') : ''
    } else {
        nex = fundingGoal.value ? numeral(fundingGoal.value / nexUsd.value).format('0,0[.]00') : ''
        sats = fundingGoal.value ? numeral(fundingGoal.value / nexUsd.value * 100).format('0,0') : ''
        usd = fundingGoal.value ? numeral(fundingGoal.value).format('$0,0.00') : ''
    }

    return {
        nex,
        sats,
        usd,
    }
})

const displayExpiration = computed(() => {
    /* Calculate duration. */
    // NOTE: Avoid variable shadowing.
    const _duration = duration.value
        ? duration.value
        : DEFAULT_CAMPAIGN_DURATION

    /* Return (formatted) display. */
    return moment().add(_duration, 'days').format('LLLL')
})

const setNEXA = () => {
    currency.value = 'NEXA'
}

const setUSD = () => {
    currency.value = 'USD'
}

const setOwner = (_owner) => {
    owner.value = _owner
}

const setSummary = (_summary) => {
    summary.value = _summary
}

const setStarting = (_starting) => {
    starting.value = _starting
}

const setExpiration = (_expiration) => {
    expiration.value = _expiration
}

/**
 * Create Campaign
 */
const create = async () => {
    /* Validate title. */
    if (!title.value) {
        return alert(`Please enter a campaign title.`)
    }

    /* Validate funding goal. */
    if (!fundingGoal.value) {
        return alert(`Please enter a funding goal.`)
    }

    /* Validate currency. */
    if (currency.value === 'USD') {
        return alert(`Oops! USD stablecoin campaigns are NOT supported yet. Please consider donating to Ava's DAO and help support the development of this platform.`)
    }

    /* Validate summary. */
    if (!summary.value) {
        return alert(`Please enter a brief summary for this campaign.\n\nNOTE: You'll be able to add a full detailed description later from the Campaign Manager.`)
    }

    /* Validate owner. */
    if (!owner.value) {
        return alert(`Please enter the campaign owner's account / address.\n\nNOTE: This is the account that will receive the funds (if the funding goal is reached before the campaign expires).`)
    }

    /* Create campaign package. */
    // NOTE: Funding goal supports values down to 0.001 NEXA,
    //       or 1 (micro) mNEXA
    const pkg = {
        owner: owner.value,
        title: title.value,
        summary: summary.value,
        fundingGoal: BigInt(fundingGoal.value * 100),  // NOTE: Amount is in satoshis.
        starting: starting.value,
        expiration: expiration.value,
    }
    console.log('CAMPAIGN PKG', pkg)

    const response = await $fetch('/v1/campaign', {
        method: 'POST',
        body: pkg,
    })
    .catch(err => console.error(err))
    console.log('RESPONSE', response)

    /* Deploy contract. */
    // deployContract(pkg)
}

/**
 * Deploy Contract
 *
 * Deploys the new campaign to the blockchain.
 */
const deployContract = async (_pkg) => {
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
    const abi = Campaign.getAbi

    /* Set bytecode. */
    const bytecode = Campaign.getBytecode

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

        alert(`Your NEW campaign has been successfully deployed onto the SmartNEXA network!\n\n${deployed.address}`)
    }
}

/* Initialize currency. */
currency.value = 'NEXA'

/* Set starting. */
// FOR DEV PURPOSE ONLY
starting.value = moment().unix()

/* Initialize duration. */
duration.value = DEFAULT_CAMPAIGN_DURATION

/* Set expiration. */
// FOR DEV PURPOSE ONLY
expiration.value = moment().add(duration.value, 'days').unix()

nexUsd.value = await $fetch('https://nexa.exchange/nex')
    .catch(err => console.error(err))

</script>

<template>
    <main class="max-w-3xl mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <div class="space-y-12 sm:space-y-6">
            <div>
                <h1 class="sm:hidden text-5xl font-medium text-gray-900">
                    Launchpad
                </h1>
                <h1 class="hidden sm:flex text-4xl font-medium text-gray-900">
                    Campaign Launchpad
                </h1>

                <p class="mt-3 text-lg text-gray-500">
                    Create a NEW campaign in <span class="text-indigo-500 font-bold">under 2 minutes.</span>
                    Simply provide the required information requested below, then click submit.
                </p>

                <p class="mt-3 text-lg text-gray-500">
                    <span class="block text-rose-500 font-bold">Don't worry!</span>
                    You can add MUCH more detail later.
                </p>
            </div>

            <div>
                <label for="project-name" class="block text-xl font-medium text-gray-700">
                    <span class="text-2xl text-indigo-500">1.</span>
                    What is your Campaign title?
                </label>

                <div class="mt-1">
                    <input
                        v-model="title"
                        type="text"
                        class="px-5 py-4 block w-full bg-amber-50 border-2 border-amber-400 shadow text-2xl text-amber-700 font-medium rounded-md placeholder:text-amber-500"
                        placeholder="My Awesome Nexa Project"
                    />
                </div>
            </div>

            <h3>
                What is Your Purpose?
            </h3>

            <div class="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    class="w-full bg-lime-600 border-2 border-lime-800 rounded-xl py-3 px-3 flex flex-col items-center justify-center text-base font-medium text-indigo-700 shadow hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >

                    <h3 class="text-4xl text-lime-50 font-medium">
                        Funding
                    </h3>

                    <span class="text-base text-lime-200 font-medium italic">
                        Raise capital for a project
                    </span>
                </button>

                <button
                    type="button"
                    class="w-full bg-cyan-600 border-2 border-cyan-800 rounded-xl py-3 px-3 flex flex-col items-center justify-center text-base font-medium text-indigo-700 shadow hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >

                    <h3 class="text-4xl text-cyan-50 font-medium">
                        Minting
                    </h3>

                    <span class="text-base text-cyan-200 font-medium italic">
                        Generate NFTs and SFTs for sale
                    </span>
                </button>

            </div>

            <div>
                <label for="project-name" class="flex flex-col sm:flex-row sm:items-center">
                    <span class="text-xl font-medium text-gray-700">
                        <span class="text-2xl text-indigo-500">2.</span>
                        What is your Funding Goal?
                    </span>

                    <span class="ml-7 sm:ml-3 text-gray-500">
                        (
                        <span class="font-medium text-sm text-green-300">
                            <a href="javascript://" @click="setNEXA" :class="{ 'font-bold text-base text-green-500' : currency === 'NEXA'}">NEXA</a>
                            <span class="text-gray-300 mx-2">|</span>
                            <a href="javascript://" @click="setUSD" :class="{ 'font-bold text-base text-green-500' : currency === 'USD' }">USD</a>
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
                        class="px-3 py-1 block w-full bg-amber-50 border-2 border-amber-400 shadow text-lg text-amber-700 font-medium rounded-md placeholder:text-amber-500"
                        placeholder="0"
                    />
                </div>

                <div v-if="displayFundingGoal.sats !== ''" class="mt-3 pl-5 w-48 grid grid-cols-2 gap-x-3 gap-y-1 items-center">
                    <span class="block text-xs text-gray-500 font-mono text-right">
                        NEXA
                    </span>
                    <span class="block text-sm text-indigo-500 font-mono font-bold">
                        {{displayFundingGoal.nex}}
                    </span>

                    <span class="block text-xs text-gray-500 font-mono text-right">
                        USD
                    </span>
                    <span class="block text-sm text-indigo-500 font-mono font-bold">
                        {{displayFundingGoal.usd}}
                    </span>

                    <span class="block text-xs text-gray-500 font-mono text-right">
                        Satoshis
                    </span>
                    <span class="block text-sm text-indigo-500 font-mono font-bold">
                        {{displayFundingGoal.sats}}
                    </span>

                </div>
            </div>

            <Summary
                :summary="summary"
                @set-summary="setSummary"
            />

            <Manager class="hidden" />

            <Owner
                :owner="owner"
                @set-owner="setOwner"
            />

            <Recipients class="hidden" />

            <Spotlight class="hidden" />

            <section>
                <Calendar class="hidden" :starting="starting" @set-starting="setStarting" />
                <Calendar class="hidden" :expiration="expiration" @set-expiration="setExpiration" />

                <label for="calendar-date-picker" class="block text-xl font-medium text-gray-700">
                    <span class="text-2xl text-indigo-500">5.</span>
                    What is the Starting Date?
                </label>

                <div class="mt-1">
                    <input
                        :value="displayStarting"
                        type="text"
                        class="px-3 py-1 block w-full bg-amber-50 border-2 border-amber-400 shadow text-lg text-amber-700 font-medium rounded-md placeholder:text-amber-500"
                        disabled
                    />
                </div>
            </section>

            <section>
                <label for="calendar-date-picker" class="mt-6 block text-xl font-medium text-gray-700">
                    <span class="text-2xl text-indigo-500">6.</span>
                    What is the Duration?
                    <span class="block ml-7 sm:inline sm:ml-2 text-gray-500 text-sm">( # of days )</span>
                </label>

                <div class="mt-1">
                    <input
                        v-model="duration"
                        type="text"
                        class="px-3 py-1 block w-full bg-amber-50 border-2 border-amber-400 shadow text-lg text-amber-700 font-medium rounded-md placeholder:text-amber-500"
                        placeholder="30 days"
                    />
                </div>

                <div class="font-bold">
                    <span class="block mt-2 ml-3 text-sm text-gray-500">CAMPAIGN EXPIRATION DATE IS</span>
                    <span class="block ml-3 text-lg text-amber-500">{{displayExpiration}}</span>
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

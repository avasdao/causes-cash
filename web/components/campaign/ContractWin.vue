<script setup lang="ts">
/* Import modules. */
import JSConfetti from 'js-confetti'
import numeral from 'numeral'

import {
    getAddressTokenBalance,
    getAddressTokenHistory,
    getTokenInfo,
} from '@nexajs/rostrum'

const props = defineProps({
    isExecuting: Boolean,
    campaign: Object,
    usd: Number,
})

/* Initialize stores. */
import { useCampaignStore } from '@/stores/campaign'
import { useWalletStore } from '@/stores/wallet'
const Campaign = useCampaignStore()
const Wallet = useWalletStore()

const winHandler = ref(null)

const amount = ref(null)
const amountNex = ref(0)
const currency = ref(null)

const error = ref(null)
const txidem = ref(null)

const availAssetAmount = ref(null)

/* Initialize globals. */
let jsConfetti

const ticker = computed(() => {
    let rewards

    if (props.campaign?.rewards) {
        rewards = props.campaign?.rewards

        return rewards[0].ticker
    }
})

/* Monitor pledging flag. */
watch(() => props.isExecuting, async (_status) => {
    console.log('EXECUTING HAS CHANGED', _status)

    if (_status) {
        winHandler.value = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-0'
    } else {
        winHandler.value = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-full'
    }

    console.log('WALLET', Wallet.wallet)

    if (Wallet.wallet === 'NEW') {
        return
    }
})

watch(() => props.campaign, async (_campaign) => {
console.log('WATCHING PROPS (campaign)...', _campaign)
console.log('CAMPAIGN ADDRESS', _campaign.address)

    /* Initialize locals. */
    let address
    let balance
    let balanceAmount
    let balanceConfirmed
    let decimals
    let divisor
    let history
    let info
    let tokenidHex

    /* Set (default) divisor. */
    divisor = 1 // no decimals

    /* Set address. */
    address = _campaign.address

    /* Request campaign (address) history. */
    history = await getAddressTokenHistory(address)
        .catch(err => console.error(err))
    console.log('CONTRACT HISTORY', history)

    /* Request token balance. */
    balance = await getAddressTokenBalance(address)
    console.log('CONTRACT BALANCE', balance)

    /* Set token id (hex). */
    tokenidHex = _campaign?.rewards[0].tokenidHex
    console.log('REWARD TOKEN ID (hex):', tokenidHex)

    /* Request campaign (address) history. */
    info = await getTokenInfo(tokenidHex)
        .catch(err => console.error(err))
    console.log('REWARD TOKEN INFO', info)

    /* Validate (token) info. */
    if (info) {
        /* Set (number of) decimals. */
        decimals = info.decimal_places

        /* Calculate (decimal) divisor. */
        divisor = 10 ** decimals
    }

    /* Set confirmed (contract) balance. */
    balanceConfirmed = balance?.confirmed[tokenidHex]
    console.log('BALANCE (confirmed):', balanceConfirmed)

    /* Calculate (decimal) balance amount. */
    balanceAmount = (balanceConfirmed / divisor)

    /* Set (formatted) available asset amount. */
    availAssetAmount.value = numeral(balanceAmount).format('0,0')
})

/* Monitor (user-defined) amount. */
watch(() => amount.value, (_amount) => {
    console.log('AMOUNT HAS CHANGED', _amount)

    /* Initialize locals. */
    let multiplier
    let nex
    let rate
    let satoshis

    /* Set (trade) rate. */
    rate = parseFloat(props.campaign?.scriptArgs.rate)

    /* Calculate multiplier. */
    multiplier = rate / 10000.0

    /* Calculate satoshis. */
    satoshis = amount.value / multiplier

    /* Calculate NEX. */
    nex = (satoshis / 100.0)

    /* Set NEX amount. */
    amountNex.value = numeral(nex).format('0,0.00')
    console.log('AMOUNT NEXA', amountNex.value)
})

const setNEXA = () => {
    if (currency.value !== 'NEXA') {
        currency.value = 'NEXA'

        amount.value = ((amount.value / props.usd) * 1000000).toFixed(2)
    }
}

const setUSD = () => {
    if (currency.value !== 'USD') {
        currency.value = 'USD'

        amount.value = ((amount.value * props.usd) / 1000000).toFixed(2)
    }
}

const trade = async () => {
    /* Initialize locals. */
    let response
    let txResult

    /* Validate amount. */
    if (!amount.value || amount.value === null) {
        return alert(`Oops! You MUST enter an amount to continue.`)
    }

    if (confirm(`Are you sure you want to continue with your trade?`)) {
        /* Request asset trade. */
        response = await Campaign
            .tradingPost(props.campaign, amount.value)
            .catch(err => console.error(err))
        console.log('TRADE RESPONSE', response)

        /* Vaildate response. */
        if (!response) {
            return
        }

        try {
            /* Parse response. */
            txResult = JSON.parse(response)
            console.log('TX RESULT', txResult)

            /* Validate error message. */
            if (txResult.error?.message) {
                // alert(txResult.error.message)
                error.value = txResult.error.message
            } else {
                // alert(txResult.result)
                txidem.value = txResult.result

                // BURST CONFETTI
                jsConfetti.addConfetti({
                    // emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                    // confettiColors: [
                    //     '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
                    // ],
                    // confettiRadius: 6,
                    confettiNumber: 300,
                })
            }
        } catch (err) {
            console.error(err)

            /* Set error. */
            error.value = response
        }
    }
}

const init = async () => {
    console.log('INIT (campaign):', props?.campaign)

    /* Set (default) currency. */
    currency.value = 'USD'

    /* Set initial window (class) handler. */
    winHandler.value = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-full'

    /* Initialize confetti. */
    jsConfetti = new JSConfetti()
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main v-if="props.isExecuting" class="fixed inset-0 overflow-hidden" role="dialog" aria-modal="true">
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute inset-0 bg-gray-300 bg-opacity-80" aria-hidden="true">
                <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                    <div class="w-screen max-w-md" :class="winHandler">
                        <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">

                            <header class="bg-gray-600 px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <h2 class="text-2xl font-medium text-gray-50">
                                        "Wise" Contract Manager
                                    </h2>

                                    <div @click="$emit('close')"  class="ml-3 h-7 flex items-center">
                                        <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                                            <span class="sr-only">Close panel</span>
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </header>

                            <Loading v-if="Wallet.isLoading" />

                            <CampaignWalletSetup v-else-if="!Wallet.isReady" />

                            <section v-else class="px-3 py-2 flex flex-col gap-4">

                                <label for="project-name" class="flex flex-col sm:flex-row sm:items-center">
                                    <span class="text-xl font-medium text-gray-700">
                                        How many ${{ticker}} do you want?
                                    </span>
                                </label>

                                <div v-if="availAssetAmount" class="px-3 py-2 bg-amber-100 border-2 border-amber-300 rounded-lg shadow">
                                    <h3>
                                        <span class="font-bold text-lg">{{numeral(availAssetAmount).format('0,0')}}</span> ${{ticker}} available
                                    </h3>
                                </div>

                                <section class="">
                                    <!-- <div class="text-sm font-medium text-gray-500 sm:flex-shrink-0">
                                        Pledge Amount ( in
                                        <span class="font-medium text-sm text-green-300">
                                            <a href="javascript://" @click="setNEXA" :class="{ 'font-bold text-base text-green-500' : currency === 'NEXA'}">NEXA</a>
                                            <span class="text-gray-300 mx-2">-OR-</span>
                                            <a href="javascript://" @click="setUSD" :class="{ 'font-bold text-base text-green-500' : currency === 'USD' }">USD</a>
                                        </span>
                                        )
                                    </div> -->

                                    <div class="text-sm text-gray-900 sm:col-span-2">
                                        <input
                                            v-model="amount"
                                            type="number"
                                            step="0.01"
                                            class="px-3 py-2 bg-yellow-200 border-2 border-yellow-400 w-full shadow-sm text-xl text-yellow-700 font-medium focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        >
                                    </div>
                                </section>

                                <button
                                    @click="trade"
                                    class="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1"
                                >
                                    Make Trade
                                </button>

                                <div class="px-3 py-2 bg-amber-100 border-2 border-amber-300 rounded-lg shadow">
                                    <h3>{{amountNex}} NEXA</h3>
                                </div>

                                <section v-if="txidem" class="my-10">
                                    <div>
                                        <h3 class="text-sm text-gray-500 font-medium">Trade completed successfully!</h3>

                                        <NuxtLink :to="'https://explorer.nexa.org/tx/' + txidem" target="_blank" class="text-blue-500 font-medium hover:underline">
                                            Click here to OPEN transaction details
                                        </NuxtLink>
                                    </div>
                                </section>

                                <section v-if="error" class="flex flex-col gap-4 my-10">
                                    <p>{{error}}</p>
                                </section>

                                <NuxtLink to="/profile" class="mt-10 flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1">
                                    Go to Profile / Wallet
                                </NuxtLink>

                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

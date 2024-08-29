<script setup lang="ts">
/* Import modules. */
import { listUnspent } from '@nexajs/address'

import { sha256 } from '@nexajs/crypto'

import { encodePrivateKeyWif } from '@nexajs/hdnode'

import { sendCoin } from '@nexajs/purse'

import { subscribeAddress } from '@nexajs/rostrum'

import { Wallet } from '@nexajs/wallet'

import QRCode from 'qrcode'


const props = defineProps({
    isPledging: Boolean,
    campaign: Object,
    usd: Number,
})

const MAX_MESSAGE_LENGTH = 220
const DUST_LIMIT = 546

const winHandler = ref(null)
const cleanup = ref(null)

const amount = ref(null)
const amountNex = ref(0)
const currency = ref(null)

const label = ref(null)
const comment = ref(null)
const url = ref(null)

const dataUrl = ref(null)
const pledgeUrl = ref(null)
const wallet = ref(null)
const depositAddress = ref(null)

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
const Profile = useProfileStore()

const numChars = computed(() => {
    /* Set label length. */
    const labelLen = label.value?.length || 0

    /* Set comment length. */
    const commentLen = comment.value?.length || 0

    /* Set URL length. */
    const urlLen = url.value?.length || 0

    /* Calculate total count. */
    const totalCount = labelLen + commentLen + urlLen

    /* Return total count. */
    return totalCount || 0
})

const updateQrCode = async () => {
    /* Handle (user-defined) amount. */
    if (amountNex.value > 0) {
        pledgeUrl.value = `${depositAddress.value}?amount=${amountNex.value}&label=Causes.Cash`
    } else {
        pledgeUrl.value = depositAddress.value
    }
    console.log('PLEDGE URL', pledgeUrl.value)

    /* Set data URL. */
    dataUrl.value = await QRCode.toDataURL(pledgeUrl.value)
}

const depositHandler = async (_updatedInfo) => {
    console.log('PLEDGE HANDLER', _updatedInfo)

    let unspent

    /* Encode Private Key WIF. */
    const wif = encodePrivateKeyWif(sha256, wallet.value.privateKey, 'mainnet')
    console.log('PRIVATE KEY (WIF):', wif)

    // Fetch all unspent transaction outputs for the temporary in-browser wallet.
    unspent = await listUnspent(wallet.value.address)
    console.log('\n  Unspent outputs:\n', unspent)

    /* Filter out ANY tokens. */
    // FIXME We should probably do something better than this, lol.
    unspent = unspent.filter(_unspent => {
        return _unspent.value > DUST_LIMIT
    })

    /* Validate unspent outputs. */
    if (unspent.length === 0) {
        return console.error('There are NO unspent outputs available.')
    }

    /* Build parameters. */
    const coins = unspent.map(_unspent => {
        const outpoint = _unspent.outpointHash
        const satoshis = _unspent.value

        return {
            outpoint,
            satoshis,
            wif,
        }
    })
    console.log('\n  Coins:', coins)

    /* Initialize user data. */
    let userData = ''

    if (label.value && label.value !== '') {
        userData += label.value
    }

    if (comment.value && comment.value !== '' && !userData) {
        userData += comment.value
    } else if (comment.value !== '') {
        userData += '~~' + comment.value
    }

    if (url.value && url.value !== '' && !userData) {
        userData += url.value
    } else if (url.value !== '') {
        userData += '~~' + url.value
    }

    /* Initialize receivers. */
    const receivers = []

    /* Validate user data. */
    if (userData) {
        console.log('USER DATA', userData)

        /* Initialize hex data. */
        let hexData = ''

        /* Convert user data (string) to hex. */
        for (let i = 0; i < userData.length; i++) {
            /* Convert to hex code. */
            let code = userData.charCodeAt(i).toString(16)

            /* Add hex code to string. */
            hexData += code
        }
        console.log('HEX DATA', hexData)

        // TODO Validate data length is less than OP_RETURN max (220).

        /* Add OP_RETURN data. */
        receivers.push({
            data: hexData,
        })
    }

    /* Add value output. */
    receivers.push({
        address: props.campaign?.receiver,
        satoshis: -1, // alias for send MAX
    })
    console.log('\n  Receivers:', receivers)

    /* Set automatic fee (handling) flag. */
    const autoFee = true

    /* Send UTXO request. */
    const response = await sendCoin(coins, receivers, autoFee)
    console.log('Send UTXO (response):', response)

    try {
        const txResult = JSON.parse(response)
        console.log('TX RESULT', txResult)
    } catch (err) {
        console.error(err)
    }
}

/* Monitor pledging flag. */
watch(() => props.isPledging, async (_status) => {
    console.log('PLEDGING HAS CHANGED', _status)

    if (_status) {
        winHandler.value = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-0'
    } else {
        winHandler.value = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-full'
    }

    wallet.value = await new Wallet.init(Profile.mnemonic)
    console.log('WALLET', wallet.value)

    depositAddress.value = wallet.value.address
    console.log('DEPOSIT ADDRESS', depositAddress.value)

    /* Update QR code. */
    updateQrCode()

    /* Handle pledging status. */
    if (_status) {
        // const myAddress = props.campaign?.receiver
        // console.log('MY ADDRESS', myAddress)

        /* Start monitoring address. */
        cleanup.value = await subscribeAddress(depositAddress.value, depositHandler)
        console.log('CLEANUP', cleanup.value)
    } else {
        console.log('CLEANUP MONITORING', cleanup.value)

        // TODO Return cleanup method from `subscribeAddress`
        // if (cleanup.value) {
        //     cleanup.value() // Execute to cancel (and cleanup) an Address subscription.
        // }
    }
})

/* Monitor (user-defined) amount. */
watch(() => amount.value, (_amount) => {
    console.log('AMOUNT HAS CHANGED', _amount)

    if (currency.value === 'NEXA') {
        // TODO Calculate KEX value.
        amountNex.value = _amount
    }

    if (currency.value === 'USD') {
        // TODO Calculate KEX value.
        // amountNex.value = _amount

        amountNex.value = ((amount.value / props.usd) * 1000000).toFixed(2)
    }
    console.log('AMOUNT NEX', amountNex.value)

    /* Update QR code. */
    updateQrCode()
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

/* Set (default) currency. */
currency.value = 'USD'

/* Set initial window (class) handler. */
winHandler.value = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-full'


</script>

<template>
    <main v-if="props.isPledging" class="fixed inset-0 overflow-hidden" role="dialog" aria-modal="true">
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute inset-0 bg-gray-300 bg-opacity-80" aria-hidden="true">
                <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                    <div class="w-screen max-w-md" :class="winHandler">
                        <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">

                            <header class="bg-gray-600 px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <h2 class="text-2xl font-medium text-gray-50">
                                        Make a Pledge
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

                            <div class="px-3 py-2">

                                <label for="project-name" class="flex flex-col sm:flex-row sm:items-center">
                                    <span class="text-xl font-medium text-gray-700">
                                        What is your Pledge amount?
                                    </span>
                                </label>

                                <section class="mt">
                                    <div class="text-sm font-medium text-gray-500 sm:flex-shrink-0">
                                        Pledge Amount ( in
                                        <span class="font-medium text-sm text-green-300">
                                            <a href="javascript://" @click="setNEXA" :class="{ 'font-bold text-base text-green-500' : currency === 'NEXA'}">NEXA</a>
                                            <span class="text-gray-300 mx-2">-OR-</span>
                                            <a href="javascript://" @click="setUSD" :class="{ 'font-bold text-base text-green-500' : currency === 'USD' }">USD</a>
                                        </span>
                                        )
                                    </div>

                                    <div class="mt-1 text-sm text-gray-900 sm:col-span-2">
                                        <input
                                            v-model="amount"
                                            type="number"
                                            step="0.01"
                                            class="px-3 py-2 bg-yellow-200 border-2 border-yellow-400 w-full shadow-sm text-xl text-yellow-700 font-medium focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                        >
                                    </div>
                                </section>

                                <section class="pb-1 sm:pb-6">
                                    <div class="sm:flex-1">
                                        <div class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">

                                            <NuxtLink :to="depositAddress"
                                                class="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1"
                                            >
                                                Click Here To Open Wallet
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </section>

                                <div class="mt-3 sm:mt-0 flex justify-center">
                                    <h2 class="text-2xl font-medium">
                                        - OR - Scan Below
                                    </h2>
                                </div>

                                <NuxtLink :to="depositAddress"
                                    class="flex justify-center"
                                >
                                    <img
                                        :src="dataUrl"
                                        class="my-5 w-64 h-64 border-2 border-yellow-500 rounded-lg"
                                    />
                                </NuxtLink>

                                <div class="pt-5 pb-5 sm:px-0 sm:pt-0">
                                    <div class="space-y-8 px-4 sm:px-6 sm:space-y-6">

                                        <div v-if="numChars" class="flex justify-center px-3 py-1 bg-rose-200 border-2 border-rose-400 rounded-md">
                                            <h3 class="text-rose-700 text-sm">
                                                Your pledge message is <span class="text-base font-bold">{{numChars}}</span> characters of {{MAX_MESSAGE_LENGTH}} max
                                            </h3>
                                        </div>

                                        <div>
                                            <div class="text-sm font-medium text-gray-500 sm:flex-shrink-0">
                                                Display Name (optional)
                                            </div>

                                            <div class="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                <input
                                                    v-model="label"
                                                    type="text"
                                                    class="px-3 py-2 bg-yellow-200 border-2 border-yellow-400 w-full shadow-sm text-xl text-yellow-700 font-medium focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                                >
                                            </div>
                                        </div>

                                        <div>
                                            <div class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                Comment (optional)
                                            </div>

                                            <div class="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                <textarea
                                                    v-model="comment"
                                                    rows="3"
                                                    class="px-3 py-2 bg-yellow-200 border-2 border-yellow-400 w-full shadow-sm text-xl text-yellow-700 font-medium focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="text-sm font-medium text-gray-500 sm:flex-shrink-0">
                                                Website / URL (optional)
                                            </div>

                                            <div class="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                <input
                                                    v-model="url"
                                                    type="text"
                                                    class="px-3 py-2 bg-yellow-200 border-2 border-yellow-400 w-full shadow-sm text-xl text-yellow-700 font-medium focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                                >
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

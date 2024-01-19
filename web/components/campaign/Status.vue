<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

import { decodeAddress } from '@nexajs/address'

import {
    getAddressBalance,
    getAddressHistory,
    getAddressTokenBalance,
    getTokenInfo,
    getTransaction,
} from '@nexajs/rostrum'

import {
    binToHex,
} from '@nexajs/utils'

const props = defineProps({
    campaign: Object,
    provider: String,
    usd: Number,
    availAssetAmount: String,
})

import { useWalletStore } from '@/stores/wallet'
const Wallet = useWalletStore()

// const availAssets = ref(null)
// const campaignPledged = ref(0)
const fundedDisplay = ref(null)
const fundedDisplayUsd = ref(null)
// const expiration = ref(0)
const expirationDisplay = ref(null)
const pctCompleted = ref(null)

const tickerDisplay = computed(() => {
    /* Validate campaign rewards. */
    if (!props.campaign?.rewards) {
        return null
    }

    /* Return ticker. */
    return props.campaign.rewards[0].ticker
})

onMounted(() => {
    //
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main v-if="props.campaign?.scriptHash" class="mt-5">
        <h4 class="sr-only">Status</h4>
        <p v-if="availAssetAmount" class="text-3xl text-center font-medium text-gray-700">
            {{availAssetAmount}} ${{tickerDisplay}} remaining
        </p>

        <div class="mt-6" aria-hidden="true">
            <div class="bg-gray-200 rounded-full overflow-hidden">
                <div class="h-2 bg-green-600 rounded-full" :style="{ width: pctCompleted + '%' }"></div>
            </div>

            <div class="text-sm text-center font-medium text-gray-600 mt-1 pl-5">
                <div class="text-green-600">
                    <span class="text-xl">{{pctCompleted}}</span> complete with <span class="text-xl">{{expirationDisplay}}</span> to go
                </div>
            </div>

        </div>
    </main>

    <main v-else class="mt-5">
        <h4 class="sr-only">Status</h4>

        <p class="text-3xl text-center font-medium text-gray-700">
            {{fundedDisplay}} of {{props.campaign?.goals[0].displayAmountMex}} <span class="text-2xl text-gray-500">m</span>NEXA
        </p>

        <p class="text-center text-base text-gray-500 font-medium">
            {{fundedDisplayUsd}} of {{props.campaign?.goals[0].displayAmountUsd}} USD
        </p>

        <div class="mt-6" aria-hidden="true">
            <div class="bg-gray-200 rounded-full overflow-hidden">
                <div class="h-2 bg-green-600 rounded-full" :style="{ width: pctCompleted + '%' }"></div>
            </div>

            <div class="text-sm text-center font-medium text-gray-600 mt-1 pl-5">
                <div class="text-green-600">
                    <span class="text-xl">{{pctCompleted}}</span> complete with <span class="text-xl">{{expirationDisplay}}</span> to go
                </div>
            </div>

        </div>
    </main>
    <!-- <pre>{{props.campaign}}</pre> -->
</template>

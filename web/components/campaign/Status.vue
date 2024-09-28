<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

import { decodeAddress } from '@nexajs/address'
import { binToHex } from '@nexajs/utils'

/* Set (REST) API endpoints. */
const ROSTRUM_ENDPOINT = 'https://nexa.sh/v1/rostrum'

/* Set constants. */
const ROSTRUM_METHOD = 'POST'

/* Initialize globals. */
let body
let response

const headers = new Headers()
headers.append('Content-Type', 'application/json')

const getAddressBalance = async (_address) => {
    body = JSON.stringify({
        request: 'blockchain.address.get_balance',
        params: _address,
    })

    // NOTE: Native `fetch` requires Node v21+.
    response = await fetch(ROSTRUM_ENDPOINT, {
        method: ROSTRUM_METHOD,
        headers,
        body,
    }).catch(err => console.error(err))
    response = await response.json()
    // console.log('RESPONSE', response)

    return response
}

const getAddressHistory = async (_address) => {
    body = JSON.stringify({
        request: 'blockchain.address.get_history',
        params: _address,
    })

    // NOTE: Native `fetch` requires Node v21+.
    response = await fetch(ROSTRUM_ENDPOINT, {
        method: ROSTRUM_METHOD,
        headers,
        body,
    }).catch(err => console.error(err))
    response = await response.json()
    // console.log('RESPONSE', response)

    return response
}

const getAddressTokenBalance = async (_address) => {
    body = JSON.stringify({
        request: 'token.address.get_balance',
        params: _address,
    })

    // NOTE: Native `fetch` requires Node v21+.
    response = await fetch(ROSTRUM_ENDPOINT, {
        method: ROSTRUM_METHOD,
        headers,
        body,
    }).catch(err => console.error(err))
    response = await response.json()
    // console.log('RESPONSE', response)

    return response
}

const getTokenInfo = async (_tokenid) => {
    body = JSON.stringify({
        request: 'token.genesis.info',
        params: _tokenid,
    })

    // NOTE: Native `fetch` requires Node v21+.
    response = await fetch(ROSTRUM_ENDPOINT, {
        method: ROSTRUM_METHOD,
        headers,
        body,
    }).catch(err => console.error(err))
    response = await response.json()
    // console.log('RESPONSE', response)

    return response
}

const getTransaction = async (_id) => {
    body = JSON.stringify({
        request: 'blockchain.transaction.get',
        params: [_id, true],
    })

    // NOTE: Native `fetch` requires Node v21+.
    response = await fetch(ROSTRUM_ENDPOINT, {
        method: ROSTRUM_METHOD,
        headers,
        body,
    }).catch(err => console.error(err))
    response = await response.json()
    // console.log('RESPONSE', response)

    return response
}

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

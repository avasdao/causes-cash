<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

import { decodeAddress } from '@nexajs/address'

import {
    getAddressBalance,
    getAddressHistory,
    getAddressTokenBalance,
    getTransaction,
} from '@nexajs/rostrum'

import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

import { getTokens } from '@nexajs/token'


const props = defineProps({
    campaign: Object,
    provider: String,
    usd: Number,
})

import { useWalletStore } from '@/stores/wallet'
const Wallet = useWalletStore()

const campaignPledged = ref(0)
const campaignGoals = ref(null)
const campaignGoalIdx = ref(null)
const expiration = ref(0)

const availAssets = ref(null)

const STUDIO_TOKENID = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000'


watch(() => props.campaign, async (_campaign) => {
    // console.log('CAMPAIGN HAS CHANGED', _campaign)

    let balance = 0
    let history

    /* Set expiration. */
    expiration.value = _campaign.expiresAt

    if (_campaign?.scriptHash) {
        /* Request token info. */
        const result = await getAddressTokenBalance(_campaign?.address)
        console.log('TOKEN (address) BALANCE', result)

        const balance = result?.confirmed[STUDIO_TOKENID]
        console.log('BALANCE', balance)

        availAssets.value = numeral(balance).format('0,0')

        return
    }

    if (_campaign.goals?.length > 1) {
        const decoded = decodeAddress(_campaign.receiver)
        // console.log('DECODED', decoded)

        const scriptPubKey = binToHex(decoded.hash).slice(2)
        // console.log('scriptPubKey', scriptPubKey)

        /* Request (receiver) address history. */
        history = await getAddressHistory(_campaign.receiver)
            .catch(err => console.error(err))
        // console.log('HISTORY', history)

        for (let i = 0; i < history.length; i++) {
            const tx = await getTransaction(history[i].tx_hash)
            // console.log('TX', tx)

            for (let j = 0; j < tx.vout.length; j++) {
                const output = tx.vout[j]
                // console.log('OUTPUT', output)

                if (output.scriptPubKey.hex === scriptPubKey) {
                    balance += output.value_satoshi
                    // console.log('BALANCE', balance)
                }
            }
        }
        // console.log('BALANCE (final):', balance)

        // FIXME Handle campaign index (using _campaign.goals)
        campaignGoalIdx.value = 0
    } else {
        /* Request (receiver) address balance. */
        balance = await getAddressBalance(_campaign.receiver)
            .catch(err => console.error(err))
        // console.log('BALANCE', balance)

        // FIXME Handle campaign index (using _campaign.goals)
        campaignGoalIdx.value = 0
    }

    /* Set campaign goals. */
    campaignGoals.value = _campaign.goals

    if (balance) {
        /* Set campaign pledged amount. */
        campaignPledged.value = balance.confirmed || balance
    }
})


onMounted(() => {
    // init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main v-if="props.campaign?.scriptHash" class="mt-5">
        <h4 class="sr-only">Status</h4>
        <p class="text-3xl text-center font-medium text-gray-700">
            {{availAssets}} $STUDIO remaining
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

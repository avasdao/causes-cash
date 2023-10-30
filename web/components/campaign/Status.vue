<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

import { decodeAddress } from '@nexajs/address'

import {
    getAddressBalance,
    getAddressHistory,
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


watch(() => props.campaign, async (_campaign) => {
    // console.log('CAMPAIGN HAS CHANGED', _campaign)

    let balance = 0
    let history

    /* Set expiration. */
    expiration.value = _campaign.expiresAt

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

/* Monitor (user-defined) amount. */
watch(() => Wallet.address, async (_address) => {
    console.log('CAMPAIGN ADDRESS HAS CHANGED', _address)

    console.log('INIT', props.campaign)

    let scriptPubKey
    let tokens
    let unspentTokens

    scriptPubKey = hexToBin(props.campaign?.scriptPubKey)
console.log('WALLET', Wallet.wallet)
console.log('PK', Wallet.wallet.privateKey)
console.log('WIF', Wallet.wallet.wif)
    tokens = await getTokens(Wallet.wallet.wif, scriptPubKey)
        .catch(err => console.error(err))

    // FOR DEV PURPOSES ONLY -- take the LARGEST input
    tokens = [tokens.sort((a, b) => Number(b.tokens) - Number(a.tokens))[0]]
    // FOR DEV PURPOSES ONLY -- add scripts
    console.log('\n  Tokens GUEST:', tokens)

    /* Calculate the total balance of the unspent outputs. */
    // FIXME: Add support for BigInt.
    unspentTokens = tokens
        .reduce(
            (totalValue, unspentOutput) => (totalValue + unspentOutput.tokens), BigInt(0)
        )
    console.log('UNSPENT TOKENS', unspentTokens)

    availAssets.value = numeral(unspentTokens).format('0,0')

})
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

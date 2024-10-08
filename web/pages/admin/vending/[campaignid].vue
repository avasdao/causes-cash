<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'
import { binToHex } from '@nexajs/utils'

// FOR DEV PURPOSE ONLY
import { decodeAddress } from '@nexajs/address'
import MetanetHistory from './metanet-causes-history.js'

definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Vending — Causes Cash`,
    meta: [
        { name: 'description', content: `An uncensorable funding platform for radical creators and unstoppable service providers.` }
    ],
})

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const Wallet = useWalletStore()

const route = useRoute()
const campaignid = route.params.campaignid
// console.log('Campaign ID:', campaignid)

const campaign = ref(null)
const clicked = ref(null)
const history = ref(null)
const historyStart = ref(null)
const mnemonic = ref(null)

const BATCH_SIZE = 100

const missingHistory = computed(() => {
    if (!history.value) {
        return []
    }

    return history.value
})

const runAudit = async () => {
    /* Initialize locals. */
    let auditorIdx
    let partialHistory
    let tributes

    /* Clear click handler. */
    clicked.value = {}

    partialHistory = MetanetHistory
        .slice(Number(historyStart.value), Number(historyStart.value) + BATCH_SIZE)

    auditorIdx = Number(historyStart.value)

    /* Reset starting index. */
    historyStart.value = Number(historyStart.value) + BATCH_SIZE

    tributes = []

    partialHistory.forEach(async _tx => {
        /* Initialize locals. */
        let decoded
        let pkScriptHash
        let response
        let source
        let txHash

        txHash = _tx.tx_hash

        /* Decode receiving address. */
        decoded = decodeAddress('nexa:nqtsq5g5k99c8530p4a0znzph6rckj6rfw456e3kqefv60lu')

        /* Set public key script hash. */
        pkScriptHash = binToHex(decoded.hash)

        /* Parse source info. */
        source = await Wallet.parseTx(pkScriptHash, txHash)
        // console.log('SOURCE', source, pkScriptHash, txHash)

        /* Validate source. */
        if (source) {
            /* Request vending detail. */
            response = await $fetch('/api/admin/auditor', {
                method: 'POST',
                body: {
                    sessionid: Profile.sessionid,
                    txidem: source.txidem,
                }
            }).catch(err => console.error(err))
            // console.log('RESPONSE (auditor)', response)

            if (!response) {
                /* Add source to tributes. */
                tributes.push({
                    idx: ++auditorIdx,
                    ...source,
                })
            } else {
                // FOR DEV PURPOSES ONLY
                tributes.push({
                    idx: ++auditorIdx,
                    found: true,
                    ...source,
                })
            }
        } else {
            /* Increment auditor index. */
            auditorIdx++
        }
        // console.log('TRIBUTES', tributes)

        /* Update history (display). */
        history.value = [ ...tributes ]
        // console.log('HISTORY LENGTH', history.value.length)
    })
}

const completeVending = async (_tx) => {
    /* Initialize locals. */
    let tokenid
    let receiver
    let response
    let satoshis

    /* Validate mnemonic. */
    if (!mnemonic.value) {
        return alert('Oops! You forgot to give me a mnemonic for the Wallet.')
    }

    /* Set (clicked) flag. */
    clicked.value[_tx.idx] = true

    tokenid = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000' // $AVAS

    satoshis = _tx.satoshis

    receiver = _tx.sender

    /* Request vending detail. */
    response = await $fetch('/api/admin/vendingDetail', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
            campaignid,
            mnemonic: mnemonic.value,
            tokenid,
            receiver,
            satoshis,
            txidem: _tx.txidem,
            rate: campaign.value.rate,
        }
    }).catch(err => console.error(err))
    console.log('RESPONSE (vending)', response)

    /* Validate response. */
    // if (response) {
    //     /* Set campaign. */
    //     campaign.value = response.campaign
    //     // console.log('CAMPAIGN', campaign.value)
    // }
}

const init = async () => {
    /* Initialize locals. */
    let response

    /* Initialize history value. */
    // TODO Save to Profile
    historyStart.value = 0

    /* Initialize button click handler. */
    clicked.value = {}

    /* Request vending detail. */
    response = await $fetch('/api/admin/vendingDetail', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
            campaignid,
        }
    }).catch(err => console.error(err))

    /* Validate response. */
    if (response) {
        /* Set campaign. */
        campaign.value = response.campaign
        // console.log('CAMPAIGN', campaign.value)
    }
}

onMounted(() => {
    console.log('HISTORY', MetanetHistory)

    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-7xl mx-auto px-3 py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Campaign Details
        </h1>

        <h3 class="-mt-3 pl-2 text-base text-gray-400 font-bold tracking-widest">
            {{campaignid}}
        </h3>

        <section class="h-12 flex flex-row gap-8">
            <button @click="runAudit" class="w-fit px-5 py-2 text-xl font-medium text-lime-100 bg-lime-600 border-2 border-lime-400 rounded-lg shadow hover:bg-lime-500">
                Run Audit
            </button>

            <input
                v-model="historyStart"
                type="numeric"
                placeholder="0"
                class="w-20 h-full px-5 bg-amber-50 border border-amber-200 rounded-lg shadow"
            />

            <input
                v-model="mnemonic"
                type="text"
                placeholder="correct horse battery staple"
                class="w-64 h-full px-5 bg-amber-50 border border-amber-200 rounded-lg shadow"
            />

        </section>

        <section v-if="campaign">
            <div class="mt-3 grid grid-cols-3 gap-x-4 gap-y-2">
                <span class="text-right font-medium">
                    Status
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.isActive ? 'Active' : 'Not Active'}}
                </span>

                <span class="text-right font-medium">
                    Receiver
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.receiver}}
                </span>

                <span class="text-right font-medium">
                    Goal
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.goal}}
                </span>

                <span class="text-right font-medium">
                    Asset ID
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.tokenid}}
                </span>

                <span class="text-right font-medium">
                    Token ID
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.groupid}}
                </span>

                <span class="text-right font-medium">
                    # Tokens
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.tokens}}
                </span>

                <span class="text-right font-medium">
                    Rate
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.rate}}
                </span>

                <span class="text-right font-medium">
                    Paid
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.paid}}
                </span>

                <span class="text-right font-medium">
                    # Transactions
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.txCount}}
                </span>

                <span class="text-right font-medium">
                    Created
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.createdAt}}
                </span>

                <span class="text-right font-medium">
                    Last Update
                </span>
                <span class="col-span-2 truncate">
                    {{campaign.updatedAt}}
                </span>
            </div>
        </section>

        <div class="px-5 my-5 border-t border-gray-300" />

        <section>
            <h3 class="-mt-3 pl-2 text-base text-gray-400 font-bold tracking-widest">
                Auditor Reports
            </h3>

            <h3 v-if="missingHistory.length === 0" class="p-5 italic tracking-widest">
                There are NO reports.
            </h3>

            <div v-for="tx of missingHistory" :key="tx.txidem" class="mx-5 my-3 px-5 py-3 flex flex-col gap-3 border-2 rounded-xl shadow" :class="[ tx.found ? 'bg-amber-50 border-amber-200 opacity-30' : 'bg-rose-500 border-rose-700' ]">
                <NuxtLink :to="'https://explorer.nexa.org/tx/' + tx.txidem" target="_blank" class="block text-amber-800 truncate hover:underline">
                    {{tx.txidem}}
                </NuxtLink>

                <NuxtLink :to="'https://explorer.nexa.org/address/' + tx.sender" target="_blank" class="block text-amber-500 truncate hover:underline">
                    {{tx.sender}}
                </NuxtLink>

                <span class="block">
                    {{numeral(tx.satoshis / 100.0).format('0,0.00')}} <small>NEXA</small>
                </span>

                <div class="-mt-10 text-right text-xl font-bold">
                    #{{tx.idx}}
                </div>

                <button
                    @click="completeVending(tx)"
                    v-if="!tx.found"
                    class="my-5 px-5 py-3 text-2xl text-red-100 font-bold bg-red-700 border-2 border-red-900 rounded-xl shadow"
                    :class="[ clicked[tx.idx] ? 'opacity-30' : '' ]"
                    :disabled="clicked[tx.idx]"
                >
                    Complete Vending
                </button>
            </div>
        </section>

        <!-- <pre>{{ campaign }}</pre> -->

        <!-- <pre v-if="history">{{ JSON.stringify(history, null, 2) }}</pre> -->
    </main>
</template>

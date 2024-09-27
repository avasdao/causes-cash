<script setup lang="ts">
// FOR DEV PURPOSE ONLY
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
import { useSystemStore } from '@/stores/system'
const Profile = useProfileStore()
const System = useSystemStore()

const route = useRoute()
const campaignid = route.params.campaignid
// console.log('Campaign ID:', campaignid)

const campaign = ref(null)
const history = ref(null)

const runAudit = async () => {
    history.value = MetanetHistory.slice(0, 10)
}

const init = async () => {
    /* Initialize locals. */
    let response

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
        console.log('CAMPAIGN', campaign.value)
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

        <button @click="runAudit" class="w-fit px-5 py-2 text-xl font-medium text-lime-100 bg-lime-600 border-2 border-lime-400 rounded-lg shadow hover:bg-lime-500">
            Run Audit
        </button>

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

        <!-- <pre>{{ campaign }}</pre> -->

        <pre>{{ history }}</pre>
    </main>
</template>

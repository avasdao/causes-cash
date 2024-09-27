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

const init = async () => {
    campaign.value = await $fetch('/api/admin/vendingDetail', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
            campaignid,
        }
    }).catch(err => console.error(err))
    console.log('CAMPAIGN', campaign.value)
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

        <h3 class="text-xl text-gray-400 font-bold tracking-widest">
            {{campaignid}}
        </h3>

        <button class="w-fit px-5 py-2 text-xl font-medium text-amber-100 bg-amber-600 border border-amber-700 rounded-xl shadow hover:bg-amber-500">
            Run Audit
        </button>

        <pre>{{ campaign }}</pre>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: `Campaign Manager — Causes Cash`,
    meta: [
        { name: 'description', content: `An uncensorable funding platform for radical creators and unstoppable service providers.` }
    ],
})

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useRainmakerStore } from '@/stores/rainmaker'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const Rainmaker = useRainmakerStore()
const System = useSystemStore()
const Wallet = useWalletStore()

const route = useRoute()
const campaignid = ref(route.params.campaignid)
// console.log('RAINMAKER (campaignid):', campaignid.value)

const profiles = ref(null)

const init = async () => {
    if (!Profile.sessionid) {
        throw new Error('Oops! You MUST sign-in to continue.')
    }
    /* Initialize locals. */
    let response

    /* Request profiles. */
    response = await $fetch('/api/rainmaker/campaign', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
            campaignid: campaignid.value,
        },
    })
    .catch(err => console.error(err))
    console.log('RAINMAKER (campaign):', response)

    /* Set profiles. */
    profiles.value = response
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
    <main class="max-w-7xl mx-auto px-3 py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Campaign Manager
        </h1>

        <pre>
            {{ profiles }}
        </pre>
    </main>
</template>

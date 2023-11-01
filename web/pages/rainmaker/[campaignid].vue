<script setup lang="ts">
useHead({
    title: `Blank — Causes Cash`,
    meta: [
        { name: 'description', content: `Causes Cash makes building your next BIG idea effortless.` }
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
console.log('RAINMAKER (campaignid):', campaignid.value)

const profiles = ref(null)

const init = async () => {
    /* Initialize locals. */
    let response

    /* Request profiles. */
    response = await $fetch('/api/rainmaker/profiles', {
        method: 'GET',
        query: {
            sessionid: Profile.sessionid,
            campaignid: campaignid.value,
        },
    })
    .catch(err => console.error(err))
    console.log('RAINMAKER (profiles):', response)

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
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="text-5xl font-medium">
            Campaign Manager
        </h1>

        <pre>
            {{ profiles }}
        </pre>
    </main>
</template>

<script setup lang="ts">
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
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

const route = useRoute()
const campaignid = route.params.campaignid
// console.log('Campaign ID:', campaignid)

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

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

        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eius voluptatem minus natus at eveniet dolorum eos mollitia, maxime animi excepturi harum omnis illum odit recusandae pariatur! Unde, explicabo molestias.
        </p>
    </main>
</template>

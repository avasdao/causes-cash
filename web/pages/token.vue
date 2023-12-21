<script setup lang="ts">
useHead({
    title: `$HONOR Society Token — Causes Cash`,
    meta: [
        { name: 'description', content: `An uncensorable funding platform for radical creators and unstoppable service providers.` }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

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
            $HONOR Society Token
        </h1>

        <p>
            $HONORs are minted at the same schedule as NexaPoW; by means of the Nexa Token Mining (NexaTM) protocol.
        </p>
    </main>
</template>

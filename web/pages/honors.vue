<script setup lang="ts">
useHead({
    title: `Nexican Honor Society — Causes Cash`,
    meta: [
        { name: 'description', content: `Causes Cash makes building your next BIG idea effortless.` }
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
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="text-5xl font-medium">
            Nexican Honor Society
        </h1>

        <p>
            Community-driven reward tokens for the TOP100 App Creators and Service Providers making the greatest positive impact on the Nexican community.
        </p>

        <p>
            Creators and Providers receive (sponsored) daily payouts in NEXA, based on the amount of HONOR they're pledged, and their overall Report Card rating.
        </p>

        <ol>
            <li>TOP100 Receive Daily Base Payouts, Honorable</li>
            <li>Once per Week (Monday @ 00:00), TOP30 Payouts, Elite</li>
            <li>Once per Month (1st @ 00:00), TOP10 Payouts, Noble</li>
            <li>Once per Festival (Opening Ceremony), TOP3 Payouts, Legend</li>
            <li></li>
        </ol>
    </main>
</template>

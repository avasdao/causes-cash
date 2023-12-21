<script setup lang="ts">
useHead({
    title: `Discover — Causes Cash`,
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
            Discover
        </h1>

        <pre>
{ state: '☆ In the Spotlight (20)', abbr: 'spotlight', comment: `↪ highest # of community votes` },
{ state: '☆ New & Noteworthy (11)', abbr: 'new', comment: `↪ recently added by a notable` },
{ state: 'Adoption (1)', abbr: 'adoption', comment: `add a comment here..` },
{ state: 'Community (3)', abbr: 'community', comment: `↪ working together for the commons` },
{ state: 'Decentralized App (1)', abbr: 'dapp', comment: `add a comment here..` },
{ state: 'Design & Art (0)', abbr: 'design-art', comment: `add a comment here..` },
{ state: 'Education (1)', abbr: 'education', comment: `add a comment here..` },
{ state: 'Film & Video (2)', abbr: 'film-video', comment: `add a comment here..` },
{ state: 'Fun & Games (1)', abbr: 'fun-games', comment: `add a comment here..` },
{ state: 'Hardware (1)', abbr: 'hardware', comment: `add a comment here..` },
{ state: 'Health & Wellness (2)', abbr: 'health-wellness', comment: `add a comment here..` },
{ state: 'Infrastructure (8)', abbr: 'infrastructure', comment: `add a comment here..` },
{ state: 'Music (0)', abbr: 'music', comment: `add a comment here..` },
{ state: 'Privacy (1)', abbr: 'privacy', comment: `add a comment here..` },
{ state: 'Publishing (1)', abbr: 'publishing', comment: `add a comment here..` },
{ state: 'Security (1)', abbr: 'security', comment: `add a comment here..` },
{ state: 'Software (2)', abbr: 'software', comment: `add a comment here..` },
{ state: 'World View (4)', abbr: 'world', comment: `add a comment here..` },
{ state: 'Youth (1)', abbr: 'youth', comment: `add a comment here..` },
        </pre>
    </main>
</template>

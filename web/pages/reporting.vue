<script setup lang="ts">
definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Reporting Manager — Causes Cash`,
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
        <AuthWin />
    </main>
</template>

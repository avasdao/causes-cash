<script setup lang="ts">
definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Time Capsule — Causes Cash`,
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
    <main class="max-w-7xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="flex flex-row gap-4 items-center text-5xl font-medium">
            Time Capsule

            <svg class="h-10 w-auto shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </h1>

        <p>
            Discover your locked Nexa wallets and manage future assets for yourself and others.
        </p>

        <ol class="list-disc pl-10 text-gray-700">
            <li>
                Time-lock coins and tokens to <span class="text-indigo-500 font-bold">ANY</span> Nexa address

                <em class="block text-sm text-gray-500">
                    Requires a Script Public Key
                </em>
            </li>
        </ol>
    </main>
</template>

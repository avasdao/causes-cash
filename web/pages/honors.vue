<script setup lang="ts">
useHead({
    title: `Nexican Honor Society — Causes Cash`,
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
    <main class="max-w-7xl mx-auto py-5 flex flex-col gap-4">
        <h1 class="text-5xl font-medium">
            Nexican Honor Society
        </h1>

        <p class="w-full lg:w-2/3 px-5 py-2">
            Community-driven reward tokens for the TOP100 App Creators and Service Providers making the greatest positive impact on the Nexican community.
        </p>

        <p class="w-full lg:w-2/3 px-5 py-2">
            Creators and Providers receive (sponsored) daily payouts in $NEXA, based on the amount of <NuxtLink to="/token" class="text-lg text-blue-500 font-bold">$HONOR</NuxtLink> they're pledged, and their overall Report Card rating.
        </p>

        <ol class="my-5 pl-20 list-disc space-y-5">

            <!-- $10,000 to $1,000,000 per month -->
            <li>
                <h3 class="text-lg font-medium">
                    Legends, TOP3
                </h3>

                Once per Festival (Opening Ceremony)

                <h3 class="text-xl text-rose-500 font-light">
                    1B to 100 Billion NEXA
                    <span class="block text-lg text-rose-700 italic">
                        <sup>US</sup>$10.12K to <sup>US</sup>$1M
                    </span>
                </h3>
            </li>

            <!-- $10,000 to $100,000 per month -->
            <li>
                <h3 class="text-lg font-medium">
                    Nobles, TOP10
                </h3>

                Once per Month (1st @ 00:00)

                <h3 class="text-xl text-rose-500 font-light">
                    100M to 1 Billion NEXA
                    <span class="block text-lg text-rose-700 italic">
                        <sup>US</sup>$1.01K to <sup>US</sup>$10K
                    </span>
                </h3>
            </li>

            <!-- $12,000 to $48,000 per month -->
            <li>
                <h3 class="text-lg font-medium">
                    Elites, TOP30
                </h3>

                Once per Week (Monday @ 00:00)

                <h3 class="text-xl text-rose-500 font-light">
                    10M to 40 Million NEXA
                    <span class="block text-lg text-rose-700 italic">
                        <sup>US</sup>$101.33 to <sup>US</sup>$400.00
                    </span>
                </h3>
            </li>

            <!-- $30,000 per month -->
            <li>
                <h3 class="text-lg font-medium">
                    Honorables, TOP100
                </h3>

                Receive Daily <em class="text-indigo-500 font-medium">Base</em> Payouts

                <h3 class="text-xl text-rose-500 font-light">
                    1 Million NEXA
                    <span class="block text-lg text-rose-700 italic">
                        <sup>US</sup>$10.8883
                    </span>
                </h3>
            </li>

        </ol>

        <p class="w-full lg:w-2/3 px-5 py-2">
            * NOTE: Creators and Providers MUST qualify to a minimum <span class="font-medium">Report Card Ranking (RCR)</span> of <span class="text-xl text-indigo-500 font-medium italic">TOP70</span> for first-time entry to the Nexican Honor Society.
        </p>

    </main>
</template>

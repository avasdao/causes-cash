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

        <section class="bg-white py-24 sm:py-32">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    <div>
                        <time datetime="2021-08" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Spring 2024
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>

                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            Founded the society
                        </p>

                        <p class="mt-1 text-base leading-7 text-gray-600">
                            Initial token genesis and start of token mining will establish this asset's new digital life.
                        </p>
                    </div>

                    <div>
                        <time datetime="2021-12" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Summer 2024
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>

                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            Secured $10K in funding
                        </p>

                        <p class="mt-1 text-base leading-7 text-gray-600">
                            Initial funding for this organization will come from donation from generous Nexicans and administrative staff.
                        </p>
                    </div>

                    <div>
                        <time datetime="2022-02" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Fall 2024
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>

                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            1st class of Builders
                        </p>

                        <p class="mt-1 text-base leading-7 text-gray-600">
                            The inaugural class of Nexicans will serve as a baseline for the society to grow.
                        </p>
                    </div>

                    <div>
                        <time datetime="2022-12" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
                            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            Winter 2024
                            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true"></div>
                        </time>

                        <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                            2nd class of Builders
                        </p>

                        <p class="mt-1 text-base leading-7 text-gray-600">
                            Learning from the previous class, we continue to build and grow on top of our previous experiences.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

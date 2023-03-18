<script setup lang="ts">
/* Import modules. */
import { ref } from 'vue'

/* Initialize campaigns. */
const campaigns = ref([])

campaigns.value.push({
    id: '475b4cfc-ae95-419d-9681-cf378c083963',
    title: `Causes Cash: Nexa-powered P2P Crowdfunding`,
    url: 'https://causes.cash/c/475b4cfc-ae95-419d-9681-cf378c083963',
    manager: {
        name: `0xShomari`,
        url: 'https://twitter.com/0xShomari',
        avatar: 'https://pbs.twimg.com/profile_images/617458563/profile5_400x400.jpg',
    },
    poster: 'https://i.ibb.co/4dnGnRj/unsplash-hand-red.jpg',
    createdAt: 'Feb 28 2023',
    expiresAt: 'Mar 15 2023',
})

campaigns.value.push({
    id: '707e2a8c-4eea-4c26-9ea2-c548e9e91726',
    title: `Nexa CashFusion`,
    url: 'https://causes.cash/c/707e2a8c-4eea-4c26-9ea2-c548e9e91726',
    manager: {
        name: `Ava Nakamoto`,
        url: 'https://twitter.com/0xShomari',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    poster: 'https://i.ibb.co/CK8hJqP/image.png',
    createdAt: 'Mar 15 2023',
    expiresAt: 'Apr 15 2023',
})

campaigns.value.push({
    id: 'b8fac25d-e619-4ddf-b474-af084e8250ce',
    title: `Nexa Ledger (Live) Wallet`,
    url: 'https://causes.cash/c/b8fac25d-e619-4ddf-b474-af084e8250ce',
    manager: {
        name: `Satoshi Nakamoto`,
        url: 'https://twitter.com/0xShomari',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    poster: 'https://i.ibb.co/9V3YHj1/image.png',
    createdAt: 'Apr 15 2023',
    expiresAt: 'May 15 2023',
})

// TBD
</script>

<template>
    <main class="bg-white py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Spotlight Campaigns
                </h2>

                <p class="mt-2 text-lg leading-8 text-gray-600">
                    Discover great Nexa projects that you want to help support
                </p>
            </div>

            <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                <article
                    v-for="campaign of campaigns" :key="campaign.id"
                    class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                >
                    <img
                        :src="campaign.poster"
                        alt=""
                        class="absolute inset-0 -z-10 h-full w-full object-cover"
                    />

                    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

                    <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                    <section class="flex flex-wrap justify-between items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                        <time datetime="2020-03-16" class="mr-8 text-xl">
                            {{campaign.expiresAt}}
                        </time>

                        <div class="-ml-4 flex items-center gap-x-4">
                            <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                <circle cx="1" cy="1" r="1" />
                            </svg>

                            <div class="flex gap-x-2.5">
                                <img
                                    :src="campaign.manager?.avatar"
                                    alt=""
                                    class="h-6 w-6 flex-none rounded-full bg-white/10"
                                />

                                <h3 class="text-xl">
                                    {{campaign.manager?.name}}
                                </h3>
                            </div>
                        </div>
                    </section>

                    <h3 class="mt-3 text-3xl font-semibold leading-10 text-white">
                        <NuxtLink :to="'/c/' + campaign.id">
                            <span class="absolute inset-0"></span>
                            {{campaign.title}}
                        </NuxtLink>
                    </h3>
                </article>

            </div>
        </div>
    </main>
</template>

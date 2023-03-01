<script setup lang="ts">
/* Import modules. */
import { ref } from 'vue'

/* Initialize reports. */
const reports = ref([])

reports.value.push({
    id: '95e75ff5-c90f-4d1f-8e69-044c19ccaca1',
    title: `Causes Cash: Nexa P2P Crowdfunding`,
    url: 'https://causes.cash/bootstrap',
    manager: {
        name: `0xShomari`,
        url: 'https://twitter.com/0xShomari',
        avatar: 'https://pbs.twimg.com/profile_images/617458563/profile5_400x400.jpg',
    },
    description: `Causes Cash is now running its Boostrapping campaign to allow ANY Nexican to create their own P2P campaign.`,
    poster: 'https://i.ibb.co/4dnGnRj/unsplash-hand-red.jpg',
    createdAt: 'Feb 28 2023',
    expiresAt: 'Mar 15 2023',
})

// reports.value.push({
//     id: '904ccf9d-583a-463b-837b-96a2632a0581',
//     title: `Nexa CashFusion`,
//     url: 'https://docs.causes.cash/blog/nexa-cashfusion',
//     manager: {
//         name: `Ava Nakamoto`,
//         url: 'https://twitter.com/0xShomari',
//         avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     poster: 'https://i.ibb.co/CK8hJqP/image.png',
//     createdAt: 'Mar 15 2023',
//     expiresAt: 'Apr 15 2023',
// })

// reports.value.push({
//     id: 'da0e504b-ffd0-42ef-afdd-22f6c1153471',
//     title: `Nexa Ledger (Live) Wallet`,
//     url: 'https://docs.causes.cash/blog/nexa-ledger-live-wallet',
//     manager: {
//         name: `Satoshi Nakamoto`,
//         url: 'https://twitter.com/0xShomari',
//         avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     poster: 'https://i.ibb.co/9V3YHj1/image.png',
//     createdAt: 'Apr 15 2023',
//     expiresAt: 'May 15 2023',
// })

// TBD
</script>

<template>
    <section class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Campaign Report Cards
                </h2>

                <p class="mt-2 text-lg leading-8 text-gray-600">
                    Keep up with the latest developments from your favorite projects/teams.
                </p>
            </div>

            <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                <article v-for="report of reports" :key="report.id" class="flex flex-col items-start justify-between">
                    <div class="relative w-full">
                        <img
                            :src="report.poster"
                            alt=""
                            class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        />

                        <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
                    </div>

                    <div class="max-w-xl">
                        <div class="mt-8 flex items-center gap-x-4 text-xs">
                            <time datetime="2020-03-16" class="text-gray-500">
                                {{report.createdAt }}
                            </time>

                            <a href="#" class="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">
                                Project Update
                            </a>
                        </div>

                        <div class="group relative">
                            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                <a href="#">
                                    <span class="absolute inset-0"></span>
                                    {{report.title}}
                                </a>
                            </h3>

                            <p class="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                                {{report.description}}
                            </p>
                        </div>

                        <div class="relative mt-8 flex items-center gap-x-4">
                            <img
                                :src="report.manager?.avatar"
                                alt=""
                                class="h-10 w-10 rounded-full bg-gray-100"
                            />

                            <div class="text-sm leading-6">
                                <p class="font-semibold text-gray-900">
                                    <a href="#">
                                        <span class="absolute inset-0"></span>
                                        {{report.manager?.name}}
                                    </a>
                                </p>

                                <p class="text-gray-600">
                                    Campaign Manager
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <!-- More posts... -->
            </div>
        </div>
    </section>
</template>

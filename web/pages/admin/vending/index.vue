<script setup lang="ts">
/* Import modules. */
import moment from 'moment'

definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Vending Manager — Causes Cash`,
    meta: [
        { name: 'description', content: `An uncensorable funding platform for radical creators and unstoppable service providers.` }
    ],
})

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
const Profile = useProfileStore()
const System = useSystemStore()

const vending = ref()
const isShowingMenu = ref(false)

const init = async () => {
    vending.value = await $fetch('/api/admin/vending', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
        }
    }).catch(err => console.error(err))
    console.log('VENDING', vending.value)
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-7xl mx-auto px-3 py-5 flex flex-col gap-4">
        <section v-if="vending">
            <h3 v-if="vending.campaigns" class="text-xl font-medium text-gray-500 tracking-widest">
                {{vending.campaigns.length}} campaigns found
            </h3>

            <ul v-if="vending" role="list" class="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-3 xl:gap-x-8">

                <li v-for="campaign of vending.campaigns" :key="campaign.campaignid" class="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 shadow">
                    <NuxtLink :to="'/admin/vending/' + campaign.campaignid" class="px-3 py-2 flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-800">
                        <img
                            src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                            alt="Tuple"
                            class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                        />

                        <div class="flex flex-col gap-1 text-sm font-medium leading-6 text-gray-100">
                            <h1>
                                {{campaign.campaignid}}
                            </h1>

                            <span class="block text-lg font-medium leading-6 text-gray-100">
                                Goal: {{campaign.goal}}
                            </span>

                            <span class="block text-lg font-medium leading-6 text-gray-100">
                                Paid: {{campaign.paid}}
                            </span>

                            <span class="block text-lg font-medium leading-6 text-gray-100">
                                Rate: {{campaign.rate}}
                            </span>
                        </div>
                    </NuxtLink>
                </li>

            </ul>
        </section>

        <section v-if="vending" class="mt-10 pt-10 border-t border-gray-500">
            <h3 v-if="vending.payouts" class="my-5 text-2xl font-bold text-sky-400 tracking-widest uppercase">
                <span class="text-4xl text-sky-600">
                    {{vending.payouts.length}}
                </span> payouts found
            </h3>

            <ul v-if="vending" role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">

                <li v-for="payout of vending.payouts" :key="payout.payout.txidem" class="flex flex-col justify-between overflow-hidden rounded-xl border-2 border-sky-500 shadow">
                    <div class="px-3 py-2 flex items-center gap-x-4 border-b border-gray-900/5 bg-sky-900">
                        <img src="https://tailwindui.com/img/logos/48x48/tuple.svg" alt="Tuple" class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />

                        <div class="flex flex-col gap-1 text-sm font-medium leading-6 text-gray-100">
                            <h3 class="text-xl font-bold tracking-wide">
                                {{payout.campaignid}}
                            </h3>

                            <!-- <pre class="block text-xs font-medium leading-6 text-gray-900">
                                Payout: {{payout.payout}}
                            </pre> -->
                        </div>
                    </div>

                    <dl class="-my-3 divide-y divide-gray-100 py-4 text-sm leading-6">
                        <div class="px-6 flex items-center justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">
                                Receiver
                            </dt>

                            <dd class="text-gray-700 truncate">
                                <NuxtLink :to="'https://explorer.nexa.org/address/' + payout.payout.receiver" target="_blank" class="text-lg font-medium text-blue-500 hover:underline">
                                    {{payout.payout.receiver}}
                                </NuxtLink>
                            </dd>
                        </div>

                        <div class="px-6 flex items-center justify-between gap-x-4 py-3 bg-gray-700">
                            <h3 class="text-gray-100">
                                Token Amount
                            </h3>

                            <span class="text-sky-300 text-2xl font-bold tracking-wide">
                                {{payout.payout.tokens}}
                            </span>
                        </div>

                        <div class="px-6 flex items-center justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">
                                Payout Date
                            </dt>

                            <dd class="flex items-start gap-x-2">
                                <div class="text-base font-medium text-gray-900">
                                    {{moment.unix(payout.createdAt).format('llll')}}
                                </div>

                                <div class="rounded-md py-1 px-2 text-sm font-medium ring-1 ring-inset text-fuchsia-700 bg-fuchsia-50 ring-fuchsia-600/10">
                                    {{moment.unix(payout.createdAt).fromNow()}}
                                </div>
                            </dd>
                        </div>
                    </dl>

                    <NuxtLink :to="'https://explorer.nexa.org/tx/' + payout.payout.txidem" target="_blank" class="py-3 group flex justify-center bg-sky-600 hover:bg-sky-500">
                        <span class="text-sky-200 font-medium text-2xl group-hover:text-sky-900">
                            Open Transaction
                        </span>
                    </NuxtLink>
                </li>

            </ul>
        </section>
    </main>
</template>

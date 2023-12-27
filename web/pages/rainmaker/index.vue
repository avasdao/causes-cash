<script setup lang="ts">
/* Import modules. */
import makeBlockie from 'ethereum-blockies-base64'
import numeral from 'numeral'

definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Rainmaker — Causes Cash`,
    meta: [
        { name: 'description', content: `An uncensorable funding platform for radical creators and unstoppable service providers.` }
    ],
})

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useRainmakerStore } from '@/stores/rainmaker'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const Rainmaker = useRainmakerStore()
const System = useSystemStore()
const Wallet = useWalletStore()

// const TOKEN_ID_HEX = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000' // AVAS
const TOKEN_ID_HEX = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000' // STUDIO

const campaign = ref(null)
const campaigns = ref(null)
const profiles = ref(null)
const isAddingProfile = ref(false)
const txidem = ref(null)

const TOKENS_PER_RECEIVER = 10000000

const airdrop = async () => {
    if (!profiles.value) {
        return alert('NO profiles available for airdrop.')
    }

    const msg = `Your Rainmaker Airdrop is ready to broadcast to Nexa Mainnet. Are you sure you want to continue?

        ↪ You are sending ( ${numeral((TOKENS_PER_RECEIVER * profiles.value.length)).format('0,0[.]0000')} ) $STUDIO
        ↪ You are sending to ( ${profiles.value.length} ) wallets
        ↪ Each wallet will receive ( ${numeral(TOKENS_PER_RECEIVER).format('0,0[.]0000')} ) $STUDIO
    `
    if (!confirm(msg)) {
        return
    }

    /* Initialize locals. */
    let response
    // let txidem

    /* Initialize receivers. */
    const receivers = []

    /* Handle profiles. */
    profiles.value.forEach(_profile => {
        receivers.push({
            address: _profile.address,
            tokenid: TOKEN_ID_HEX,
            // tokens: 100 * 1e8, // 100 AVAS
            tokens: 10000000, // 10M STUDIO
        })
    })

    /* Broadcast (to profiles). */
    response = await Wallet.broadcast(receivers)
        .catch(err => console.error(err))
    console.log('RESPONSE', response)

    /* Set transaction idem. */
    txidem.value = response.result
    console.log('TXIDEM', txidem.value)

    if (txidem.value) {
        /* Request rainmaker profile. */
        response = await $fetch('/api/rainmaker/broadcast', {
            method: 'POST',
            body: {
                campaign: Rainmaker.campaign,
                receivers,
                txidem: txidem.value,
            },
        })
        .catch(err => console.error(err))
        console.log('BROADCAST (response):', response)
    }
}

const reset = () => {
    // TODO
}

const init = async () => {
    /* Initialize locals. */
    let response

    /* Initialize globals. */
    campaigns.value = []

    /* Request campaigns. */
    response = await $fetch('/api/rainmaker/campaigns', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
        },
    })
        .catch(err => console.error(err))
    console.log('RAINMAKER (campaigns):', response)

    /* Set campaigns. */
    campaigns.value = response
}

onMounted(() => {
    Rainmaker.init()

    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="">
        <header>
            <h1 class="text-5xl font-medium text-gray-600">
                Nexican Rainmaker ☔
            </h1>

            <h2 class="pl-1 text-xl font-medium">
                Airdrop FTs, NFTs and SFTs to your online communities
            </h2>
        </header>

        <fieldset class="mt-5">
            <legend class="pl-5 text-xs font-medium tracking-widest text-gray-400 uppercase">
                Choose a Manager
            </legend>

            <div class="mt-1 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                <!-- Active: "border-indigo-600 ring-2 ring-indigo-600", Not Active: "border-gray-300" -->
                <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                    <input type="radio" name="project-type" value="Newsletter" class="sr-only" aria-labelledby="project-type-0-label" aria-describedby="project-type-0-description-0 project-type-0-description-1" />
                    <span class="flex flex-1">
                        <span class="flex flex-col">
                            <span id="project-type-0-label" class="block text-lg font-medium text-gray-900">
                                Profile Manager
                            </span>

                            <span id="project-type-0-description-0" class="-mt-1 flex items-center text-xs text-gray-500 italic">
                                Last profile added an hour ago
                            </span>

                            <span id="project-type-0-description-1" class="mt-2 text-xl font-medium text-gray-600">
                                <span class="text-3xl text-amber-500">2,740</span> profiles
                            </span>
                        </span>
                    </span>
                    <!-- Not Checked: "invisible" -->
                    <svg class="h-5 w-5 text-indigo-600 invisible" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                    <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-600", Not Checked: "border-transparent"
            -->
                    <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                </label>

                <!-- Active: "border-indigo-600 ring-2 ring-indigo-600", Not Active: "border-gray-300" -->
                <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none border-indigo-600 ring-2 ring-indigo-600">
                    <input type="radio" name="project-type" value="Existing Customers" class="sr-only" aria-labelledby="project-type-1-label" aria-describedby="project-type-1-description-0 project-type-1-description-1" />
                    <span class="flex flex-1">
                        <span class="flex flex-col">
                            <span id="project-type-1-label" class="block text-lg font-medium text-gray-900">
                                Campaign Manager
                            </span>

                            <span id="project-type-1-description-0" class="-mt-1 flex items-center text-xs text-gray-500 italic">
                                Last campaign updated 2 minutes ago
                            </span>

                            <span v-if="campaigns" id="project-type-0-description-1" class="mt-2 text-xl font-medium text-gray-600">
                                <span class="text-3xl text-amber-500">{{campaigns.length}}</span> campaigns
                            </span>
                            <span v-else id="project-type-0-description-1" class="mt-2 text-xl font-medium text-gray-600 italic">
                                loading...
                            </span>
                        </span>
                    </span>
                    <!-- Not Checked: "invisible" -->
                    <svg class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                    <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-600", Not Checked: "border-transparent"
            -->
                    <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                </label>

                <!-- Active: "border-indigo-600 ring-2 ring-indigo-600", Not Active: "border-gray-300" -->
                <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                    <input type="radio" name="project-type" value="Trial Users" class="sr-only" aria-labelledby="project-type-2-label" aria-describedby="project-type-2-description-0 project-type-2-description-1" />
                    <span class="flex flex-1">
                        <span class="flex flex-col">
                            <span id="project-type-2-label" class="block text-lg font-medium text-gray-900">
                                Media Manager
                            </span>

                            <span id="project-type-2-description-0" class="-mt-1 flex items-center text-xs text-gray-500 italic">
                                Last asset added 4 hours ago
                            </span>

                            <span id="project-type-0-description-1" class="mt-2 text-xl font-medium text-gray-600">
                                <span class="text-3xl text-amber-500">621</span> assets
                            </span>
                        </span>
                    </span>
                    <!-- Not Checked: "invisible" -->
                    <svg class="h-5 w-5 text-indigo-600 invisible" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                    <!--
                Active: "border", Not Active: "border-2"
                Checked: "border-indigo-600", Not Checked: "border-transparent"
            -->
                    <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                </label>
            </div>
        </fieldset>

        <section class="my-5 px-3 py-2 bg-amber-100 border-2 border-amber-300 rounded-lg shadow">
            <h2>Select a Campaign</h2>

            <div class="mt-3 flex flex-col gap-3">
                <NuxtLink
                    v-for="campaign of campaigns" :key="campaign.id"
                    :to="'/rainmaker/' + campaign.id"
                    class="px-3 hover:bg-amber-200"
                >
                    <div class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div class="flex items-center truncate">
                            <img
                                class="h-16 w-auto lg:h-20 rounded-full object-cover"
                                :src="makeBlockie(campaign.id)"
                                :alt="campaign.id"
                            />

                            <div class="ml-4">
                                <div class="mt-1 text-gray-500 truncate">
                                    Campaign Id: {{campaign?.id}}
                                </div>

                                <div class="mt-1 text-gray-500 truncate">
                                    Owner Id: {{campaign?.ownerid}}
                                </div>

                                <div class="mt-1 text-gray-500 truncate">
                                    Title: {{campaign?.title}}
                                </div>

                                <div class="mt-1 text-gray-500 truncate">
                                    # of receivers {{Object.keys(campaign?.receivers || {}).length}}
                                </div>

                                <div class="mt-1 text-gray-500 truncate">
                                    Completed? {{campaign?.isCompleted}}
                                </div>

                                <div class="mt-1 text-gray-500 truncate">
                                    Created {{campaign?.createdAt}}
                                </div>

                                <div class="mt-1 text-gray-500 truncate">
                                    Updated {{campaign?.updatedAt}}
                                </div>

                                <!-- <span class="font-medium text-blue-500 hover:blue-text-400 truncate">
                                    <pre>{{campaign}}</pre>
                                </span> -->

                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>

        <div class="mt-6 py-5 bg-amber-50 border-2 border-amber-400 rounded-xl shadow-md">
            <div class="px-3 sm:flex sm:items-center">
                <div class="">
                    <h1 class="text-2xl font-semibold leading-6 text-gray-900">
                        Profiles
                        <span class="">( {{profiles?.length}} )</span>
                    </h1>

                    <p class="mt-2 text-sm text-gray-700">
                        A list of all the profiles in your active campaign, including their:
                        name, title, email and role.
                    </p>
                </div>

                <div class="mt-4 mx-5 sm:mt-0 sm:flex-none">
                    <button
                        @click="isAddingProfile = true"
                        type="button"
                        class="block rounded-md bg-lime-600 px-3 py-2 text-center text-lg font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                    >
                        Add Profile
                    </button>
                </div>
            </div>

            <div class="mt-3 flex flex-col gap-3">
                <NuxtLink
                    v-for="profile of profiles" :key="profile.id"
                    :to="'https://explorer.nexa.org/address/' + profile.address" target="_blank"
                    class="px-3 hover:bg-amber-200"
                >
                    <div class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div class="flex items-center truncate">
                            <img
                                class="h-16 w-auto lg:h-20 rounded-full object-cover"
                                :src="makeBlockie(profile.id)"
                                :alt="profile.id"
                            />

                            <div class="ml-4">
                                <div class="mt-1 text-gray-500 truncate">
                                    Campaign Id: {{profile.campaignid}}
                                </div>

                                <span class="font-medium text-blue-500 hover:blue-text-400 truncate">
                                    {{profile.address}}
                                </span>

                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <div v-if="txidem" class="mt-5 truncate">
            <NuxtLink :to="'https://explorer.nexa.org/tx/' + txidem" target="_blank" class="text-lg text-blue-500 font-medium hover:text-blue-400">
                {{txidem}}
            </NuxtLink>
        </div>

        <div class="mt-5 flex items-center justify-end gap-x-6">
            <button
                @click="reset"
                class="text-xl font-semibold leading-6 text-gray-900"
            >
                Reset
            </button>

            <button
                @click="airdrop"
                class="rounded-2xl bg-lime-600 border-2 border-lime-800 px-5 py-3 text-xl font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            >
                Start Airdrop
            </button>
        </div>
    </main>

    <RainmakerAddProfile
        v-if="isAddingProfile"
        @close="isAddingProfile = false"
        :campaign="Rainmaker.campaign"
    />
</template>

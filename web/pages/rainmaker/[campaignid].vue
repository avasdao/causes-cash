<script setup lang="ts">
/* Import modules. */
import makeBlockie from 'ethereum-blockies-base64'
import numeral from 'numeral'

useHead({
    title: `Campaign Manager — Causes Cash`,
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

const route = useRoute()
const campaignid = ref(route.params.campaignid)
// console.log('RAINMAKER (campaignid):', campaignid.value)

// const TOKEN_ID_HEX = '57f46c1766dc0087b207acde1b3372e9f90b18c7e67242657344dcd2af660000' // AVAS
// const TOKEN_ID_HEX = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000' // STUDIO
const TOKEN_ID_HEX = 'a15c9e7e68170259fd31bc26610b542625c57e13fdccb5f3e1cb7fb03a420000' // NXL
const TOKENS_PER_RECEIVER = '1234567890'

const campaign = ref(null)
const profiles = ref(null)
const txidem = ref(null)

const airdrop = async () => {
    if (!profiles.value) {
        return alert('NO profiles available for airdrop.')
    }

    const msg = `Your Rainmaker Airdrop is ready to broadcast to Nexa Mainnet. Are you sure you want to continue?

        ↪ You are sending ( ${numeral((TOKENS_PER_RECEIVER * profiles.value.length)).format('0,0[.]0000')} ) $NXL
        ↪ You are sending to ( ${profiles.value.length} ) wallets
        ↪ Each wallet will receive ( ${numeral(TOKENS_PER_RECEIVER).format('0,0[.]0000')} ) $NXL
    `
    if (!confirm(msg)) {
        return
    }

    /* Initialize locals. */
    let response

    /* Initialize receivers. */
    const receivers = []

    Object.keys(profiles.value).forEach(_profileid => {
        /* Set profile. */
        const profile = profiles.value[_profileid]
        // console.log('PROFILE', profile)

        const found = campaign.value.profiles.find(_profile => _profile.id === profile.id)
        // console.log('FOUND', found)

        receivers.push({
            address: found.address,
            tokenid: TOKEN_ID_HEX, // TODO Allow auto-format conversion.
            tokens: BigInt(profile.tokens),
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
                // receivers,
                txidem: txidem.value,
            },
        })
        .catch(err => console.error(err))
        console.log('BROADCAST (response):', response)
    }
}

const init = async () => {
    if (!Profile.sessionid) {
        throw new Error('Oops! You MUST sign-in to continue.')
    }
    /* Initialize locals. */
    let response

    /* Request campaign. */
    response = await $fetch('/api/rainmaker/campaign', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
            campaignid: campaignid.value,
        },
    })
    .catch(err => console.error(err))
    console.log('RAINMAKER (campaign):', response)

    /* Set campaign. */
    campaign.value = response

    profiles.value = []

    /* Set profiles. */
    Object.keys(response.campaign.receivers).forEach(_receiverid => {
        const receiver = response.campaign.receivers[_receiverid]

        profiles.value.push({
            id: _receiverid,
            ...receiver,
        })
    })
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
        <h1 class="text-5xl font-medium">
            Campaign Manager
        </h1>

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

        <div v-if="profiles">
            Total Receivers: {{Object.keys(profiles).length}}
        </div>

        <div v-if="txidem" class="mt-5 truncate">
            <NuxtLink :to="'https://explorer.nexa.org/tx/' + txidem" target="_blank" class="text-lg text-blue-500 font-medium hover:text-blue-400">
                {{txidem}}
            </NuxtLink>
        </div>

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
                                    # tokens {{profile.tokens}}
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
    </main>
</template>

<script setup>
/* Import modules. */
import { ref } from 'vue'

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Define (parent) properties. */
const props = defineProps({
    network: String,
    provider: String,
    blockNum: Number,
    usd: Number,
})

/* Import responsive holders. */
const description = ref(null)

const showPledges = ref(false)
const showDescription = ref(true)
const showFeedback = ref(false)
const showReportCards = ref(false)

const contributors = ref(null)
const supporters = ref(null)

const isPledging = ref(false)
const hasFeedback = ref(false)

/* Set constants. */
const RETRY_DELAY = 500 // 0.5 seconds

/* Initialize System. */
const System = useSystemStore()

watch(props?.provider, (_provider) => {
    console.log('(CAMPAIGN) PROVIDER HAS CHANGED', _provider)

    if (_provider) {
        /* Initialize blockchain. */
        setTimeout(() => {
            System.initBlockchain()
        }, RETRY_DELAY)
    }
})

const banner = computed(() => {
    // return require('@/assets/poster.jpg')
    return System.banner
})

const summary = computed(() => {
    return System.summary
})

/**
 * Toggle Menu
 *
 * Controls the information display menus.
 */
const toggleMenu = (_selected) => {
    // console.log('TOGGLE MENU (selected):', _selected)

    /* Set all menu displays to false. */
    showPledges.value = false
    showDescription.value = false
    showFeedback.value = false
    showReportCards.value = false

    /* Handle user selection. */
    switch(_selected) {
    case 'contributors':
        return showPledges.value = true
    case 'description':
        return showDescription.value = true
    case 'feedback':
        return showFeedback.value = true
    case 'report-cards':
        return showReportCards.value = true
    default:
        return showDescription.value = true
    }

}

const closeFeedback = () => {
    hasFeedback.value = false
}

const closePledge = () => {
    isPledging.value = false
}

/**
 * Make Pledge
 */
const makePledge = async () => {
    /* Validate Web3 provider. */
    // if (!window.ethereum) {
    //     /* Send notification request. */
    //     $store.dispatch('showNotif', {
    //         icon: 'error',
    //         title: 'MetaMask Error!',
    //         message: `No Web3 provider found!`,
    //     })

    //     return
    // }

    /* Connect to Web3 provider. */
    // await window.ethereum
    //     .enable()
    //     .catch(err => console.error(err))

    /* Set pledging flag. */
    // TODO Set to state.
    // isPledging.value = true
    document.location = campaign?.receiver
}

const campaign = await $fetch('/api/campaigns?bootstrap')
console.log('CAMPAIGN (page):', campaign)
</script>

<template>
    <main class="bg-white">
        <section class="mx-auto pt-6 sm:pt-10 lg:pt-16 pb-4 sm:pb-10 px-4 lg:pb-20 sm:px-6 lg:max-w-7xl lg:px-8">
            <!-- Product -->
            <div class="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                <!-- Product image -->
                <div class="lg:row-end-1 lg:col-span-4">
                    <div class="aspect-w-4 aspect-h-2 bg-gray-100 border-2 border-gray-300 overflow-hidden rounded-lg lg:rounded-3xl shadow-md">
                        <img
                            :src="banner"
                            alt="Loading campaign banner, please wait..."
                            class="object-center object-cover"
                        />
                    </div>
                </div>

                <!-- Product details -->
                <div class="max-w-2xl mx-auto mt-4 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">

                    <div class="flex flex-col-reverse">
                        <CampaignTitle />

                        <CampaignRating />
                    </div>

                    <p class="text-gray-500 mt-6 text-lg">
                        <!-- {{summary}} -->
                        {{campaign?.summary}}
                    </p>

                    <CampaignStatus :usd="usd" :provider="props.provider" />

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <button
                            @click="makePledge"
                            type="button"
                            class="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-medium font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Make a Pledge
                        </button>

                        <!-- <button
                            @click="follow"
                            type="button"
                            class="w-full bg-indigo-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Subscribe for Updates
                        </button> -->

                        <button
                            @click="reclaim"
                            type="button"
                            class="cursor-not-allowed w-full bg-indigo-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-medium font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            disabled
                        >
                            Reclaim My Pledge
                        </button>
                    </div>

                    <NuxtLink :to="'https://explorer.nexa.org/address/' + campaign?.receiver" _target="blank" class="px-3 py-1 mt-5 flex justify-center bg-rose-100 border-2 border-rose-300 rounded shadow">
                        <span class="sm:hidden text-sm text-rose-500 font-medium">
                            {{campaign?.receiver.slice(0, 20)}} ... {{campaign?.receiver.slice(-15)}}
                        </span>
                        <span class="hidden sm:inline text-sm text-rose-500 font-medium">
                            {{campaign?.receiver}}
                        </span>
                    </NuxtLink>

                    <CampaignMonitor class="hidden" />

                    <CampaignHighlights />

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <button
                            @click="sendFeedback"
                            type="button"
                            class="w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-medium font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
                        >
                            Send Feedback
                        </button>

                        <button
                            @click="$store.dispatch('addReportCard')"
                            type="button"
                            class="w-full bg-red-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-medium font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
                        >
                            Add a Report Card
                        </button>
                    </div>

                    <CampaignSponsors />

                    <CampaignShare />

                    <CampaignDisclaimer />

                </div>

                <div class="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                    <div>
                        <CampaignMenu class="" @tabbed="toggleMenu" :contributors="contributors" :supporters="supporters" />

                        <CampaignDescription v-if="showDescription" />
                        <CampaignPledges v-if="showPledges" :contributors="contributors" :usd="usd" />
                        <CampaignFeedback v-if="showFeedback" :supporters="supporters" />
                        <CampaignReportCards v-if="showReportCards" />

                    </div>
                </div>
            </div>

            <CampaignPolicy class="hidden" />

            <CampaignRelated />

            <CTA class="mt-20 rounded-3xl overflow-hidden" />

        </section>

        <CampaignFeedbackWin
            :hasFeedback="hasFeedback"
            @close="closeFeedback"
        />

        <CampaignPledgeWin
            :isPledging="isPledging"
            :usd="usd"
            :receiver="campaign?.receiver"
            @close="closePledge"
        />
    </main>
</template>

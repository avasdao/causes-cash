<script setup>
/* Import modules. */

definePageMeta({
    layout: 'campaign',
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'
const System = useSystemStore()

import loadingIcon from '@/assets/loading_icon.gif'

/* Set constants. */
const RETRY_DELAY = 500 // 0.5 seconds

/* Import responsive holders. */
const isActive = ref(null)
const isLoading = ref(null)
const isContract = ref(null)

const description = ref(null)
const usd = ref(0.0)

const showPledges = ref(false)
const showDescription = ref(true)
const showFeedback = ref(false)
const showReportCards = ref(false)

const contributors = ref(null)
const supporters = ref(null)

const isExecuting = ref(false)
const isPledging = ref(false)
const hasFeedback = ref(false)

/* Manage banner. */
const banner = computed(() => {
    if (!campaign.value?.media?.poster) {
        return loadingIcon
    }

    return campaign.value?.media?.poster
})

/* Manage summary. */
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

const closeContract = () => {
    isExecuting.value = false
}

/**
 * Edit Pledge
 *
 * Open a side panel with options for customizing the pledge.
 */
const makePledge = async () => {
    /* Set pledging flag. */
    // TODO Set to state.
    isPledging.value = true
}

/**
 * Manage "Wise" Contract
 *
 * Open a side panel with options for managing a contract.
 */
const manageContract = async () => {
    /* Set pledging flag. */
    // TODO Set to state.
    isExecuting.value = true
}

const route = useRoute()
const campaignid = route.params.campaignid
// console.log('Campaign ID:', campaignid)

const campaign = ref()

const loadCampaign = async () => {
    campaign.value = await $fetch(`/v1/campaign/${campaignid}`)
    console.log('CAMPAIGN (page):', campaign.value)

    /* Validate campaign status. */
    if (campaign.value?.isActive === true) {
        isActive.value = true
    }

    /* Set loading flag. */
    isLoading.value = false
}

const loadMarket = async () => {
    usd.value = Number(await $fetch(`https://nexa.exchange/mex`))
    // console.log('USD (mex):', usd.value)
}

const copyToClipboard = () => {
    /* Copy address to clipboard. */
    Clipboard.copy(campaign.value?.receiver)

    alert(`${campaign.value?.receiver} has been copied to your clipboard.`)
}

onMounted(() => {
    /* Set flags. */
    isActive.value = false
    isContract.value = true // FOR DEV ONLY
    isLoading.value = true

    /* Load campaign. */
    loadCampaign() // NOTE: This is non-blocking.

    /* Load market data. */
    loadMarket() // NOTE: This is non-blocking.
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
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
                            class="w-full object-center object-cover"
                        />
                    </div>
                </div>

                <!-- Product details -->
                <div class="max-w-2xl mx-auto mt-4 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">

                    <div class="flex flex-col-reverse">
                        <CampaignTitle :campaign="campaign" />

                        <CampaignRating />
                    </div>

                    <p class="text-gray-500 mt-6 text-lg">
                        <!-- {{summary}} -->
                        {{campaign?.summary}}
                    </p>

                    <CampaignStatus
                        :usd="usd"
                        :campaign="campaign"
                    />

                    <div v-if="isContract" class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <button
                            @click="manageContract"
                            type="button"
                            class="sm:col-span-2 w-full bg-sky-600 border border-sky-800 rounded-md py-3 px-3 flex flex-col items-center justify-center text-base font-medium text-indigo-700 shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >

                            <h3 class="text-2xl text-sky-50 font-medium">
                                Open <em>"Wise"</em> Contract Window
                            </h3>

                            <h3 class="text-sky-200 font-medium">
                                Primary address for recipient is:
                            </h3>

                            <span class="sm:hidden text-sm text-sky-50 font-medium truncate">
                                {{campaign?.receiver?.slice(0, 20)}} ... {{campaign?.receiver?.slice(-15)}}
                            </span>
                            <span class="hidden sm:inline text-sm text-sky-50 font-medium truncate">
                                {{campaign?.receiver}}
                            </span>
                        </button>
                    </div>

                    <div v-else class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <button
                            @click="copyToClipboard"
                            type="button"
                            class="sm:col-span-2 w-full bg-sky-600 border border-sky-800 rounded-md py-3 px-3 flex flex-col items-center justify-center text-base font-medium text-indigo-700 shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >

                            <h3 class="text-2xl text-sky-50 font-medium">
                                Copy Address to Clipboard
                            </h3>

                            <span class="sm:hidden text-sm text-sky-200 font-medium">
                                {{campaign?.receiver?.slice(0, 20)}} ... {{campaign?.receiver?.slice(-15)}}
                            </span>
                            <span class="hidden sm:inline text-sm text-sky-200 font-medium">
                                {{campaign?.receiver}}
                            </span>
                        </button>

                        <button
                            @click="makePledge"
                            type="button"
                            class="w-full bg-rose-500 border border-rose-700 rounded-md py-3 px-3 flex flex-col items-center justify-center text-2xl font-medium text-rose-50 shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Make a Pledge
                            <span class="text-xs italic text-rose-200">
                                from Causes wallet
                            </span>
                        </button>

                        <button
                            @click="reclaim"
                            type="button"
                            class="cursor-not-allowed opacity-70 w-full bg-amber-100 border border-amber-300 rounded-md py-3 px-3 flex items-center justify-center text-2xl font-medium text-amber-500 shadow hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-amber-500"
                            disabled
                        >
                            Reclaim Pledge
                        </button>
                    </div>

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

                        <!-- <button
                            @click="$store.dispatch('addReportCard')"
                            type="button"
                            class="w-full bg-red-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-medium font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
                        >
                            Add a Report Card
                        </button> -->
                    </div>

                    <CampaignSponsors />

                    <CampaignShare />

                    <CampaignDisclaimer />
                </div>

                <div class="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                    <div>
                        <CampaignMenu class="" @tabbed="toggleMenu" :contributors="contributors" :supporters="supporters" />

                        <CampaignDescription v-if="showDescription" :campaign="campaign" />
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
            :campaign="campaign"
            @close="closePledge"
        />

        <CampaignContractWin
            :isExecuting="isExecuting"
            :usd="usd"
            :campaign="campaign"
            @close="closeContract"
        />
    </main>
</template>

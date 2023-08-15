<script setup>
/* Import modules. */

definePageMeta({
    layout: 'campaign',
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

import loadingIcon from '@/assets/loading_icon.gif'

/* Import responsive holders. */
const receiver = ref(null)

const description = ref(null)
const usd = ref(0.0)

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

// watch(props?.provider, (_provider) => {
//     console.log('(CAMPAIGN) PROVIDER HAS CHANGED', _provider)

//     if (_provider) {
//         /* Initialize blockchain. */
//         setTimeout(() => {
//             System.initBlockchain()
//         }, RETRY_DELAY)
//     }
// })

const banner = computed(() => {
    if (!campaign.value?.media?.poster) {
        return loadingIcon
    }

    return campaign.value?.media?.poster
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
    /* Set pledging flag. */
    // TODO Set to state.
    isPledging.value = true
    // document.location = campaign?.receiver
}

// const route = useRoute()
// const campaignid = route.params.campaignid
const campaignid = 'd5ab0386-5d67-46aa-96f0-9a5837093303'
// console.log('Campaign ID:', campaignid)

const campaign = ref()

const loadCampaign = async () => {
    campaign.value = await $fetch(`/v1/campaign/${campaignid}`)
    // console.log('CAMPAIGN (page):', campaign.value)

    // FIXME FOR DEV PURPOSES ONLY
    // campaign.value.receiver = 'nexa:nqtsq5g5sjkqk7wzd9wwh9423rr0tda7m027ryljkfy84cjz'
}

const loadMarket = async () => {
    usd.value = Number(await $fetch(`https://nexa.exchange/mex`))
    // console.log('USD (mex):', usd.value)
}

// const loadWallet = async () => {
//     const success = await $fetch('/api/wallet', {
//         method: 'POST',
//     })
//     // console.log('SUCCESS', success)
// }

loadCampaign() // NOTE: This is non-blocking.
loadMarket() // NOTE: This is non-blocking.
// loadWallet() // NOTE: This is non-blocking.

const mint = () => {
    alert('Minting coming soon...')
}
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

                    <div class="mt-10 flex flex-col gap-5">
                        <input
                            class="w-full px-5 py-4 text-2xl text-amber-700 font-light placeholder-amber-500 bg-amber-200 border-2 border-amber-400 rounded-xl shadow"
                            type="text"
                            placeholder="(optional) destination address"
                            v-model="receiver"
                        />

                        <button
                            @click="mint"
                            type="button"
                            class="w-full bg-sky-600 border-2 border-sky-800 rounded-xl py-3 px-3 flex flex-col items-center justify-center text-base font-medium text-indigo-700 shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >

                            <h3 class="text-2xl text-sky-50 font-medium">
                                Mint a Random Noob SFT
                            </h3>

                            <span class="text-base text-sky-200 font-medium italic">
                                minting fee <span class="text-2xl fotn-bold">10,000</span> NEXA each
                            </span>
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
    </main>
</template>

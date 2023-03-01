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
                        <Title />

                        <Rating />
                    </div>

                    <p class="text-gray-500 mt-6 text-lg">
                        {{summary}}
                    </p>

                    <Status :usd="usd" :provider="provider" />

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
                            class="w-full bg-indigo-50 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-medium font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            Reclaim My Pledge
                        </button>
                    </div>

                    <Monitor class="hidden" />

                    <Highlights />

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

                    <Sponsors />

                    <Share />

                    <Disclaimer />

                </div>

                <div class="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                    <div>
                        <Menu class="" @tabbed="toggleMenu" :contributors="contributors" :supporters="supporters" />

                        <Description v-if="showDescription" />
                        <Pledges v-if="showPledges" :contributors="contributors" :usd="usd" />
                        <Feedback v-if="showFeedback" :supporters="supporters" />
                        <ReportCards v-if="showReportCards" />

                    </div>
                </div>
            </div>

            <Policy class="hidden" />

            <Related />

            <CTA class="mt-20 rounded-3xl overflow-hidden" />

        </section>

        <FeedbackWin :hasFeedback="hasFeedback" @close="closeFeedback" />

        <PledgeWin :isPledging="isPledging" :usd="usd" @close="closePledge" />
    </main>
</template>

<script>
/* Import (local) components. */
import Pledges from './Campaign/Pledges'
import Description from './Campaign/Description'
import Disclaimer from './Campaign/Disclaimer'
import Feedback from './Campaign/Feedback'
import FeedbackWin from './Campaign/FeedbackWin'
import Highlights from './Campaign/Highlights'
import PledgeWin from './Campaign/PledgeWin'
import Policy from './Campaign/Policy'
import Menu from './Campaign/Menu'
import Monitor from './Campaign/Monitor'
import Rating from './Campaign/Rating'
import Related from './Campaign/Related'
import ReportCards from './Campaign/ReportCards'
import Share from './Campaign/Share'
import Sponsors from './Campaign/Sponsors'
import Status from './Campaign/Status'
import Title from './Campaign/Title'

/* Set constants. */
const RETRY_DELAY = 500 // 0.5 seconds

export default {
    props: {
        network: String,
        provider: String,
        blockNum: Number,
        usd: Number,
    },
    components: {
        Pledges,
        Description,
        Disclaimer,
        Feedback,
        FeedbackWin,
        Highlights,
        PledgeWin,
        Policy,
        Menu,
        Monitor,
        Rating,
        Related,
        ReportCards,
        Share,
        Sponsors,
        Status,
        Title,
    },
    data: () => {
        return {
            description: null,

            showPledges: null,
            showDescription: null,
            showFeedback: null,
            showReportCards: null,

            contributors: null,
            supporters: null,

            isPledging: null,
            hasFeedback: null,
        }
    },
    watch: {
        provider: function (_provider) {
            console.log('(CAMPAIGN) PROVIDER HAS CHANGED', _provider);

            if (_provider) {
                /* Initialize blockchain. */
                setTimeout(() => {
                    this.$store.dispatch('initBlockchain')
                }, RETRY_DELAY)
            }
        },
    },
    computed: {
        banner() {
            // return require('@/assets/poster.jpg')
            return this.$store?.state?.banner
        },

        summary() {
            return this.$store?.state?.summary
        },

    },
    methods: {
        /**
         * Toggle Menu
         *
         * Controls the information display menus.
         */
        toggleMenu(_selected) {
            // console.log('TOGGLE MENU (selected):', _selected)

            /* Set all menu displays to false. */
            this.showPledges = false
            this.showDescription = false
            this.showFeedback = false
            this.showReportCards = false

            /* Handle user selection. */
            switch(_selected) {
            case 'contributors':
                return this.showPledges = true
            case 'description':
                return this.showDescription = true
            case 'feedback':
                return this.showFeedback = true
            case 'report-cards':
                return this.showReportCards = true
            default:
                return this.showDescription = true
            }

        },

        closeFeedback() {
            this.hasFeedback = false
        },

        closePledge() {
            this.isPledging = false
        },

        /**
         * Make Pledge
         */
        async makePledge() {
            // let isPledging = null

            /* Validate Web3 provider. */
            if (!window.ethereum) {
                /* Send notification request. */
                this.$store.dispatch('showNotif', {
                    icon: 'error',
                    title: 'MetaMask Error!',
                    message: `No Web3 provider found!`,
                })

                return
            }

            /* Connect to Web3 provider. */
            await window.ethereum
                .enable()
                .catch(err => console.error(err))

            /* Set pledging flag. */
            // TODO Set to state.
            this.isPledging = true
        },

    },
    created: function () {
        /* Set all menu displays to false. */
        this.showPledges = false
        this.showFeedback = false
        this.showReportCards = false

        /* Set description (default) display to true. */
        this.showDescription = true

        this.hasFeedback = false
        this.isPledging = false
    },
    mounted: function () {
        //
    },
}
</script>

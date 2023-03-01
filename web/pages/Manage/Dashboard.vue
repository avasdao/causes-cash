<template>
    <main>
        <div class="mt-5 bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-2xl leading-6 font-medium text-gray-900">
                    Campaign Dashboard
                </h3>

                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    A quick summary of everything you NEED to know about your campaign.
                </p>
            </div>

            <div class="border-t border-gray-200">
                <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Campaign Title
                        </dt>

                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{displayTitle}}
                        </dd>
                    </div>

                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Category
                        </dt>

                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{displayCategory}}
                        </dd>
                    </div>

                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Summary
                        </dt>

                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{displaySummary}}
                        </dd>
                    </div>

                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Funding Goal
                        </dt>

                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{displayFundingGoal}}
                        </dd>
                    </div>

                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Starting Time
                        </dt>

                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{displayStarting}}
                        </dd>
                    </div>

                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Expiration Date
                        </dt>

                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{displayExpiration}}
                        </dd>
                    </div>

                    <!-- <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Attachments</dt>

                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div class="w-0 flex-1 flex items-center">
                                        <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="ml-2 flex-1 w-0 truncate">
                                             white-paper.pdf
                                         </span>
                                    </div>

                                    <div class="ml-4 flex-shrink-0">
                                        <a href="javascript:alert('Oops! This feature is not ready yet. Try again later..')" class="font-medium text-indigo-600 hover:text-indigo-500">
                                            Download
                                        </a>
                                    </div>
                                </li>

                                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div class="w-0 flex-1 flex items-center">
                                        <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                                        </svg>

                                        <span class="ml-2 flex-1 w-0 truncate">
                                            business-plan.pdf
                                        </span>
                                    </div>

                                    <div class="ml-4 flex-shrink-0">
                                        <a href="javascript:alert('Oops! This feature is not ready yet. Try again later..')" class="font-medium text-indigo-600 hover:text-indigo-500">
                                            Download
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div> -->

                </dl>
            </div>
        </div>

    </main>
</template>

<script>
/* Import modules. */
import { ethers } from 'ethers'
import moment from 'moment'

/* Import components. */
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            //
        }
    },
    computed: {
        campaignid() {
            if (!this.$store?.state?.campaignid) return null

            return this.$store?.state?.campaignid
        },

        displayCategory() {
            if (!this.$store?.state?.category) return ''

            return this.$store.getters
                .getCategoryById(this.$store?.state?.category)
        },

        displayTitle() {
            if (!this.$store?.state?.title) return ''

            return this.$store?.state?.title
        },

        displaySummary() {
            if (!this.$store?.state?.summary) return ''

            return this.$store?.state?.summary
        },

        displayFundingGoal() {
            if (!this.$store?.state?.fundingGoal) return 0

            /* Set funding goal. */
            const fundingGoal = ethers.BigNumber.from(this.$store?.state?.fundingGoal)
            // console.log('FUNDING GOAL', fundingGoal)

            const bchFundingGoal = fundingGoal.div(this.$store?.state?.ONE_SMART_BITCOIN)

            return bchFundingGoal + ' BCH'
        },

        displayStarting() {
            if (!this.$store?.state?.starting) return 0

            /* Set starting time. */
            const starting = this.$store?.state?.starting

            return moment.unix(starting).format('LLLL')
        },

        displayExpiration() {
            if (!this.$store?.state?.expiration) return 0

            /* Set expiration time. */
            const expiration = this.$store?.state?.expiration

            return moment.unix(expiration).format('LLLL')
        },

    },
    methods: {
        //
    },
    created: function () {

    },
    mounted: function () {
        //
    },
}
</script>

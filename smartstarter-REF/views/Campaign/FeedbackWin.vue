<template>
    <main v-if="hasFeedback" class="fixed inset-0 overflow-hidden" role="dialog" aria-modal="true">
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute inset-0 bg-gray-300 bg-opacity-80" aria-hidden="true">
                <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                    <div class="w-screen max-w-md" :class="winHandler">
                        <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">

                            <div class="bg-gray-600 px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <h2 class="text-lg font-medium text-gray-50">
                                        Send Feedback
                                    </h2>

                                    <div @click="$emit('close')"  class="ml-3 h-7 flex items-center">
                                        <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                                            <span class="sr-only">Close panel</span>
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="pb-1 sm:pb-6">
                                    <div>
                                        <div class="hidden relative h-40 sm:h-56">
                                            <img
                                                class="absolute h-full w-full object-cover"
                                                src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600&q=80"
                                                alt=""
                                            />
                                        </div>

                                        <div class="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                                            <div class="sm:flex-1">
                                                <div class="hidden">
                                                    <div class="flex items-center">
                                                        <h3 class="font-bold text-xl text-gray-900 sm:text-2xl">Ashley Porter</h3>

                                                        <span class="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                                                            <span class="sr-only">Online</span>
                                                        </span>
                                                    </div>

                                                    <p class="text-sm text-gray-500">
                                                        @ashleyporter
                                                    </p>
                                                </div>

                                                <div class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                                                    <button
                                                        @click="sendFeedback"
                                                        type="button"
                                                        class="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1"
                                                    >
                                                        Submit My Feedback
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                                    <div class="space-y-8 px-4 sm:px-6 sm:space-y-6">
                                        <div class="hidden">
                                            <div class="text-sm font-medium text-gray-500 sm:flex-shrink-0">
                                                Display Name (optional)
                                            </div>

                                            <div class="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                <input v-model="label" type="text" class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                            </div>
                                        </div>

                                        <div>
                                            <div class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                                Comment
                                            </div>

                                            <div class="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                <textarea v-model="comment" rows="3" class="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"></textarea>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
/* global BigInt */

/* Import modules. */
import { ethers } from 'ethers'

export default {
    props: {
        hasFeedback: Boolean,
    },
    data: () => {
        return {
            winHandler: null,
            label: null,
            comment: null,
        }
    },
    watch: {
        hasFeedback: function (_status) {
            console.log('FEEDBACK HAS CHANGED', _status)

            if (_status) {
                this.winHandler = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-0'
            } else {
                this.winHandler = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-full'
            }
        },

    },
    methods: {
        async sendFeedback() {
            // this.hasPledging = true

            /* Close window. */
            // FIXME: Detect a succussfully submitted tx before closing.
            this.$emit('close')


            /* Validate embedded Web3 objects. */
            if (!window.ethereum && !window.bitcoin) {
                /* Validate embedded ethereum object. */
                if (window.bitcoin) {
                    console.info('Found Bitcoin provider.')
                } else if (window.ethereum) {
                    console.info('Found Ethereum provider.')
                } else {
                    return console.error('No Web3 provider found.')
                }
            }

            /* Initialize provider. */
            const provider = new ethers
                .providers
                .Web3Provider(window.ethereum, 'any')

            /* Set signer. */
            const signer = provider.getSigner()

            /* Set Campaign ABI. */
            const cAbi = this.$store.getters.getCampaignAbi

            // FOR DEVELOPMENT PURPOSES ONLY
            // The first campaign contract is hardcoded.
            const cAddr = this.$store.getters.getCampaignAddr

            /* Initialize campaign instance. */
            const campaign = new ethers.Contract(cAddr, cAbi, signer)
            // console.log('CONTRACT (campaign):', campaign)

            /* Set gas price. */
            // NOTE: Current minimum is 1.05 gWei (1,050,000,000)
            const gasPrice = BigInt(1050000000)

            // FOR DEV PURPOSES ONLY
            const comment = this.comment

            /* Reclaim pledge. */
            await campaign
                .sendFeedback(comment, { gasPrice })
                .catch(err => {
                    console.error(err)

                    /* Initialize message. */
                    let message = ''

                    /* Validate message. */
                    if (err.message) {
                        message += err.message
                    }

                    /* Validate data message. */
                    if (err.data && err.data.message) {
                        message += ' - ' + err.data.message
                    }

                    /* Send notification request. */
                    this.$store.dispatch('showNotif', {
                        icon: 'error',
                        title: 'MetaMask Error!',
                        message,
                    })
                })

        },

    },
    created: function () {

        this.currency = 'USD'

        this.winHandler = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-full'

        // setTimeout(() => {
        //     this.winHandler = 'transform transition ease-in-out duration-500 sm:duration-700 translate-x-0'
        //
        // }, 5000)
    },
    mounted: function () {
        //
    },
}
</script>

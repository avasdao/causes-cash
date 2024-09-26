<script setup>
/* Import modules. */
import { ref } from 'vue'
import { ethers } from 'ethers'

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()


</script>

<template>
    <main class="p-3">
        <div class="mt-5">
            <div class="hidden mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                <svg class="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
            </div>

            <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-3xl leading-6 font-medium text-gray-900" id="modal-title">
                    WITHDRAW
                </h3>

                <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        When you're ready to withdraw funds from your Causes wallet, just enter the destination and click 'SEND'.
                    </p>
                </div>

                <video :class="showVideoPreview" id="video-display" autoplay playsinline />

                <div class="mt-5 relative rounded-md shadow-sm">
                    <input
                        v-model="destination"
                        type="text"
                        name="destination"
                        id="destination"
                        placeholder="Enter a NEXA account / address"
                        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 text-lg border-gray-300 rounded-md"
                        aria-describedby="destination"
                    />

                    <div @click="openScanner" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                        <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clip-rule="evenodd"></path><path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z"></path></svg>
                    </div>
                </div>

                <div class="mt-3 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <img v-if="System.currency === 'SBCH' || System.currency === null" class="w-5 h-5" src="~/assets/logo.png" />
                        <img v-if="System.currency === 'BCH'" class="w-5 h-5" src="~/assets/logo.png" />
                    </div>

                    <input
                        v-model="amount"
                        type="text"
                        name="amount"
                        id="amount"
                        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 text-lg border-gray-300 rounded-md"
                        placeholder="0.00"
                        aria-describedby="amount"
                    />

                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span v-if="System.currency === 'SBCH' || System.currency === null" class="text-gray-500 sm:text-sm" id="price-currency">SBCH</span>
                        <span v-if="System.currency === 'BCH'" class="text-gray-500 sm:text-sm" id="price-currency">BCH</span>
                    </div>
                </div>

                <button @click="widthdraw" class="mt-5 w-full p-3 text-2xl bg-blue-500 font-bold text-gray-100 rounded-lg">
                    Send BCH
                </button>

                <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                        @click="$store.dispatch('setCurrency', 'SBCH')"
                        type="button"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-gray-50 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                        NEXA (SBCH)
                    </button>

                    <button
                    @click="$store.dispatch('setCurrency', 'BCH')"
                        type="button"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-gray-50 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
                    >
                        Bitcoin Cash (BCH)
                    </button>
                </div>

            </div>
        </div>

    </main>
</template>

<script>
/* Import modules. */

import QrScanner from 'qr-scanner'
// QrScanner.WORKER_PATH = './js/qr-scanner-worker.min.js'

/* Import components. */
// import HelloWorld from '@/components/HelloWorld'

/* Set dust (amount) satoshis. */
// const DUST_SATOSHIS = 546

/* Initialize Hop.cash bridge address. */
// FIXME: FOR DEV PURPOSES ONLY
//       pokket.cash wallet
const BRIDGE_ADDRESS = 'bitcoincash:qq85q2wzehzr3syrsla3l6s3d5xdk4z0rvcaz9p36l'

/* Set up a text encoder. */
// NOTE: Needed for encoding binary to UTF8.
const textEncoder = new TextEncoder()


export default {
    props: {
        bchAddress: String,
        curTab: String,
        sBchAddress: String,
        web3Address: String,
    },
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            currency: null,
            destination: null,
            amount: null,

            showVideoPreview: null,
            video: null,
            scanner: null,
            cameraError: false,
        }
    },
    watch: {
        curTab: function (_curTab) {
            // console.log('WITHDRAW (curTab) CHANGED', _curTab)

            /* Validate current tab. */
            if (_curTab && _curTab !== 'withdraw') {
                /* Clear receiver and scanner. */
                this.setReceiver(null)
            }
        },
    },
    methods: {
        openScanner() {
            /* Start scanner. */
            this.startScanner()
        },

        setReceiver(_result) {
            // console.log('SET DESTINATION', _result)

            /* Set destination. */
            this.destination = _result

            this.showVideoPreview = 'hidden'

            if (this.scanner) {
                this.scanner.destroy()
                this.scanner = null
            }

            /* Go to loan page. */
            // this.$router.push('/admin/loans/' + _result)
        },

        /**
         * Start Scanner
         *
         * NOTE: This DOES NOT work on any of the Android devices tested.
         *       However, it DOES work well on all iOS devices tested.
         */
        async startScanner () {
            if (this.scanner) {
                this.scanner.destroy()
                this.scanner = null

                this.showVideoPreview = 'hidden'

                return
            }

            try {
                navigator.getUserMedia =
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia

                if (!navigator.mediaDevices.getUserMedia && !navigator.getUserMedia) {
                    this.cameraError = true
                } else {
                    /* Initialize video element. */
                    this.video = document.getElementById('video-display')

                    this.showVideoPreview = 'flex w-full mt-5 bg-gray-100 border-4 border-gray-300 p-2 rounded-xl z-10'

                    this.scanner = new QrScanner(this.video, (_data) => {
                        console.log('SCANNER DATA', _data)

                        // FIXME: Build a new link parser
                        const result = _data
                        // const result = parseLink(_data)

                        /* Validate (scanner) result. */
                        if (result) {
                            this.setReceiver(result)
                        }
                    })

                    /* Start scanner. */
                    await this.scanner.start()
                }
            } catch (err) {
                console.error(err) // eslint-disable-line no-console

                this.cameraError = true

                /* Bugsnag alert. */
                throw new Error(err)
            }
        },

        async widthdraw() {
            // TODO
        },

        async broadcast(transaction) {
            // TBD
        },

    },
    created: function () {
        /* Initialize currency. */
        this.currency = 'BCH'

        /* Set video preview (class). */
        this.showVideoPreview = 'hidden'

    },
    mounted: function () {
        //
    },
    beforeUnmount: function () {
        /* Clear receiver and scanner. */
        this.setReceiver(null)

    },
}
</script>

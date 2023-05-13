<template>
    <main>
        <div class="mt-5">
            <div class="hidden mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                <svg class="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
            </div>

            <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-3xl leading-6 font-medium text-gray-900" id="modal-title">
                    DEPOSIT
                </h3>

                <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        Easily deposit your crypto into your Causes wallet.
                    </p>
                </div>

                <div class="flex flex-col items-center">
                    <img :src="addrDataUrl" class="" />
                    <small>{{bchAddress}}</small>
                </div>
            </div>
        </div>

        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-gray-50 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
                NEXA (SBCH)
            </button>

            <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-gray-50 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
            >
                Bitcoin Cash (BCH)
            </button>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import QRCode from 'qrcode'

/* Import components. */
// import HelloWorld from '@/components/HelloWorld'

export default {
    props: {
        bchAddress: String,
    },
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            addrDataUrl: null,
        }
    },
    watch: {
        bchAddress: async function (_address) {
            if (_address) {
                /* Create QRCode URL. */
                this.addrDataUrl = await QRCode.toDataURL(_address)
            }
        }
    },
    methods: {
        async init() {
            if (this.bchAddress) {
                /* Create QRCode URL. */
                this.addrDataUrl = await QRCode.toDataURL(this.bchAddress)
            }

        },

    },
    created: function () {
        /* Initialize transfer screen. */
        this.init()
    },
    mounted: function () {
        //
    },
}
</script>

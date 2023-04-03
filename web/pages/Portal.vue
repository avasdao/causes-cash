<script setup>
/* Import modules. */
import { ethers } from 'ethers'
import makeBlockie from 'ethereum-blockies-base64'
import { ref } from 'vue'

let web3Address = ref(null)

let avatar = ref(null)
let bio = ref(null)
let nickname = ref(null)

const displayAvatar = computed(() => {
    if (avatar.value) {
        return avatar.value
    } else if (web3Address.value) {
        return makeBlockie(web3Address.value)
    } else {
        return makeBlockie('anonymous')
    }
})


/**
 * Initialization
 */
const init = async () => {
    let route
    let params
    let portalid

    /* Validate router. */
    if (this.$route) {
        /* Set route. */
        route = this.$route
    }
    // console.log('ROUTE', route)

    /* Validate (route) parameters. */
    if (route.params) {
        /* Set parameters. */
        params = route.params
    }
    // console.log('PARAMS', params)

    if (params && params.portalid) {
        portalid = params.portalid
        console.log('PORTAL ID', portalid)
    }

    // TODO: Validate Web3 address (check code)

    /* Set Web3 address. */
    this.web3Address = portalid

    /* Set Causes Address. */
    const addr = this.$store.getters.getCausesAddr

    /* Set Causes ABI. */
    const abi = this.$store.getters.getCausesAbi

    /* Initialize provider. */
    const provider = new ethers.providers
        // .JsonRpcProvider(_getters.getProvider)
        .JsonRpcProvider('https://moeing.tech:9545')
    // console.log('PROVIDER', provider)


    /* Initialize campaign instance. */
    const causes = new ethers.Contract(addr, abi, provider)
    // console.log('CONTRACT (causes):', causes)

    /* Request causes nickname. */
    const portalInfo = await causes
        .getProfile(this.web3Address)
        .catch(err => {
            console.error(err)

            /* Handle invalid call. */
            if (err.code === 'CALL_EXCEPTION') {
                throw new Error('Failed to load (on-chain) Causes contract.')
            }
        })
    console.log('CAUSES CASH (portalInfo):', portalInfo)

    /* Validate portal info. */
    if (portalInfo) {
        /* Set avatar. */
        this.avatar = portalInfo.avatar

        /* Set about. */
        this.about = portalInfo.about

        /* Set domain. */
        this.domain = portalInfo.domain

        /* Set nickname. */
        this.nickname = portalInfo.nickname

    }
}


/* Initialization. */
init()
</script>

<template>
    <main class="max-w-5xl mx-auto">
        <div class="h-full flex flex-col bg-white shadow-xl">

            <div class="px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">

                    <h2 class="text-2xl font-medium text-gray-300">
                        Causes Cash Portal
                    </h2>

                    <div class="ml-3 h-7 flex items-center">
                        <img class="w-12" src="~/assets/logo.png" />
                    </div>
                </div>
            </div>

            <div class="divide-y divide-gray-200">
                <div class="pb-6">
                    <div class="bg-indigo-700 h-24 sm:h-20 lg:h-28"></div>

                    <div class="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-15">
                        <div class="-m-1 flex">
                            <div class="inline-flex rounded-lg overflow-hidden border-4 border-white">
                                <img
                                    class="flex-shrink-0 h-24 w-24 sm:h-40 sm:w-40 lg:w-48 lg:h-48 object-cover"
                                    :src="displayAvatar"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div class="mt-6 sm:ml-6 sm:flex-1">
                            <div>
                                <div class="flex items-center">
                                    <h3 class="font-bold text-xl text-gray-900 sm:text-2xl">
                                        {{nickname}}
                                    </h3>

                                    <span class="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                                        <span class="sr-only">Online</span>
                                    </span>
                                </div>

                                <p class="text-sm text-gray-500">
                                    {{web3Address}}
                                </p>
                            </div>

                            <div class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                                <button
                                    type="button"
                                    class="flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:flex-1"
                                >
                                    Message
                                </button>
                                <button
                                    type="button"
                                    class="flex-1 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Call
                                </button>
                                <span class="ml-3 inline-flex sm:ml-0">
                                    <div class="relative inline-block text-left">
                                        <button
                                            type="button"
                                            class="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            id="options-menu-button"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                        >
                                            <span class="sr-only">Open options menu</span>
                                            <!-- Heroicon name: solid/dots-vertical -->
                                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>

                                        <!--
                Dropdown panel, show/hide based on dropdown state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              -->
                                        <div
                                            class="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu-button"
                                            tabindex="-1"
                                        >
                                            <div class="py-1" role="none">
                                                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                                <a href="javascript://" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="options-menu-item-0">
                                                    View profile
                                                </a>

                                                <a href="javascript://" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="options-menu-item-1">
                                                    Copy profile link
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full flex flex-row">

                    <div class="w-3/12 p-5">
                        <div class="">
                            {{about}}
                        </div>

                        <hr class="my-5" />

                        <div class="">
                            {{domain}}
                        </div>

                        <hr class="my-5" />

                    </div>

                    <div class="w-9/12 pt-5 pr-5">
                        Excepteur summis cupidatat consequat, ut quae sed aliqua, senserit velit enim
                        eiusmod quid non aliquip in excepteur et labore nostrud mentitum, cernantur
                        export ipsum ita anim se irure ullamco philosophari, quem singulis cernantur.
                        Ita fugiat non legam. Mandaremus ea voluptate in culpa ne hic aliqua singulis ab
                        officia et dolore senserit et aliquip velit ut officia domesticarum.Sed magna
                        possumus nescius. Do illum domesticarum. Non hic graviterque, quorum arbitrantur
                        consequat malis proident. Anim iis incididunt do multos, admodum efflorescere ab
                        nescius aut si multos nisi fugiat expetendis, veniam ullamco do reprehenderit an
                        ipsum fabulas philosophari, singulis aliqua fabulas mandaremus, iis fore noster
                        fugiat incurreret, summis an iis eram laboris.
                    </div>

                </div>

                <div class="hidden px-4 py-5 sm:px-0 sm:py-0">
                    and over here??
                    <dl class="space-y-8 sm:divide-y sm:divide-gray-200 sm:space-y-0">
                        last time
                        <div class="sm:flex sm:px-6 sm:py-5">
                            no really thig time
                            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Bio
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                                <p>
                                    Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum aenean arcu.
                                </p>
                            </dd>
                        </div>
                        <div class="sm:flex sm:px-6 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Location
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                                New York, NY, USA
                            </dd>
                        </div>
                        <div class="sm:flex sm:px-6 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Website
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                                ashleyporter.com
                            </dd>
                        </div>
                        <div class="sm:flex sm:px-6 sm:py-5">
                            <dt class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Birthday
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:ml-6 sm:col-span-2">
                                <time datetime="1982-06-23">
                                    June 23, 1982
                                </time>
                            </dd>
                        </div>
                    </dl>
                </div>


            </div>
        </div>
    </main>
</template>

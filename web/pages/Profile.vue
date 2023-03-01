<template>
    <main class="relative min-h-screen bg-gray-100">

        <main class="py-10">

            <Account />

            <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div class="space-y-6 lg:col-start-1 lg:col-span-2">
                    <General
                        :web3Address="web3Address"
                    />

                    <Notes />
                </div>

                <Activity />
            </div>
        </main>
    </main>
</template>

<script>
/* global ethereum */

/* Import modules. */
import { ethers } from 'ethers'

/* Import components. */
import Account from './Profile/Account'
import Activity from './Profile/Activity'
import General from './Profile/General'
import Notes from './Profile/Notes'

export default {
    components: {
        Account,
        Activity,
        General,
        Notes,
    },
    data: () => {
        return {
            web3Address: null,
        }
    },
    methods: {
        /**
         * Initialization
         */
        async init() {
            /* Set Smartstarter Address. */
            const addr = this.$store.getters.getSmartstarterAddr

            /* Set Smartstarter ABI. */
            const abi = this.$store.getters.getSmartstarterAbi

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

            /* Connect accounts. */
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })
            console.info('Connected Web3 accounts:', accounts)

            /* Validate accounts. */
            if (accounts && accounts.length > 0) {
                this.web3Address = accounts[0]
            }

            if (!accounts || accounts.length < 1) {
                return alert('Please connect your MetaMask account to continue.')
            }

            /* Initialize provider. */
            const provider = new ethers
                .providers
                .Web3Provider(window.ethereum, 'any')

            /* Initialize provider. */
            // const provider = new ethers.providers
            //     .JsonRpcProvider(this.$store.getters.getProvider)
            // console.log('PROVIDER', provider)

            /* Validate contract code. */
            const code = await provider
                .getCode(addr)
                .catch(err => console.error(err))
            // console.log('PROFILE (code):', code)

            /* Validate contract code. */
            if (!code) {
                /* Set current network. */
                const curNetwork = this.$store?.state?.network
                // console.log('CURRENT NETWORK', curNetwork)

                /* Set (notification) message. */
                const message = `Contract NOT found on [ ${curNetwork} ].\n\nSwitching networks now..`

                /* Send notification request. */
                this.$store.dispatch('showNotif', {
                    icon: 'error',
                    title: 'Network Error!',
                    message,
                })

                /* Validate current network. */
                if (curNetwork === 'mainnet') {
                    console.log('Switching to Testnet')
                    this.$store.dispatch('saveNetwork', 'testnet')
                } else {
                    console.log('Switching to Mainnet')
                    this.$store.dispatch('saveNetwork', 'mainnet')
                }

            }

            /* Initialize campaign instance. */
            const smartstarter = new ethers.Contract(addr, abi, provider)
            // console.log('CONTRACT (smartstarter):', smartstarter)

            /* Request smartstarter nickname. */
            const profileInfo = await smartstarter
                .getProfile(this.web3Address)
                .catch(err => {
                    console.error(err)

                    /* Handle invalid call. */
                    if (err.code === 'CALL_EXCEPTION') {
                        throw new Error('Failed to load (on-chain) Smartstarter contract.')
                    }
                })
            console.log('SMARTSTARTER (profileInfo):', profileInfo)

            /* Validate about. */
            if (profileInfo && profileInfo.about) {
                /* Set about. */
                this.$store.dispatch('setProfileAbout', profileInfo.about)
            }

            /* Validate avatar. */
            if (profileInfo && profileInfo.avatar) {
                /* Set avatar. */
                this.$store.dispatch('setProfileAvatar', profileInfo.avatar)
            }

            /* Validate homepage. */
            if (profileInfo && profileInfo.homepage) {
                /* Set homepage. */
                this.$store.dispatch('setProfileHomepage', profileInfo.homepage)
            }

            /* Validate nickname. */
            if (profileInfo && profileInfo.nickname) {
                /* Set nickname. */
                this.$store.dispatch('setProfileNickname', profileInfo.nickname)
            }

            /* Validate tagline. */
            if (profileInfo && profileInfo.tagline) {
                /* Set tagline. */
                this.$store.dispatch('setProfileTagline', profileInfo.tagline)
            }

        },

    },
    created: function () {
        /* Initialize profile. */
        this.init()
    },
    mounted: function () {
        //
    },
}
</script>

<template>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div class="flex items-center space-x-5">
            <div class="flex-shrink-0">
                <div class="relative">
                    <img
                        class="h-24 w-24 lg:h-32 lg:w-32 rounded-full object-cover"
                        :src="avatar"
                        :alt="sBchAddress"
                    />

                    <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                </div>
            </div>

            <div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {{nickname}}
                </h1>

                <!-- MetaMask (injected) Account / Address -->
                <a :href="'https://www.smartscan.cash/address/' + web3Address" target="_blank" class="hidden sm:flex items-center sm:text-sm lg:text-lg font-medium text-gray-500 hover:underline">
                    MetaMask
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    {{web3Address}}
                </a>
                <a :href="'https://www.smartscan.cash/address/' + web3Address" target="_blank" class="flex sm:hidden items-center text-sm font-medium text-gray-500 hover:underline">
                    MetaMask
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    {{abbrWeb3Address}}
                </a>

                <!-- SmartBCH Account / Address -->
                <a :href="'https://www.smartscan.cash/address/' + sBchAddress" target="_blank" class="hidden sm:flex items-center sm:text-sm lg:text-lg font-medium text-gray-500 hover:underline">
                    SmartBCH
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    {{sBchAddress}}
                </a>
                <a :href="'https://www.smartscan.cash/address/' + sBchAddress" target="_blank" class="flex sm:hidden items-center text-sm font-medium text-gray-500 hover:underline">
                    SmartBCH
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    {{abbrSBchAddress}}
                </a>

                <!-- Bitcoin Cash Address -->
                <a :href="'https://blockchair.com/bitcoin-cash/address/' + bchAddress" target="_blank" class="hidden sm:flex items-center sm:text-sm lg:text-lg font-medium text-gray-500 hover:underline">
                    BitcoinCash
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    {{displayBchAddress}}
                </a>
                <a :href="'https://blockchair.com/bitcoin-cash/address/' + bchAddress" target="_blank" class="flex sm:hidden items-center text-sm font-medium text-gray-500 hover:underline">
                    BitcoinCash
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    {{abbrBchAddress}}
                </a>
            </div>
        </div>

        <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <button
                type="button"
                class="inline-flex items-center justify-center px-8 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-800 bg-green-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                disabled
            >
                {{displayBalance}} BCH
            </button>

            <button
                @click="transfer"
                type="button"
                class="inline-flex items-center justify-center px-8 py-2 border border-transparent text-xl font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
                Transfer
            </button>
        </div>
    </main>

    <Transfer
        :class="{ 'hidden' : showTransfer !== true }"
        :bchAddress="bchAddress"
        :sBchAddress="sBchAddress"
        :web3Address="web3Address"
        @close="showTransfer = false"
    />
</template>

<script>
/* global ethereum */

/* Import modules. */
import { ethers } from 'ethers'
// import { ElectrumClient } from 'electrum-cash'
// import EventSource from 'eventsource'
import makeBlockie from 'ethereum-blockies-base64'
import Nexa from 'nexajs'

/* Import library to manage bitcoin cash data structures. */
import {
    // binToHex,
    CashAddressType,
    encodeCashAddress,
    hexToBin,
    instantiateSha256,
    instantiateSecp256k1,
    instantiateRipemd160,
} from '@bitauth/libauth'

/* Import components. */
import Transfer from './Transfer'

/* Set endpoint. */
const ENDPOINT = 'https://bitsocket.bch.sx/s/'
// const ENDPOINT = 'https://bitdb.bch.sx/q/'

/* Set BitDB query language version. */
const VERSION = 3

/* Set polling interval. */
// const POLLING_INTERVAL = 30000 // 5 seconds

export default {
    components: {
        Transfer,
    },
    data: () => {
        return {
            bchAddress: null,
            sBchAddress: null,
            web3Address: null,
            balance: null,

            bitsocket: null,
            electrum: null,
            pollingHandler: null,

            showTransfer: null,
        }
    },
    computed: {
        displayBchAddress() {
            if (!this.bchAddress) return

            return this.bchAddress.slice(12)
        },

        abbrBchAddress() {
            if (!this.bchAddress) return

            return this.bchAddress.slice(12, 22) + ' ... ' + this.bchAddress.slice(-10)
        },

        abbrSBchAddress() {
            if (!this.sBchAddress) return

            return this.sBchAddress.slice(0, 10) + ' ... ' + this.sBchAddress.slice(-10)
        },

        abbrWeb3Address() {
            if (!this.web3Address) return

            return this.web3Address.slice(0, 10) + ' ... ' + this.web3Address.slice(-10)
        },

        avatar() {
            if (this.$store?.state?.profileAvatar) {
                return this.$store?.state?.profileAvatar
            } else if (this.sBchAddress) {
                return makeBlockie(this.sBchAddress)
            } else {
                return makeBlockie('anonymous')
            }
        },

        nickname() {
            if (this.$store?.state?.profileNickname) {
                return this.$store?.state?.profileNickname
            } else {
                return 'Anonymous User'
            }
        },

        displayBalance() {
            if (!this.balance) return 0

            let formatted = ethers.utils.formatEther(this.balance)

            formatted = Number(formatted).toFixed(4)

            return formatted
        },

    },
    methods: {
        /**
         * Initialization
         */
        async init() {
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

            /* Set signer. */
            // const signer = provider.getSigner()
            // console.log('SIGNER', signer)

            /* Set balance. */
            this.balance = await provider.getBalance(accounts[0])
        },

        /**
         * Initialize Wallet
         *
         * We search for an existing seed phrase, then
         *   1. Create a new wallet
         *   2. Reload an existing wallet
         */
        async initWallet() {
            /* Initialize handlers. */
            let seed
            let wallet

            /* Initialize seed phrase. */
            seed = this.$store?.state?.seed
            // console.log('SEED PHRASE', seed)

            /* Validate seed phrase. */
            if (!seed) {
                /* Generate a NEW random wallet. */
                wallet = ethers.Wallet.createRandom()
                // console.log('NEW WALLET', wallet)

                // console.log('WALLET (mnemonic):', wallet.mnemonic)

                /* Validate (mnemonic) seed phrase. */
                if (wallet && wallet.mnemonic && wallet.mnemonic.phrase) {
                    /* Set seed. */
                    seed = wallet.mnemonic.phrase

                    /* Save (mnemonic) seed phrase to store. */
                    this.$store.dispatch('setSeed', seed)

                    console.info(
                        'A NEW (mnemonic) seed phrase has been saved to your Local Storgage!')
                } else {
                    throw new Error('There was an error creating a (mnemonic) seed phrase.')
                }
            } else {
                /* Restore existing wallet. */
                wallet = ethers.Wallet.fromMnemonic(seed)
                // console.log('EXISTING WALLET', wallet)
            }

            /* Set Ethereum (account) address. */
            this.sBchAddress = wallet.address
            console.log('ADDRESS (Ethereum):', this.sBchAddress)

            // /* Initialize mnemonic. */
            // const mnemonic = Mnemonic(seed)
            //
            // /* Initialize HD node. */
            // const node = mnemonic.toHDPrivateKey()
            //
            // /* Set path. */
            // // NOTE: For simplicity, we're NOT supporting the `change` and
            // //       `address_index` levels of the path.
            // const path = `m/44'/145'/0'`
            //
            // /* Initialize child node. */
            // const childNode = node.deriveChild(path)
            //
            // /* Initialize public key. */
            // const pubkey = bitcore.PublicKey(childNode.publicKey.toString())
            //
            // /* Convert to cash address. */
            // this.bchAddress = bitcore.Address(pubkey).toString()
            // console.log('ADDRESS (Bitcoin Cash):', this.bchAddress)

            /* Instantiate Libauth crypto interfaces. */
            const secp256k1 = await instantiateSecp256k1()
            const sha256 = await instantiateSha256()
            const ripemd160 = await instantiateRipemd160()

            /* Generate signature hash and entropy. */
            const signatureHash = ethers.utils.id(seed)
            const signatureEntropy = ethers.BigNumber.from(signatureHash)

            /* Generate private key entropy using Hop Wallet Prime. */
            const privateKeyEntropy = signatureEntropy
                .mod(this.$store?.state?.HOP_WALLET_PRIME)

            /* Format the private key to binary. */
            // NOTE: Start at position 2 to omit the 0x prefix added by toHexString.
            const privateKey = hexToBin(
                privateKeyEntropy.toHexString().substring(2))

            /* Derive the corresponding public key. */
            const publicKey = secp256k1.derivePublicKeyCompressed(privateKey)

            /* Hash the public key hash according to the P2PKH scheme. */
            const publicKeyHash = ripemd160.hash(sha256.hash(publicKey))

            /* Encode the public key hash into a P2PKH cash address. */
            this.bchAddress = encodeCashAddress(
                    'bitcoincash', CashAddressType.P2PKH, publicKeyHash)
            // const legacyAddress = encodeBase58Address(sha256, 'p2pkh', publicKeyHash);

            /* Initialize monitor. */
            // this.initElectrumMonitor() // bch.imaginary.cash
            // this.initSocketMonitor() // bitsocket.bch.sx
        },

        /**
         * Initialize (BitSocket) Monitor
         *
         * Start watching for ANY on-chain activity for your wallet address.
         */
        initSocketMonitor() {
            console.info('Initialize account/address monitoring...')

            /* Set address. */
            let address = this.bchAddress

            /* Validate prefix. */
            if (address.indexOf('bitcoincash:') !== -1) {
                address = address.slice(12)
            }

            /* Set (query) parameters. */
            const params = {
                v: VERSION,
                q: {
                    find: {
                        '$or': [
                            { 'in.e.a': address },
                            { 'out.e.a': address },
                        ]
                    },
                },
            }
            console.log('MONITOR QUERY', query)

            /* Set query. */
            const query = Buffer.from(
                JSON.stringify(params)
            ).toString('base64')

            /* Set (event) source. */
            const source = ENDPOINT + query

            /* Initialize BitSocket. */
            // this.bitsocket = new EventSource(source)

            /* Handle connection opening. */
            this.bitsocket.onopen = () => {
                /* Set message. */
                const msg = `Started listening for [ ${JSON.stringify(params)} ]`
                console.log(msg)
                // console.log(msg) // FOR DEBUGGING PURPOSES ONLY

                /* Emit message. */
                // this.emit('open', msg)
            }

            /* Handle connection closing. */
            this.bitsocket.onclose = () => {
                /* Set message. */
                const msg = `Stopped listening for [ ${JSON.stringify(params)} ]`
                console.log(msg)
                // console.log(msg) // FOR DEBUGGING PURPOSES ONLY

                /* Emit message. */
                // this.emit('close', msg)
            }

            /* Handle message. */
            this.bitsocket.onmessage = (_evt) => {
                try {
                    /* Parse data. */
                    const data = JSON.parse(_evt.data)

                    /* Set message. */
                    const msg = `\nReceived data for [ ${JSON.stringify(params)} ]:`
                    console.log(msg, data)

                    /* Emit data. */
                    // this.emit('update', data)
                } catch (err) {
                    console.error(err)

                    /* Emit error. */
                    // this.emit('error', err)
                }
            }

        },

        /**
         * Initialize (Electrum) Monitor
         *
         * Start watching for ANY on-chain activity for your wallet address.
         */
        // async initElectrumMonitor() {
        //     /* Set the transport to use encrypted websockets. */
        //     const transportScheme = 'wss'
        //
        //     console.info('Initialize account/address monitoring...')
        //
        //     /* Set address. */
        //     let address = this.bchAddress
        //
        //     /* Validate prefix. */
        //     if (address.indexOf('bitcoincash:') !== -1) {
        //         address = address.slice(12)
        //     }
        //
        //     const _updateUserAddress = (_evt) => {
        //         console.log('UPDATE USER ADDRESS', _evt)
        //         // try {
        //         //     /* Parse data. */
        //         //     const data = JSON.parse(_evt.data)
        //         //
        //         //     /* Set message. */
        //         //     const msg = `\nReceived data for [ ${JSON.stringify(params)} ]:`
        //         //     console.log(msg, data)
        //         //
        //         //     /* Emit data. */
        //         //     // this.emit('update', data)
        //         // } catch (err) {
        //         //     console.error(err)
        //         //
        //         //     /* Emit error. */
        //         //     // this.emit('error', err)
        //         // }
        //
        //     }
        //
        //     /* Initialize an electrum cluster that trusts the servers it connects to. */
        //     this.electrum = new ElectrumClient(
        //         'Causes',
        //         '1.4.3',
        //         'bch.imaginary.cash',
        //         50004, // wss
        //         transportScheme
        //     )
        //
        //     await this.electrum.connect()
        //
        //     /* Monitor the liquidity on the bitcoin cash pool address. */
        //     // await this.electrum
        //     //     .subscribe(
        //     //         this.updateCashPoolBalance.bind(this),
        //     //         'blockchain.address.subscribe',
        //     //         this.cashLiquidityAddress,
        //     //     )
        //
        //     /* Update user related history when the bitcoin cash pool address have had activity. */
        //     await this.electrum
        //         .subscribe(
        //             _updateUserAddress,
        //             'blockchain.address.subscribe',
        //             address,
        //         )
        //
        // },

        transfer() {
            this.showTransfer = true
        },

        deleteWallet() {
            /* Save (mnemonic) seed phrase to store. */
            this.$store.dispatch('setSeed', null)

            console.error('Your wallet has been successfully deleted!')
        },

    },
    created: function () {
        /* Initialize balance. */
        this.balance = 0

        /* Initialize. */
        this.init()

        /* Initialize wallet. */
        this.initWallet()
        // this.deleteWallet()

        /* Initialize transfer flag. */
        this.showTransfer = false

    },
    mounted: function () {
        //
    },
    beforeUnmount: function () {
        /* Clear polling interval. */
        if (this.pollingHandler) {
            clearInterval(this.pollingHandler)
        }

    },
}
</script>

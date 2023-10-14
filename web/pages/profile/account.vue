<script setup>
/* Import modules. */
import { ethers } from 'ethers'
import makeBlockie from 'ethereum-blockies-base64'

import {
    hexToBin,
} from '@nexajs/utils'

/* Import library to manage bitcoin cash data structures. */
import {
    CashAddressType,
    encodeCashAddress,
    instantiateSha256,
    instantiateSecp256k1,
    instantiateRipemd160,
} from '@bitauth/libauth'

/* Import components. */
import Transfer from './transfer'

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()


/* Set endpoint. */
const ENDPOINT = 'https://bitsocket.bch.sx/s/'
// const ENDPOINT = 'https://bitdb.bch.sx/q/'

/* Set BitDB query language version. */
const VERSION = 3

/* Set polling interval. */
// const POLLING_INTERVAL = 30000 // 5 seconds

let bchAddress = ref(null)
let sBchAddress = ref(null)
let web3Address = ref(null)
let balance = ref(null)

let bitsocket = ref(null)
let electrum = ref(null)
let pollingHandler = ref(null)

let showTransfer = ref(null)


const displayBchAddress = computed(() => {
    if (!bchAddress.value) return

    return bchAddress.value.slice(12)
})

const abbrBchAddress = computed(() => {
    if (!bchAddress.value) return

    return bchAddress.value.slice(12, 22) + ' ... ' + bchAddress.value.slice(-10)
})

const abbrSBchAddress = computed(() => {
    if (!sBchAddress.value) return

    return sBchAddress.value.slice(0, 10) + ' ... ' + sBchAddress.value.slice(-10)
})

const abbrWeb3Address = computed(() => {
    if (!web3Address.value) return

    return web3Address.value.slice(0, 10) + ' ... ' + web3Address.value.slice(-10)
})

const avatar = computed(() => {
    if (Profile.profileAvatar) {
        return Profile.profileAvatar
    } else if (sBchAddress.value) {
        return makeBlockie(sBchAddress.value)
    } else {
        return makeBlockie('anonymous')
    }
})

const nickname = computed(() => {
    if (Profile.profileNickname) {
        return Profile.profileNickname
    } else {
        return 'Anonymous User'
    }
})

const displayBalance = computed(() => {
    if (!balance.value) return 0

    let formatted = ethers.utils.formatEther(balance.value)

    formatted = Number(formatted).toFixed(4)

    return formatted
})


/**
 * Initialization
 */
const init = async () => {
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
        web3Address.value = accounts[0]
    }

    if (!accounts || accounts.length < 1) {
        return alert('Please connect your MetaNet account to continue.')
    }

    /* Initialize provider. */
    const provider = new ethers
        .providers
        .Web3Provider(window.ethereum, 'any')

    /* Set signer. */
    // const signer = provider.getSigner()
    // console.log('SIGNER', signer)

    /* Set balance. */
    balance.value = await provider.getBalance(accounts[0])
}

/**
 * Initialize Wallet
 *
 * We search for an existing seed phrase, then
 *   1. Create a new wallet
 *   2. Reload an existing wallet
 */
const initWallet = async () => {
    /* Initialize handlers. */
    let seed
    let wallet

    /* Initialize seed phrase. */
    seed = Profile.seed
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
            // this.$store.dispatch('setSeed', seed)

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
    sBchAddress.value = wallet.address
    console.log('ADDRESS (Ethereum):', sBchAddress.value)

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
    // bchAddress.value = bitcore.Address(pubkey).toString()
    // console.log('ADDRESS (Bitcoin Cash):', bchAddress.value)

    /* Instantiate Libauth crypto interfaces. */
    const secp256k1 = await instantiateSecp256k1()
    const sha256 = await instantiateSha256()
    const ripemd160 = await instantiateRipemd160()

    /* Generate signature hash and entropy. */
    const signatureHash = ethers.utils.id(seed)
    const signatureEntropy = ethers.BigNumber.from(signatureHash)

    /* Generate private key entropy using Hop Wallet Prime. */
    const privateKeyEntropy = signatureEntropy
        .mod(Profile.HOP_WALLET_PRIME)

    /* Format the private key to binary. */
    // NOTE: Start at position 2 to omit the 0x prefix added by toHexString.
    const privateKey = hexToBin(
        privateKeyEntropy.toHexString().substring(2))

    /* Derive the corresponding public key. */
    const publicKey = secp256k1.derivePublicKeyCompressed(privateKey)

    /* Hash the public key hash according to the P2PKH scheme. */
    const publicKeyHash = ripemd160.hash(sha256.hash(publicKey))

    /* Encode the public key hash into a P2PKH cash address. */
    bchAddress.value = encodeCashAddress(
            'bitcoincash', CashAddressType.P2PKH, publicKeyHash)
    // const legacyAddress = encodeBase58Address(sha256, 'p2pkh', publicKeyHash);

    /* Initialize monitor. */
    // initElectrumMonitor() // bch.imaginary.cash
    // initSocketMonitor() // bitsocket.bch.sx
}

/**
 * Initialize (BitSocket) Monitor
 *
 * Start watching for ANY on-chain activity for your wallet address.
 */
const initSocketMonitor = () => {
    console.info('Initialize account/address monitoring...')

    /* Set address. */
    let address = bchAddress.value

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
    // bitsocket = new EventSource(source)

    /* Handle connection opening. */
    bitsocket.onopen = () => {
        /* Set message. */
        const msg = `Started listening for [ ${JSON.stringify(params)} ]`
        console.log(msg)
        // console.log(msg) // FOR DEBUGGING PURPOSES ONLY

        /* Emit message. */
        // emit('open', msg)
    }

    /* Handle connection closing. */
    bitsocket.onclose = () => {
        /* Set message. */
        const msg = `Stopped listening for [ ${JSON.stringify(params)} ]`
        console.log(msg)
        // console.log(msg) // FOR DEBUGGING PURPOSES ONLY

        /* Emit message. */
        // emit('close', msg)
    }

    /* Handle message. */
    bitsocket.onmessage = (_evt) => {
        try {
            /* Parse data. */
            const data = JSON.parse(_evt.data)

            /* Set message. */
            const msg = `\nReceived data for [ ${JSON.stringify(params)} ]:`
            console.log(msg, data)

            /* Emit data. */
            // emit('update', data)
        } catch (err) {
            console.error(err)

            /* Emit error. */
            // emit('error', err)
        }
    }

}

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
//     let address = bchAddress.value
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
//         //     // emit('update', data)
//         // } catch (err) {
//         //     console.error(err)
//         //
//         //     /* Emit error. */
//         //     // emit('error', err)
//         // }
//
//     }
//
//     /* Initialize an electrum cluster that trusts the servers it connects to. */
//     electrum = new ElectrumClient(
//         'Causes',
//         '1.4.3',
//         'bch.imaginary.cash',
//         50004, // wss
//         transportScheme
//     )
//
//     await electrum.connect()
//
//     /* Monitor the liquidity on the bitcoin cash pool address. */
//     // await electrum
//     //     .subscribe(
//     //         updateCashPoolBalance.bind(this),
//     //         'blockchain.address.subscribe',
//     //         cashLiquidityAddress,
//     //     )
//
//     /* Update user related history when the bitcoin cash pool address have had activity. */
//     await electrum
//         .subscribe(
//             _updateUserAddress,
//             'blockchain.address.subscribe',
//             address,
//         )
//
// },

const transfer = () => {
    showTransfer.value = true
}

const deleteWallet = () => {
    /* Save (mnemonic) seed phrase to store. */
    // this.$store.dispatch('setSeed', null)

    console.error('Your wallet has been successfully deleted!')
}


/* Initialize balance. */
balance.value = 0

/* Initialize. */
// init()

/* Initialize wallet. */
// initWallet()
// deleteWallet()

/* Initialize transfer flag. */
showTransfer.value = false

onMounted(() => {
    // getBchAddress()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

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

                <!-- MetaNet (injected) Account / Address -->
                <NuxtLink to="https://avas.cash/bootstrap" target="_blank" class="flex items-center sm:text-sm lg:text-lg font-medium text-gray-500 hover:underline">
                    MetaNet
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    learn more...
                </NuxtLink>

                <!-- NEXA Account / Address -->
                <a :href="'https://nexa.sh/address/' + Wallet.address" target="_blank" class="flex items-center sm:text-sm lg:text-lg font-medium text-gray-500 hover:underline truncate">
                    NEXA
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    {{Wallet.address}}
                </a>

                <!-- Bitcoin Cash Address -->
                <!-- <a href="javascript://" class="flex items-center sm:text-sm lg:text-lg font-medium text-gray-500 hover:underline">
                    BitcoinCash
                    <svg class="inline w-4 h-4 mx-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    n/a
                </a> -->
            </div>
        </div>

        <!-- <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <button
                type="button"
                class="inline-flex items-center justify-center px-8 py-2 border border-gray-300 shadow-sm text-xl font-medium rounded-md text-gray-800 bg-green-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                disabled
            >
                {{displayBalance}} NEXA
            </button>

            <button
                @click="transfer"
                type="button"
                class="inline-flex items-center justify-center px-8 py-2 border border-transparent text-xl font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
                Transfer
            </button>
        </div> -->
    </main>

    <Transfer
        :class="{ 'hidden' : showTransfer !== true }"
        :bchAddress="bchAddress"
        :sBchAddress="sBchAddress"
        :web3Address="web3Address"
        @close="showTransfer = false"
    />
</template>

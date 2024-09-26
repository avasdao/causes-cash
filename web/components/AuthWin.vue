<script setup lang="ts">
/* Import modules. */
import { ethers } from 'ethers'
import moment from 'moment'
import QRCode from 'qrcode'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    campaign: Object,
})

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const Wallet = useWalletStore()

/* Set constants. */
const NEXID_ENDPOINT = 'nexid://causes.cash/_auth'

/* Initialize constants. */
const POLLING_FREQUENCY = 3000 // 3 seconds

let pollingid

/* Initialize (reactive) holders. */
// let challenge = ref(null)
const nexidUri = ref(null)

const isLoading = ref(true)

/**
 * QR Code
 *
 * Displays a QR code, used to authenticate users.
 */
const qr = computed(() => {
    if (!nexidUri.value || !Profile.session) {
        return null
    }

    /* Initialize locals. */
    let chal
    let cookie
    let params
    let strValue

    /* Initialize (string) value. */
    strValue = ''

    /* Initialize scanner parameters. */
    params = {
        type: 'svg',
        width: 300,
        height: 300,
        color: {
            dark: '#000',
            light: '#fff'
        }
    }

    QRCode.toString(nexidUri.value, params, (err, value) => {
        if (err) {
            return console.error('QR Code ERROR:', err) // eslint-disable-line no-console
        }

        /* Set (string) value. */
        strValue = value
    })

    /* Return (string) value. */
    return strValue
})

const pollForAuth = async () => {
    // console.log('POLLING FOR AUTH')

    if (!Profile.sessionid) {
        /* Handle loading flag. */
        if (isLoading.value) {
            isLoading.value = false
        }

        return console.error('Oops! We DO NOT have an active Session.')
    }

    /* Set target. */
    const target = '/api/session?sid=' + Profile.sessionid
    // console.log('TARGET', target)

    const session = await $fetch(target)
    console.log('FETCHED SESSION', session)

    /* Validate authorized session. */
    if (session?.profileid) {
        /* Stop polling. */
        if (pollingid) {
            clearInterval(pollingid)
        }

        /* Save session to profile. */
        Profile.saveSession(session)

        // let sig = session.
        console.log('AUTH SESSION', session)
        console.log('AUTH SESSION (auth)', session.auth)

        /* Initialize wallet. */
        Wallet.setEntropy
    }

    /* Handle loading flag. */
    if (isLoading.value) {
        isLoading.value = false
    }
}

const init = async () => {
    /* Validate client. */
    if (process.client) {
        console.log('AUTH WIN (Profile.session):', Profile.session)
        console.log('SESSION ID', Profile.sessionid)

        /* Initialize locals. */
        let session

        /* Validate authorization elements. */
        if (Profile.session && !Profile.sessionid) {
            console.error('BUG: Resetting session ID!')

            /* Delete (browser) session. */
            Profile.deleteSession()

            /* Re-call initialization. */
            return setTimeout(init, POLLING_FREQUENCY)
        }

        /* Validate authorization elements. */
        // NOTE: Reset legacy session details.
        if (Profile.sessionid && !Profile.challenge) {
            console.error('LEGACY: Resetting session challenge!')

            /* Delete (browser) session. */
            Profile.deleteSession()

            /* Re-call initialization. */
            return setTimeout(init, POLLING_FREQUENCY)
        }

        /* Manage session. */
        session = await $fetch('/api/session', {
            method: 'POST',
            body: { sessionid: Profile.sessionid },
        })
        console.log('GLOBAL SESSION', session)

        /* Save session. */
        Profile.saveSession(session)

        let chal = Profile.challenge
        // console.log('INIT (chal):', chal)

        let cookie = btoa(Profile.sessionid)
        // console.log('INIT (cookie):', cookie)

        /* Set registration link. */
        nexidUri.value = encodeURI(`${NEXID_ENDPOINT}?op=reg&chal=${chal}&cookie=${cookie}&hdl=r&email=o&sm=o&realname=o&ava=o`)

        /* Initialize authorization polling. */
        // FIXME How can we implement WebSockets for more efficiency?
        // pollingid = setInterval(pollForAuth, POLLING_FREQUENCY)
    }
}

const web3Auth = async () => {
    /* Validate embedded Web3 objects. */
    if (!window.ethereum) {
        return console.error('No Web3 provider found.')
    }

    /* Connect accounts. */
    const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
    })
    console.info('Connected Web3 accounts:', accounts)

    if (!accounts || accounts.length < 1) {
        return alert('Please connect your MetaMask account to continue.')
    }

    /* Initialize provider. */
    const provider = new ethers
        .providers
        .Web3Provider(window.ethereum, 'any')

    /* Set signer. */
    const signer = provider.getSigner()
    console.log('SIGNER', signer)
}

const web3Signin = async () => {
    console.log('Web3 sign-in')

    /* Initialize provider. */
    const provider = new ethers
        .BrowserProvider(window.ethereum, 'any')
    // console.log('PROVIDER', provider)

    /* Set signer. */
    const signer = await provider.getSigner()
    // console.log('SIGNER', signer)

    // Our message
    const message = `Causes Cash Authorization

Your New Session ID is d572abee-1337-beef-b1b7-2369943c6411

Requested on ${moment().format('LLLL')}`

    // The raw signature; 65 bytes
    const rawSig = await signer.signMessage(message)
        .catch(err => {
            console.error(err)
            console.info('***TODO: HANDLE USER INTERACTION***')
        })
    console.log('rawSig', rawSig)
    // '0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b'

    // Converting it to a Signature object provides more
    // flexibility, such as using it as a struct
    const sig = ethers.Signature.from(rawSig)
    console.log('sig', sig)
    // Signature { r: "0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef10868", s: "0x07e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a", yParity: 0, networkV: null }

    const response = await $fetch('/api/session', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
            message,
            sig: rawSig,
        },
    })
    .catch(err => console.error(err))
    console.log('AUTH RESPONSE', response)
}

const signout = () => {
    /* Delete active session. */
    Profile.deleteSession()

    /* Destroy current wallet. */
    Wallet.destroy()
}

onMounted(() => {
    init()
    // NOTE: Make sure we have SESSION ID.
    // setTimeout(init, 1000)
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main v-if="Profile.session?.profileid" class="flex flex-col gap-4">
        <h2 class="text-2xl font-medium">
            You are signed in
        </h2>

        <NuxtLink v-if="Profile.session.profileid" :to="'https://nexa.sh/address/' + Profile.session.profileid" target="_blank" class="text-sm font-medium text-blue-500 hover:text-blue-400">
            <h2 class="text-xl font-bold tracking-widest">
                MetaNet Address
            </h2>
            {{Profile.session.profileid}}
        </NuxtLink>

        <NuxtLink v-if="Wallet.address" :to="'https://explorer.nexa.org/address/' + Wallet.address" target="_blank" class="text-sm font-medium text-blue-500 hover:text-blue-400">
            Wallet
            {{Wallet.address}}
        </NuxtLink>

        <small v-if="Wallet.entropy" class="text-sm font-medium">
            Entropy {{Wallet.entropy}}
        </small>

        <button @click="signout" class="px-5 py-2 w-fit flex text-xl text-red-50 font-medium bg-red-500 border-2 border-red-700 rounded-lg shadow">
            Signout
        </button>
    </main>

    <main v-if="!Profile.session?.profileid" class="hidden flex min-h-full flex-col justify-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->

            <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>

        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form class="space-y-6" action="javascript://" method="POST">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
                        </div>

                        <div class="text-sm leading-6">
                            <a href="javascript://" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div>
                    <div class="relative mt-10">
                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                            <div class="w-full border-t border-gray-200"></div>
                        </div>
                        <div class="relative flex justify-center text-sm font-medium leading-6">
                            <span class="bg-white px-6 text-gray-900">Or continue with</span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-2 gap-4">
                        <a
                            href="javascript://"
                            class="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                                />
                            </svg>
                            <span class="text-sm font-semibold leading-6">Twitter</span>
                        </a>

                        <a
                            href="javascript://"
                            class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span class="text-sm font-semibold leading-6">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>



    <main v-if="!Profile.session?.profileid" class="px-3 max-w-5xl mx-auto">
        <div class="max-w-xl mx-auto mt-5 flex flex-col gap-4 items-center">
            <p class="px-10 text-sm font-medium text-center">
                If you're using the Wally mobile wallet, just click the link below
            </p>

            <NuxtLink :to="nexidUri" class="px-5 py-2 flex justify-center bg-yellow-400 border-4 border-yellow-700 rounded-lg">
                <span class="text-lg text-yellow-900 font-medium">
                    Wally Wallet Login
                </span>
            </NuxtLink>

            <button @click="web3Signin" class="px-5 py-2 flex justify-center bg-yellow-400 border-4 border-yellow-700 rounded-lg">
                <span class="text-lg text-yellow-900 font-medium">
                    MetaMask/Web3 Sign-in
                </span>
            </button>
        </div>

        <div class="py-10 flex flex-col items-center gap-10">
            <p class="px-10 text-sm font-medium text-center">
                If you're using a Desktop browser, scan the Qr Code below with Wally wallet
            </p>

            <div class="mx-2 p-5 bg-gradient-to-r from-gray-700 to-gray-500 border-4 border-gray-700 rounded-lg">
                <div class="border-4 border-yellow-500 rounded-lg overflow-hidden" v-html="qr" />
            </div>

            <section class="max-w-xl px-5 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
                <span class="text-yellow-700 text-sm font-medium uppercase">
                    Registration Link
                </span>

                <span class="block font-bold truncate">
                    <a :href="nexidUri" class="text-sm text-blue-500 hover:underline">
                        {{nexidUri}}
                    </a>
                </span>
            </section>

            <section class="max-w-xl px-5 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
                <span class="text-yellow-700 text-sm font-medium uppercase">
                    Cookie / Session ID
                </span>

                <span class="block font-bold">
                    {{Profile.sessionid}}
                </span>
            </section>

            <section class="max-w-xl px-5 py-2 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
                <span class="text-yellow-700 text-sm font-medium uppercase">
                    Auth Challenge
                </span>

                <span class="block font-bold">
                    {{Profile.challenge}}
                </span>
            </section>
        </div>
    </main>
</template>

<script setup>
/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const Wallet = useWalletStore()

let web3Address = ref(null)

/* Import components. */
import Account from './account'
import Activity from './activity'
import General from './general'
// import Notes from './notes'
// import Transfer from './transfer'


/**
 * Initialization
 */
const init = async () => {
    /* Request causes nickname. */
    const profileInfo = {}
    console.log('CAUSES CASH (profileInfo):', profileInfo)

    /* Validate about. */
    if (profileInfo?.about) {
        /* Set about. */
        // this.$store.dispatch('setProfileAbout', profileInfo.about)
    }

    /* Validate avatar. */
    if (profileInfo?.avatar) {
        /* Set avatar. */
        // this.$store.dispatch('setProfileAvatar', profileInfo.avatar)
    }

    /* Validate homepage. */
    if (profileInfo?.homepage) {
        /* Set homepage. */
        // this.$store.dispatch('setProfileHomepage', profileInfo.homepage)
    }

    /* Validate nickname. */
    if (profileInfo?.nickname) {
        /* Set nickname. */
        // this.$store.dispatch('setProfileNickname', profileInfo.nickname)
    }

    /* Validate tagline. */
    if (profileInfo?.tagline) {
        /* Set tagline. */
        // this.$store.dispatch('setProfileTagline', profileInfo.tagline)
    }
}

const destroyWallet = () => {
    if (confirm(`Are you sure you want to do that?`)) {
        Wallet.destroy()
    }
}
</script>

<template>
    <main class="relative min-h-screen bg-gray-100">
        <section class="py-10">
            <Account />

            <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div class="space-y-6 lg:col-start-1 lg:col-span-2">
                    <General :web3Address="web3Address" />

                    <!-- <Notes /> -->
                </div>

                <div class="space-y-8">
                    <div class="-mt-40 px-3 py-3 bg-gradient-to-b from-green-400 to-green-600 rounded-2xl border border-green-700 shadow">
                        <!-- <Activity /> -->
                        <ProfileWallet />
                    </div>

                    <!-- <pre class="bg-rose-500">Session - {{ Profile.session }}</pre> -->

                    <!-- <pre class="bg-yellow-500">Mnemonic - {{ Wallet.mnemonic }}</pre> -->

                    <!-- <pre class="bg-sky-500">Address - {{ Wallet.address }}</pre> -->

                    <button @click="destroyWallet" class="px-5 py-2 text-2xl text-red-50 font-medium bg-red-500 border-2 border-red-700 rounded-lg">
                        Destroy Wallet
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>

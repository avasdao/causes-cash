<script setup>
/* Import modules. */
import { ref } from 'vue'

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'

/* Initialize Profile. */
const Profile = useProfileStore()

let web3Address = ref(null)

/* Import components. */
import Account from './Profile/Account'
import Activity from './Profile/Activity'
import General from './Profile/General'
import Notes from './Profile/Notes'


/**
 * Initialization
 */
const init = async () => {
    /* Request causes nickname. */
    const profileInfo = {}
    console.log('CAUSES CASH (profileInfo):', profileInfo)

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
}

// init()
</script>

<template>
    <main class="relative min-h-screen bg-gray-100">
        <section class="py-10">
            <Account />

            <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div class="space-y-6 lg:col-start-1 lg:col-span-2">
                    <General :web3Address="web3Address" />

                    <Notes />
                </div>

                <div class="space-y-8">
                    <Activity />

                    <pre class="bg-rose-500">{{ Profile.session }}</pre>

                    <pre class="bg-yellow-500">{{ Profile._entropy }}</pre>

                    <p class="p-3 bg-green-500 font-mono">
                        {{ Profile.mnemonic }}
                    </p>

                    <button @click="Profile.createWallet()" class="px-3 py-1 bg-sky-500 rounded-lg">
                        Create Wallet
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>

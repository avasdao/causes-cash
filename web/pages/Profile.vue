<script setup>
/* Import modules. */
import { ethers } from 'ethers'
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

                <div>
                    <Activity />

                    other stuff
                    <pre>{{ Profile.session }}</pre>
                </div>
            </div>
        </section>
    </main>
</template>

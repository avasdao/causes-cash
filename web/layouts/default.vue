<script setup lang="ts">
useHead({
    title: 'Causes Cash — Uncensorable Funding For Radical Creators',
    meta: [
        { name: 'description', content: 'An uncensorable funding platform for radical creators and unstoppable service providers.' }
    ],
})

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
import { useWalletStore } from '@/stores/wallet'
const Profile = useProfileStore()
const System = useSystemStore()
const Wallet = useWalletStore()

onBeforeMount(() => {
    try {
        Profile.$state = JSON.parse(localStorage.getItem('profile'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        System.$state = JSON.parse(localStorage.getItem('system'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        Wallet.$state = JSON.parse(localStorage.getItem('wallet'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })
    } catch (err) {
        console.error(err)
    }
})

watch([Profile.$state, System.$state, Wallet.$state], (_state) => {
    localStorage.setItem('profile',
        JSON.stringify(_state[0], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('system',
        JSON.stringify(_state[1], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('wallet',
        JSON.stringify(_state[2], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )
})

onMounted(() => {
    /* Initailize system. */
    System.init()

    /* Initialize wallet. */
    Wallet.init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="w-screen overflow-x-hidden">
        <Header />

        <section class="max-w-7xl mx-auto py-3">
            <slot />
        </section>

        <Footer />
    </main>
</template>

<style>
/* global window */
body::-webkit-scrollbar {
    /* display: none; */
    width: 4px;
    height: 8px;
    background-color: #00A774; /* or add it to the track */
}
body::-webkit-scrollbar-thumb {
    background: #8dc351;
}
body {
    overflow-x: hidden; /* hide horizontal scrollbar */
}
</style>

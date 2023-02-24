<script setup lang="ts">
useHead({
    title: 'Causes Cash — Uncensorable Funding For Radical Creators',
    meta: [
        { name: 'description', content: 'An uncensorable funding platform for radical creators and unstoppable service providers.' }
    ],
    // ogTitle: 'APECS — Crypto Creators HQ',

    // description: 'An uncensorable, multi-chain platform for P2P electronic cash Creators to do what they need to do.',
    // ogDescription: 'An uncensorable, multi-chain platform for P2P electronic cash Creators to do what they need to do.',

    // ogImage: 'https://apecs.dev/poster.jpg',
    // twitterCard: 'summary_large_image',

    // <meta name="theme-color" content="#cff09e">
    //
    // <!-- Open graph -->
    // <meta property="og:url" content="https://causes.cash" />
    // <meta property="og:title" content="Causes Cash">
    // <meta property="og:type" content="website">
    // <meta property="og:description" content="An uncensorable funding platform for radical creators and unstoppable service providers.">
    // <meta property="og:image" content="https://causes.cash/poster.jpg?1580211230">
    //
    // <!-- Twitter -->
    // <meta name="twitter:card" content="summary_large_image">
    // <meta name="twitter:title" content="Causes Cash">
    // <meta name="twitter:description" content="An uncensorable funding platform for radical creators and unstoppable service providers.">
    // <meta name="twitter:image" content="https://causes.cash/poster.jpg?1580211230">
})
</script>

<template>
    <main class="w-screen overflow-x-hidden">
        <Header />

        <slot />
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

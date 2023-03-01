<script setup lang="ts">
useHead({
    title: 'Causes Cash — Uncensorable Funding For Radical Creators',
    meta: [
        { name: 'description', content: 'An uncensorable funding platform for radical creators and unstoppable service providers.' }
    ],
})
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

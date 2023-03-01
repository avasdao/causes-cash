// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            title: 'Causes Cash — Uncensorable Funding For Radical Creators',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'An uncensorable funding platform for radical creators and unstoppable service providers.' },
                { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
            script: [
                { src: '/js/matomo.js' },
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
        },
    },

    /* Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],

    /* Pinia Storage */
    piniaPersistedstate: {
        storage: 'localStorage', // NOTE: Default is cookies.
    },
})

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

    /* Progressive Web Application Settings */
    pwa: {
        manifest: {
            name: 'Causes Cash — Uncensorable Funding For Radical Creators',
            short_name: 'Causes Cash',
            description: `An uncensorable funding platform for radical creators and unstoppable service providers.`,
            // lang: 'en',
            // useWebmanifestExtension: false,
        },
        meta: {
            name: 'Causes Cash — Uncensorable Funding For Radical Creators',
            description: `An uncensorable funding platform for radical creators and unstoppable service providers.`,
            author: `Causes Cash DAO`,
        },
        // icon: false, // disables the icon module
        workbox: {
            // workboxURL: 'TBD',
            // enabled: true, // FOR DEV PURPOSES ONLY
        },
    },

    /* Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',

        /* Internationalization for Nuxt */
        '@nuxtjs/i18n',

        /* Progressive Web Application */
        '@kevinmarrec/nuxt-pwa',
    ],

    /* Plugins */
    plugins: [
        // { src: '@/plugins/bugsnag', ssr: false }
    ],

    /* Runtime Configuration */
    runtimeConfig: {
        public: {
            /* Networks */
            MAINNET: process.env.MAINNET,
            TESTNET: process.env.TESTNET,
            REGTEST: process.env.REGTEST,

            /* Data Source */
            ROSTRUM: process.env.ROSTRUM,

            /* Mnemonic */
            MNEMONIC: process.env.MNEMONIC,

            /* Private Keys (The 3 Nexicans) */
            ALICE_WIF: process.env.ALICE_WIF,
            BOB_WIF: process.env.BOB_WIF,
            CHARLIE_WIF: process.env.CHARLIE_WIF,

            /* Assets / Tokens (The 3 Nexicans) */
            ALICE_TOKENID_HEX: process.env.ALICE_TOKENID_HEX,
            BOB_TOKENID_HEX: process.env.BOB_TOKENID_HEX,
            CHARLIE_TOKENID_HEX: process.env.CHARLIE_TOKENID_HEX,
        }
    },

    /* Route Rules */
    routeRules: {
        /* Add CORS headers to root. */
        // NOTE: We need this to make <token>.json files available to web apps.
        '/**': { cors: true },
    },

    /* Set compatibility date. */
    compatibilityDate: '2024-09-16',
})

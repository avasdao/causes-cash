/* Import modules. */
import { defineStore } from 'pinia'
import { ethers } from 'ethers'

/**
 * System Store
 */
export const useSystemStore = defineStore('system', {
    state: () => ({
        /* Initialize description. */
        // _description: null,
        // _description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        // TBD

        sponsors: 'Our beloved sponsors',

        // banner: 'https://i.ibb.co/cF9kbVT/causes-for-nexa.jpg',

        // currency: 'NEXA',

        /* Set constants. */
        ONE_BITCOIN: 100000000,
        ONE_SMART_BITCOIN: BigInt('1000000000000000000'),

        /* Initialize notifications. */
        notif: {
            isShowing: false,
            icon: null,
            title: null,
            description: null,
            delay: 7000,
        },

        /* Initialize network. */
        // NOTE: Current available options are `mainnet` and `testnet`.
        network: null,

        /* Initialize provider. */
        provider: null,

        /* Initialize block number. */
        blockNum: 0,

        /* Initialize seed phrase. */
        // NOTE: This value is persisted in the browser's Local Storage.
        seed: null,

        /* Initialize currency. */
        currency: null,

        /* USD price. */
        usd: null,

        /* Campaign ID. */
        // NOTE: This is the contract address.
        campaignid: null,

        /* Set amount funded. */
        // amountFunded: 1.337,

        /* Initialize amount requested. */
        amountRequested: 30,

        /* Initialize category. */
        category: null,

        /* Initialize domain. */
        domain: null,

        /* Initialize title. */
        title: null,

        /* Initialize summary. */
        summary: null,

        /* Initialize description. */
        description: null,

        /* Initialize banner. */
        banner: null,

        /* Initialize highlights. */
        highlights: null,

        /* Initialize funding goal. */
        fundingGoal: null,

        /* Initialize starting time. */
        starting: null,

        /* Initialize expiration time. */
        expiration: null,

        /* Initialize publishing flag. */
        isPublished: null,

        /* Initialize (profile) about. */
        profileAbout: null,

        /* Initialize (profile) about. */
        profileAvatar: null,

        /* Initialize (profile) homepage. */
        profileHomepage: null,

        /* Initialize (profile) nickname. */
        profileNickname: null,

        /* Initialize (profile) tagline. */
        profileTagline: null,



        adDisplay: null,

        /**
         * Application Starts
         */
        appStarts: 0,

        /**
         * Application Version
         */
        appVersion: null,

        /**
         * Assets (Sources)
         *
         * An object, used to retrieve the address / location of
         * our latest assets from our IPFS storage.
         */
        assets: null,

        /**
         * Authorization Hashes
         *
         * During sign in, we compute a SHA1 hash from the provided credentials.
         * In the case of a first-time use of supplied credentials, we will notify
         * the user and request confirmation.
         */
        authHashes: null,

        campaignDisplay: null,

        currentPage: null,

        /**
         * Flags
         *
         * 1. Dark mode
         * 2. Unconfirmed transactions
         */
        flags: null,

        /**
         * Header Photo
         */
        headerPhoto: null,

        // TODO
        inbox: null,

        /**
         * Locale
         *
         * Controls the localization language.
         * (default is english)
         */
        locale: null,

        /**
         * Notices
         *
         * System notices that nag/remind the user of some important action or
         * information; which can be permanently disabled ("Do Not Show Again")
         * via checkbox and confirmation.
         *
         * NOTE: Unique 1-byte (hex) codes (up to 255) are used to reduce the size
         *       of this storage field.
         */
        notices: null,

        // TODO
        outbox: null,

        pifDisplay: null,

        profileDisplay: null,

        /**
         * Schema Version
         *
         * v1: Alpha (Preview) Edition
         */
        schemaVersion: 1,

        sheetVisibility: false,

        titleVisibility: true,
    }),

    getters: {
//
    },

    actions: {
        // async initSession () {
        //     console.log('INIT SESSION (before):', this._session)
        //     /* Check for existing session. */
        //     if (this._session) {
        //         return this._session
        //     }

        //     /* Request new session. */
        //     const session = await $fetch('/api/newSession')
        //     console.log('INIT SESSION (after fetch):', session)

        //     /* Set session. */
        //     this._setSession(session)

        //     /* Return session. */
        //     return session
        // },

        deleteSession() {
            /* Set session. */
            this._setSession(null)
        },

        saveDescription(_description) {
            /* Set description. */
            this._description = _description
        },

        /**
         * Set Session
         *
         * @param {Object} _session Save session details.
         */
        _setSession (_session) {
            /* Set session. */
            this._session = _session
            console.log('SET SESSION', this._session)
        },



        // FIXME: TEMPORARY -- Move to ACTIONS
        setTitleVisibility(state, _isShowing) {
            state.titleVisibility = _isShowing
        },
        setSheetVisibility(state, _isShowing) {
            // console.log('SETTING SHEET', _isShowing);
            if (typeof _isShowing !== 'undefined') {
                state.sheetVisibility = _isShowing
            } else {
                state.sheetVisibility = !state.sheetVisibility
            }
        },
        showAd(state, _adid) {
            // console.log('SHOWING AD', _adid)
            state.adDisplay = _adid
        },
        showCampaign(state, _campaignid) {
            // console.log('SHOWING CAMPAIGN', _campaignid)
            state.campaignDisplay = _campaignid
        },
        showPIF(state, _campaignid) {
            // console.log('SHOWING PIF', _campaignid)
            state.pifDisplay = _campaignid
        },
        showProfile(state, _showing) {
            // console.log('SHOWING PROFILE', _showing)

            state.profileDisplay = _showing
        },

    },
    persist: true,
})

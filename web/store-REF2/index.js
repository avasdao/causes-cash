import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { ethers } from 'ethers'

import getCategoryById from './modules/utils/getters/getCategoryDisplay'

const dataState = createPersistedState({
    paths: [
        'currency',
        'seed',
    ]
})

export default createStore({
    state: {
        /* Set constants. */
        ONE_BITCOIN: 100000000,
        ONE_SMART_BITCOIN: ethers.BigNumber.from(1000000000000000000n),
        HOP_WALLET_PRIME: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140',
        CASH_FORK_ID: new Uint8Array([ 0, 0, 0 ]),

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

    },
    getters: {
        /**
         * (Blockchain Network) Provider
         *
         * Provides the currently active blockchain network provider.
         */
        getProvider(_state) {
            /* Validate network. */
            if (_state.network === 'mainnet') {
                // return 'https://smartbch.devops.cash/mainnet'
                return 'https://smartbch.fountainhead.cash/mainnet'
            } else if (_state.network === 'testnet') {
                // return 'https://smartbch.devops.cash/testnet'
                return 'https://moeing.tech:9545'
            }

            return null
        },

        /**
         * Causes ABI
         *
         * Provides the ABI for the Causes contract.
         */
        getCausesAbi() {
            return require('../../contracts/Causes.json')
        },

        /**
         * Causes Address
         *
         * Provides the address for the Causes contract.
         */
        getCausesAddr() {
            return '0x708387b3aFdd5Dd72e0Fb9354250dCBC7D4525aC'
            /* Validate network. */
            // if (_state.network === 'mainnet') {
            //     return '0x0'
            // } else if (_state.network === 'testnet') {
            //     return '0x265B91F822438Fa6d6042E2d0f0DE9f6e63eEe81'
            // }
            //
            // return null
        },

        /**
         * Campaign ABI
         *
         * Provides the ABI for the Campaign contract.
         */
        getCampaignAbi() {
            return require('../../contracts/CampaignV1.json')
        },

        /**
         * Bytecode
         *
         * Provides the Bytecode for the Campaign contract.
         */
        getBytecode() {
            return require('../../contracts/Campaign.bin.js')
        },

        getCategoryById,

    },
    actions: {
        /* Initialize blockchain. */
        initBlockchain({ state, commit, getters }) {
            require('./initBlockchain')(state, commit, getters)
        },

        /* Initialize campaign. */
        initCampaign({ state, commit, getters, dispatch }) {
            require('./initCampaign')(state, commit, getters, dispatch)
        },

        /* Initialize Web3. */
        initWeb3({ commit }) {
            require('./initWeb3')(commit)
        },

        /* Set network. */
        setNetwork({ commit }, _network) {
            commit('saveNetwork', _network)
        },

        /* Set provider. */
        setProvider({ commit }, _provider) {
            commit('saveProvider', _provider)
        },

        /* Set block number. */
        setBlockNum({ commit }, _blockNum) {
            commit('saveBlockNum', _blockNum)
        },

        /* Set seed phrase. */
        setSeed({ commit }, _seed) {
            commit('saveSeed', _seed)
        },

        /* Set campaign id. */
        setCampaignid({ commit }, _campaignid) {
            commit('saveCampaignid', _campaignid)
        },

        /* Show notification. */
        showNotif({ state, commit }, _pkg) {
            // console.log('SHOW NOTIF', _pkg);

            /* Enable showing flag. */
            _pkg.isShowing = true

            /* Save the notification package. */
            commit('saveNotif', _pkg)

            /* Set timeout to close/reset. */
            setTimeout(() => {
                /* Commit notification. */
                commit('saveNotif', {
                    isShowing: false,
                    icon: null,
                    title: null,
                    message: null,
                })
            }, state.notif.delay)
        },

        /* Set currency. */
        setCurrency({ commit }, _currency) {
            commit('saveCurrency', _currency)
        },

        /* Set (profile) about. */
        setProfileAbout({ commit }, _about) {
            commit('saveProfileAbout', _about)
        },

        /* Set (profile) avatar. */
        setProfileAvatar({ commit }, _avatar) {
            commit('saveProfileAvatar', _avatar)
        },

        /* Set (profile) homepage. */
        setProfileHomepage({ commit }, _homepage) {
            commit('saveProfileHomepage', _homepage)
        },

        /* Set (profile) nickname. */
        setProfileNickname({ commit }, _nickname) {
            commit('saveProfileNickname', _nickname)
        },

        /* Set (profile) tagline. */
        setProfileTagline({ commit }, _tagline) {
            commit('saveProfileTagline', _tagline)
        },

        /**
         * Request Contract Address
         *
         * Will use the current domain to retrieve the campaign address
         * from the stored on-chain log data.
         */
        requestContractAddr() {

            return 'working on this NOW...'

            // return null
        },

    },
    mutations: {
        /* Save network. */
        saveNetwork(_state, _network) {
            _state.network = _network
        },

        /* Save provider. */
        saveProvider(_state, _provider) {
            _state.provider = _provider
        },

        /* Save block number. */
        saveBlockNum(_state, _blockNum) {
            _state.blockNum = _blockNum
        },

        /* Save seed phrase. */
        saveSeed(_state, _seed) {
            _state.seed = _seed
        },

        /* Save USD. */
        saveUsd(_state, _usd) {
            _state.usd = _usd
        },

        /* Save notification. */
        saveNotif(_state, _pkg) {
            // console.log('ACTIONS (pkg):', _pkg);

            /* Set showing flag. */
            const isShowing = _pkg.isShowing

            /* Set icon. */
            const icon = _pkg.icon

            /* Set title. */
            const title = _pkg.title

            /* Set message. */
            const message = _pkg.message

            /* Retrieve delay. */
            const delay = _state.notif.delay

            /* Set notification. */
            _state.notif = {
                isShowing,
                icon,
                title,
                message,
                delay,
            }
        },

        /* Save currency. */
        saveCurrency(_state, _currency) {
            _state.currency = _currency
        },

        /* Save campaign id. */
        saveCampaignid(_state, _campaignid) {
            _state.campaignid = _campaignid
        },

        /* Save category. */
        saveCategory(_state, _category) {
            _state.category = _category
        },

        /* Save domain. */
        saveDomain(_state, _domain) {
            _state.domain = _domain
        },

        /* Save title. */
        saveTitle(_state, _title) {
            _state.title = _title
        },

        /* Save summary. */
        saveSummary(_state, _summary) {
            _state.summary = _summary
        },

        /* Save description. */
        saveDescription(_state, _description) {
            _state.description = _description
        },

        /* Save banner. */
        saveBanner(_state, _banner) {
            _state.banner = _banner
        },

        /* Save highlights. */
        saveHighlights(_state, _highlights) {
            _state.highlights = _highlights
        },

        /* Save publishing flag. */
        saveIsPublished(_state, _isPublished) {
            _state.isPublished = _isPublished
        },

        /* Save funding goal. */
        saveFundingGoal(_state, _fundingGoal) {
            _state.fundingGoal = _fundingGoal
        },

        /* Save starting time. */
        saveStarting(_state, _starting) {
            _state.starting = _starting
        },

        /* Save expiration time. */
        saveExpiration(_state, _expiration) {
            _state.expiration = _expiration
        },

        /* Save (profile) about. */
        saveProfileAbout(_state, _about) {
            _state.profileAbout = _about
        },

        /* Save (profile) avatar. */
        saveProfileAvatar(_state, _avatar) {
            _state.profileAvatar = _avatar
        },

        /* Save (profile) homepage. */
        saveProfileHomepage(_state, _homepage) {
            _state.profileHomepage = _homepage
        },

        /* Save (profile) nickname. */
        saveProfileNickname(_state, _nickname) {
            _state.profileNickname = _nickname
        },

        /* Save (profile) tagline. */
        saveProfileTagline(_state, _tagline) {
            _state.profileTagline = _tagline
        },

    },
    modules: {
        //
    },
    plugins: [dataState],
})

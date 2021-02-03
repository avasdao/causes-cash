/* Import modules (getters). */
import getAdDisplay from './system/getters/getAdDisplay'
import getApiProvider from './system/getters/getApiProvider'
import getAssetSource from './system/getters/getAssetSource'
import getCampaignDisplay from './system/getters/getCampaignDisplay'
import getCurrentPage from './system/getters/getCurrentPage'
import getEternalDbAddr from './system/getters/getEternalDbAddr'
import getFlags from './system/getters/getFlags'
import getHeaderPhoto from './system/getters/getHeaderPhoto'
import getHelp from './system/getters/getHelp'
import getInbox from './system/getters/getInbox'
import getLocale from './system/getters/getLocale'
import getOutbox from './system/getters/getOutbox'
import getPIFDisplay from './system/getters/getPIFDisplay'
import getProfileDisplay from './system/getters/getProfileDisplay'
import getSheetVisibility from './system/getters/getSheetVisibility'
import getTitleVisibility from './system/getters/getTitleVisibility'

/* Import modules (actions). */
import updateAssetSource from './system/actions/updateAssetSource'
import updateCurrentPage from './system/actions/updateCurrentPage'
import updateFlags from './system/actions/updateFlags'
import updateLocale from './system/actions/updateLocale'

/* Import modules (mutations). */
import setAppStarts from './system/mutations/setAppStarts'
import setAssetSource from './system/mutations/setAssetSource'
import setCurrentPage from './system/mutations/setCurrentPage'
import setFlags from './system/mutations/setFlags'
import setHeaderPhoto from './system/mutations/setHeaderPhoto'
import setInbox from './system/mutations/setInbox'
import setLocale from './system/mutations/setLocale'
import setOutbox from './system/mutations/setOutbox'

/* Initialize state. */
const state = {
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
}

/* Getters. */
const getters = {
    getAdDisplay,
    getApiProvider,
    getAssetSource,
    getCampaignDisplay,
    getCurrentPage,
    getEternalDbAddr,
    getFlags,
    getHeaderPhoto,
    getHelp,
    getInbox,
    getLocale,
    getOutbox,
    getPIFDisplay,
    getProfileDisplay,
    getSheetVisibility,
    getTitleVisibility,
}

/* Actions. */
const actions = {
    updateAssetSource,
    updateCurrentPage,
    updateFlags,
    updateLocale,
}

/* Mutations. */
const mutations = {
    setAppStarts,
    setAssetSource,
    setCurrentPage,
    setFlags,
    setHeaderPhoto,
    setInbox,
    setLocale,
    setOutbox,

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
}

/* Export. */
// NOTE: We DO NOT namespace here to allow for global use of `dispatch`.
export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}

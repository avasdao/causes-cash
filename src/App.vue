<template>
    <v-app class="viewport">
        <v-app-bar
            app
            color="#2f4858"
            dark
            dense
            :src="getHeaderPhoto"
            :fade-img-on-scroll="getTitleVisibility"
            hide-on-scroll
            transition="fade-transition"
        >
            <template v-slot:extension v-if="getTitleVisibility">
                <v-icon class="mr-2" v-text="displayIcon"></v-icon>
                {{displayTitle}}
            </template>

            <div class="d-flex" v-if="getTitleVisibility">
                <v-img
                alt="Causes Cash Logo"
                class="shrink mr-2"
                contain
                :src="require('@/assets/logo.png')"
                transition="scale-transition"
                width="15"
                />
                <h3 class="d-inline-flex header-title">Causes <span class="ml-1 cash-text">Cash</span></h3>
            </div>

            <v-spacer></v-spacer>

            <v-btn icon @click="loadSearch">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon @click="loadProfile">
                <v-icon>mdi-face-profile</v-icon>
            </v-btn>

            <v-btn icon @click="toggleMenu">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main :style="{ backgroundColor: bgColor }">
            <router-view />
        </v-main>

        <v-bottom-navigation
            app
            :value="selectedNavTab"
            color="teal"
            grow
        >
            <v-btn class="btn-navbar" @click="loadDiscover">
                <span>Discover</span>

                <v-icon>mdi-compass</v-icon>
            </v-btn>

            <v-btn class="btn-navbar" @click="loadEvents">
                <span>Events</span>

                <v-icon>mdi-calendar-clock</v-icon>

                <!-- <v-badge
                    color="pink"
                    content="10+"
                ></v-badge> -->
            </v-btn>
        </v-bottom-navigation>

        <v-bottom-sheet v-model="sheetHandler" :persistent="isPersistent">
            <MainMenu v-if="1 == 1" @selected="_handleSheet" />
            <UnderConstruction v-if="1 == 2" />
        </v-bottom-sheet>

        <AdDialog
            v-if="adDialog"
            :isOpen="adDialog"
            @close="closeAd()"
        />

        <CampaignDialog
            v-if="campaignDialog"
            :campaignid="campaignDialog"
            @close="closeCampaign"
        />

        <CreateDialog
            v-if="createDialog"
            :isOpen="createDialog"
            @close="createDialog = false"
        />

        <FlipstarterDialog
            v-if="flipstarterDialog"
            :isOpen="flipstarterDialog"
            @close="flipstarterDialog = false"
        />

        <HelpDialog
            v-if="helpDialog"
            :isOpen="helpDialog"
            @close="helpDialog = false"
        />

        <PIFDialog
            v-if="pifDialog"
            :isOpen="pifDialog"
            @close="pifDialog = false; $store.commit('showPIF', null)"
        />

        <ProfileDialog
            v-if="profileDialog"
            :isOpen="profileDialog"
            @close="closeProfile()"
        />

        <SearchDialog
            v-if="searchDialog"
            :isOpen="searchDialog"
            @close="searchDialog = false"
        />

    </v-app>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import dialogs. */
import AdDialog from '@/components/dialogs/Ad'
import CampaignDialog from '@/components/dialogs/Campaign'
import CreateDialog from '@/components/dialogs/Create'
import FlipstarterDialog from '@/components/dialogs/Flipstarter'
import HelpDialog from '@/components/dialogs/Help'
import PIFDialog from '@/components/dialogs/PIF'
import ProfileDialog from '@/components/dialogs/Profile'
import SearchDialog from '@/components/dialogs/Search'

/* Import sheets. */
import MainMenu from '@/components/sheets/MainMenu'
import UnderConstruction from '@/components/sheets/UnderConstruction'

export default {
    components: {
        AdDialog,
        CampaignDialog,
        CreateDialog,
        FlipstarterDialog,
        HelpDialog,
        PIFDialog,
        ProfileDialog,
        SearchDialog,

        MainMenu,
        // SelectCampaign,
        UnderConstruction,
    },
    data: () => ({
        isShowingDiscover: null,
        isShowingEvents: null,

        isPersistent: null,
        sheetHandler: null,

        // crumbs: null,

        // toggle_multiple: [0, 1, 2],
        adDialog: false,
        campaignDialog: false,
        createDialog: false,
        flipstarterDialog: false,
        helpDialog: false,
        pifDialog: false,
        profileDialog: false,
        searchDialog: false,

        bgColor: null,

    }),
    watch: {
        getSheetVisibility: function (_isShowing) {
            // console.log('SHEET SHOWING CHANGED', _isShowing)

            if (typeof _isShowing !== 'undefined') {
                /* Update local handler. */
                this.sheetHandler = _isShowing
            }
        },

        sheetHandler: function (_isShowing) {
            // console.log('SHEET HANDLER CHANGED', _isShowing)

            if (typeof _isShowing !== 'undefined') {
                /* Toggle sheet flag. */
                this.$store.commit('setSheetVisibility', _isShowing)
            }
        },

        getAdDisplay: function (_adid) {
            // console.log('AD DISPLAY CHANGED', _adid)

            if (_adid !== null) {
                this.adDialog = !this.adDialog
            }
        },

        getCampaignDisplay: function (_campaignid) {
            // console.log('CAMPAIGN DISPLAY CHANGED', _campaignid)
            this.campaignDialog = _campaignid
        },

        getPIFDisplay: function (_campaignid) {
            // console.log('PIF DISPLAY CHANGED', _campaignid)

            if (_campaignid !== null) {
                this.pifDialog = !this.pifDialog
            }
        },

        getProfileDisplay: function (_showing) {
            // console.log('PROFILE DISPLAY CHANGED', _showing)

            this.profileDialog = _showing
        },

    },
    computed: {
        ...mapGetters([
            'getAdDisplay',
            'getCampaignDisplay',
            'getCurrentPage',
            'getHeaderPhoto',
            'getPIFDisplay',
            'getProfileDisplay',
            'getSheetVisibility',
            'getTitleVisibility',
        ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),

        selectedNavTab() {
            switch(this.getCurrentPage) {
            case 'discover':
                return 1
            case 'events':
                return 0
            case 'influence':
                return 2
            default:
                return 1
            }
        },

        displayIcon() {
            switch(this.getCurrentPage) {
            case 'about':
                return 'mdi-account-voice'
            case 'create':
                return 'mdi-account-voice'
            case 'details':
                return 'mdi-account-voice'
            case 'discover':
                return 'mdi-compass'
            case 'events':
                return 'mdi-calendar-clock'
            case 'influence':
                return 'mdi-account-voice'
            case 'help':
                return 'mdi-help-circle'
            case 'pif':
                return 'mdi-gift'
            case 'treasury':
                return 'mdi-piggy-bank'
            default:
                return 'Unknown Page'
            }
        },

        displayTitle() {
            switch(this.getCurrentPage) {
            case 'about':
                return 'About Causes Cash'
            case 'create':
                return 'Create a Campaign'
            case 'details':
                return 'Campaign Details'
            case 'discover':
                return 'Discover'
            case 'events':
                return 'Events'
            case 'help':
                return 'Help & Support'
            default:
                return 'Unknown Page'
            }
        },
    },
    methods: {
        ...mapActions([
            'updateFlags',
            'updateLocale',
        ]),

        ...mapActions('utils', [
            'toast',
        ]),

        /**
         * Initialize Application
         */
        initApp() {
            /* Initialize flags. */
            if (!this.getFlags) {
                this.updateFlags({
                    darkMode: false,
                    unconfirmed: true,
                })
            }

            /* Initialize locale. */
            if (!this.getLocale) {
                this.updateLocale('en-US')
            }
        },

        closeAd() {
            this.adDialog = false
            this.$store.commit('showAd', null)
        },

        closeCampaign() {
            this.campaignDialog = null
            this.$store.commit('showCampaign', null)
        },

        closePIF() {

        },

        closeProfile() {
            this.profileDialog = false
            this.$store.commit('showProfile', false)
        },

        /**
         * Toggle Menu
         */
        toggleMenu() {
            // console.log('toggle menu');
            /* Toggle sheet flag. */
            this.$store.commit('setSheetVisibility')
        },

        /**
         * Handle Sheet
         */
        _handleSheet(_selection) {
            // console.log('Sheet selection', _selection)

            switch(_selection) {
            case 'create':
                this.createDialog = !this.createDialog

                /* Set auto-hide nav flag. */
                // this.$store.commit('setHeaderPhoto', require('@/assets/headers/discover.jpg'))

                /* Validate path. */
                // if (this.$route.path !== '/create') {
                //     this.$router.push('/create')
                // }

                // this.$store.commit('setCurrentPage', 'create')
                break
            case 'flipstarter':
                this.flipstarterDialog = !this.flipstarterDialog
                break
            case 'help':
                this.toast(['Oops!', 'This feature is under development...', 'error'])
                // this.helpDialog = !this.helpDialog
                break
            }

            /* Set sheet flag. */
            this.$store.commit('setSheetVisibility', false)
        },

        loadDiscover() {
            /* Set auto-hide nav flag. */
            this.$store.commit('setTitleVisibility', true)
            this.$store.commit('setHeaderPhoto', require('@/assets/headers/discover.jpg'))

            /* Validate path. */
            if (this.$route.path !== '/discover') {
                this.$router.push('/discover')
            }

            this.$store.commit('setCurrentPage', 'discover')
        },

        loadEvents() {
            /* Set auto-hide nav flag. */
            this.$store.commit('setTitleVisibility', true)
            this.$store.commit('setHeaderPhoto', require('@/assets/headers/events.jpg'))

            /* Validate path. */
            if (this.$route.path !== '/events') {
                this.$router.push('/events')
            }

            // goTo(0)

            this.$store.commit('setCurrentPage', 'events')
        },

        loadProfile() {
            // this.profileDialog = !this.profileDialog
            this.profileDialog = true
        },

        loadSearch() {
            this.searchDialog = !this.searchDialog
        },

        // loadHelp() {
        //     this.$store.commit('setTitleVisibility', true)
        //
        //     if (this.$route.path !== '/help') {
        //         this.$router.push('/help')
        //     }
        //
        //     this.$store.commit('setCurrentPage', 'help')
        //     this.$store.commit('setHeaderPhoto', require('@/assets/headers/help.jpg'))
        // }

    },
    created: function () {
        console.info('Initializing application...') // eslint-disable-line no-console

        /* Initialize application. */
        this.initApp()

        /* Initialize current navigation tab. */
        this.$store.commit('setCurrentPage', 'discover')
        this.$store.commit('setHeaderPhoto', require('@/assets/headers/discover.jpg')) // Discover

        /* Initialize Discover. */
        this.isShowingDiscover = true

        /* Initialize sheet persistence. */
        this.isPersistent = false

        this.bgColor = 'rgba(170, 204, 170, 0.9)'
    },
    mounted: function () {
        //
    },
}
</script>

<style>
.viewport {
    max-width: 480px;
    margin: 0 auto;
}

.header-title {
    font-size: 1.1em;
}

.need-help {
    display: flex;
    justify-content: flex-end;
    /* padding: 5px 8px 2px 0; */
}
.need-help .v-btn__content {
    margin-top: -5px;
    margin-right: -7px;

    font-size: 0.8em;
    font-weight: 500;
    text-decoration: none;
    color: rgba(180, 30, 30, 0.4);
}

.btn-navbar {
    /* border: 1pt solid purple; */
    /* padding: 10px !important; */
    height: 56px !important;
}

.app-buttons {
    margin-top: 7px !important;
    margin-right: -8px;
}

.fab {
    bottom: 100px !important;
}

.cash-text {
    color: rgba(141, 195, 81, 1.0);
}

</style>

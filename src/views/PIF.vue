<template>
    <main>
        <v-container>
            <!-- <h3>Pay It Forward (PIF) introduces a merit-based, community fund for BUIDLers.</h3> -->

            <!-- <p class="my-3">
                The SLP token (PIF) will serve for governance of the community fund.
            </p> -->

            <v-alert
                class="mt-5"
                v-model="showAlert"
                color="info"
                border="left"
                elevation="2"
                colored-border
                icon="mdi-information"
                dismissible
                dense
            >
                Daily payouts are made to the <strong>TOP100 Bitcoin projects</strong> based on votes cast <em>(tokens burned)</em> by the PIF community.
            </v-alert>

            <Spotlights class="mt-10" />

            <Pledge v-if="getNickname" class="mt-10" />

            <Favorites class="mt-10" />

            <!-- <Supporters class="mt-10" /> -->

        </v-container>

        <v-footer dark padless>
            <v-card flat tile class="indigo lighten-1 white--text">
                <v-card-text class="white--text">
                    <h3>PIF Voting</h3>

                    Supporters will send PIF to their respective project's PIF address.
                    PIF will be immediately converted to PIF-Energy <v-icon small>mdi-flash-circle</v-icon> <em>(an SLP token)</em> and burned each day <em>(in accordance to the burn rate).</em>
                </v-card-text>

                <hr class="mx-4" color="white" />

                <v-card-text class="white--text">
                    <h3>PIF Staking</h3>

                    Staking PIF is automatic.
                    Tokens will multiply each month as their UTXOs age.
                    <br />ie. 3mo PIF = 3x votes, 1yr PIF = 12x votes

                    <br /><h4 class="mt-2">Please note:</h4>
                    Daily PIF-Energy <v-icon small>mdi-flash-circle</v-icon> Burn Rate is <strong>10%</strong> for <u>In the Spotlight</u> and <strong>5%</strong> for <u>Community Favorite</u> projects.
                    This is subject to change.
                </v-card-text>

                <hr class="mx-4" color="white" />

                <v-card-text class="white--text">
                    <h3>PIF Treasury</h3>

                    Bitcoin Please will retain 30% of ALL PIF contributions received from supporters in its PIF treasury.
                    100% of PIF treasury spending will be "publicly" audited by their individual <em>(UTXO)</em> transaction ids.

                    <br /><h4 class="mt-2">Please note:</h4>
                    20% of PIF treasury funds serve for discretionary spending, for circumstances when privacy is a concern <em>(eg. stealth projects, legal, etc).</em>

                    <v-btn block large color="info" class="mt-3" @click="loadTreasury">
                        Open PIF Treasury
                    </v-btn>

                </v-card-text>

            </v-card>
        </v-footer>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import (local) components. */
import Favorites from './PIF/Favorites'
import Pledge from './PIF/Pledge'
import Spotlights from './PIF/Spotlights'
// import Supporters from './PIF/Supporters'

export default {
    components: {
        Favorites,
        Pledge,
        Spotlights,
        // Supporters,
    },
    data: () => ({
        // media: 0,
        // alarm: 0,
        // zoom: 0,

        showAlert: null,
    }),
    computed: {
        ...mapGetters('profile', [
            'getNickname',
        ]),

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        loadTreasury() {
            /* Validate path. */
            if (this.$route.path !== '/treasury') {
                this.$router.push('/treasury')
            }
        },

    },
    created: function () {
        /* Set auto-hide nav flag. */
        this.$store.commit('setHeaderPhoto', require('@/assets/headers/pif.jpg'))

        /* Set current page. */
        this.$store.commit('setCurrentPage', 'pif')

        /* Initialize alert flag. */
        this.showAlert = true

    },
    mounted: function () {
        //
    },
}
</script>

<style>
/*  */
</style>

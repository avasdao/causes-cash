<template>
    <v-dialog
        :value="isOpen"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar
                dark
                color="#8dc351"
            >
                <v-btn
                    icon
                    dark
                    @click="$emit('close')"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>Help & Support</v-toolbar-title>

                <!-- <v-spacer></v-spacer> -->

                <!-- <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        @click="$emit('close')"
                    >
                        Close
                    </v-btn>
                </v-toolbar-items> -->
            </v-toolbar>

            <v-container>
                <p>
                    Te ex efflorescere, magna illustriora mentitum legam vidisse. Probant
                    domesticarum quo incurreret do qui fugiat officia consectetur. Id fabulas
                    praetermissum.
                </p>

                <v-btn large block color="info" class="my-3" @click="loadAbout">
                    More about Causes Cash
                </v-btn>

                <p>
                    Eiusmod noster noster quibusdam enim.Excepteur quid esse
                    voluptate tempor, iis consequat sed ullamco. Non de philosophari, quem de
                    quamquam ut te anim despicationes ita admodum in quid. Senserit de ullamco, ne
                    fore exercitation, commodo elit tempor ex quorum, nisi arbitror mandaremus e
                    elit quibusdam se consectetur, amet fabulas litteris, aliquip eram anim nam
                    irure, excepteur ubi cillum. Officia illum offendit.
                </p>

                <h2 class="mt-10 mb-2">Frequently Asked Questions</h2>

                <v-expansion-panels focusable>
                    <v-expansion-panel key="q1">
                        <v-expansion-panel-header>
                            <h3 class="ma-1">Q1</h3> Is this a non-custodial wallet that is holding my pledged funds?
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                            <strong>Yes!</strong>
                            Your funds are always under your control 100% of the time.
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel key="q2">
                        <v-expansion-panel-header>
                            <h3 class="ma-1">Q2</h3> How do I get my pledge back to my original wallet?
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                            <strong>Yes!</strong>
                            ...
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel
                        v-for="(item,i) in 3"
                        :key="i"
                    >
                        <v-expansion-panel-header>
                            Item
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <h2 class="mt-10">Contact Us</h2>

                <footer>
                    Our team is ready to assist you 24hrs a day, whatever your needs.
                    Email us directly at <a href="mailto:support@avasdao.org">support@avasdao.org</a> or
                    <a href="https://discord.gg/2yQNsZV6EJ" target="_blank">join the Nexa Discord</a> for real-time support.
                </footer>

            </v-container>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
    },
    data: () => ({
        // isShowingOptions: null,

        notifications: false,
        sound: true,
        widgets: false,
    }),
    computed: {
        //
    },
    methods: {
        loadAbout() {
            if (this.$route.path !== '/about') {
                this.$router.push('/about')
            }

            this.$store.commit('setCurrentPage', 'about')
            this.$store.commit('setHeaderPhoto', require('@/assets/headers/about.jpg'))

        },
    },
    created: function () {
        /* Initialize advanced search options. */
        // this.isShowingOptions = false
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.advanced-search-options {
    margin-top: -5px;
    font-size: 0.8em;
}
.advanced-search-options a {
    color: rgba(255, 0, 0, 0.6);
    text-decoration: none;
}
</style>

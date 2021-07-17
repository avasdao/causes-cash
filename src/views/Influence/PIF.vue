<template>
    <v-card
        max-width="400"
        color="#2f4858"
        @click="loadPIF"
    >
        <v-card-title>
            <h3 class="white--text">Pay It Forward</h3>
        </v-card-title>

        <v-sheet
            class="mx-auto mt-n15"
            color="#8dc351"
            elevation="12"
            max-width="calc(100% - 32px)"
            rounded
        >
            <v-sparkline
                class="mt-15"
                :labels="labels"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
            ></v-sparkline>
        </v-sheet>

        <v-card-text>
            <div class="title font-weight-light mb-2 white--text text-center">
                84 Community Projects
            </div>

            <div class="subheading font-weight-light white--text text-center">
                 Payouts: <strong>$13.37</strong> yesterday | <strong>$133.37</strong> in february
            </div>

            <v-divider class="my-2"></v-divider>

            <v-row no-gutters>
                <v-col>
                    <v-icon class="mr-2" dark small>
                        mdi-clock
                    </v-icon>

                    <span class="caption white--text font-weight-light">
                        My last payout was sent <strong>6 mins ago</strong>
                    </span>
                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col>
                    <v-icon class="mr-2" dark small>
                        mdi-cash-usd
                    </v-icon>

                    <span class="caption white--text font-weight-light">
                        I've made <strong>8 payouts</strong> in the last 24hrs
                    </span>
                </v-col>
            </v-row>
        </v-card-text>

        <!-- <v-container>
            <v-btn large block color="primary">Manage My Influence</v-btn>

            <div class="text-center">
                <small class="white--text">* read disclaimer before sponsoring</small>
            </div>
        </v-container> -->
    </v-card>
</template>

<script>
/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        labels: [
        '9/10',
        '9/15',
        '9/20',
        '9/25',
        '9/30',
        '10/2',
        '10/6',
        '10/10',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
    }),
    computed: {
        // ...mapGetters([
        //     'getHelp',
        // ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),
    },
    methods: {
        loadPIF() {
            /* Set auto-hide nav flag. */
            this.$store.commit('setHeaderPhoto', require('@/assets/headers/pif.jpg'))

            /* Validate path. */
            if (this.$route.path !== '/pif') {
                this.$router.push('/pif')
            }

            this.$store.commit('setCurrentPage', 'pif')
        },
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

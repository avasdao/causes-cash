<template>
    <main>
        <v-card class="mx-auto" max-width="600" shaped color="#2f4858">
            <v-card-text>
                <h2 class="my-5 white--text">My Monthly PIF Budget</h2>

                <v-row class="mb-4" justify="space-between">
                    <v-col class="text-left">
                        <span class="subheading font-weight-light white--text mr-1">$</span>
                        <span
                            class="display-3 font-weight-light white--text"
                            v-text="displayAmountUSD"
                        ></span>

                        <span class="subheading font-weight-light white--text mr-1">.00</span>
                        <span class="subheading font-weight-light white--text mr-1">USD</span>
                    </v-col>
                </v-row>

                <v-slider
                    v-model="pledgeAmountUSD"
                    :color="color"
                    track-color="grey"
                    always-dirty
                    min="1"
                    max="10000"
                >
                    <template v-slot:prepend>
                        <v-icon
                            :color="color"
                            @click="decrement"
                        >
                            mdi-minus
                        </v-icon>
                    </template>

                    <template v-slot:append>
                        <v-icon
                            :color="color"
                            @click="increment"
                        >
                            mdi-plus
                        </v-icon>
                    </template>
                </v-slider>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="#8dc351">Min</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined>25%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined>50%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined>75%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded color="#8dc351">Max</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

            <v-container>
                <v-btn x-large block dark color="#8dc351" class="my-5" @click="makePledge">
                    Make My Pledge
                </v-btn>
            </v-container>

            <v-card-text>
                <h3 class="white--text">(Optional) Pledge Details</h3>

                <v-select
                    class="my-3"
                    v-model="userType"
                    :hint="userType.comment"
                    :items="userTypes"
                    item-text="label"
                    item-value="value"
                    label="Select a user type"
                    dark
                    return-object
                    single-line
                ></v-select>

                <v-text-field
                    class="my-3"
                    label="Your nickname or label"
                    value=""
                    hint="Enter an identity for your pledge"
                    dark
                ></v-text-field>

                <v-text-field
                    class="my-3"
                    label="Your pledge comment"
                    value=""
                    hint="NOTE: Your comment will be displayed in public"
                    dark
                ></v-text-field>

                <v-text-field
                    class="my-3"
                    label="Your web link"
                    value=""
                    hint="This will display a (http/https) link from your pledge"
                    dark
                ></v-text-field>
            </v-card-text>

            <v-card-text class="mt-n10">
                <h3 class="my-5 white--text">(Optional) SLP / Token Details</h3>

                <v-text-field
                    class="my-3"
                    label="Your SLP address"
                    value=""
                    hint="May be used to offer rewards for supporters"
                    dark
                ></v-text-field>
            </v-card-text>
        </v-card>
    </main>
</template>

<script>
/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import numeral from 'numeral'

export default {
    data: () => ({
        pledgeAmountUSD: 40,
        interval: null,
        isPlaying: false,

        userType: { label: `I'm a Bitcoin user`, value: 'user', comment: `Casual user of cryptocurrencies` },
        userTypes: [
          { label: `I'm a Bitcoin user`, value: 'user', comment: `Casual user of cryptocurrencies` },
          { label: `I'm a Bitcoin developer`, value: 'developer', comment: `BUIDLer of crypto services` },
          { label: `I'm a Bitcoin investor`, value: 'investor', comment: `Investor in crypto services` },
        ],

        currentMinerFee: null,
        totalContractOutputValue: null,
        currentCommittedSatoshis: null,
        currentContributionCount: null,

    }),
    computed: {
        // ...mapGetters([
        //     'getHelp',
        // ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),

        color () {
            if (this.pledgeAmountUSD < 50) return 'grey'
            if (this.pledgeAmountUSD < 500) return 'teal'
            if (this.pledgeAmountUSD < 5000) return 'green'
            if (this.pledgeAmountUSD < 50000) return 'orange'
            return 'red'
        },

        animationDuration () {
            return `${60 / this.pledgeAmountUSD}s`
        },

        displayAmountUSD() {
            return numeral(this.pledgeAmountUSD).format('0,0')
        },

    },
    methods: {
        decrement () {
            this.pledgeAmountUSD--
        },

        increment () {
            this.pledgeAmountUSD++
        },

        toggle () {
            this.isPlaying = !this.isPlaying
        },

        makePledge() {
            // TODO
        },

        pay() {
            // TODO
        },


    },
    created: function () {
        // this.totalContractOutputValue = ?
        // this.currentMinerFee = ?
        // this.currentCommittedSatoshis = ?
        // this.currentContributionCount = ?

    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

<template>
    <main>
        <h2>In the Spotlight</h2>

        <h4 class="mt-0">{{yesterday}}'s payout was <span class="pink--text">$4.98 <small>0.0309 BCH</small></span></h4>

        <h4 class="mt-0">txid → <a href="javascript://">0581e1f3592d ... 00252b4cb99d</a></h4>

        <v-list dense shaped>
            <!-- <v-subheader>Spotlight (10)</v-subheader> -->

            <v-list-item-group
                v-model="item"
                color="primary"
            >
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="loadDetails(item.id)"
                >
                    <v-list-item-icon>
                        {{(i + 1)}}.
                        <!-- <v-img :src="item.iconUrl" width="20" /> -->
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{item.title}}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                            <span class="list-item list-check" v-if="item.donation.bch">
                                <v-icon class="list-item list-check bitcoin">mdi-bitcoin</v-icon> accepting
                            </span>

                            <span class="list-item list-close" v-if="!item.donation.bch">
                                <v-icon class="list-item list-close">mdi-close-circle</v-icon> no donation address
                            </span>

                            <span v-if="item.donation.bch" class="grey--text"> | </span>

                            <span class="list-item list-check" v-if="item.donation.bch && item.verify">
                                <v-icon class="list-item list-check">mdi-check-bold</v-icon> verified address
                            </span>

                            <span class="list-item list-close" v-if="item.donation.bch && !item.verify">
                                <v-icon class="list-item list-close">mdi-alert</v-icon> unverified address
                            </span>

                            <br />

                            <span v-if="item.donation.bch">
                                <v-icon class="list-item list-energy">mdi-flash-circle</v-icon>

                                {{displayPIF(item.pif)}}

                                <span class="grey--text"> | </span>

                                <v-icon class="list-item">mdi-cash-usd</v-icon> $1.44 last 30d

                                <span class="grey--text"> | </span>

                                sats → {{item.satoshis}}
                            </span>
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <!-- {{(i + 1)}}. -->
                        <v-img :src="item.iconUrl" width="20" class="list-avatar" />
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </main>
</template>

<script>
/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import moment from 'moment'
import numeral from 'numeral'

export default {
    data: () => ({
        item: null,
        items: null,
        totalPIF: null,
    }),
    computed: {
        // ...mapGetters([
        //     'getHelp',
        // ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),

        yesterday() {
            return moment().subtract(1, 'days').format('dddd')
        },
    },
    methods: {
        displayPIF(_pif) {
            if (!_pif || !_pif.balance) {
                return 0.00
            }

            const decimal = _pif.balance
            const val = numeral(decimal).format('0,0a')
            const pct = numeral(decimal / this.totalPIF).format('0.00%')

            return `${val} PIF (${pct})`
        },

        /**
         * Load Details
         */
        loadDetails(_campaignid) {
            this.$store.commit('showPIF', _campaignid)
            // this.$store.dispatch('showPIF', _campaignid)
        },

    },
    created: function () {
        const causes = require('@/assets/causes.json')
        // console.log('CAUSES', causes)

        this.item = 0

        /* Initialize items. */
        this.items = causes.slice(0, 20)

        // FOR DEV ONLY
        this.totalPIF = 100000
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.list-avatar {
    border-radius: 50%;
}

.list-item {
    font-size: 1.0em;
}

.list-check {
    color: #8dc351;
}

.list-energy {
    color: #86A8E7;
}

.list-close {
    color: #cc3333;
}

.bitcoin {
    transform: rotate(-30deg);
}
</style>

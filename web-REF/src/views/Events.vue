<template>
    <v-container>

        <v-card
            v-for="event of events"
            :key="event.id"
            class="mx-auto my-5"
            :color="bgColor(event)"
            dark
            max-width="400"
        >
            <v-card-title>
                <v-img
                    :src="require('@/assets/flipstarter-logo.png')"
                    left
                    max-width="48"
                    max-height="48"
                ></v-img>
                <!-- <v-icon large left>
                    mdi-github
                </v-icon> -->

                <span class="title font-weight-light">
                    <h3>{{event.alias || 'Anonymous'}}</h3>
                </span>
            </v-card-title>

            <v-card-subtitle>
                <h3>{{event.campaignTitle || event.title}}</h3>
            </v-card-subtitle>

            <v-card-text v-if="event.comment" class="headline font-weight-bold">
                {{event.comment}}
            </v-card-text>

            <v-container class="mt-n5">
                <v-row>
                    <v-col cols="7">
                        <h2>{{fiatVal(event.satoshis)}}</h2>
                    </v-col>

                    <v-col cols="5" class="text-right">
                        <h4>{{timeAgo(event.timestamp)}}</h4>
                    </v-col>
                </v-row>
            </v-container>

        </v-card>

        <div class="text-center my-10">
            <v-progress-circular
                :size="50"
                indeterminate
                color="#8dc351"
            ></v-progress-circular>
        </div>

    </v-container>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'
import Nito from 'nitojs'
import numeral from 'numeral'

export default {
    components: {
        //
    },
    data: () => ({
        usd: null,
        events: null,
    }),
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('events', [
            'getEvents',
        ]),

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        async init() {
            /* Initialize last timestamp. */
            const lastTimestamp = moment().unix()

            /* Request events. */
            this.events = await this.getEvents(lastTimestamp)
            // console.log('EVENTS', this.events)
        },

        fiatVal(_satoshis) {
            return numeral((_satoshis / 100000000) * this.usd).format('$0,0.00')
        },

        numLikes(_eventid) {
            return '0' || _eventid
        },

        numShares(_eventid) {
            return '0' || _eventid
        },

        bgColor(_event) {
            if (_event.isRevoked && _event.type === 'revoked_contribution') {
                return '#cc3333'
            } else {
                // return '#8dc351'
                return '#324B4A'
            }
        },

        timeAgo(_timestamp) {
            return moment.unix(_timestamp).fromNow()
        },

    },
    created: async function () {
        /* Initialize events. */
        this.init()

        /* Request BCH/USD market price. */
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        // console.log('USD', this.usd)

    },
    mounted: function () {
        /**
         * Handle Window Scroll
         *
         * NOTE: Required to enable infinite scrolling.
         */
        window.onscroll = async () => {
            /* Calculate bottom of window. */
            const bottomOfWindow =
                document.documentElement.scrollTop + window.innerHeight ===
                document.documentElement.offsetHeight

            /* Validate bottom of window. */
            if (bottomOfWindow) {
                /* Validate events. */
                if (!this.events) {
                    return
                }

                /* Initialize last timestamp. */
                const lastTimestamp = this.events[this.events.length - 1].timestamp
                // console.log('LAST TIMESTAMP', lastTimestamp)

                /* Request events. */
                const events = await this.getEvents(lastTimestamp)
                // console.log('NEW EVENTS', events)

                /* Add new events. */
                this.events.push(...events)
            }
        }

    },
}
</script>

<style>
.tab-background {
    background-color: rgba(170, 204, 170, 0.9);
}
</style>

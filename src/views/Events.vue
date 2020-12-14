<template>
    <v-container>

        <!-- <v-tabs color="#00977e" right> -->
            <!-- <v-tab>Featured</v-tab> -->
            <!-- <v-tab>My feed</v-tab> -->
            <!-- <v-tab>All</v-tab> -->

            <!-- <v-tab-item key="featured" class="tab-background"> -->
                <!-- <v-container>
                    <h2>Featured events</h2>
                </v-container> -->

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
                            {{event.alias}}
                        </span>
                    </v-card-title>

                    <v-card-subtitle>
                        {{event.title}}
                    </v-card-subtitle>

                    <v-card-text class="headline font-weight-bold">
                        {{event.comment}}
                    </v-card-text>

                    <v-card-actions class="mt-n5">
                        <v-list-item class="grow">
                            <!-- <v-list-item-avatar color="grey darken-3">
                                <v-img
                                    class="elevation-6"
                                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                ></v-img>
                            </v-list-item-avatar> -->

                            <v-list-item-content>
                                <v-list-item-title>
                                    <h2>{{fiatVal(event.satoshis)}}</h2>
                                </v-list-item-title>
                            </v-list-item-content>

                            <!-- <v-row align="center" justify="end">
                                <v-icon class="mr-1">mdi-heart</v-icon>
                                <span class="subheading mr-2">{{numLikes(event.id)}}</span>

                                <span class="mr-1">&bullet;</span>

                                <v-icon class="mr-1">mdi-share-variant</v-icon>
                                <span class="subheading">{{numShares(event.id)}}</span>
                            </v-row> -->
                            <v-row align="center" justify="end">
                                <h3>{{timeAgo(event.timestamp)}}</h3>
                            </v-row>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            <!-- </v-tab-item> -->

            <!-- <v-tab-item key="for-me" class="tab-background">
                <v-container>
                    <h2>My event feed</h2>
                </v-container>

                <v-card color="#952175" dark class="my-5">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                                class="headline"
                            >Halcyon Days</v-card-title>

                            <v-card-subtitle>Ellie Goulding</v-card-subtitle>

                            <v-card-actions>
                                <v-btn
                                    class="ml-2 mt-5"
                                    outlined
                                    rounded
                                    small
                                >
                                    Open campaign
                                </v-btn>
                            </v-card-actions>
                        </div>

                        <v-avatar
                            class="ma-3"
                            size="125"
                            tile
                        >
                            <v-img :src="require('@/assets/flipstarter-logo.png')"></v-img>
                        </v-avatar>
                    </div>
                </v-card>

            </v-tab-item> -->

            <!-- <v-tab-item key="all" class="tab-background">
                <v-container>
                    <h2>All events</h2>
                </v-container>

                <v-card
                    class="mx-auto my-5"
                    color="#"
                    dark
                    max-width="400"
                >
                    <v-card-title>
                        <v-icon large left>
                            mdi-twitter
                        </v-icon>

                        <span class="title font-weight-light">Twitter</span>
                    </v-card-title>

                    <v-card-text class="headline font-weight-bold">
                        "Twitter Rocks!"
                    </v-card-text>

                    <v-card-actions>
                        <v-list-item class="grow">
                            <v-list-item-avatar color="grey darken-3">
                                <v-img
                                    class="elevation-6"
                                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                ></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>Evan You</v-list-item-title>
                            </v-list-item-content>

                            <v-row align="center" justify="end">
                                <v-icon class="mr-1">mdi-heart</v-icon>
                                <span class="subheading mr-2">256</span>
                                <span class="mr-1">&bullet;</span>
                                <v-icon class="mr-1">mdi-share-variant</v-icon>
                                <span class="subheading">45</span>
                            </v-row>
                        </v-list-item>
                    </v-card-actions>
                </v-card>

                <v-card
                    class="my-5"
                    color="#385F73"
                    dark
                >
                    <v-card-title class="headline">
                        Unlimited music now
                    </v-card-title>

                    <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

                    <v-card-actions>
                        <v-btn text>
                            Listen Now
                        </v-btn>
                    </v-card-actions>
                </v-card>

            </v-tab-item> -->

        <!-- </v-tabs> -->

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
import numeral from 'numeral'

export default {
    components: {
        //
    },
    data: () => ({
        events: null,
        usd: null,
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
            /* Request events. */
            this.events = await this.getEvents(0)
            console.log('EVENTS', this.events)
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
            if (_event.isRevoked) {
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
    created: function () {
        /* Initialize events. */
        this.init()

        // FIXME: Pull real-time price from api.telr.io
        this.usd = 300

    },
    mounted: function () {
        window.onscroll = () => {
            const bottomOfWindow =
                document.documentElement.scrollTop + window.innerHeight ===
                document.documentElement.offsetHeight

            if (bottomOfWindow) {
                console.log('i think we hit the bottom')
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

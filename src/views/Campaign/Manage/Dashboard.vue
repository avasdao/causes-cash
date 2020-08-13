<template>
    <main role="tabpanel" class="tab-pane active" id="dashboard">
        <div class="row">
            <div class="col-3">
                <!-- spacer -->
            </div>

            <div class="col-7">
                <div v-if="title">
                    <h1>{{title}} Dashboard</h1>
                    <h3 class="text-secondary">{{category}}</h3>

                    <hr />
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <p class="under-construction mt-3">
                            Oops! We're still working on this area.
                        </p>

                        <p class="under-construction mt-3">
                            Want to help us get this platform ready ASAP?
                        </p>

                        <p class="under-construction my-3">
                            Learn how your ❤️ and support Causes Cash.
                        </p>

                        <button class="btn btn-block btn-outline-success" @click="supportCauses">
                            Support Causes Cash
                        </button>
                    </div>

                    <div class="col">
                        <!-- This area is still under development. -->
                        <!-- <img class="under-construction" src="https://i.imgur.com/8nvqTcU.png" /> -->
                        <img class="under-construction rounded" src="https://i.imgur.com/1yAHZ69.png" />
                    </div>
                </div>

                <!-- <div class="row">
                    <div class="col-6">
                        <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4">Messages</div>
                                    <v-list-item-title class="headline mb-1">Weekly Earnings Report 5</v-list-item-title>
                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-avatar
                                    tile
                                    size="80"
                                    color="grey"
                                ></v-list-item-avatar>
                            </v-list-item>

                            <v-card-actions>
                                <v-btn text>Button</v-btn>
                                <v-btn text>Button</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>

                    <div class="col-6">
                        <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4">Weekly Earnings Report</div>
                                    <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-avatar
                                    tile
                                    size="80"
                                    color="grey"
                                ></v-list-item-avatar>
                            </v-list-item>

                            <v-card-actions>
                                <v-btn text>Button</v-btn>
                                <v-btn text>Button</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </div> -->

                <!-- <hr /> -->

                <!-- <v-timeline>
                    <v-timeline-item color="red lighten-2" large>
                        <v-card class="elevation-2">
                            <v-card-title class="headline">Lorem ipsum</v-card-title>

                            <v-card-text>
                                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item color="teal lighten-3" small>
                        <v-card class="elevation-2">
                            <v-card-title class="headline">Lorem ipsum</v-card-title>

                            <v-card-text>
                                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item
                        small
                        fill-dot
                    >
                        <template v-slot:icon>
                            <v-avatar>
                                <img src="http://i.pravatar.cc/64">
                            </v-avatar>
                        </template>

                        <template v-slot:opposite>
                            <span>New Contributor</span>
                        </template>

                        <v-alert
                            value="true"
                            color="blue"
                            icon=""
                            class="white--text"
                        >
                            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                        </v-alert>
                    </v-timeline-item>
                </v-timeline> -->
            </div>
        </div>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        //
    },
    data: () => {
        return {
            ownerSlug: null,
            slug: null,
            extSlug: null,

            campaign: null,
            campaignId: null,
            // fundId: null,
            // referrerId: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('campaigns', [
            'getCampaign',
        ]),

        ...mapGetters('utils', [
            'getCategoryDisplay',
        ]),

        title() {
            if (this.campaign && this.campaign.title) {
                return this.campaign.title
            } else {
                return null
            }
        },

        category() {
            if (this.campaign && this.campaign.title) {
                return this.getCategoryDisplay(this.campaign.category)
            } else {
                return null
            }
        },

        location() {
            if (this.campaign && this.campaign.location) {
                return this.campaign.location
            } else {
                return null
            }
        },

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        supportCauses() {
            this.$router.push('/@BCHPlease/causes-cash-8ab5c2fc')
        },

    },
    created: async function () {
        console.log('PARAMS', this.$route.params)
        console.log('QUERY', this.$route.query)
        console.log('HASH', this.$route.hash)

        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
        console.log('OWNER SLUG', this.ownerSlug)

        /* Set extended slug. */
        this.slug = this.$route.params.slug
        console.log('SLUG', this.slug)

        /* Validate hash. */
        // if (this.$route.hash) {
        //     /* Set extended slug. */
        //     this.fundId = this.$route.hash.slice(1)
        //     console.log('FUND ID (from hash)', this.fundId)
        // }

        /* Validate query. */
        // if (this.$route.query && Object.keys(this.$route.query)[0]) {
        //     /* Set extended slug. */
        //     this.fundId = Object.keys(this.$route.query)[0]
        //     console.log('FUND ID (from query)', this.fundId)
        // }

        /* Validate slug. */
        if (this.ownerSlug && this.slug) {
            /* Set campaign. */
            this.campaign = await this.getCampaign(this.ownerSlug, this.slug)
            console.log('CAMPAIGN', this.campaign)
        }
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
p.under-construction {
    font-size: 1.4em;
}
</style>

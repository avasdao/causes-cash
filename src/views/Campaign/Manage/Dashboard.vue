<template>
    <div role="tabpanel" class="tab-pane active" id="dashboard">
        <section class="campaign-form form-update">
            <!-- <div class="container"> -->
            <div class="start-form">
                <form action="javascript://">
                    <h1>Dashboard</h1>
                    <hr />

                    <h1>{{title}}</h1>
                    <h3 class="text-secondary">{{category}}</h3>

                    <div class="row">
                        <div class="col">
                            <v-card
                                class="mx-auto"
                                max-width="344"
                            >
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="overline mb-4">PLEDGES</div>
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

                        <div class="col">
                            <v-card
                                class="mx-auto"
                                max-width="344"
                            >
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="overline mb-4">EVENTS</div>
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
                    </div>

                    <hr />

<!-- Risks & Challenges -->
                    <!-- <div class="field">
                        <label for="risks">Risks and challenges</label>

                        <span class="label-desc">
                            What are the risks and challenges that come with completing your project, and how are you qualified to overcome them?
                        </span>

                    </div> -->

                    <!-- <div class="field">
                        <label for="shortblurb">
                            Short Blurb
                        </label>

                        <span class="label-desc">
                            Give people a sense of what you’re doing.
                            Skip “Help me” and focus on what you’re making.
                        </span>

                        <textarea id="shortblurb" cols="30" rows="4" maxlength="135"></textarea>
                    </div> -->

                    <div class="field">
                        <label for="projectlocation">
                            Project Location
                        </label>

                        <input type="text" id="projectlocation" v-model="location">
                    </div>

                    <div class="field">
                        <label for="funding">
                            Funding Duration
                        </label>

                        <span class="label-desc">
                            Projects with shorter durations have higher success rates.
                            You won’t be able to adjust your duration after you launch.
                        </span>

                        <input type="date" id="funding" value="">
                    </div>
                    <div class="field">
                        <label for="fundinggoal">Funding Goal</label>

                        <span class="label-desc">
                            Community Pledge funding on Causes Cash is all-or-nothing.
                            It’s okay to raise more than your goal, but if your goal isn’t met, no money will be collected.
                            Your goal should reflect the minimum amount of funds you need to complete your project and send out rewards, and include a buffer for payments processing fees.
                            If your project is successfully funded, the following fees will be collected from your funding total:
                            Causes Cash 5% fee, and payment processing fees (between 3% and 5%).
                            If funding isn’t successful, there are no fees.
                            <a href="javascript://" class="view-fees">View fees breakdown</a>
                        </span>

                        <div class="spopup-bg"></div>

                        <div class="fees-popup start-popup">
                            <div class="spopup-title">
                                <h3>Fees</h3>

                                <div class="spopup-close">
                                    <span class="ion-ios-close-empty"></span>
                                </div>
                            </div>

                            <!-- <div class="spopup-content">
                                <p>If your project is successfully funded, the following fees will be collected from your funding total: Ideapress 5% fee, and payment processing fees (between 3% and 5%). If funding isn’t successful, there are no fees.</p>

                                <ul>
                                    <li>
                                        <h4>Ideapress fee</h4>
                                        <div class="fee-desc">
                                            <p>5% of total funds raised </p>
                                        </div>
                                    </li>

                                    <li>
                                        <h4>Payment processing fees</h4>
                                        <div class="fee-desc">
                                            <p>3% + €0.20 per pledge</p>
                                            <p>Pledges under €10 have a discounted micropledge fee of 5% + €0.05 per pledge</p>
                                        </div>
                                    </li>
                                </ul>
                            </div> -->
                        </div>

                        <input type="text" value="" id="fundinggoal">
                    </div>

                </form>
            </div>
        </section>
    </div>
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
/*  */
</style>

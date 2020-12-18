<template>
    <v-container>

        <v-card color="#952175" dark class="mt-0 mb-5" @click="loadMyCoinParty()">
            <!-- <div class="d-flex flex-no-wrap justify-space-between"> -->
                <v-avatar class="mt-5 mr-5 ml-1 float-right" size="75" tile>
                    <v-img src="https://i.imgur.com/ycNrWFC.png"></v-img>
                </v-avatar>

                <div>
                    <v-card-title class="headline">
                        <h2>MyCoinParty</h2>
                    </v-card-title>

                    <v-card-subtitle>
                        <h2 class="mt-3">
                            Bringing CashFusion+ to your <u>mobile</u> wallets
                        </h2>
                    </v-card-subtitle>

                    <v-card-subtitle class="mt-n5 ml-5">
                        <strong>DECEMBER 18TH <small>THRU</small> 31ST</strong>
                    </v-card-subtitle>

                    <div class="ml-3 mt-5 mt-n3">
                        <strong><small>Choose your adventure:</small></strong>
                    </div>

                    <v-card-actions>
                        <div class="mb-1 d-flex">
                            <v-btn class="ml-5 mr-4" outlined rounded small>
                                <span class="action-button">Fun &amp; Games</span>
                            </v-btn>

                            <v-btn outlined rounded small>
                                <span class="action-button">Better Privacy</span>
                            </v-btn>
                        </div>
                    </v-card-actions>
                </div>

            <!-- </div> -->
        </v-card>

        <!-- <div class="d-flex justify-end">
            <div class="category-selection">
                <v-select
                    v-model="selected"
                    :hint="selected.comment"
                    :items="categories"
                    item-text="state"
                    item-value="abbr"
                    label="Select a category"
                    persistent-hint
                    return-object
                    single-line
                ></v-select>
            </div>
        </div> -->

        <v-card
            v-for="campaign of campaigns"
            :key="campaign.id"
            class="mx-auto my-7"
            max-width="400"
            @click="loadDetails(campaign.id)"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                :src="campaign.media.main"
            ></v-img>

            <v-card-subtitle class="pb-0">
                {{campaign.title}}
                <span class="category ml-1">{{campaign.category}}</span>
            </v-card-subtitle>

            <v-card-text class="text--primary">
                <v-progress-linear
                    :background-color="fundedColors(campaign)[0]"
                    :color="fundedColors(campaign)[1]"
                    :value="fundedPct(campaign)"
                ></v-progress-linear>

                <div>{{fundedDisplay(campaign)}}</div>

                <div class="min-pledge">
                    Minimum pledge:
                    <strong class="red--text min-pledge-amount">
                        {{minPledge(campaign)}}
                    </strong>
                </div>
            </v-card-text>

            <v-card-actions class="mt-n5">
                <v-btn color="orange" text>
                    {{pledgesDisplay(campaign)}}
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn color="orange" text>
                    {{expiresDisplay(campaign)}}
                </v-btn>
            </v-card-actions>
        </v-card>

        <div class="text-center my-10" v-if="hasMoreResults">
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

const SATS_PER_BCH = 100000000

export default {
    components: {
        //
    },
    data: () => ({
        campaigns: null,
        usd: null,

        showAlert: null,
        hasMoreResults: null,

        feed: null,

        selected: {
            state: '☆ In the Spotlight (20)',
            abbr: 'spotlight',
            comment: `↪ highest # of community votes`
        },
        categories: [
            { state: '☆ In the Spotlight (20)', abbr: 'spotlight', comment: `↪ highest # of community votes` },
            { state: '☆ New & Noteworthy (11)', abbr: 'new', comment: `↪ recently added by a notable` },
            { state: 'Adoption (1)', abbr: 'adoption', comment: `add a comment here..` },
            { state: 'Community (3)', abbr: 'community', comment: `↪ working together for the commons` },
            { state: 'Decentralized App (1)', abbr: 'dapp', comment: `add a comment here..` },
            { state: 'Design & Art (0)', abbr: 'design-art', comment: `add a comment here..` },
            { state: 'Education (1)', abbr: 'education', comment: `add a comment here..` },
            { state: 'Film & Video (2)', abbr: 'film-video', comment: `add a comment here..` },
            { state: 'Fun & Games (1)', abbr: 'fun-games', comment: `add a comment here..` },
            { state: 'Hardware (1)', abbr: 'hardware', comment: `add a comment here..` },
            { state: 'Health & Wellness (2)', abbr: 'health-wellness', comment: `add a comment here..` },
            { state: 'Infrastructure (8)', abbr: 'infrastructure', comment: `add a comment here..` },
            { state: 'Music (0)', abbr: 'music', comment: `add a comment here..` },
            { state: 'Privacy (1)', abbr: 'privacy', comment: `add a comment here..` },
            { state: 'Publishing (1)', abbr: 'publishing', comment: `add a comment here..` },
            { state: 'Security (1)', abbr: 'security', comment: `add a comment here..` },
            { state: 'Software (2)', abbr: 'software', comment: `add a comment here..` },
            { state: 'World View (4)', abbr: 'world', comment: `add a comment here..` },
            { state: 'Youth (1)', abbr: 'youth', comment: `add a comment here..` },
        ],

    }),
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('discover', [
            'getDiscover',
        ]),

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        loadMyCoinParty() {
            if (window._bitcoinWalletApi) {
                this.$store.commit('showAd', 'mycoinparty')
                // this.$store.dispatch('showAd', 'mycoinparty')
            } else {
                this.$store.commit('showAd', 'mycoinparty')
                // window.open('https://mycoinparty.org')
            }
        },

        minPledge(_campaign) {
            // console.log('MIN PLEDGE', _campaign)

            /* Initialize total funds. */
            let totalFunds = 0

            let currentContributionCount = 0

            if (_campaign.pledges) {
                /* Loop through all pledges. */
                Object.keys(_campaign.pledges).forEach(pledgeid => {
                    /* Filter out all revoked pledges. */
                    if (!_campaign.pledges[pledgeid].isRevoked) {
                        /* Increment contribution count. */
                        currentContributionCount++

                        /* Add satoshis to total funds. */
                        totalFunds += _campaign.pledges[pledgeid].satoshis
                    }
                })
            }

            const numRecipients = 1
            const currentMinerFee = this
                .calculateMinerFee(numRecipients, currentContributionCount)

            const currentFloor = Math.ceil(
                (
                    _campaign.goal
                    + currentMinerFee
                    - totalFunds
                )
                * this.inputPercentModifier(
                    currentMinerFee,
                    _campaign.goal,
                    totalFunds,
                    currentContributionCount
                )
            )
            const currentFloorUsd = Math.ceil((currentFloor / 100000000.0) * this.usd)
            // console.log('CURRENT FLOOR', currentFloor, currentFloorUsd)

            return numeral(currentFloorUsd).format('$0,0.00')
        },

        fundedTotal(_campaign) {
            /* Validate campaign pledges. */
            if (!_campaign.pledges) {
                return 0
            }

            /* Initialize total funds. */
            let totalFunds = 0

            Object.keys(_campaign.pledges).forEach(pledgeid => {
                /* Filter out all revoked pledges. */
                if (!_campaign.pledges[pledgeid].isRevoked) {
                    /* Add satoshis to total funds. */
                    totalFunds += _campaign.pledges[pledgeid].satoshis
                }
            })

            /* Return total funds. */
            return totalFunds
        },

        fundedDisplay(_campaign) {
            const funded = this.fundedTotal(_campaign) / 100000000
            const goal = _campaign.goal / 100000000
            const pct = this.fundedTotal(_campaign) / _campaign.goal

            return `${numeral(funded).format('0,0.00[00]')} of ${goal} BCH (${numeral(pct).format('0.00%')} completed)`
        },

        fundedColors(_campaign) {
            const pct = this.fundedTotal(_campaign) / _campaign.goal

            if (pct > 0.75) {
                return ['green lighten-3', 'green lighten-1']
            } else if (pct > 0.5) {
                return ['blue lighten-3', 'blue lighten-1']
            } else if (pct > 0.25) {
                return ['amber lighten-3', 'amber lighten-1']
            } else {
                return ['red lighten-3', 'red lighten-1']
            }
        },

        fundedPct(_campaign) {
            const pct = _campaign.funded / _campaign.goal

            return pct * 100
        },

        pledgesDisplay(_campaign) {
            /* Validate campaign pledges. */
            if (!_campaign.pledges) {
                return '0 pledges'
            }

            let totalPledges = 0

            Object.keys(_campaign.pledges).forEach(pledgeid => {
                if (!_campaign.pledges[pledgeid].isRevoked) {
                    totalPledges++
                }
            })

            return `${totalPledges} pledges`
        },

        expiresDisplay(_campaign) {
            if (_campaign.expires) {
                return `${moment.unix(_campaign.expires).fromNow(true)} remaining`
            } else {
                return 'n/a'
            }
        },

        /**
         * Load Details
         */
        loadDetails(_campaignid) {
            this.$store.commit('showCampaign', _campaignid)
            // this.$store.dispatch('showCampaign', _campaignid)
        },

        calculateMinerFee(RECIPIENT_COUNT, CONTRIBUTION_COUNT) {
            // Aim for two satoshis per byte to get a clear margin for error and priority on fullfillment.
            const TARGET_FEE_RATE = 2;

            // Define byte weights for different transaction parts.
            const TRANSACTION_METADATA_BYTES = 10;
            const AVERAGE_BYTE_PER_RECIPIENT = 69;
            const AVERAGE_BYTE_PER_CONTRIBUTION = 296;

            // Calculate the miner fee necessary to cover a fullfillment transaction with the next (+1) contribution.
            const MINER_FEE =
                (TRANSACTION_METADATA_BYTES +
                    AVERAGE_BYTE_PER_RECIPIENT * RECIPIENT_COUNT +
                    AVERAGE_BYTE_PER_CONTRIBUTION * (CONTRIBUTION_COUNT + 1)
                ) * TARGET_FEE_RATE;

            // Return the calculated miner fee.
            return MINER_FEE;
        },

        // Define a helper function we need to calculate the floor.
        inputPercentModifier(
            _currentMinerFee,
            _totalContractOutputValue,
            _currentCommittedSatoshis,
            _currentContributionCount
        ) {
            const inputPercent = 0.75

            const commitmentsPerTransaction = 650

            // Calculate how many % of the total fundraiser the smallest acceptable contribution is at the moment.
            const remainingValue =
                _currentMinerFee +
                (_totalContractOutputValue - _currentCommittedSatoshis)

            // this.contract.assembleTransaction().byteLength
            const currentTransactionSize = 42

            const minPercent =
                0 +
                (
                    remainingValue
                    / (commitmentsPerTransaction - _currentContributionCount)
                    + 546 / SATS_PER_BCH
                ) /
                remainingValue

            const maxPercent =
                1
                - ((currentTransactionSize + 1650 + 49) * 1.0)
                / (remainingValue * SATS_PER_BCH)

            // ...

            const minValue = Math.log(minPercent * 100)
            const maxValue = Math.log(maxPercent * 100)

            // Return a percentage number on a non-linear scale with higher resolution in the lower boundaries.
            return (
                Math.exp(
                    minValue
                    + (inputPercent * (maxValue - minValue))
                    / 100
                )
                / 100
            )
        },

    },
    created: async function () {
        /* Set has more results flag. */
        this.hasMoreResults = true

        /* Request campaigns. */
        this.campaigns = await this.getDiscover('all', 0)
        console.log('DISCOVER', this.campaigns)

        /* Set has more results flag. */
        this.hasMoreResults = false

        // FIXME: Pull real-time price from api.telr.io
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')

        /* Initialize alert flag. */
        // this.showAlert = true

    },
    mounted: function () {
        //
    },
}
</script>

<style>
.headline h2 {
    font-size: 1.4em;
}

.action-button {
    font-size: 0.9em;
}

.category {
    font-size: 0.7em;
    /* font-style: italic; */
    color: rgba(90, 90, 255, 0.8);
}
.min-pledge {
    font-size: 0.9em;
    color: rgba(90, 90, 90, 0.8);
}
.min-pledge-amount {
    font-size: 1.1em;
}

.category-selection {
    width: 70vw;
    margin-top: -25px;
}
</style>

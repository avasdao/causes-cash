<template>
    <div class="latest campaign">
        <div class="container">
            <h2 class="title">Discover Campaigns</h2>

            <!-- <div class="campaign-tabs filter-theme">
                <button class="button" data-filter=".filterinteresting">
                    Ending Soon
                </button>

                <button class="button is-checked" data-filter=".filterpopular">
                    Popular
                </button>

                <button class="button" data-filter=".filterlatest">
                    Just Added
                </button>

                <button class="button" data-filter=".filtersuccessful">
                    Successful
                </button>
            </div> -->

            <div class="campaign-content grid">
                <div class="row">

                    <!-- Start campaigns. -->
                    <div
                        v-for="campaign of campaigns"
                        :key="campaign.id"
                        class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular filterlatest">
                        <div class="campaign-item">
                            <!-- <a class="overlay" href="javascript://" @click="loadDetails(campaign)">
                                <img :src="campaign.coverImgUrl" alt="">
                                <span class="ion-ios-search-strong"></span>
                            </a> -->
                            <a class="category" href="javascript://" @click="loadDetails(campaign)">
                                <img :src="displayImage(campaign)" alt="">
                            </a>

                            <div class="campaign-box">
                                <a class="category" href="javascript://" @click="loadCategory(campaign)">
                                    {{getCategoryDisplay(campaign.category)}}
                                </a>

                                <h3>
                                    <a href="javascript://" @click="loadDetails(campaign)">
                                        {{campaign.title}}
                                    </a>
                                </h3>

                                <div class="campaign-description">
                                    {{campaign.summary}}
                                </div>

                                <div class="campaign-author">
                                    <a class="author-icon" :href="weblink(campaign)" target="_blank">
                                        <img :src="avatar(campaign)" alt="">
                                        by {{displayOwnerName(campaign)}}
                                    </a>
                                </div>

                                <div class="process">
                                    <!-- <div class="raised">
                                        <span :style="{ width: completedPct(campaign, true) + '%'}"></span>
                                    </div> -->

                                    <div class="row process-info text-center">
                                        <div class="col process-pledged">
                                            <!-- <span>{{fundingGoal(campaign)}}</span> -->
                                            <strong>{{fundingGoal(campaign)}}</strong>
                                            <br />goal
                                        </div>

                                        <div class="col process-funded text-center">
                                            <!-- <span>{{fundingPledged(campaign)}}</span> -->
                                            <strong>{{fundingPledged(campaign)}}</strong>
                                            <br />pledged
                                        </div>

                                        <div class="col process-time text-center">
                                            <strong>{{remaining(campaign).time}}</strong>
                                            <br />{{remaining(campaign).suffix}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End campaigns. -->

                </div>
            </div>

            <div class="latest-button">
                <router-link to="/discover" class="btn-primary">
                    Discover More Campaigns
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'
import Nito from 'nitojs'
import numeral from 'numeral'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            usd: null,

            campaigns: [],
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getCampaign',
        ]),

        ...mapGetters('utils', [
            'getCategoryDisplay',
        ]),

    },
    methods: {
        /**
         * Load Featured Campaigns
         */
        async loadFeatured() {
            /* Request campaigns. */
            const campaigns = await Promise.all([
                this.getCampaign('bchplease', 'hush-your-money'),
                this.getCampaign('eatbch', 'help-us-deliver-food-for-one-month'),
                this.getCampaign('bitcoinverde','bitcoin-verde-node-development'),
                this.getCampaign('bchn', 'bitcoin-cash-node-initiative'),
                this.getCampaign('knuth', 'knuth-platform-development'),
                this.getCampaign('bchd', 'bchd-node-development'),
            ])
            .catch(err => console.error(err))
            // console.log('RETRIEVED CAMPAIGNS', campaigns)

            /* Load campaigns. */
            campaigns.forEach(campaign => {
                this.campaigns.push(campaign)
            })

        },

        avatar(_campaign) {
            if (_campaign.owner && _campaign.owner.avatar) {
                return _campaign.owner.avatar
            } else {
                return null
            }
        },

        weblink(_campaign) {
            if (_campaign.owner && _campaign.owner.link) {
                return _campaign.owner.link
            } else {
                return null
            }
        },

        displayImage(_campaign) {
            if (_campaign.media && _campaign.media.main) {
                return _campaign.media.main
            } else {
                return null
            }
        },

        displayOwnerName(_campaign) {
            if (_campaign && (_campaign.owner.label || _campaign.owner.nickname)) {
                return _campaign.owner.label || _campaign.owner.nickname
            } else {
                return null
            }
        },

        /**
         * Funding Goal
         */
        fundingGoal(_campaign) {
            if (_campaign && _campaign.assurances) {
                const assuranceid = 0

                /* Set recipients. */
                const recipient = _campaign.assurances[assuranceid].recipient

                /* Validate recipients. */
                if (!recipient) {
                    return '$0.00'
                }

                const calc = (recipient.satoshis / 100000000 * this.usd)

                return numeral(calc).format('$0,0[.]00')
            }

            return '$0.00'
        },

        /**
         * Funding Pledged
         */
        fundingPledged(_campaign) {
            if (_campaign && (_campaign.assurances || _campaign.payouts)) {
                if (_campaign.assurances) {
                    const assuranceid = 0

                    /* Set pledges. */
                    const pledges = _campaign.assurances[assuranceid].pledges

                    /* Validate recipients. */
                    if (!pledges) {
                        return '$0.00'
                    }

                    /* Initialize total. */
                    let pledgeTotal = 0

                    /* Loop through ALL pledges. */
                    Object.keys(pledges).forEach(pledgeid => {
                        /* Add satoshis to total. */
                        pledgeTotal += pledges[pledgeid].satoshis
                    })

                    /* Calculate USD total. */
                    const totalUSD = (pledgeTotal / 100000000 * this.usd)

                    /* Return formatted value. */
                    return numeral(totalUSD).format('$0,0.00')
                }

                if (_campaign.payouts) {
                    /* Set funders. */
                    const funders = _campaign.payouts.funders
                    // console.log('FUNDERS', funders);

                    /* Validate recipients. */
                    if (!funders) {
                        return '$0.00'
                    }

                    /* Initialize total. */
                    let funderTotal = 0

                    /* Loop through ALL funders. */
                    Object.keys(funders).forEach(funderid => {
                        /* Add satoshis to total. */
                        funderTotal += funders[funderid].monthlyPledgeAmt
                    })
                    // console.log('FUNDER TOTAL', funderTotal);

                    /* Calculate USD total. */
                    const totalUSD = (funderTotal / 1000000 * this.usd)
                    // console.log('TOTAL USD', totalUSD);

                    /* Return formatted value. */
                    return numeral(totalUSD).format('$0,0.00')
                }
            }

            return '$0.00'
        },

        numSupporters() {
            if (this.campaign && (this.campaign.assurances || this.campaign.payouts)) {
                if (this.campaign.assurances) {
                    const assuranceid = 0

                    /* Set pledges. */
                    const pledges = this.campaign.assurances[assuranceid].pledges

                    /* Validate recipients. */
                    if (!pledges) {
                        return 0
                    }

                    /* Return count. */
                    return Object.keys(pledges).length
                }

                if (this.campaign.payouts) {
                    /* Set funders. */
                    const funders = this.campaign.payouts.funders

                    /* Validate recipients. */
                    if (!funders) {
                        return 0
                    }

                    /* Return count. */
                    // FIXME: Limit to `nextPayoutAt` > 0
                    return Object.keys(funders).length
                }
            }

            return '$0.00'
        },

        remaining(_campaign) {
            if (_campaign && (_campaign.assurances || _campaign.payouts)) {
                if (_campaign.assurances) {
                    const assuranceid = 0

                    /* Set remaining time. */
                    const expiresAt = _campaign.assurances[assuranceid].expiresAt
                    console.log('expiresAt', expiresAt, moment().unix());

                    /* Set (remaining) time. */
                    let time = expiresAt - moment().unix()

                    /* Initialize suffix. */
                    let suffix = null

                    /* Calculate minimum value. */
                    if (time > 86400) {
                        time = parseInt(time / 60 / 60 / 24)
                        suffix = 'days to go'
                    } else if (time > 3600) {
                        time = parseInt(time / 60 / 60)
                        suffix = 'hours to go'
                    } else if (time > 60) {
                        time = parseInt(time / 60)
                        suffix = 'mins to go'
                    } else {
                        suffix = 'ending now'
                    }

                    /* Return time time w/ suffix. */
                    return { time, suffix }
                }

                if (_campaign.payouts) {
                    return { time: 0, suffix: 'TODO' }
                }
            }

            return { time: 'n/a', suffix: 'remaining' }
        },

        /**
         * Load Category
         */
        loadCategory(_campaign) {
            /* Set category. */
            const category = _campaign.category

            alert('goto ' + category)
        },

        /**
         * Load Details
         */
        loadDetails(_campaign) {
            // console.log('CAUSE', _campaign)

            /* Set campaign id. */
            const id = _campaign.id

            /* Validate id. */
            if (!id) {
                return alert('Invalid ID!')
            }

            /* Set slug. */
            const slug = _campaign.slug

            /* Validate slug. */
            if (!slug) {
                return alert('Invalid slug!')
            }

            /* Set owner. */
            const owner = _campaign.owner

            /* Validate author id. */
            if (!owner) {
                return alert('Invalid owner!')
            }

            /* Set extended slug. */
            const extSlug = `${slug}-${id.slice(id.lastIndexOf('-') + 1)}`

            /* Load details. */
            this.$router.push(`@${owner.slug}/${extSlug}`)
        },

        /**
         * Completed Percentage
         */
        completedPct(_campaign, _integer = false) {
            /* Calculate completion percentage. */
            const completedPct = (_campaign.pledged / _campaign.requested)

            /* Validate integer flag. */
            if (_integer) {
                return parseInt(completedPct * 100)
            } else {
                return completedPct
            }
        },

        /**
         * Format Funded
         */
        formatFunded(_campaign) {
            /* Set percentage. */
            const pct = _campaign.pct

            /* Initialize formatted. */
            let formatted = null

            if (pct === 0) {
                formatted = 'ongoing'
            } else {
                const completePct = this.completedPct(_campaign)

                formatted = numeral(completePct).format('0.00%')
            }

            /* Return formatted. */
            return formatted
        },

    },
    created: async function () {
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        // console.info(`Market price (USD)`, this.usd)

        /* Load featured campaigns. */
        this.loadFeatured()

    },
    mounted: function () {
        /* Animated completion bar. */
        $('.raised > span').each(function () {
			$(this)
				.data('origWidth', $(this).width())
				.width(0)
				.animate({
					width: $(this).data('origWidth')
				}, 1200);
		})

    },
}
</script>

<style>
.campaign{
    /* padding-top: 120px; */
    padding-top: 40px;
}

.latest .campaign-item,
.campaigns .campaign-item{
    background-color: #f5f6f6;
    margin-bottom: 30px;
}
.latest .latest-button{
    text-align: center;
    margin-top: 30px;
}
.latest{
    /* margin-bottom: 120px; */
    margin-bottom: 40px;
}

.site-main .campaigns{
  padding: 0;
}
.site-main .campaigns .latest-button{
  text-align: center;
  margin-top: 30px;
}
.site-main .campaigns .latest-button a{
  background: none;
  border: 2px solid #00a6eb;
  color: #00a6eb;
  line-height: 42px;
}
.site-main .campaigns .latest-button a:hover{
  background-color: #00a6eb;
  color: #fff;
}
</style>

<style scoped>
.campaign-item img {
    border: 1px solid rgba(180, 180, 180, 0.2);
    padding: 2px;
    cursor: pointer;
}

.process-info div, .process-info div span {
    /* font-size: 0.9em !important; */
    /* text-align: center !important; */
    margin: 0;
    padding: 0;
}
.process-info strong {
    font-weight: 500;
    font-size: 1.2em;
}
</style>

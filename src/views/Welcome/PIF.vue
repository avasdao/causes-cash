<template>
    <div class="project-love">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-sm-9 col-9">
                    <div class="project-love-title">
                        <!-- <h2 class="title left-title">Most ❤️ By Our Community</h2> -->
                        <h2 class="title left-title">Community Picks</h2>

                        <div class="description left-description">
                            <!-- Pay-It-Forward (PIF) to vote for YOUR favorite causes. -->
                            Pay-it-forward (PIF) to show your favorite causes some
                            <i class="fa fa-heart fa-lg text-danger" aria-hidden="true"></i>
                            and
                            <span class="fa-stack">
                                <i class="fa fa-circle fa-stack-2x text-success"></i>
                                <i class="fa fa-bitcoin fa-stack-1x fa-inverse"></i>
                            </span>
                        </div>
                    </div>

                    <ul class="project-love-slider">
                        <li v-for="campaign of campaigns" :key="campaign.id">
                            <div class="project-love-item clearfix">
                                <!-- <router-link to="/details" class="project-love-image"> -->
                                <router-link :to="path(campaign)" class="project-love-image">
                                    <img :src="displayImage(campaign)" class="img-rounded" alt="">
                                </router-link>

                                <div class="project-love-item-content project-love-box">
                                    <router-link to="/discover" class="category category-link">
                                        {{displayCategory(campaign)}}
                                    </router-link>

                                    <h3>
                                        <!-- <router-link to="/details"> -->
                                        <router-link to="/welcome">
                                            {{campaign.title}}
                                        </router-link>
                                    </h3>

                                    <div v-html="getMarkdown(campaign.summary)" class="project-love-description" />

                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" :href="weblink(campaign)" target="_blank">
                                                <img :src="avatar(campaign)" alt="">
                                            </a>
                                            by
                                            <a class="author-name" :href="weblink(campaign)" target="_blank">
                                                {{displayOwnerName(campaign)}}
                                            </a>
                                        </div>

                                        <div class="author-address">
                                            <i v-if="campaignModel(campaign) == 'Cash Payouts'" class="fa fa-money mr-1" aria-hidden="true"></i>
                                            <i v-if="campaignModel(campaign) == 'Community Pledge'" class="fa fa-users mr-1" aria-hidden="true"></i>
                                            <i v-if="campaignModel(campaign) == 'Direct Donation'" class="fa fa-btc mr-1" aria-hidden="true"></i>
                                            <i v-if="campaignModel(campaign) == 'Unknown campaign type'" class="fa fa-question mr-1" aria-hidden="true"></i>
                                            {{campaignModel(campaign)}}
                                        </div>
                                    </div>

                                    <div class="process">
                                        <div v-if="campaignModel(campaign) == 'Community Pledge'" class="raised">
                                            <span :style="{ width: completedPct(campaign, true) + '%'}"></span>
                                        </div>

                                        <!-- <div class="process-info">
                                            <div class="process-pledged">
                                                <span>{{formatRequested(campaign)}}</span>requested
                                            </div>

                                            <div class="process-funded">
                                                <span>{{formatPledged(campaign)}}</span>pledged
                                            </div>

                                            <div class="process-time">
                                                <span>{{displayBackers(campaign)}}</span>backers
                                            </div>
                                        </div> -->

                                        <div v-if="campaignModel(campaign) == 'Community Pledge'" class="row process-info">
                                            <div class="col">
                                                <span>{{fundingGoal(campaign)}}</span>
                                                funding goal
                                            </div>

                                            <div class="col">
                                                <span>{{fundingPledged(campaign)}}</span>
                                                pledged
                                            </div>

                                            <div class="col">
                                                <span>{{numSupporters(campaign)}}</span>
                                                supporters
                                            </div>

                                            <div class="col">
                                                <span>{{remaining(campaign).time}}</span>
                                                {{remaining(campaign).suffix}}
                                            </div>
                                        </div>

                                        <div v-if="campaignModel(campaign) == 'Cash Payouts'" class="row process-info">
                                            <div class="col">
                                                <span>{{fundingPledged(campaign)}}</span>
                                                <i class="fa fa-bitcoin" aria-hidden="true"></i>
                                                IN <small>(last 30 days)</small>
                                            </div>

                                            <div class="col">
                                                <span>$0.00</span>
                                                <i class="fa fa-bitcoin" aria-hidden="true"></i>
                                                OUT <small>(last 30 days)</small>
                                            </div>

                                            <div class="col">
                                                <span>{{numSupporters(campaign)}}</span>
                                                supporters
                                            </div>

                                            <!-- <div class="col">
                                                <span>{{remaining(campaign).time}}</span>
                                                {{remaining(campaign).suffix}}
                                            </div> -->
                                        </div>

                                        <div v-if="campaignModel(campaign) == 'Direct Donation'" class="row process-info">
                                            <div class="col">
                                                <span>{{fundingGoal(campaign)}}</span>
                                                last 24hrs
                                            </div>

                                            <div class="col">
                                                <span>{{fundingPledged(campaign)}}</span>
                                                last 30 days
                                            </div>

                                            <div class="col">
                                                <span>{{numSupporters(campaign)}}</span>
                                                supporters
                                            </div>

                                            <!-- <div class="col">
                                                <span>{{remaining(campaign).time}}</span>
                                                {{remaining(campaign).suffix}}
                                            </div> -->
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <Categories />
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

/* Import components. */
import Categories from './PIF/Categories.vue'

/* Import icons. */
import '@/compiled-icons/bitcoin-cash-logo-text'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        // BitcoinCash,
        Categories,
        // Comics,
    },
    data: () => {
        return {
            campaigns: [],
            usd: null,
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getCampaign',
        ]),

        ...mapGetters('utils', [
            'getCategoryDisplay',
            'getMarkdown',
        ]),

    },
    methods: {

        path(_campaign) {
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
            // this.$router.push(`@${owner.slug}/${extSlug}`)
            return `/@${owner.slug}/${extSlug}`

        },

        /**
         * Load Featured Campaigns
         */
        async loadFeatured() {
            /* Request campaigns. */
            const campaigns = await Promise.all([
                this.getCampaign('bchpizza', 'bch-for-pizza'), // Adoption
                this.getCampaign('bchplease', 'pay-it-forward'), // Community
                this.getCampaign('memo', 'memo'), // DApp
                this.getCampaign('bchplease', 'cash-devops'), // Education
                this.getCampaign('naomibrockwell', 'naomi-brockwell-tv'), // Film & Video
                this.getCampaign('blockchainpoker', 'blockchain-poker'), // Fun & Games
                this.getCampaign('bu', 'bitcoin-cashdrive'), // Hardware
                this.getCampaign('eatbch', 'help-us-deliver-food-for-one-month'), // Health & Wellness
                this.getCampaign('bchn', 'bitcoin-cash-node-initiative'), // Infrastructure
                this.getCampaign('bchplease', 'nito-cash'), // Privacy
                this.getCampaign('readcash', 'readcash-fund'), // Publishing
                this.getCampaign('idrix', 'veracrypt'), // Security
                this.getCampaign('bchplease', 'nito-gateway'), // Software
                this.getCampaign('coins4clothes', 'coins-4-clothes'), // World View
                this.getCampaign('bitcoincashteens', 'bitcoin-cash-teens-ph'), // Youth

            ])
            .catch(err => console.error(err))
            // console.log('RETRIEVED CAMPAIGNS', campaigns)

            /* Load campaigns. */
            campaigns.forEach(campaign => {
                this.campaigns.push(campaign)
            })

            /* Wait a tick. */
            setTimeout(() => {
                $('.project-love-slider').bxSlider({
                    pagerCustom: '#bx-pager',
                    // mode: 'fade',
                    mode: 'vertical',
                    controls: false,
                    startSlide: 1,
                    touchEnabled : (navigator.maxTouchPoints > 0),
                })
            }, 10)

        },


        /**
         * Campaign Model
         */
        campaignModel(_campaign) {
            /* Validate campaign theme. */
            if (!_campaign || !_campaign.theme) {
                return null
            }

            /* Set theme. */
            const theme = _campaign.theme

            /* Validate theme. */
            if (theme) {
                /* Handle campaign type. */
                switch(theme) {
                case 'direct':
                    return 'Direct Cash'
                case 'assurance':
                    return 'Community Pledge'
                case 'payouts':
                    return 'Cash Payouts'
                default:
                    return 'Unknown campaign type'
                }
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

            return 'n/a'
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

            return 'n/a'
        },

        numSupporters(_campaign) {
            if (_campaign && (_campaign.assurances || _campaign.payouts)) {
                if (_campaign.assurances) {
                    const assuranceid = 0

                    /* Set pledges. */
                    const pledges = _campaign.assurances[assuranceid].pledges

                    /* Validate recipients. */
                    if (!pledges) {
                        return 0
                    }

                    /* Return count. */
                    return Object.keys(pledges).length
                }

                if (_campaign.payouts) {
                    /* Set funders. */
                    const funders = _campaign.payouts.funders

                    /* Validate recipients. */
                    if (!funders) {
                        return 0
                    }

                    /* Return count. */
                    // FIXME: Limit to `nextPayoutAt` > 0
                    return Object.keys(funders).length
                }
            }

            return 'n/a'
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
            }

            return { time: 'n/a', suffix: '' }
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
            if (_campaign && _campaign.media.main) {
                return _campaign.media.main
            } else {
                return null
            }
        },

        displayCategory(_campaign) {
            if (_campaign) {
                return this.getCategoryDisplay(_campaign.category)
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

        displayBackers(_campaign) {
            if (_campaign) {
                return _campaign.backers
            } else {
                return null
            }
        },



        /**
         * Format Requested
         */
        formatRequested(_campaign) {
            /* Set requested amount. */
            const requested = _campaign.requested

            /* Initialize dollar value. */
            let dollar = null

            /* Calculate dollar value. */
            if (_campaign.currency === 'BCH') {
                dollar = requested * 244.18
            } else {
                dollar = requested
            }

            /* Format pledge. */
            const formatted = numeral(dollar).format('$0,0.00')

            /* Return formatted. */
            return formatted
        },

        /**
         * Format Pledged
         */
        formatPledged(_campaign) {
            /* Set pledged amount. */
            const pledged = _campaign.pledged

            /* Initialize dollar value. */
            let dollar = null

            /* Calculate dollar value. */
            if (_campaign.currency === 'BCH') {
                dollar = pledged * 244.18
            } else {
                dollar = pledged
            }

            /* Format pledge. */
            const formatted = numeral(dollar).format('$0,0.00')

            /* Return formatted. */
            return formatted
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
        /* Load featured campaigns. */
        this.loadFeatured()

        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        // console.info(`Market price (USD)`, this.usd)
    },
    mounted: function () {
        /* Animated completion bar. */
        // $('.raised > span').each(function () {
		// 	$(this)
		// 		.data('origWidth', $(this).width())
		// 		.width(0)
		// 		.animate({
		// 			width: $(this).data('origWidth')
		// 		}, 1200);
		// })

    },
}
</script>

<style scoped>
.fa-bitcoin {
    transform: rotate(-15deg);
}

.category-btn, .category-link {
    float: right;
}

.img-rounded {
    width: 470px;
    height: 340px;

    border: 2px solid rgba(180, 180, 180, 0.2);
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px; /* future proofing */
}
</style>

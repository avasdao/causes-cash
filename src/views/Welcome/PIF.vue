<template>
    <div class="project-love">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-sm-9 col-9">
                    <div class="project-love-title">
                        <h2 class="title left-title">Most ❤️ By Our Community</h2>

                        <div class="description left-description">
                            Pay-It-Forward (PIF) and vote for YOUR favorite campaign(s).
                        </div>
                    </div>

                    <ul class="project-love-slider">
                        <li v-for="campaign of campaigns" :key="campaign.id">
                            <div class="project-love-item clearfix">
                                <!-- <router-link to="/details" class="project-love-image"> -->
                                <router-link to="/welcome" class="project-love-image">
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
                                            <span class="ion-location"></span>
                                            {{displayLocation(campaign)}}
                                        </div>
                                    </div>

                                    <div class="process">
                                        <div class="raised">
                                            <span :style="{ width: completedPct(campaign, true) + '%'}"></span>
                                        </div>

                                        <div class="process-info">
                                            <div class="process-pledged">
                                                <span>{{formatRequested(campaign)}}</span>requested
                                            </div>

                                            <div class="process-funded">
                                                <span>{{formatPledged(campaign)}}</span>pledged
                                            </div>

                                            <div class="process-time">
                                                <span>{{displayBackers(campaign)}}</span>backers
                                            </div>

                                            <!-- <div class="process-time">
                                                <span>{{campaign.updatedAt}}</span>days ago
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

        /**
         * Load Featured Campaigns
         */
        async loadFeatured() {
            /* Request campaigns. */
            const campaigns = await Promise.all([
                this.getCampaign('bchpizza', 'bch-for-pizza'), // Adoption
                this.getCampaign('bchplease', 'causes-cash'), // Community
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

        displayLocation(_campaign) {
            if (_campaign) {
                return _campaign.location
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

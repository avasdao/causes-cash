<template>
    <div class="project-love">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-sm-9 col-9">
                    <div class="project-love-title">
                        <h2 class="title left-title">Most ❤️ By Our Community</h2>

                        <div class="description left-description">
                            Pay-It-Forward (PIF) and vote for YOUR favorite cause(s).
                        </div>
                    </div>

                    <ul class="project-love-slider">
                        <li v-for="cause of causes" :key="cause.id">
                            <div class="project-love-item clearfix">
                                <router-link to="/details" class="project-love-image">
                                    <img :src="cause.imgUrl" class="img-rounded" alt="">
                                </router-link>

                                <div class="project-love-item-content project-love-box">
                                    <router-link to="/discover" class="category category-link">
                                        {{cause.category}}
                                    </router-link>

                                    <h3>
                                        <router-link to="/details">
                                            {{cause.title}}
                                        </router-link>
                                    </h3>

                                    <div class="project-love-description">
                                        {{cause.description}}
                                    </div>

                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" :href="cause.ownerLink" target="_blank">
                                                <img :src="cause.ownerAvatar" alt="">
                                            </a>
                                            by
                                            <a class="author-name" :href="cause.ownerLink" target="_blank">
                                                {{cause.ownerName}}
                                            </a>
                                        </div>

                                        <div class="author-address">
                                            <span class="ion-location"></span>
                                            {{cause.location}}
                                        </div>
                                    </div>

                                    <div class="process">
                                        <div class="raised">
                                            <span :style="{ width: completedPct(cause, true) + '%'}"></span>
                                        </div>

                                        <div class="process-info">
                                            <div class="process-pledged">
                                                <span>{{formatRequested(cause)}}</span>requested
                                            </div>

                                            <div class="process-funded">
                                                <span>{{formatPledged(cause)}}</span>pledged
                                            </div>

                                            <div class="process-time">
                                                <span>{{cause.backers}}</span>backers
                                            </div>

                                            <!-- <div class="process-time">
                                                <span>{{cause.updatedAt}}</span>days ago
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
            causes: [],
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getCampaign',
        ]),
    },
    methods: {
        /**
         * Completed Percentage
         */
        completedPct(_cause, _integer = false) {
            /* Calculate completion percentage. */
            const completedPct = (_cause.pledged / _cause.requested)

            /* Validate integer flag. */
            if (_integer) {
                return parseInt(completedPct * 100)
            } else {
                return completedPct
            }
        },

        /**
         * Format Requested
         */
        formatRequested(_cause) {
            /* Set requested amount. */
            const requested = _cause.requested

            /* Initialize dollar value. */
            let dollar = null

            /* Calculate dollar value. */
            if (_cause.currency === 'BCH') {
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
        formatPledged(_cause) {
            /* Set pledged amount. */
            const pledged = _cause.pledged

            /* Initialize dollar value. */
            let dollar = null

            /* Calculate dollar value. */
            if (_cause.currency === 'BCH') {
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
        formatFunded(_cause) {
            /* Set percentage. */
            const pct = _cause.pct

            /* Initialize formatted. */
            let formatted = null

            if (pct === 0) {
                formatted = 'ongoing'
            } else {
                const completePct = this.completedPct(_cause)

                formatted = numeral(completePct).format('0.00%')
            }

            /* Return formatted. */
            return formatted
        },

    },
    created: function () {
        /* Adoption. */
        this.causes.push(this.getCampaign('bch-pizza-0e8c00641daa'))

        /* Community. */
        this.causes.push(this.getCampaign('pay-it-forward-02d76e6ca0f5'))

        /* DApps. */
        this.causes.push(this.getCampaign('memo-6ecee5eb74e2'))

        /* Education. */
        this.causes.push(this.getCampaign('cash-devops-4398271b5ef1'))

        /* Film & Video. */
        this.causes.push(this.getCampaign('naomi-brockwell-tv-fcc6e720c27f'))

        /* Fun & Games. */
        this.causes.push(this.getCampaign('blockchain-poker-52c6e99fff12'))

        /* Hardware. */
        this.causes.push(this.getCampaign('bitcoin-cashdrive-28c4c05ad744'))

        /* Health. */
        this.causes.push(this.getCampaign('help-us-deliver-food-for-one-month-b6ce6ceb819f'))

        /* Infrastructure. */
        // this.causes.push(this.getCampaign('bitcoin-cash-node-initiative-f837f2d17747'))
        this.causes.push(this.getCampaign('bitcoin-verde-node-development-14214ea4cd41'))

        /* Privacy. */
        this.causes.push(this.getCampaign('nito-cash-07dd70f04162'))

        /* Publishing. */
        this.causes.push(this.getCampaign('read-cash-fund-44c7d3cfe560'))

        /* Security. */
        this.causes.push(this.getCampaign('veracrypt-4158c2f0eda0'))

        /* Software. */
        this.causes.push(this.getCampaign('nito-exchange-gateway-443db3869688'))

        /* World View. */
        this.causes.push(this.getCampaign('coins-4-clothes-93e037309d77'))

        /* Youth. */
        this.causes.push(this.getCampaign('bitcoin-cash-teens-ph-ddb1c79caf39'))

    },
    mounted: function () {
        $('.project-love-slider').bxSlider({
            pagerCustom: '#bx-pager',
            mode: 'fade',
            // mode: 'vertical',
            controls: false,
            startSlide: 8,
            touchEnabled : (navigator.maxTouchPoints > 0),
        })

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
    border: 2px solid rgba(180, 180, 180, 0.2);
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px; /* future proofing */
}
</style>

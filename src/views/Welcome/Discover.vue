<template>
    <div class="latest campaign">
        <div class="container">
            <h2 class="title">Discover Causes</h2>

            <div class="campaign-tabs filter-theme">
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
            </div>

            <div class="campaign-content grid">
                <div class="row">

                    <!-- Start causes. -->
                    <div
                        v-for="cause of causes"
                        :key="cause.id"
                        class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular filterlatest">
                        <div class="campaign-item">
                            <!-- <a class="overlay" href="javascript://" @click="loadDetails(cause)">
                                <img :src="cause.coverImgUrl" alt="">
                                <span class="ion-ios-search-strong"></span>
                            </a> -->
                            <a class="category" href="javascript://" @click="loadDetails(cause)">
                                <img :src="cause.coverImgUrl" alt="">
                            </a>

                            <div class="campaign-box">
                                <a class="category" href="javascript://" @click="loadCategory(cause)">
                                    {{cause.category}}
                                </a>

                                <h3>
                                    <a href="javascript://" @click="loadDetails(cause)">
                                        {{cause.title}}
                                    </a>
                                </h3>

                                <div class="campaign-description">
                                    {{cause.summary}}
                                </div>

                                <div class="campaign-author">
                                    <a class="author-icon" :href="cause.authorLink" target="_blank">
                                        <img :src="cause.authorAvatar" alt="">
                                        by {{cause.authorName}}
                                    </a>
                                </div>

                                <div class="process">
                                    <div class="raised">
                                        <span :style="{ width: completedPct(cause, true) + '%'}"></span>
                                    </div>

                                    <div class="process-info">
                                        <div class="process-pledged">
                                            <span>{{formatPledged(cause)}}</span>pledged
                                        </div>

                                        <div class="process-funded">
                                            <span>{{formatFunded(cause)}}</span>funded
                                        </div>

                                        <div class="process-time">
                                            <span>{{cause.updatedAt}}</span>days ago
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End causes. -->

                </div>
            </div>

            <div class="latest-button">
                <router-link to="/discover" class="btn-primary">
                    Discover More Causes
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import modules. */
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
         * Load Category
         */
        loadCategory(_cause) {
            /* Set category. */
            const category = _cause.category

            alert('goto ' + category)
        },

        /**
         * Load Details
         */
        loadDetails(_cause) {
            // console.log('CAUSE', _cause)

            /* Set campaign id. */
            const id = _cause.id

            /* Validate id. */
            if (!id) {
                return alert('Invalid ID!')
            }

            /* Set slug. */
            const slug = _cause.slug

            /* Validate slug. */
            if (!slug) {
                return alert('Invalid slug!')
            }

            /* Set author id. */
            const authorId = _cause.authorId

            /* Validate author id. */
            if (!authorId) {
                return alert('Invalid author!')
            }

            /* Set extended slug. */
            const extSlug = `${slug}-${id.slice(id.lastIndexOf('-') + 1)}`

            /* Load details. */
            this.$router.push(`@${authorId}/${extSlug}`)
        },

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
        /* Cause */
        this.causes.push(this.getCampaign('bitcoin-verde-node-development-14214ea4cd41'))

        /* Cause */
        this.causes.push(this.getCampaign('bchd-node-development-8331b54814ea'))

        /* Cause */
        this.causes.push(this.getCampaign('bitcoin-cash-protocol-development-fundraiser-43eda61596e7'))

        /* Cause */
        this.causes.push(this.getCampaign('knuth-platform-development-158ef2f48aa0'))

        /* Cause */
        this.causes.push(this.getCampaign('bitcoin-cash-node-initiative-f837f2d17747'))

        /* Cause */
        this.causes.push(this.getCampaign('help-us-deliver-food-for-one-month-b6ce6ceb819f'))

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

<style scoped>
.campaign-item img {
    border: 1px solid rgba(180, 180, 180, 0.2);
    padding: 2px;
    cursor: pointer;
}
</style>

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

                    <div
                        v-for="cause of causes"
                        :key="cause.id"
                        class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular filterlatest">
                        <div class="campaign-item">
                            <!-- <div class="overlay" href="javascript://"> -->
                                <img :src="cause.coverImgUrl" alt="">
                            <!-- </div> -->
                            <div class="campaign-box">
                                <router-link class="category" to="/details">
                                    {{cause.category}}
                                </router-link>

                                <h3>
                                    <router-link to="/details">
                                        {{cause.title}}
                                    </router-link>
                                </h3>

                                <div class="campaign-description">
                                    {{cause.summary}}
                                </div>

                                <div class="campaign-author">
                                    <router-link class="author-icon" to="/details">
                                        <img :src="cause.authorAvatar" alt="">
                                        by {{cause.authorName}}
                                    </router-link>
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

/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

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
        this.causes.push(this.getCampaign('bitcoin-abc-43eda61596e7'))

        /* Cause */
        this.causes.push(this.getCampaign('bitcoin-cash-node-f837f2d17747'))

        /* Cause */
        this.causes.push(this.getCampaign('eatbch-b6ce6ceb819f'))

        /* Cause */
        this.causes.push({
            id: '8b0b0f38-df9f-498b-bbbb-e9830763afb9',
            category: 'Our Community',
            title: `Pay It Forward`,
            summary: `A community token (PIF) and fund supporting projects enabling the Freedom to Wealth™.`,
            coverImgUrl: 'https://i.imgur.com/8JY3eiw.jpg',
            authorName: 'Bitcoin Cash Please',
            authorAvatar: 'https://i.imgur.com/f1kian5.png',
            pledged: 0.00,
            fundedPct: 0,
            updatedAt: '1'
        })

        /* Cause */
        this.causes.push({
            id: 'e584e3d9-2fa3-4c41-b4ac-1a7cc42bf7b1',
            category: 'Product Development',
            title: `Nito Cash`,
            summary: `Nito.cash is the most user-friendly, privacy shielding wallet for crypto newcomers.`,
            coverImgUrl: 'https://i.imgur.com/oj1uOCA.png',
            authorName: 'Bitcoin Cash Please',
            authorAvatar: 'https://i.imgur.com/f1kian5.png',
            pledged: 0.00,
            fundedPct: 0,
            updatedAt: '1'
        })

    },
    mounted: function () {
        $('.raised > span').each(function () {
			$(this)
				.data('origWidth', $(this).width())
				.width(0)
				.animate({
					// width: $(this).data('origWidth')
					width: $(this).data('origWidth')
				}, 1200);
		});

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

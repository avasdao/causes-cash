<template>
    <main class="faq">
        <Header />

        <div class="page-title background-page">
			<div class="container">
				<h1>Discover Causes</h1>

				<div class="breadcrumbs">
					<ul>
						<li>
                            <router-link to="/">Home</router-link>
                            <span>/</span>
                        </li>

                        <li>
                            Discover Causes
                        </li>
					</ul>
				</div>
			</div>
		</div>

        <section>
            <div class="campaigns-action clearfix">
                <div class="container">
                    <div class="sort">
                        <span>Sort by:</span>

                        <ul>
                            <li class="active">
                                <a href="javascript://">Recent Project</a>
                            </li>

                            <li>
                                <a href="javascript://">Most Project</a>
                            </li>
                        </ul>
                    </div>

                    <div class="filter">
                        <span>Filter by:</span>

                        <form action="javascript://">
                            <div class="field-select">
                                <select name="s">
                                    <option value="">All Stages</option>
                                    <option value="">Pending</option>
                                    <option value="">Cancel</option>
                                    <option value="">Completed</option>
                                </select>
                            </div>

                            <div class="field-select">
                                <select name="s">
                                    <option value="">All Category</option>
                                    <option value="">Design & Art</option>
                                    <option value="">Book</option>
                                    <option value="">Perfomances</option>
                                    <option value="">Technology</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- .campaigns-action -->
            <div class="campaigns">
                <div class="container">
                    <div class="campaign-content">
                        <div class="row">

                            <!-- Start featured. -->
                            <div class="col-lg-12">
                                <div class="campaign-big-item clearfix">
                                    <a href="javascript://" class="campaign-big-image" @click="loadDetails(featured)">
                                        <!-- <img src="@/assets/img/campaign-big-item.jpg" alt=""> -->
                                        <img :src="featured.coverImgUrl" class="featured-img" alt="">
                                    </a>

                                    <div class="campaign-big-box">
                                        <a href="javascript://" class="category" @click="loadCategory(featured)">
                                            {{featured.category}}
                                        </a>

                                        <h3 class="featured-title">
                                            <a href="javascript://" @click="loadDetails(featured)">
                                                {{featured.title}}
                                            </a>
                                        </h3>

                                        <div class="campaign-description">
                                            {{featured.description}}
                                        </div>

                                        <div class="staff-picks-author">
                                            <div class="author-profile">
                                                <a class="author-avatar" :href="featured.ownerLink" target="_blank">
                                                    <img :src="featured.ownerAvatar" alt="">
                                                </a>
                                                by
                                                <a class="author-name" :href="featured.ownerLink" target="_blank">
                                                    {{featured.ownerName}}
                                                </a>
                                            </div>

                                            <div class="author-address">
                                                <span class="ion-location"></span>
                                                {{featured.location}}
                                            </div>
                                        </div>

                                        <div class="process">
                                            <div class="raised">
                                                <span :style="{ width: getCompletedPct(featured, true) + '%'}"></span>
                                            </div>

                                            <div class="process-info">
                                                <div class="process-pledged">
                                                    <span>{{formatRequested(featured)}}</span>
                                                    requested
                                                </div>

                                                <div class="process-pledged">
                                                    <span>{{formatPledged(featured)}}</span>
                                                    pledged
                                                </div>

                                                <div class="process-funded">
                                                    <span>{{getFormatFunded(featured)}}</span>
                                                    funded
                                                </div>

                                                <div class="process-time">
                                                    <span>{{featured.backers}}</span>
                                                    backers
                                                </div>

                                                <!-- <div class="process-time">
                                                    <span>{{featured.updatedAt}}</span>
                                                    days ago
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End featured. -->

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
                                            <a class="author-icon" :href="cause.ownerLink" target="_blank">
                                                <img :src="cause.ownerAvatar" alt="">
                                                by {{cause.ownerName}}
                                            </a>
                                        </div>

                                        <div class="process">
                                            <div class="process-info">
                                                <div class="raised">
                                                    <span :style="{ width: getCompletedPct(cause, true) + '%'}"></span>
                                                </div>

                                                <div class="process-pledged">
                                                    <span>{{formatPledged(cause)}}</span>pledged
                                                </div>

                                                <div class="process-funded">
                                                    <span>{{getFormatFunded(cause)}}</span>funded
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

                    <div
                        v-if="causes.length < campaigns.length"
                        class="latest-button text-center"
                    >
                        <a href="javascript://" @click="loadMore" class="btn-primary">
                            Load More Causes
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import modules. */
import numeral from 'numeral'

/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        Footer,
        Header,
    },
    data: () => {
        return {
            causes: [],
            campaigns: [],
            featured: null,
            numDisplayed: null,
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getCampaign',
        ]),

        ...mapGetters('utils', [
            'getCompletedPct',
            'getFormatFunded',
            'getShuffledArray',
        ]),

    },
    methods: {
        /**
         * Make Featured
         */
        makeFeatured() {
            /* Initialize featured candidates. */
            const candidates = [
                'bitcoin-verde-node-development-14214ea4cd41',
                'bchd-node-development-8331b54814ea',
                'bitcoin-cash-protocol-development-fundraiser-43eda61596e7',
                'knuth-platform-development-158ef2f48aa0',
                'nito-exchange-desktop-443db3869688',
            ]

            /* Choose a "random" campaign id. */
            // NOTE: Randomly selected.
            const campaignId = candidates[
                Math.floor(Math.random() * candidates.length)
            ]

            /* Set featured campaign. */
            this.featured = this.getCampaign(campaignId)

        },

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
            const ownerId = _cause.ownerId

            /* Validate author id. */
            if (!ownerId) {
                return alert('Invalid author!')
            }

            /* Set extended slug. */
            const extSlug = `${slug}-${id.slice(id.lastIndexOf('-') + 1)}`

            /* Load details. */
            this.$router.push(`@${ownerId}/${extSlug}`)
        },

        /**
         * Load More
         */
        loadMore() {
            /* Set number of (currently) displayed. */
            const numDisplayed = this.causes.length

            /* Set total number of campaigns. */
            const numCampaigns = this.campaigns.length

            /* Initialize number to display. */
            let numToDisplay = 0

            /* Set number of campaigns to display. */
            if (numCampaigns - numDisplayed > 3) {
                numToDisplay = 3
            } else {
                numToDisplay = numCampaigns - numDisplayed
            }

            /* Add campaigns to causes. */
            for (let i = 0; i < numToDisplay; i++) {
                /* Add campaign to cause. */
                this.causes.push(this.getCampaign(this.campaigns[numDisplayed + i]))
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

    },
    created: function () {
        /* Initialize number of campaigns displayed. */
        this.numDisplayed = 9

        /* Make a featured campaign. */
        this.makeFeatured()

        /* Initialize all qualified campaigns. */
        this.campaigns = [
            'bch-pizza-0e8c00641daa',
            'bchd-node-development-8331b54814ea',
            'bitcoin-cash-protocol-development-fundraiser-43eda61596e7',
            'bitcoin-verde-node-development-14214ea4cd41',
            'blockchain-poker-52c6e99fff12',
            'coins-4-clothes-93e037309d77',
            'crescent-cash-303ceda57eba',
            'knuth-platform-development-158ef2f48aa0',
            'memo-6ecee5eb74e2',
            'naomi-brockwell-tv-fcc6e720c27f',
            'nito-cash-07dd70f04162',
            'nito-exchange-desktop-443db3869688',
            'read-cash-fund-44c7d3cfe560',
            'veracrypt-4158c2f0eda0',
        ]

        /**
         * Remove Item Once
         */
        function _removeItemOnce(arr, value) {
            const index = arr.indexOf(value)

            if (index > -1) {
                arr.splice(index, 1);
            }

            return arr
        }

        /* Set (featured) extended slug. */
        const extSlug = `${this.featured.slug}-${this.featured.id
            .slice(this.featured.id.lastIndexOf('-') + 1)}`

        /* Remove featured campaign. */
        _removeItemOnce(this.campaigns, extSlug)

        /* Shuffle campaigns (array). */
        this.getShuffledArray(this.campaigns)

        /* Initialize number of campaigns to display. */
        let numToDisplay = 0

        /* Set number of campaigns to display. */
        if (this.campaigns.length > 9) {
            numToDisplay = 9
        } else {
            numToDisplay = this.campaigns.length
        }

        /* Add campaigns to causes. */
        for (let i = 0; i < numToDisplay; i++) {
            /* Add campaign to cause. */
            this.causes.push(this.getCampaign(this.campaigns[i]))
        }

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

.featured-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.featured-img {
    border: 1px solid rgba(180, 180, 180, 0.2);
    width: 570px;
    height: 350px;
}
/* TODO: Add media queries. */

.process-info div span {
    margin-right: 60px !important;
}
</style>

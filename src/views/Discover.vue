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
                                    <a href="javascript://" class="campaign-big-image">
                                        <!-- <img src="@/assets/img/campaign-big-item.jpg" alt=""> -->
                                        <img :src="featured.coverImgUrl" class="featured-img" alt="">
                                    </a>

                                    <div class="campaign-big-box">
                                        <a href="javascript://" class="category">
                                            {{featured.category}}
                                        </a>

                                        <h3>
                                            <a href="javascript://">
                                                {{featured.title}}
                                            </a>
                                        </h3>

                                        <div class="campaign-description">
                                            {{featured.description}}
                                        </div>

                                        <div class="staff-picks-author">
                                            <div class="author-profile">
                                                <a class="author-avatar" :href="featured.authorLink" target="_blank">
                                                    <img :src="featured.authorAvatar" alt="">
                                                </a>
                                                by
                                                <a class="author-name" :href="featured.authorLink" target="_blank">
                                                    {{featured.authorName}}
                                                </a>
                                            </div>

                                            <div class="author-address">
                                                <span class="ion-location"></span>
                                                {{featured.location}}
                                            </div>
                                        </div>

                                        <div class="process">
                                            <div class="raised">
                                                <span :style="{ width: completedPct(featured, true) + '%'}"></span>
                                            </div>

                                            <div class="process-info">
                                                <div class="process-pledged">
                                                    <span>{{formatPledged(featured)}}</span>pledged
                                                </div>

                                                <div class="process-funded">
                                                    <span>{{formatFunded(featured)}}</span>funded
                                                </div>

                                                <div class="process-time">
                                                    <span>{{featured.backers}}</span>backers
                                                </div>

                                                <!-- <div class="process-time">
                                                    <span>{{featured.updatedAt}}</span>days ago
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

                    <div class="latest-button text-center">
                        <a href="javascript://" class="btn-primary">
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
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getCampaign',
        ]),

        featured() {
            /* Initialize featured candidates. */
            const candidates = [
                'bitcoin-verde-14214ea4cd41',
                'bchd-8331b54814ea',
                'bitcoin-abc-43eda61596e7',
                'knuth-158ef2f48aa0',
            ]

            /* Choose a "random" campaign id. */
            // NOTE: Randomly selected.
            const campaignId = candidates[
                Math.floor(Math.random() * candidates.length)
            ]

            /* Set featured campaign. */
            const featured = this.getCampaign(campaignId)

            /* Return featured. */
            return featured
        },
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
        this.causes.push(this.getCampaign('bitcoin-verde-14214ea4cd41'))

        /* Cause */
        this.causes.push(this.getCampaign('bchd-8331b54814ea'))

        /* Cause */
        this.causes.push(this.getCampaign('bitcoin-abc-43eda61596e7'))

        /* Cause */
        this.causes.push(this.getCampaign('knuth-158ef2f48aa0'))

        /* Cause */
        this.causes.push(this.getCampaign('bitcoin-cash-node-f837f2d17747'))

        /* Cause */
        this.causes.push(this.getCampaign('eatbch-b6ce6ceb819f'))

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

.featured-img {
    border: 1px solid rgba(180, 180, 180, 0.2);
    width: 570px;
    height: 350px;
}
/* TODO: Add media queries. */

</style>

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
                                    {{campaign.category}}
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
                                    <div class="raised">
                                        <span :style="{ width: completedPct(campaign, true) + '%'}"></span>
                                    </div>

                                    <div class="process-info">
                                        <div class="process-pledged">
                                            <span>{{formatPledged(campaign)}}</span>pledged
                                        </div>

                                        <div class="process-funded">
                                            <span>{{formatFunded(campaign)}}</span>funded
                                        </div>

                                        <div class="process-time">
                                            <span>{{campaign.updatedAt}}</span>days ago
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
            campaigns: [],
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getCampaign',
        ]),
    },
    methods: {
        /**
         * Load Featured Campaigns
         */
        async loadFeatured() {
            /* Request campaigns. */
            const campaigns = await Promise.all([
                this.getCampaign('bitcoinverde','bitcoin-verde-node-development'),
                this.getCampaign('bchd', 'bchd-node-development'),
                this.getCampaign('bitcoinabc', 'bitcoin-cash-protocol-development-fundraiser'),
                this.getCampaign('knuth', 'knuth-platform-development'),
                this.getCampaign('bchn', 'bitcoin-cash-node-initiative'),
                this.getCampaign('eatbch', 'help-us-deliver-food-for-one-month'),
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
    created: function () {
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
</style>

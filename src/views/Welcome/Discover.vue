<template>
    <div class="latest campaign">
        <div class="container">
            <h2 class="title">Discover Causes</h2>

            <div class="campaign-tabs filter-theme">
                <button class="button is-checked" data-filter=".filterinteresting">
                    Ending Soon
                </button>

                <button class="button" data-filter=".filterpopular">
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
                        v-for="campaign of campaigns"
                        :key="campaign.id"
                        class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular filterlatest">
                        <div class="campaign-item">
                            <!-- <div class="overlay" href="javascript://"> -->
                                <img :src="campaign.coverImgUrl" alt="">
                            <!-- </div> -->
                            <div class="campaign-box">
                                <a href="javascript://" class="category">{{campaign.category}}</a>

                                <h3>
                                    <a href="javascript://">{{campaign.title}}</a>
                                </h3>

                                <div class="campaign-description">
                                    {{campaign.summary}}
                                </div>

                                <div class="campaign-author">
                                    <a class="author-icon" href="javascript://">
                                        <img :src="campaign.authorImgUrl" alt=""></a>
                                        by <a class="author-name" href="javascript://">{{campaign.authorName}}</a>
                                </div>

                                <div class="process">
                                    <div class="raised">
                                        <span></span>
                                    </div>

                                    <div class="process-info">
                                        <div class="process-pledged">
                                            <span>{{formatAmount(campaign.pledged)}}</span>pledged
                                        </div>

                                        <div class="process-funded">
                                            <span>{{formatFunded(campaign.fundedPct)}}</span>funded
                                        </div>

                                        <div class="process-time">
                                            <span>{{campaign.lastUpdate}}</span>days ago
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="latest-button"><a href="javascript://" class="btn-primary">View all Causes</a></div>
        </div>
    </div>
</template>

<script>
/* Import modules. */
import numeral from 'numeral'

/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

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
        //
    },
    methods: {
        /**
         * Format Amount
         */
        formatAmount(_amount) {
            return numeral(_amount).format('$0,0.00')
        },

        /**
         * Format Funded
         */
        formatFunded(_pct) {
            if (_pct === 0) {
                return 'ongoing'
            } else {
                return numeral(_pct).format('0.00%')
            }
        },
    },
    created: function () {
        /* Campaign */
        this.campaigns.push({
            id: '91c22c50-f2a4-470a-9679-452240c032cf',
            category: 'Infrastructure Development',
            title: `Bitcoin Cash Protocol Development Fundraiser`,
            summary: `Bitcoin ABC develops, maintains and secures the most essential Bitcoin Cash infrastructure, our full node software which is used to mine almost every Bitcoin Cash block.`,
            coverImgUrl: 'https://i.imgur.com/1KA9cYe.jpg',
            authorName: 'Bitcoin ABC',
            authorImgUrl: 'https://i.imgur.com/AmFwzEx.png',
            pledged: 1450680.00,
            fundedPct: 0.4396,
            lastUpdate: '2'
        })

        /* Campaign */
        this.campaigns.push({
            id: '2e4ac230-3e24-43a0-9ce5-4c1783d6ea66',
            category: 'Infrastructure Development',
            title: `Bitcoin Cash Node Initiative`,
            summary: `The primary goal of the Bitcoin Cash Node initiative is to provide a safe and professional node implementation that will neutrally follow the longest Bitcoin Cash chain without contributing to the risk of a chain split.`,
            coverImgUrl: 'https://i.imgur.com/SClCyuv.png',
            authorName: 'Bitcoin Cash Node',
            authorImgUrl: 'https://i.imgur.com/WzqwbU2.png',
            pledged: 36711.38,
            fundedPct: 0,
            lastUpdate: '2'
        })

        /* Campaign */
        this.campaigns.push({
            id: '52baf5aa-5297-4dc6-9995-9deb328fcec6',
            category: 'Health & Wellness',
            title: `eatBCH`,
            summary: `eatBCH is not a typical charity. We simply provide food to people that prepare and deliver meals to their community. Kind of like when a neighbor knocks on your door to share a freshly baked slice of apple pie.`,
            coverImgUrl: 'https://i.imgur.com/IdIsYhz.jpg',
            authorName: 'eatBCH',
            authorImgUrl: 'https://i.imgur.com/rIEYsKy.png',
            pledged: 0.00,
            fundedPct: 0,
            lastUpdate: '1'
        })

        /* Campaign */
        this.campaigns.push({
            id: '8b0b0f38-df9f-498b-bbbb-e9830763afb9',
            category: 'Our Community',
            title: `Pay It Forward`,
            summary: `A community token (PIF) and fund supporting projects enabling the Freedom to Wealth™.`,
            coverImgUrl: 'https://i.imgur.com/8JY3eiw.jpg',
            authorName: 'Bitcoin Cash Please',
            authorImgUrl: 'https://i.imgur.com/f1kian5.png',
            pledged: 0.00,
            fundedPct: 0,
            lastUpdate: '1'
        })

        /* Campaign */
        this.campaigns.push({
            id: 'e584e3d9-2fa3-4c41-b4ac-1a7cc42bf7b1',
            category: 'Product Development',
            title: `Nito Cash`,
            summary: `Nito.cash is the most user-friendly, privacy shielding wallet for crypto newcomers.`,
            coverImgUrl: 'https://i.imgur.com/ilXSAlp.jpg',
            authorName: 'Bitcoin Cash Please',
            authorImgUrl: 'https://i.imgur.com/f1kian5.png',
            pledged: 0.00,
            fundedPct: 0,
            lastUpdate: '1'
        })

        /* Campaign */
        this.campaigns.push({
            id: '32988e8e-dd6a-4bd1-99cb-afc19be326e4',
            category: 'Business & Commerce',
            title: `Pioneer Cash`,
            summary: `Empowering the community with the tools needed to onboard every merchant in their circle.`,
            coverImgUrl: 'https://i.imgur.com/Ya0rfps.jpg',
            authorName: 'Bitcoin Cash Please',
            authorImgUrl: 'https://i.imgur.com/f1kian5.png',
            pledged: 0.00,
            fundedPct: 0,
            lastUpdate: '1'
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

<template>
    <main class="campaign-detail">
        <Header :campaign="campaign" />
        <Title :campaign="campaign" />
        <Content :campaign="campaign" />
        <History :campaign="campaign" />
        <Footer />
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

import Content from './Details/Content.vue'
import History from './Details/History.vue'
import Title from './Details/Title.vue'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

function makePages() {
    $.each(this.owl.userItems, function(i) {
        $('.owl-controls .owl-page').eq(i)
        .css({
            'background': 'url(' + $(this).find('img').attr('src') + ')',
            'background-size': 'cover',
        })
    })
}

export default {
    components: {
        Footer,
        Header,

        Content,
        History,
        Title,
    },
    data: () => {
        return {
            campaign: null,
            campaignId: null,
            // referrerId: null,
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getCampaign',
            'getDescription',
            'getSummary',
        ]),

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

    },
    created: function () {
        /* Set cause. */
        const cause = this.$route.params.cause

        /* Validate cause. */
        if (cause && cause.lastIndexOf('-') !== -1) {
            /* Set campaign id. */
            this.campaignId = cause.slice(0, cause.lastIndexOf('-'))
            // console.log('this.campaignId', this.campaignId)

            /* Set referrer id. */
            const referrerId = cause.slice(cause.lastIndexOf('-') + 1)
            // console.log('referrerId', referrerId)

            /* Set extended slug. */
            const extSlug = `${this.campaignId}-${referrerId}`

            /* Set owner id. */
            // FIXME: Pull this dynamicaly.
            const ownerId = 'BCHPlease'

            /* Set campaign. */
            this.campaign = this.getCampaign(ownerId, extSlug)

            /* Set extended slug (to campaign). */
            this.campaign.extSlug = extSlug

            /* Set referrer id (to campaign). */
            this.campaign.referrerId = referrerId
        }

        /* Set description. */
        const description = this.getDescription(
            this.campaign.ownerId, this.campaign.extSlug)
        // console.log('STORY (description):', description)

        // FOR DEVELOPMENT PURPOSES ONLY
        // this.description = null

        /* Validate description. */
        if (!description) {
            /* Set asset. */
            const asset = {
                owner: this.campaign.ownerId,
                id: `${this.campaign.slug}.description`,
                target: this.campaign.description,
            }

            /* Request asset update. */
            this.updateAsset(asset)
        }

        /* Set summary. */
        const summary = this.getSummary(
            this.campaign.ownerId, this.campaign.extSlug)
        // console.log('STORY (summary):', summary)

        // FOR DEVELOPMENT PURPOSES ONLY
        // this.summary = ''

        /* Validate summary. */
        if (!summary) {
            /* Set asset. */
            const asset = {
                owner: this.campaign.ownerId,
                id: `${this.campaign.slug}.summary`,
                target: this.campaign.summary,
            }

            /* Request asset update. */
            this.updateAsset(asset)
        }

    },
    mounted: function () {
        /*  [ Project Love Slider ]
        - - - - - - - - - - - - - - - - - - - - */
        $('.project-love-slider').bxSlider({
            pagerCustom: '#bx-pager',
            mode: 'vertical',
            controls: false,
        })

        /*  [ Owl Campaign ]
        - - - - - - - - - - - - - - - - - - - - */
        $("#owl-campaign").owlCarousel({
            navigation: true,
            navigationText: ['<span class="ion-ios-arrow-back"></span>', '<span class="ion-ios-arrow-forward"></span>'],
            loop:true,
            autoplay:true,
            autoplayTimeout:3000,
            autoplayHoverPause:true,
            singleItem: true,
            afterInit: makePages,
            afterUpdate: makePages
        })

    },
}
</script>

<style scoped>
/*  */
</style>

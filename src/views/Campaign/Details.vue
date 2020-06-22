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
            ownerSlug: null,
            slug: null,
            extSlug: null,

            campaign: null,
            campaignId: null,
            // referrerId: null,
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
            'getCampaign',
        ]),

    },
    methods: {
        ...mapActions('campaigns', [
            // 'updateAsset',
        ]),

    },
    created: async function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
        console.log('OWNER SLUG', this.ownerSlug)

        /* Set extended slug. */
        this.extSlug = this.$route.params.extSlug
        console.log('EXTENDED SLUG', this.extSlug)

        /* Validate extended slug. */
        if (this.extSlug && this.extSlug.lastIndexOf('-') !== -1) {
            /* Set campaign id. */
            this.campaignId = this.extSlug.slice(0, this.extSlug.lastIndexOf('-'))
            // console.log('this.campaignId', this.campaignId)

            /* Set campaign slug. */
            this.slug = this.extSlug.slice(0, this.extSlug.lastIndexOf('-'))
            console.log('CAMPAIGN SLUG', this.slug)

            /* Set referrer id. */
            this.referrerId = this.extSlug.slice(this.extSlug.lastIndexOf('-') + 1)
            console.log('REFERRER ID', this.referrerId)

            /* Set campaign. */
            console.log('REQUESTING CAMPAIGN');
            this.campaign = await this.getCampaign(this.ownerSlug, this.slug)
            console.log('CAMPAIGN RESULTS', this.campaign);

            /* Set referrer id (to campaign). */
            this.campaign.referrerId = this.referrerId

            console.log('CAMPAIGN', this.campaign)
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

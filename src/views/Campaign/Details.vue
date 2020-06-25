<template>
    <main class="campaign-detail">
        <Header :campaign="campaign" />
        <Title :campaign="campaign" />
        <Content :campaign="campaign" :fundId="fundId" />
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
// const $ = window.jQuery

export default {
    components: {
        Footer,
        Header,

        Content,
        History,
        Title,
    },
    watch: {
        $route(_to, _from) {
            // console.log('WATCHING ROUTE (to):', _to)
            // console.log('WATCHING ROUTE (from):', _from)

            /* Validate query change. */
            if (_to.query !== _from.query) {
                /* Set extended slug. */
                this.fundId = Object.keys(_to.query)[0]
                console.log('FUND ID (from query)', this.fundId)

                // TODO: Adjust for mobile
                // window.scrollTo({ top: 1050, behavior: 'smooth' })
                window.scrollTo({ top: 425, behavior: 'smooth' })
            }
        }
    },
    data: () => {
        return {
            ownerSlug: null,
            slug: null,
            extSlug: null,

            campaign: null,
            campaignId: null,
            fundId: null,
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
        console.log('PARAMS', this.$route.params);
        console.log('QUERY', this.$route.query);
        console.log('HASH', this.$route.hash);
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
        console.log('OWNER SLUG', this.ownerSlug)

        /* Set extended slug. */
        this.extSlug = this.$route.params.extSlug
        console.log('EXTENDED SLUG', this.extSlug)

        /* Validate hash. */
        // if (this.$route.hash) {
        //     /* Set extended slug. */
        //     this.fundId = this.$route.hash.slice(1)
        //     console.log('FUND ID (from hash)', this.fundId)
        // }

        /* Validate query. */
        if (this.$route.query && Object.keys(this.$route.query)[0]) {
            /* Set extended slug. */
            this.fundId = Object.keys(this.$route.query)[0]
            console.log('FUND ID (from query)', this.fundId)
        }

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
        //
    },
}
</script>

<style scoped>
/*  */
</style>

<template>
    <!-- <div class="page-title background-campaign"> -->
    <div class="page-title" :style="{ 'background-image': 'url(' + bannerImg + ')' }">
        <div class="container">
            <h1>{{title}}</h1>

            <div class="breadcrumbs">
                <ul>
                    <li>
                        <a href="/">Home</a><span>/</span>
                    </li>

                    <li>
                        {{title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    props: {
        campaign: Object,
    },
    components: {
        //
    },
    data: () => {
        return {
            title: null,
            bannerUrl: null,
        }
    },
    watch: {
        campaign: function (_campaign) {
            if (_campaign && _campaign.title) {
                // console.log('CAMPAIGN HAS CHANGED, UPDATE TITLE!!', _campaign)

                /* Update banner. */
                this.updateBanner()

                /* Update title. */
                this.updateTitle()
            }
        },
    },
    computed: {
        /**
         * Banner Image
         */
        bannerImg() {
            return this.bannerUrl
        },
    },
    methods: {
        /**
         * Update Banner
         */
        updateBanner() {
            if (this.campaign && this.campaign.media && this.campaign.media.banner) {
                /* Set banner URL. */
                this.bannerUrl = this.campaign.media.banner
            } else {
                /* Set banner URL. */
                // this.bannerUrl = 'https://i.imgur.com/3UPJZT6.jpg' // sofa
                // this.bannerUrl = 'https://i.imgur.com/2NuUJxd.jpg' // headphones
                this.bannerUrl = 'https://i.imgur.com/JQbiIbD.jpg' // working @ desk
                // this.bannerUrl = 'https://i.imgur.com/9vNfGgt.jpg' // organized desk
            }
        },

        /**
         * Update Title
         */
        updateTitle() {
            if (this.campaign && this.campaign.title) {
                /* Set title. */
                this.title = this.campaign.title
            }
        }
    },
    created: function () {
        /* Update banner. */
        this.updateBanner()

        /* Update title. */
        this.updateTitle()

    },
}
</script>

<style scoped>
/*  */
</style>

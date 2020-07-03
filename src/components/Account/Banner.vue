<template>
    <!-- <div class="page-title background-page"> -->
    <div class="page-title" :style="{ 'background-image': 'url(' + bannerImg + ')' }">
        <div class="container">
            <h1 class="text-capitalize">@{{this.ownerSlug}} Wallet</h1>
            <div class="breadcrumbs">
                <ul>
                    <li>
                        <router-link to="/">
                            Home
                        </router-link>
                        <span>/</span>
                    </li>

                    <li>
                        <router-link :to="'/@' + this.ownerSlug">
                            Account
                        </router-link>
                        <span>/</span>
                    </li>

                    <li class="text-capitalize">{{page}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    props: {
        page: String,
    },
    components: {
        //
    },
    data: () => {
        return {
            ownerSlug: null,
        }
    },
    computed: {
        // ...mapGetters('profile', [
        //     'getNickname',
        // ]),

        ...mapGetters([
            'getHelp',
        ]),

        pageName() {
            return this.page
        },

        /**
         * Banner Image
         */
        bannerImg() {
            return 'https://i.imgur.com/9vNfGgt.jpg'
        },
    },
    methods: {
        ...mapActions([
            'displayError',
            'displayNotification',
        ]),

        // ...mapActions('campaigns', [
        //     'addCampaign',
        // ]),

    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

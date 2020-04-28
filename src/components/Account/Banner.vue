<template>
    <div class="page-title background-page">
        <div class="container">
            <h1 class="text-capitalize">@{{this.user}} Wallet</h1>
            <div class="breadcrumbs">
                <ul>
                    <li>
                        <router-link to="/">
                            Home
                        </router-link>
                        <span>/</span>
                    </li>

                    <li>
                        <router-link :to="'/@' + this.user">
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
            user: null,
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
        /* Set user. */
        const user = this.$route.params.pathMatch

        /* Validate user. */
        // FIXME: What should we do if validation fails??
        this.user = user
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

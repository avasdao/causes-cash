<template>
    <v-container>
        <h1>Blank Page</h1>

        <v-skeleton-loader
            class="my-3"
            type="card-heading, list-item-avatar, divider, list-item-three-line, actions"
            elevation=2
            boilerplate
        ></v-skeleton-loader>

    </v-container>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),

    },
    methods: {
        ...mapActions('utils', [
            'report',
            'toast',
        ]),

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

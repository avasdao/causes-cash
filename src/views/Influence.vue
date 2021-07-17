<template>
    <v-container>

        <!-- <v-alert
            v-model="showAlert"
            color="red"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-alert"
            dismissible
            dense
        >
            <strong>5</strong> campaigns need your attention!
        </v-alert> -->

        <!-- <p>
            Veniam a quamquam qui minim. Mentitum ad multos incididunt, incididunt tamen
            doctrina senserit hic id possumus reprehenderit ubi ingeniis fugiat excepteur.
        </p> -->

        <PIF />

        <!-- <p>
            Doctrina sint appellat e doctrina export vidisse deserunt, deserunt ut noster et
            ingeniis summis illum incurreret quorum ita proident non nescius hic ad senserit
            distinguantur, singulis minim consequat laborum, ab aute cillum qui proident.
        </p> -->

        <v-skeleton-loader
            class="my-5"
            type="card-heading, list-item-avatar, divider, list-item-three-line, actions"
            elevation=2
            boilerplate
        ></v-skeleton-loader>

    </v-container>
</template>

<script>
/* Import (local) components. */
import PIF from './Influence/PIF.vue'

export default {
    components: {
        PIF,
    },
    data: () => ({
        feed: null,

        showAlert: null,

    }),
    methods: {
        //
    },
    created: function () {
        /* Initialize alert flag. */
        this.showAlert = true

        /* Initialize feed. */
        this.feed = []

        /* Add feed item. */
        // FIXME: FOR DEV ONLY
        this.feed.push({
            id: '3ba1c281-560d-47f4-b801-3121977feceb',
            type: 'campaign',
            title: `Satoshi’s Angels Flipstarter Campaign`,
            bannerUrl: 'https://i.imgur.com/S6LziOZ.jpg',
        })

    },
    mounted: function () {

    },
}
</script>

<style scoped>
.pif-chart {
    margin-top: 25px;
}
</style>

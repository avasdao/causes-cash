<template>
    <v-container>

        <v-alert
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
        </v-alert>

        <p>
            Veniam a quamquam qui minim. Mentitum ad multos incididunt, incididunt tamen
            doctrina senserit hic id possumus reprehenderit ubi ingeniis fugiat excepteur.
        </p>

        <PIF />

        <p>
            Doctrina sint appellat e doctrina export vidisse deserunt, deserunt ut noster et
            ingeniis summis illum incurreret quorum ita proident non nescius hic ad senserit
            distinguantur, singulis minim consequat laborum, ab aute cillum qui proident.
        </p>

        <v-card
            v-for="item of feed"
            :key="item.id"
            class="mx-auto my-5"
            max-width="400"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                :src="item.bannerUrl"
            ></v-img>

            <v-card-subtitle class="pb-0">
                {{item.title}}
            </v-card-subtitle>

            <v-card-text class="text--primary">
                <v-progress-linear
                    background-color="green lighten-3"
                    color="green lighten-1"
                    value="66.94"
                ></v-progress-linear>

                <div>221.57 / 331.00 BCH (67% completed)</div>
                <div>World View</div>
            </v-card-text>

            <v-card-actions>
                <v-btn
                    color="orange"
                    text
                >
                    14 pledges
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                    color="orange"
                    text
                >
                    30 days left
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-skeleton-loader
            class="mb-5"
            type="card-heading, list-item-avatar, divider, list-item-three-line, actions"
            elevation=2
            boilerplate
        ></v-skeleton-loader>

        <p>
            Quem an proident, si aliqua instituendarum, do nisi quis do doctrina, e labore
            quamquam. Aute adipisicing constias nulla cupidatat si id ipsum tempor sunt
            offendit, laborum tractavissent ad proident sed hic tamen admodum praetermissum,
            ea ipsum quamquam proident ubi nam se duis probant, hic nescius aut constias in
            duis proident aut quae ipsum.
        </p>

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

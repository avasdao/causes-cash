<template>
    <v-dialog
        :value="isOpen"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar dark color="#8dc351">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>PIF Details</v-toolbar-title>

                <!-- <v-spacer></v-spacer> -->

                <!-- <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        @click="$emit('close')"
                    >
                        Submit
                    </v-btn>
                </v-toolbar-items> -->
            </v-toolbar>

            <!-- <v-card-text> -->
                <v-container>
                    <!-- <Gallery /> -->

                    <v-row align="center" class="mx-0">
                        <v-rating
                            :value="4.5"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                        ></v-rating>

                        <div class="grey--text ml-4">
                            4.5 (413)
                        </div>
                    </v-row>

                    <p>
                        In the following proposal, you will learn about us, our past activities and our future goals for BCH. This proposal is focused on our community and educational outreach, with a realistic and achievable roadmap of our BCH activities.
                    </p>

                    <!-- <Pledge class="my-10" /> -->

                    <h2 class="my-5">Recent events</h2>

                    <!-- <Events class="my-5" /> -->

                    <h2 class="my-5">Financials</h2>

                    <!-- <Financials class="my-5" /> -->

                </v-container>

            <!-- </v-card-text> -->
        </v-card>
    </v-dialog>
</template>

<script>
/* Import (local) components. */
// import Events from './Details/Events'
// import Financials from './Details/Financials'
// import Gallery from './Details/Gallery'
// import Pledge from './Details/Pledge'

export default {
    props: {
        isOpen: Boolean,
    },
    components: {
        // Events,
        // Financials,
        // Gallery,
        // Pledge,
    },
    data: () => ({
        e6: 1,
        isOwner: null,
    }),
    computed: {
        //
    },
    methods: {
        //
    },
    created: function () {
        /* Initialize owner flag. */
        this.isOwner = 'no'
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
span.headline {
    font-size: 1.1em !important;
}

.contact-notice {
    font-size: 0.9em;
    line-height: 1.5;
}

/* FOR DEVELOPMENT ONLY */
@keyframes metronome-example {
    from {
        transform: scale(.5);
    }

    to {
        transform: scale(1);
    }
}
.v-avatar--metronome {
    animation-name: metronome-example;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
</style>

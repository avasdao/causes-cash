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

                <v-toolbar-title>{{title}}</v-toolbar-title>
            </v-toolbar>

            <v-container>
                <Gallery :media="media" />

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

                <p v-html="summary" />

                <Pledge class="my-10" :campaign="campaign" />

                <p v-html="description" />

                <!-- <h2 class="my-5">Recent events</h2> -->

                <!-- <Events class="my-5" /> -->

                <!-- <h2 class="my-5">Financials</h2> -->

                <!-- <Financials class="my-5" /> -->

            </v-container>

        </v-card>
    </v-dialog>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import (local) components. */
// import Events from './Campaign/Events'
// import Financials from './Campaign/Financials'
import Gallery from './Campaign/Gallery'
import Pledge from './Campaign/Pledge'

export default {
    props: {
        isOpen: Boolean,
    },
    components: {
        // Events,
        // Financials,
        Gallery,
        Pledge,
    },
    data: () => ({
        campaign: null,
        e6: 1,
        isOwner: null,

        title: null,
        summary: null,
        description: null,
        media: null,
    }),
    computed: {
        ...mapGetters([
            'getHelp',
            'getCampaignDisplay',
        ]),

        ...mapGetters('campaigns', [
            'getCampaign'
        ]),

        ...mapGetters('utils', [
            'getMarkdown'
        ]),

        goal() {
            if (!this.campaign) {
                return null
            }

            return this.campaign.goal
        },

        recipient() {
            if (!this.campaign) {
                return null
            }

            return this.campaign.recipient
        },

        expires() {
            if (!this.campaign) {
                return null
            }

            return this.campaign.expires
        },

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

    },
    created: async function () {
        /* Initialize owner flag. */
        this.isOwner = 'no'

        console.log('CAMPAIGN DISPLAY', this.getCampaignDisplay)
        // const campaign = this.getCampaign()

        if (this.getCampaignDisplay) {
            this.campaign = await this.getCampaign(this.getCampaignDisplay)
            console.log('CAMPAIGN', this.campaign)

            this.title = this.campaign.title

            this.summary = this.getMarkdown(this.campaign.summary)

            this.description = this.getMarkdown(this.campaign.description)

            this.media = this.campaign.media
        }
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

<template>
    <v-card flat tile>
        <v-window v-model="onboarding" reverse>
            <v-window-item v-for="n in length" :key="`card-${n}`">
                <v-card color="grey" height="200">
                    <v-img
                        :src="mediaManager"
                        width="100%"
                        height="100%"
                    />
                </v-card>
            </v-window-item>
        </v-window>

        <v-card-actions class="justify-space-between">
            <v-btn text @click="prev">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-item-group
                v-model="onboarding"
                class="text-center"
                mandatory
            >
                <v-item
                    v-for="n in length"
                    :key="`btn-${n}`"
                    v-slot:default="{ active, toggle }"
                >
                    <v-btn
                        :input-value="active"
                        icon
                        @click="toggle"
                    >
                        <v-icon>mdi-record</v-icon>
                    </v-btn>
                </v-item>
            </v-item-group>

            <v-btn
                text
                @click="next"
            >
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        media: Object,
    },
    data: () => ({
        length: 3,
        onboarding: 0,
    }),
    computed: {
        // ...mapGetters([
        //     'getHelp',
        // ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),

        mediaManager() {
            if (this.media) {
                return this.media.main
            } else {
                return null
            }
        },

    },
    methods: {
        next () {
            this.onboarding = this.onboarding + 1 === this.length
                ? 0
                : this.onboarding + 1
        },

        prev () {
            this.onboarding = this.onboarding - 1 < 0
                ? this.length - 1
                : this.onboarding - 1
        },

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

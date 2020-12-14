<template>
    <v-card class="mx-auto" max-width="480" flat>
        <v-card-text class="pt-0">
            <!-- <div class="row subheading font-weight-light mb-0"> -->
            <div class="row mb-0">
                <div class="col-4 text-right">
                    Nickname
                </div>

                <div class="col-8">
                    {{getNickname}}
                </div>
            </div>

            <!-- <div class="row subheading font-weight-light mt-0"> -->
            <div class="row mt-0">
                <div class="col-4 text-right">
                    Email
                </div>

                <div class="col-8">
                    {{getEmail}}
                </div>
            </div>

            <v-sheet
                class="v-sheet--offset mx-auto mt-5 mb-3"
                color="light-blue"
                elevation="12"
                rounded
            >
                <v-sparkline
                    :labels="activityLabels"
                    :value="activityValues"
                    color="white"
                    line-width="2"
                    padding="16"
                ></v-sparkline>
            </v-sheet>

            <div class="subheading font-weight-light grey--text">
                Showing the last 7 days
            </div>

            <v-divider class="my-2"></v-divider>

            <div>
                <v-icon class="mr-2" small>
                    mdi-clock
                </v-icon>

                <span class="caption grey--text font-weight-light">
                    last profile activity was 26 minutes ago
                </span>
            </div>

            <v-btn color="red accent-2" block x-large @click="signOut" class="mt-10">
                <span class="white--text">Sign Out</span>
            </v-btn>

        </v-card-text>

    </v-card>
</template>

<script>
/* Import modules. */
import moment from 'moment'

/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        activityLabels: null,
        activityValues: null,
    }),
    computed: {
        ...mapGetters([
            'getApiProvider',
        ]),

        ...mapGetters('profile', [
            'getEmail',
            'getNickname',
        ]),

    },
    methods: {
        ...mapActions('profile', [
            'destroyProfile',
        ]),

        ...mapActions('utils', [
            'toast',
        ]),

        /**
         * Sign Out
         *
         * TODO: Show a notification of confirmation.
         */
        signOut() {
            /* Load home. */
            this.$router.replace('/')

            /* Reset profile. */
            this.destroyProfile()

            /* Show notification. */
            this.toast(['Success!', `You've been signed out successfully`, 'success'])
        },

    },
    created: function () {
        const today = `${moment().format('M')}/${moment().format('D')}`
        const age1 = `${moment().subtract(1, 'days').format('M')}/${moment().subtract(1, 'days').format('D')}`
        const age2 = `${moment().subtract(2, 'days').format('M')}/${moment().subtract(2, 'days').format('D')}`
        const age3 = `${moment().subtract(3, 'days').format('M')}/${moment().subtract(3, 'days').format('D')}`
        const age4 = `${moment().subtract(4, 'days').format('M')}/${moment().subtract(4, 'days').format('D')}`
        const age5 = `${moment().subtract(5, 'days').format('M')}/${moment().subtract(5, 'days').format('D')}`
        const age6 = `${moment().subtract(6, 'days').format('M')}/${moment().subtract(6, 'days').format('D')}`
        const age7 = `${moment().subtract(7, 'days').format('M')}/${moment().subtract(7, 'days').format('D')}`

        this.activityLabels = [
            age7,
            age6,
            age5,
            age4,
            age3,
            age2,
            age1,
            today,
        ]

        this.activityValues = [
            200,
            675,
            410,
            390,
            310,
            460,
            250,
            240,
        ]
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

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

                <v-toolbar-title>Sponsored Ad</v-toolbar-title>
            </v-toolbar>

            <MyCoinParty />
        </v-card>
    </v-dialog>
</template>

<script>
/* Import components. */
import MyCoinParty from './Ads/MyCoinParty'

export default {
    components: {
        MyCoinParty,
    },
    props: {
        isOpen: Boolean,
    },
    data: () => ({
        //
    }),
    computed: {
        //
    },
    methods: {
        //
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

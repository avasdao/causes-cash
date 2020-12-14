<template>
    <v-dialog
        :value="isOpen"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar
                dark
                color="#8dc351"
            >
                <v-btn
                    icon
                    dark
                    @click="$emit('close')"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>MyCoinParty</v-toolbar-title>
            </v-toolbar>

            <v-container>

                <h1>Come join the Fun</h1>

            </v-container>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
    },
    data: () => ({
        // isShowingOptions: null,

        // notifications: false,
        // sound: true,
        // widgets: false,
    }),
    computed: {
        //
    },
    methods: {
        toggleAdvanced() {
            // this.isShowingOptions = !this.isShowingOptions
        }
    },
    created: function () {
        /* Initialize advanced search options. */
        // this.isShowingOptions = false
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.advanced-search-options {
    margin-top: -5px;
    font-size: 0.8em;
}
.advanced-search-options a {
    color: rgba(255, 0, 0, 0.6);
    text-decoration: none;
}
</style>

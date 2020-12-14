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

                <v-toolbar-title>Search</v-toolbar-title>

                <!-- <v-spacer></v-spacer> -->

                <!-- <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        @click="$emit('close')"
                    >
                        Close
                    </v-btn>
                </v-toolbar-items> -->
            </v-toolbar>

            <v-container>
                <v-text-field
                    label="What are you looking for?"
                    hint="Search for campaigns by name, category or topic"
                    persistent-hint
                    outlined
                ></v-text-field>

                <div class="advanced-search-options text-right">
                    <a href="javascript://" @click="toggleAdvanced">advanced search options</a>
                </div>

            </v-container>

            <v-divider v-if="isShowingOptions"></v-divider>

            <v-list v-if="isShowingOptions" three-line subheader>
                <v-subheader>
                    Advanced Search Options
                </v-subheader>

                <v-list-item>
                    <v-list-item-action>
                        <v-checkbox v-model="notifications"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Notifications</v-list-item-title>
                        <v-list-item-subtitle>
                            Notify me about updates to apps or games that I downloaded
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-checkbox v-model="sound"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Sound</v-list-item-title>
                        <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <v-checkbox v-model="widgets"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>Auto-add widgets</v-list-item-title>
                        <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
    },
    data: () => ({
        isShowingOptions: null,

        notifications: false,
        sound: true,
        widgets: false,
    }),
    computed: {
        //
    },
    methods: {
        toggleAdvanced() {
            this.isShowingOptions = !this.isShowingOptions
        }
    },
    created: function () {
        /* Initialize advanced search options. */
        this.isShowingOptions = false
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

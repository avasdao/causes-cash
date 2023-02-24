<template>
    <v-card class="mx-auto" max-width="480" flat>
        <v-card-text class="pt-0">
            <v-list three-line subheader class="pt-0 mt-0">
                <v-subheader>Application Settings</v-subheader>

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

            <v-divider></v-divider>

            <v-list three-line subheader>
                <v-subheader>Campaign Settings</v-subheader>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Content filtering</v-list-item-title>
                        <v-list-item-subtitle>
                            Set the content filtering level to restrict apps that can be downloaded
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <!-- <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Password</v-list-item-title>
                        <v-list-item-subtitle>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item> -->
            </v-list>

        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        notifications: false,
        sound: true,
        widgets: false,
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

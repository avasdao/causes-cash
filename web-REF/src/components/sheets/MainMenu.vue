<template>
    <v-list>
        <v-subheader>Main Menu</v-subheader>

        <v-list-item @click="$emit('selected', 'flipstarter')">
            <v-list-item-avatar>
                <v-avatar size="32px" tile>
                    <img
                        :src="require('@/assets/flipstarter-logo.png')"
                        alt="Add a Flipstarter campaign"
                    >
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-title>
                Add a Flipstarter campaign
            </v-list-item-title>
        </v-list-item>

        <v-list-item @click="$emit('selected', 'create')">
            <v-list-item-avatar>
                <v-avatar size="32px" tile>
                    <img
                        :src="require('@/assets/logo.png')"
                        alt="Create a NEW campaign"
                    >
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-title>
                Create a Causes campaign
            </v-list-item-title>
        </v-list-item>

        <v-list-item @click="$emit('selected', 'help')">
            <v-list-item-avatar>
                <v-avatar size="32px" tile>
                    <v-icon large color="pink lighten-2">mdi-lifebuoy</v-icon>
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-title>
                24x7 Live Help & Support
            </v-list-item-title>
        </v-list-item>

    </v-list>
</template>

<script>
export default {
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

<style>
/*  */
</style>

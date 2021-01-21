<template>
    <main>
        <!-- Blank component -->
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),

    },
    methods: {
        ...mapActions('utils', [
            'report',
            'toast',
        ]),

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

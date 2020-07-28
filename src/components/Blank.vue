<template>
    <main>
        <!-- content goes here -->
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            //
        }
    },
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

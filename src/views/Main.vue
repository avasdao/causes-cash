<template>
    <main>
        <Influence v-if="getCurrentPage === 'influence'" />
        <Discover v-if="getCurrentPage === 'discover'" />
        <Events v-if="getCurrentPage === 'events'" />
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Discover from './Discover'
import Events from './Events'
import Influence from './Influence'

export default {
    components: {
        Discover,
        Events,
        Influence,
    },
    data: () => ({
        isShowingDiscover: null,
        isShowingEvents: null,
        isShowingInfluence: null,
    }),
    computed: {
        ...mapGetters([
            'getCurrentPage',
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
        /* Initialize Discover. */
        this.isShowingDiscover = true
    },
    mounted: function () {

    },
}
</script>

<template>
    <main>
        <div class="qr-code text-center" v-html="qr" />

        <div>
            Satoshis {{satoshis}}
        </div>

        <ul>
            <li>
                <h4>Please <i class="fa fa-heart text-danger"></i> and support our cause <i class="fa fa-arrow-down"></i></h4>
                <a :href="'https://explorer.bitcoin.com/bch/address/' + pledgeAddress" target="_blank"><strong>{{pledgeAddress}}</strong></a>
            </li>

            <hr />

            <li>
                <h4>Direct Donation</h4>

                <!-- <pre>
                    {{details}}
                </pre> -->

                <div class="fee-desc">
                    <p>
                        3% + €0.20 per pledge
                    </p>

                    <p>
                        Pledges under €10 have a discounted micropledge fee of 5% + €0.05 per pledge
                    </p>
                </div>
            </li>
        </ul>

        <div class="button">
            <a href="javascript://" class="btn-danger" @click="$emit('cancel')">
                <i class="fa fa-times-circle" aria-hidden="true"></i>
                Cancel Backing
            </a>
        </div>
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
    props: {
        campaign: Object,
    },
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
        ...mapActions('campaigns', [
            'addCampaign',
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

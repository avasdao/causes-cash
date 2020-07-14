<template>
    <main>
        <hr />

        <h3>Community Pledge</h3>

        <p>
            Make a pledge that will ONLY be fullfilled if the rest of the community also contributes to the full amount requrested by this campaign.
        </p>

        <div class="mt-3">
            <p>
                3% + €0.20 per pledge
            </p>

            <p>
                Pledges under €10 have a discounted micropledge fee of 5% + €0.05 per pledge
            </p>
        </div>

        <div class="my-3">
            <h4>Your <i class="fa fa-heart text-danger"></i> and support causes cash for this campaign <i class="fa fa-arrow-down"></i></h4>
            <a :href="'https://explorer.bitcoin.com/bch/address/' + pledgeAddress" target="_blank"><strong>{{pledgeAddress}}</strong></a>
        </div>

        <div>
            Satoshis {{satoshis}}
        </div>

        <input
            class="name"
            type="text"
            id="pledgeAmount"
            placeholder="Enter your pledge amount (required)"
            v-model="pledgeAmount"
         />

        <h4>Community Pledge</h4>

        <div>
            <input
                class="name"
                type="text"
                id="name"
                placeholder="Name (optional)"
                v-model="name"
             />
        </div>

        <div>
            <input
                class="comment"
                type="text"
                id="comment"
                placeholder="Comment (optional)"
                v-model="comment"
             />
        </div>

        <div>
            <textarea v-model="pledge" class="pledge" />
        </div>

        <div class="button">
            <a href="javascript://" class="btn-danger" @click="$emit('cancel')">
                <i class="fa fa-times-circle" aria-hidden="true"></i>
                Cancel Community Pledge
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

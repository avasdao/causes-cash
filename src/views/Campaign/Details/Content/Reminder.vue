<template>
    <main>
        <hr />

        <div class="row">
            <div class="col-12 col-md-7">
                <form action="javascript://">
                    <div class="text-center mb-3">
                        <a :href="'https://explorer.bitcoin.com/bch/address/' + pledgeAddress" target="_blank"><strong>{{pledgeAddress}}</strong></a>
                        <h4>Your <i class="fa fa-heart text-danger"></i> and support causes cash for this campaign <i class="fa fa-arrow-down text-danger"></i></h4>
                    </div>

                    <div class="code-area float-right">
                        <div class="qr-code" v-html="qr" />

                        <div class="text-center ml-2">
                            <i class="fa fa-arrow-up text-danger"></i>
                            instant pledge address
                            <i class="fa fa-arrow-up text-danger"></i>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="form-pledge-amount">
                                    Pledge Amount in USD
                                </label>

                                <input
                                    type="range"
                                    class="form-control-range"
                                    id="form-pledge-amount"
                                    v-model="pledgeRange"
                                    @change="onRangeChange($event)"
                                >
                            </div>
                        </div>

                        <div class="col-6">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="pledge amount (usd)"
                                v-model="pledgeUSD"
                                @blur="onPledgeUpdate"
                                @keyup.enter="$refs.pledgeName.focus()"
                             />
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="input-name" class="col-md-4 col-form-label text-right">
                            Name
                        </label>

                        <div class="col-md-8">
                            <input
                                ref="pledgeName"
                                class="form-control"
                                type="text"
                                id="input-name"
                                placeholder="(optional)"
                                v-model="pledgeName"
                                @keyup.enter="$refs.pledgeComment.focus()"
                             />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="input-comment" class="col-md-4 col-form-label text-right">
                            Comment
                        </label>

                        <div class="col-md-8">
                            <input
                                ref="pledgeComment"
                                class="form-control"
                                type="text"
                                id="input-comment"
                                placeholder="(optional)"
                                v-model="pledgeComment"
                             />
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col">
                            <button class="btn btn-primary btn-block" @click="setClipboard">Copy Details</button>
                        </div>

                        <div class="col">
                            <button class="btn btn-primary btn-block">Use Wallet</button>
                        </div>
                    </div>

                    <div class="form-group row pledge-group">
                        <label for="pledge-details">
                            Pledge Details
                        </label>

                        <textarea :value="pledgeDetails" class="pledge-output" id="pledge-details" />
                    </div>

                    <div class="form-group row pledge-group">
                        <label for="pledge-auth">
                            Pledge Authorization
                        </label>

                        <input
                            ref="pledgeAuth"
                            class="form-control pledge-auth"
                            type="text"
                            id="pledge-auth"
                            placeholder="waiting for authorization message..."
                            v-model="pledgeAuth"
                         />
                    </div>
                </form>
            </div>

            <div class="col-12 col-md-5">
                <a href="javascript://" class="btn-danger float-right" @click="$emit('cancel')">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    Cancel Reminder
                </a>

                <h3>Campaign Reminder</h3>

                <p class="mt-3">
                    We'll remind you to contribute to this campaign!
                </p>

                <p class="mt-3">
                    <!-- Install the plugin for the Electron-Cash desktop wallet and use the flipstarter tab to prepare your pledge. -->
                </p>
            </div>
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

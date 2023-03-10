<template>
    <v-dialog
        :value="isOpen"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar dark color="#8dc351">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>Add a Flipstarter campaign</v-toolbar-title>

                <!-- <v-spacer></v-spacer> -->

                <!-- <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        @click="$emit('close')"
                    >
                        Submit
                    </v-btn>
                </v-toolbar-items> -->
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            type="url"
                            label="* Campaign address / location"
                            hint="eg. https://flipstarter.<project-name>.com"
                            persistent-hint
                            required
                            v-model="url"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-autocomplete
                            :items="['Adoption', 'Community', 'Decentralized App', 'Design & Art', 'Education', 'Film & Video', 'Fun & Games', 'Hardware', 'Health & Wellness', 'Infrastructure', 'Music', 'Privacy', 'Publishing', 'Security', 'Software', 'World View', 'Youth']"
                            label="Topics or categories"
                            multiple
                            hint="Please select ANY and ALL that may apply"
                            persistent-hint
                            v-model="category"
                        ></v-autocomplete>
                    </v-col>

                    <v-col cols="12">
                        <span>Are you the owner of this campaign?</span>

                        <v-radio-group v-model="isOwner" row>
                            <v-radio
                                label="Yes"
                                value="yes"
                            ></v-radio>

                            <v-radio
                                label="No"
                                value="no"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" v-if="isOwner === 'yes'" class="mt-n5">
                        <div class="contact-notice red--text">
                            To assist with properly adding your campaign to our new platform our team may reach out to you if we have any issues or questions.
                        </div>

                        <v-text-field
                            type="email"
                            label="Your email or contact"
                            hint="Profile details are NEVER shared with 3rd-parties"
                            persistent-hint
                            v-model="email"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <small><em>* indicates required field</em></small>

                <v-btn color="primary" block x-large @click="submitCampaign()" class="my-5">
                    <span class="white--text">Send Request</span>
                </v-btn>

                <v-btn color="red accent-2" block x-large @click="$emit('close')" class="my-5">
                    <span class="white--text">Cancel</span>
                </v-btn>
            </v-card-text>

        </v-card>

    </v-dialog>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        isOpen: Boolean,
    },
    data: () => ({
        url: null,
        category: null,
        isOwner: null,
        email: null,
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
        ...mapActions('campaigns', [
            'addCampaign',
        ]),

        ...mapActions('utils', [
            'toast',
        ]),

        submitCampaign() {
            /* Build assurance package. */
            const pkg = {
                url: this.url,
                category: this.category,
                isOwner: this.isOwner,
                email: this.email,
                flipstarter: true,
            }

            /* Add assurance. */
            this.addCampaign(pkg)

            this.toast(['Success!', 'Your new campaign has been submitted.', 'success'])

            /* Close dialog. */
            this.$emit('close')
        },

    },
    created: function () {
        /* Initialize owner flag. */
        this.isOwner = 'no'
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
span.headline {
    font-size: 1.1em !important;
}

.contact-notice {
    font-size: 0.9em;
    line-height: 1.5;
}
</style>

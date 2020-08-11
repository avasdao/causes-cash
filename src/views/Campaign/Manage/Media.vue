<template>
    <div role="tabpanel" class="tab-pane" id="media">
        <section class="campaign-form form-update">
            <div class="start-form">
                <form action="javascript://">
                    <h1>Media Center</h1>
                    <hr />

                    <!-- <div class="field">
                        <label for="contactemail">News Article #1</label>

                        <input type="email" id="contactemail" placeholder="Amazing Expose" v-model="news[0].title">
                    </div> -->

                    <!-- <div class="field">
                        <span class="label-desc">
                            Enter the account you’d like to use to receive funds if your project is successfully funded.
                            The account should belong to the person or legal entity running this project.
                            Once you launch, this information cannot be changed.
                        </span>

                        <div class="field-radio">
                            <input type="radio" id="individual" name="fund">

                            <label for="individual">Individual</label>
                        </div>

                        <div class="field-radio">
                            <input type="radio" id="legal" name="fund">

                            <label for="legal">Legal entity (company or organization)</label>
                        </div>
                    </div> -->

                    <div class="field">
                        <label for="uploadfile">
                            Campaign Main Image
                        </label>

                        <span class="label-desc">
                            This is the first thing that people will see when they come across your campaign.
                            Choose an image that’s crisp and text-free.
                            570px by 400px recommended resolution.

                            <a href="javascript://">Here are some tips.</a>
                        </span>

                        <img :src="photo1Url" />

                        <input
                            type="text"
                            id="capaignstory"
                            placeholder="Photo #1 caption"
                            v-model="photo1Caption"
                            disabled
                        >

                        <input
                            type="text"
                            id="capaignstory"
                            placeholder="Photo #1 URL"
                            v-model="photo1Url"
                        >
                    </div>

                    <hr />

                    <div class="field">
                        <label for="uploadfile">Media Gallery</label>

                        <span class="label-desc">
                            Upload a square image that represents your campaign.
                            570px by 400px recommended resolution.
                        </span>

                        <div class="row">
                            <div class="col">
                                <img :src="photo2Url" />

                                <input
                                    type="text"
                                    id="capaignstory"
                                    placeholder="Photo #2 caption"
                                    v-model="photo2Caption"
                                    disabled
                                >

                                <input
                                    type="text"
                                    id="capaignstory"
                                    placeholder="Photo #2 URL"
                                    v-model="photo2Url"
                                >

                            </div>

                            <div class="col">
                                <img :src="photo3Url" />

                                <input
                                    type="text"
                                    id="capaignstory"
                                    placeholder="Photo #3 caption"
                                    v-model="photo3Caption"
                                    disabled
                                >

                                <input
                                    type="text"
                                    id="capaignstory"
                                    placeholder="Photo #3 URL"
                                    v-model="photo3Url"
                                >
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div class="field">
                        <label for="uploadfile1">
                            Campaign Video
                        </label>

                        <span class="label-desc">
                            Have fun – add a video!
                            Projects with a video have a much higher chance of success.
                            For a dose of inspiration, check out the <a href="javascript://">Creator Handbook.</a>
                            Need some help?
                            Visit our <a href="javascript://">Creator FAQ.</a>
                        </span>

                        <div class="list-upload">
                            <div class="file-upload">
                                <div class="upload-bg">
                                    <div id="myfileupload1">
                                        <input type="file" id="uploadfile1" name="ImageUpload" onchange="readURL1(this);" accept="video/*" />
                                    </div>

                                    <div id="thumbbox1">
                                        <img src="images/assets/logo.png" height="695" width="460" alt="Thumb image" id="thumbimage1" />

                                        <a class="removeimg1" href="javascript:"></a>
                                    </div>

                                    <div id="boxchoice1">
                                        <a href="javascript:" class="choicefile1">
                                            <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                            Upload Video
                                        </a>

                                        <p></p>
                                    </div>

                                    <label class="filename1"></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label for="capaignstory">
                            Video Caption
                        </label>

                        <span class="label-desc">
                            Provide a caption for video.
                        </span>

                        <input
                            type="text"
                            id="capaignstory"
                            placeholder="Enter a caption for your video"
                            v-model="videoCaption"
                            disabled
                        >
                    </div>

                    <div class="field">
                        <label for="capaignstory">
                            Video Description
                        </label>

                        <span class="label-desc">
                            Provide a description for video.
                        </span>

                        <textarea
                            rows="4"
                            id="capaignstory"
                            placeholder="Enter a few tagline"
                            v-model="videoDescription"
                            disabled
                        ></textarea>
                    </div>

                    <hr />

                    <!-- <div class="field">
                        <label for="profilename">Facebook</label>

                        <span class="label-desc">
                            Heads up: Once you launch a project, you cannot make changes to your name on Causes Cash.
                        </span>

                        <input type="text" id="profilename">
                    </div> -->

                    <!-- <div class="field">
                        <label for="biography">Frequently Asked Questions (FAQ)</label>

                        <textarea id="biography" cols="30" rows="4"></textarea>
                    </div> -->

                    <!-- <div class="field">
                        <label>Websites</label>

                        <span class="label-desc">
                            Some suggestions: Link to your blog, portfolio, Twitter, Instagram, etc.
                        </span>

                        <input type="text">
                    </div> -->

                    <!-- <div class="start-box">
                        <h4>Request help from the community</h4>

                        <p>
                            List the skills, resources, or expertise from others that could help enhance your project.
                            If someone can contribute, they can start a dialogue directly from your project page.
                        </p>

                        <div class="field">
                            <label for="projectneed">
                                Project need (optional)
                            </label>

                            <textarea id="projectneed" cols="30" rows="3" placeholder="Painting the Sistine Chapel will require extravagant but cost-effective colors. Are you a color mixologist who'd like to help?"></textarea>
                        </div>

                        <div class="field">
                            <label for="projectneed1">
                                Project need (optional)
                            </label>

                            <textarea id="projectneed1" cols="30" rows="3" placeholder="Looking for an advanced belayer to hoist us up 68 feet. Otherwise, we’ll have to resort to rickety scaffolding and painting on our backs!"></textarea>
                        </div>

                        <div class="field">
                            <label for="projectneed2">
                                Project need (optional)
                            </label>

                            <textarea id="projectneed2" cols="30" rows="3" placeholder="Do you have experience with image projection onto rounded, uneven surfaces? Please get in touch!"></textarea>
                        </div>
                    </div> -->

                    <input
                        type="submit"
                        class="btn-primary"
                        value="Save & Continue"
                        @click="save"
                    >
                </form>
            </div>
        </section>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        //
    },
    data: () => {
        return {
            ownerSlug: null,
            slug: null,
            extSlug: null,

            campaign: null,
            campaignId: null,
            // fundId: null,
            // referrerId: null,

            videoCaption: null,
            videoDescription: null,

            photo1Caption: null,
            photo2Caption: null,
            photo3Caption: null,

            photo1Url: null,
            photo2Url: null,
            photo3Url: null,

            news: [{
                id: null,
                title: null,
                summary: null,
                url: null,
                avatar: null,
                createdAt: null,
            }],
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
            'getCampaign',
        ]),

        // news() {
        //     if (this.campaign && this.campaign.news) {
        //         return this.campaign.news[]
        //     } else {
        //         return null
        //     }
        // },

        // location() {
        //     if (this.campaign && this.campaign.location) {
        //         return this.campaign.location
        //     } else {
        //         return null
        //     }
        // },

    },
    methods: {
        ...mapActions('campaigns', [
            'updateCampaign',
        ]),

        ...mapActions('utils', [
            'toast',
        ]),

        /**
         * Save
         */
        async save() {
            /* Set campaign id. */
            const campaignId = this.campaign.id

            /* Set media. */
            const media = {
               main: this.photo1Url || null,
               cover: this.photo1Url || null,
               gallery: [
                   this.photo2Url || null,
                   this.photo3Url || null,
               ]
           }

            const campaign = {
                campaignId,
                media,
            }
            console.log('PACKAGE', campaign)

            /* Request update. */
            const result = await this.updateCampaign(campaign)
            console.log('WRITE UPDATE (result):')

            /* Handle result. */
            if (result.ok && !result.error) {
                this.toast(['Done!', 'Campaign updated successfully!', 'success'])
            }
        },

    },
    mounted: function () {
        //
    },
    created: async function () {
        console.log('PARAMS', this.$route.params)
        console.log('QUERY', this.$route.query)
        console.log('HASH', this.$route.hash)

        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
        console.log('OWNER SLUG', this.ownerSlug)

        /* Set extended slug. */
        this.slug = this.$route.params.slug
        console.log('SLUG', this.slug)

        /* Validate slug. */
        if (this.ownerSlug && this.slug) {
            /* Set campaign. */
            this.campaign = await this.getCampaign(this.ownerSlug, this.slug)
            console.log('MEDIA (campaign):', this.campaign)

            /* Initilalize photos. */
            if (this.campaign && this.campaign.media) {
                /* Set media. */
                const media = this.campaign.media

                if (media.main) {
                    this.photo1Url = media.main
                }

                if (media.gallery && media.gallery[0]) {
                    this.photo2Url = media.gallery[0]
                }

                if (media.gallery && media.gallery[1]) {
                    this.photo3Url = media.gallery[1]
                }
            }

            if (this.campaign.news) {
                // FOR DEV ONLY
                this.news[0].title = this.campaign.news[0].title
            }
        }
    },
}
</script>

<style scoped>
/*  */
</style>

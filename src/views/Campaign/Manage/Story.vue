<template>
    <div role="tabpanel" class="tab-pane" id="story">
        <section class="campaign-form form-update">
            <div class="start-form">
                <form action="javascript://">
                    <div class="field">
                        <label for="capaignstory">
                            Campaign Story *
                        </label>

                        <span class="label-desc">
                            Introduce yourself,  your campaign and why it’s important to you.
                        </span>

                        <textarea
                            rows="4"
                            id="capaignstory"
                            placeholder="Enter a few tagline"
                            v-model="summary"
                        ></textarea>
                    </div>

                    <div class="field">
                        <label>Project description</label>

                        <span class="label-desc">
                            Use your project description to share more about what you’re raising funds to do and how you plan to pull it off.
                            It’s up to you to make the case for your project.
                        </span>

                        <div id="editor"></div>
                    </div>

                    <hr />

<!-- Campaign Images -->
                    <div class="field">
                        <label for="uploadfile">Campaign Images *</label>

                        <span class="label-desc">Upload a square image that represents your campaign. 570px by 400px recommended resolution.</span>

                        <div class="list-upload">
                            <div class="file-upload">
                                <div class="upload-bg">
                                    <div id="myfileupload">
                                        <input type="file" id="uploadfile" name="ImageUpload" onchange="readURL(this);" />
                                    </div>

                                    <div id="thumbbox">
                                        <img src="images/assets/logo.png" height="100" width="100" alt="Thumb image" id="thumbimage" />
                                        <a class="removeimg" href="javascript:"></a>
                                    </div>

                                    <div id="boxchoice">
                                        <a href="javascript:" class="choicefile"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload Image</a>
                                        <p></p>
                                    </div>

                                    <label class="filename"></label>

                                    <input
                                        type="text"
                                        id="capaignstory"
                                        placeholder="Photo #1 caption"
                                        v-model="photo1Caption"
                                    >

                                    <input
                                        type="text"
                                        id="capaignstory"
                                        placeholder="Photo #1 URL"
                                        v-model="photo1Url"
                                    >
                                </div>
                            </div>

                            <div class="file-upload">
                                <div class="upload-bg">
                                    <div id="myfileupload1">
                                        <input type="file" id="uploadfile1" name="ImageUpload" onchange="readURL1(this);" />
                                    </div>

                                    <div id="thumbbox1">
                                        <img src="images/assets/logo.png" height="100" width="100" alt="Thumb image" id="thumbimage1" />
                                        <a class="removeimg1" href="javascript:"></a>
                                    </div>

                                    <div id="boxchoice1">
                                        <a href="javascript:" class="choicefile1"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload Image</a>
                                        <p></p>
                                    </div>

                                    <label class="filename1"></label>

                                    <input
                                        type="text"
                                        id="capaignstory"
                                        placeholder="Photo #2 caption"
                                        v-model="photo2Caption"
                                    >

                                    <input
                                        type="text"
                                        id="capaignstory"
                                        placeholder="Photo #2 URL"
                                        v-model="photo2Url"
                                    >
                                </div>
                            </div>

                            <div class="file-upload">
                                <div class="upload-bg">
                                    <div id="myfileupload2">
                                        <input type="file" id="uploadfile2" name="ImageUpload" onchange="readURL2(this);" />
                                    </div>

                                    <div id="thumbbox2">
                                        <img src="images/assets/logo.png" height="100" width="100" alt="Thumb image" id="thumbimage2" />
                                        <a class="removeimg2" href="javascript:"></a>
                                    </div>

                                    <div id="boxchoice2">
                                        <a href="javascript:" class="choicefile2"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload Image</a>
                                        <p></p>
                                    </div>

                                    <label class="filename2"></label>

                                    <input
                                        type="text"
                                        id="capaignstory"
                                        placeholder="Photo #3 caption"
                                        v-model="photo3Caption"
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
                    </div>

                    <hr />

<!-- Campaign Video -->
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
                        ></textarea>
                    </div>

                    <hr />

<!-- Risks & Challenges -->
                    <div class="field">
                        <label for="risks">Risks and challenges</label>

                        <span class="label-desc">
                            What are the risks and challenges that come with completing your project, and how are you qualified to overcome them?
                        </span>

                    </div>

                    <!-- <div class="start-box">
                        <h4>Project FAQs</h4>

                        <p>
                            You can add frequently asked questions to the FAQ tab on your project page once it goes live.
                            <a href="javascript://">Learn more</a>
                        </p>
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

/* Import modules. */
import superagent from 'superagent'

export default {
    components: {
        //
    },
    data: () => {
        return {
            ownerSlug: null,
            slug: null,
            // extSlug: null,

            campaign: null,
            campaignId: null,

            summary: null,

            videoCaption: null,
            videoDescription: null,

            photo1Caption: null,
            photo2Caption: null,
            photo3Caption: null,

            photo1Url: null,
            photo2Url: null,
            photo3Url: null,

            quill: null
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
            'getCampaign',
        ]),

        ...mapGetters('profile', [
            'getSignedMessage',
        ]),

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

        /**
         * Save
         */
        async save() {
            /* Set campaign id. */
            const campaignId = this.campaign.id

            /* Set description. */
            const summary = this.summary

            /* Set description. */
            const description = this.quill.getText()

            /* Set images. */
            const images = {
               main: this.photo1Url || null,
               cover: this.photo1Url || null,
               gallery: [
                   this.photo2Url || null,
                   this.photo3Url || null,
               ]
           }

            const pkg = {
                campaignId,
                summary,
                description,
                images,
            }
            console.log('PACKAGE', pkg)

            const signedPkg = this.getSignedMessage(JSON.stringify(pkg))
            console.log('SIGNED PACKAGE', signedPkg)

            /* Set api target. */
            // const target = 'https://api.causes.cash/v1/campaigns'
            const target = 'http://localhost:6767/v1/campaigns'

            const result = await superagent
                .put(target)
                .send(signedPkg)
            console.log('RESULT', result)

            if (result.ok && !result.error) {
                alert('Campaign updated successfully!')
            }
        },

    },
    created: async function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
        console.log('OWNER SLUG', this.ownerSlug)

        /* Set extended slug. */
        this.slug = this.$route.params.slug
        console.log('SLUG', this.slug)

        /* Validate hash. */
        // if (this.$route.hash) {
        //     /* Set extended slug. */
        //     this.fundId = this.$route.hash.slice(1)
        //     console.log('FUND ID (from hash)', this.fundId)
        // }

        /* Validate query. */
        // if (this.$route.query && Object.keys(this.$route.query)[0]) {
        //     /* Set extended slug. */
        //     this.fundId = Object.keys(this.$route.query)[0]
        //     console.log('FUND ID (from query)', this.fundId)
        // }

        /* Validate slug. */
        if (this.ownerSlug && this.slug) {
            /* Set campaign. */
            this.campaign = await this.getCampaign(this.ownerSlug, this.slug)
            console.log('STORY (campaign):', this.campaign)

            /* Validate summary. */
            if (this.campaign && this.campaign.summary) {
                /* Set summary. */
                this.summary = this.campaign.summary
            }

            /* Validate description. */
            if (this.campaign && this.campaign.description) {
                /* Add description to editor. */
                this.quill.insertText(0, this.campaign.description)
            }

            /* Validate media. */
            if (this.campaign && this.campaign.media) {
                this.photo1Url = this.campaign.media.main

                /* Validate gallery. */
                if (this.campaign.media.gallery) {
                    this.photo2Url = this.campaign.media.gallery[0]
                    this.photo3Url = this.campaign.media.gallery[1]
                }
            }
        }
    },
    mounted: function () {
        const toolbarOptions = [
            ['bold'],        // toggled buttons

            [{ 'size': [false, 'large', 'huge'] }],  // custom dropdown
            [ 'link' ],
            [ 'image' ],
            [ 'video' ],
            ['clean'],
        ]

        /* Initialize rich text editor. */
        // https://quilljs.com/docs/api/#content
		this.quill = new window.Quill('#editor', {
            modules: {
                toolbar: toolbarOptions,
            },
            formats: [
                'bold',
                'size',
                'link',
                'image',
                'video',
                'clean',
            ],
            theme: 'snow'
		})
    },
}
</script>

<style>
#editor .ql-editor {
    height: 300px;
}

#story table th, #story table td {
    border: 1pt solid #c8c8c8;
    padding: 5px;
}

#story h1, #story h2 {
    margin-top: 30px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1pt solid #c8c8c8;
}
#story h1 {
    font-size: 2.5em;
}
#story h2 {
    font-size: 1.5em;
}
#story h3 {
    margin-bottom: 10px;
}
</style>

<style scoped>
/*  */
</style>

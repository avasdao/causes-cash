<template>
    <div role="tabpanel" class="tab-pane" id="write">
        <section class="campaign-form form-update">
            <div class="start-form">
                <form action="javascript://">
                    <h1>Content Editor</h1>
                    <hr />

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

                        <div id="desc-editor" class="editor"></div>
                    </div>

<!-- Risks & Challenges -->
                    <div class="field">
                        <label>Project guide</label>

                        <span class="label-desc">
                            Use your project guide to help users when navigating through your campaign.
                        </span>

                        <div id="guide-editor" class="editor"></div>
                    </div>

                    <div class="field">
                        <label for="tag">Tags</label>

                        <span class="label-desc">
                            Enter up to five keywords that best describe your campaign.
                        </span>

                        <input type="text" id="tags" v-model="tags" placeholder="Enter a few tags for your campaign" />
                    </div>

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
            // extSlug: null,

            campaign: null,
            campaignId: null,

            summary: null,
            tags: null,

            quillDesc: null,
            quillGuide: null,
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

            /* Set description. */
            const summary = this.summary

            /* Set description. */
            const description = this.quillDesc.getText()

            /* Set guide. */
            const guide = this.quillGuide.getText()

            /* Set images. */
            // const images = {
            //     main: this.photo1Url || null,
            //     cover: this.photo1Url || null,
            //     gallery: [
            //         this.photo2Url || null,
            //         this.photo3Url || null,
            //     ]
            // }

            /* Build campaign. */
            const campaign = {
                campaignId,
                summary,
                description,
                guide,
                // images,
            }
            // console.log('WRITE (campaign):', campaign)

            /* Request update. */
            const result = await this.updateCampaign(campaign)
                .catch(err => {
                    /* Handle error message. */
                    if (err && err.message === 'Unauthorized') {
                        this.toast(['Oops!', 'You are NOT authorized to do that', 'error'])
                    } else {
                        console.error(err)
                    }
                })
            // console.log('WRITE UPDATE (result):', result)

            /* Handle result. */
            if (result.ok && !result.error) {
                this.toast(['Done!', 'Campaign updated successfully!', 'success'])
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
                this.quillDesc.insertText(0, this.campaign.description)
            }

            /* Validate guide. */
            if (this.campaign && this.campaign.guide) {
                /* Add guide to editor. */
                this.quillGuide.insertText(0, this.campaign.guide)
            }

            /* Validate media. */
            // if (this.campaign && this.campaign.media) {
            //     this.photo1Url = this.campaign.media.main
            //
            //     /* Validate gallery. */
            //     if (this.campaign.media.gallery) {
            //         this.photo2Url = this.campaign.media.gallery[0]
            //         this.photo3Url = this.campaign.media.gallery[1]
            //     }
            // }
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
		this.quillDesc = new window.Quill('#desc-editor', {
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

        /* Initialize rich text editor. */
        // https://quilljs.com/docs/api/#content
		this.quillGuide = new window.Quill('#guide-editor', {
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
#desc-editor .ql-editor, #guide-editor .ql-editor {
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

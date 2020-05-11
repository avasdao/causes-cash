<template>
    <div id="story" class="tabs active markdown">
        <h1>Summary</h1>
        <p v-html="summaryDisplay" />

        <hr />

        <h1>Readme</h1>
        <p v-html="descriptionDisplay" />
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import modules. */
import DOMPurify from 'dompurify'
import showdown from 'showdown'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            description: null,
            summary: null,
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getDescription',
            'getSummary',
        ]),

        descriptionDisplay() {
            /* Validate description. */
            if (this.description) {
                return this.markdown(this.description)
            } else {
                return ''
            }
        },

        summaryDisplay() {
            /* Validate summary. */
            if (this.summary) {
                return this.markdown(this.summary)
            } else {
                return ''
            }
        },
    },
    methods: {
        /**
         * Cleaner
         *
         * Uses DOM Purify to sanitize HTML.
         * (source: https://github.com/cure53/DOMPurify)
         */
        cleaner(_html) {
            /* Return cleaned HTML. */
            return DOMPurify.sanitize(_html)
        },

        /**
         * Markdown Manager
         *
         * Generates HTML from markdown and vice-versa.
         * (source: https://github.com/showdownjs/showdown)
         */
        markdown(_content) {
            /* Initialize converter. */
            const converter = new showdown.Converter()

            /* Set converter to GitHub Flavored Markdown (GFM). */
            converter.setFlavor('github')

            /* Generate HTML content. */
            const html = converter.makeHtml(_content)
            // console.log('HTML', html)

            /* Sanitize HTML content. */
            // const sanitized = this.cleaner(html)

            /* Format HTML. */
            // NOTE: Display fixes, probably related to our CSS.
            const sanitized = html
                .replace(/<ol>/gi, `<ol class="markdown-ul">`)
                .replace(/<ul>/gi, `<ul class="markdown-ul">`)

            /* Return sanitized content (for display). */
            // return sanitized
            return sanitized
        },
    },
    created: function () {
        /* Set description. */
        this.description = this.getDescription(
            this.campaign.ownerId, this.campaign.extSlug)
        // console.log('STORY (description):', this.description)

        /* Set summary. */
        this.summary = this.getSummary(
            this.campaign.ownerId, this.campaign.extSlug)
        // console.log('STORY (summary):', this.summary)

    },
}
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
    color: rgba(30, 30, 30, 0.2);
}
</style>

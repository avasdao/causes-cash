<script setup>
/* Import modules. */
import DOMPurify from 'isomorphic-dompurify'
import showdown from 'showdown'

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

const description = computed(() => {
    /* Set description. */
    const description = System.description

    /* Sanitize markdown (from description). */
    const markdown = DOMPurify.sanitize(description, {
        USE_PROFILES: { html: true } // HTML ONLY
    })

    /* Initialize Showdown converter. */
    // Reference to docs: https://github.com/showdownjs/showdown/wiki
    const converter = new showdown.Converter()

    /* Convert markdown to HTML. */
    const html = converter.makeHtml(markdown)
    // console.log('HTML', html)

    // this.description = clean
    return html
})

const campaign = await $fetch('/api/campaigns?bootstrap')
console.log('CAMPAIGN (description):', campaign)

</script>

<template>
    <main id="campaign-description">
        <div
            class="mt-10 sm:p-10 sm:bg-gray-50 sm:border-2 border-gray-200 rounded-xl"
            v-html="campaign?.description"
        />
    </main>
</template>

<style>
#campaign-description h1 {
    font-size: 2.5em;
}

#campaign-description h2 {
    font-size: 1.875em;
    border-bottom: 1pt solid #999;
    margin-top: 20px;
    margin-bottom: 10px;
}

#campaign-description h3 {
    margin-top: 15px;
    font-size: 1.15em;
    text-transform: uppercase;
    font-weight: bold;
}

#campaign-description p {
    padding: 10px 0;
}

#campaign-description a {
    color: blue;
}

#campaign-description ol, #campaign-description ul {
    padding: 10px 30px;
    /* background-color: purple; */
}

#campaign-description ol > li {
    list-style-type: decimal;
}

#campaign-description ul > li {
    list-style-type: disc;
}
</style>

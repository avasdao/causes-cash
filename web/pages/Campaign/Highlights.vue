<template>
    <main class="border-t border-gray-200 mt-10 pt-10">
        <h3 class="text-lg font-medium text-gray-900">
            Campaign Highlights
        </h3>

        <div class="mt-4 prose prose-sm text-gray-500 pb-10 border-b-2 border-gray-200">
            <ul role="list">
                <li v-for="highlight of highlights" :key="highlight.id">
                    <strong class="mr-2 uppercase">{{highlight.cat}}</strong>
                    {{highlight.body}}
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import { v4 as uuidv4 } from 'uuid'

/* Import components. */
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            //
        }
    },
    computed: {
        highlights() {
            /* Validate highlights. */
            if (!this.$store.state.highlights) return []

            /* Initialize highlights. */
            const highlights = []

            /* Handle highlights. */
            this.$store.state.highlights.forEach(_highlight => {
                /* Generate new UUID. */
                const id = uuidv4()

                /* Initialize holders. */
                let body
                let cat

                /* Validate category. */
                if (_highlight.includes('|')) {
                    /* Set category. */
                    cat = _highlight.split('|')[0].trim()

                    /* Set body. */
                    body = _highlight.split('|')[1].trim()
                } else {
                    /* Set body. */
                    body = _highlight
                }

                /* Validate body. */
                if (body) {
                    /* Add to highlights. */
                    highlights.push({
                        id,
                        cat,
                        body,
                    })
                }
            })

            /* Return highlights. */
            return highlights
        },

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

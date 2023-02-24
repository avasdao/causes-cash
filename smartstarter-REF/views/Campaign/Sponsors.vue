<template>
    <div class="border-t border-gray-200 mt-10 pt-10">
        <h3 class="text-lg font-medium text-gray-900">
            Featured Sponsors
        </h3>

        ...

        <div class="hidden mt-4 prose prose-sm text-gray-500">
            <ul role="list">
                <li v-for="sponsor of $store.state.sponsors" :key="sponsor.id">
                    <strong class="mr-2">{{sponsor.cat}}</strong>
                    {{sponsor.heading}}
                </li>
            </ul>
        </div>

        <a href="javascript://" class="hidden mt-5 text-sm">
            Show ALL (11) Sponsors
        </a>
    </div>
</template>

<script>
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
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<template>
    <main>

        <div>
            <label for="project-name" class="block text-lg font-medium text-gray-700">
                CUSTOM DOMAIN / URL
            </label>

            <div class="mt-1">
                <input
                    type="text"
                    v-model="domain"
                    class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-lg border-gray-300 rounded-md"
                    placeholder="https://smartstarter.awesome-project.org"
                />
            </div>

            <div class="block italic ml-3 mt-1">
                <p class="font-medium text-sm">
                    NOTE: Custom domain campaigns are eligible for Featured placement.
                </p>

                <div class="text-base mt-2">
                    Set CNAME to <span class="text-2xl">→</span>
                    <span class="text-blue-500">https://&lt;your-campaign-id&gt;.smartstarter.cash</span>
                </div>

                <div class="text-base -mt-1">
                    Set masking to <span class="text-2xl">→</span>
                    <span class="text-blue-500">https://smartstarter.cash/&lt;your-campaign-id&gt;</span>
                </div>

            </div>
        </div>

    </main>
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

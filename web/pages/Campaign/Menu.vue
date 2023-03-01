<template>
    <main class="border-b border-gray-200">
        <div class="-mb-px grid grid-cols-2 gap-5 lg:flex lg:justify-around lg:space-x-8" aria-orientation="horizontal" role="tablist">
            <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300" -->
            <button
                class="bg-gray-100 lg:bg-transparent border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300 py-6 border-b-2 font-medium text-sm text-center"
                aria-controls="tab-panel-reviews"
                role="tab"
                type="button"
                @click="$emit('tabbed', 'description')"
            >
                DESCRIPTION
            </button>

            <button
                class="bg-gray-100 lg:bg-transparent border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300 py-6 border-b-2 font-medium text-sm text-center"
                aria-controls="tab-panel-reviews"
                role="tab"
                type="button"
                @click="$emit('tabbed', 'contributors')"
            >
                PLEDGES <small>({{numContributors}})</small>
            </button>

            <button
                class="bg-gray-100 lg:bg-transparent border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300 py-6 border-b-2 font-medium text-sm text-center"
                aria-controls="tab-panel-faq"
                role="tab"
                type="button"
                @click="$emit('tabbed', 'feedback')"
            >
                FEEDBACK <small>({{numSupporters}})</small>
            </button>

            <button
                class="bg-gray-100 lg:bg-transparent border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300 py-6 border-b-2 font-medium text-sm text-center"
                aria-controls="tab-panel-license"
                role="tab"
                type="button"
                @click="$emit('tabbed', 'report-cards')"
            >
                REPORT CARDS <small>(3)</small>
            </button>
        </div>
    </main>
</template>

<script>
/* Import components. */
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    props: {
        contributors: Array,
        supporters: Array,
    },
    computed: {
        numContributors() {
            /* Validate contributors. */
            if (!this.contributors) return 0

            /* Initialize contributors. */
            const contributors = []

            /* Handle contributors. */
            this.contributors.forEach(_contributor => {
                // NOTE: We filter out donation under 1 satoshi
                if (_contributor.pledgeAmount.gt(10000000000n)) {
                    contributors.push(_contributor)
                }
            })

            /* Return count of contributors. */
            return contributors.length
        },

        numSupporters() {
            /* Validate supporters. */
            if (!this.supporters) return 0

            return this.supporters.length
        },

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

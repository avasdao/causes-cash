<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    history: Array,
    supporters: Array,
})

const numHistory = computed(() => {
    /* Validate history. */
    if (!props.history) return 0

    /* Initialize history. */
    let numHistory = 0

    /* Handle history. */
    props.history.forEach(_transaction => {
        numHistory++
        // NOTE: We filter out donation under 1 satoshi
// FIXME Big integer literals are not available in the configured target environment ("es2019")
        // if (_transaction.pledgeAmount.gt(10000000000n)) {
        //     history.push(_transaction)
        // }
    })

    /* Return count of history. */
    return numHistory
})

const numSupporters = computed(() => {
    /* Validate supporters. */
    if (!props.supporters) return 0

    return props.supporters.length
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

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
                @click="$emit('tabbed', 'history')"
            >
                HISTORY <small>({{numHistory}})</small>
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

<script setup lang="ts">
/* Import modules. */
import numeral from 'numeral'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    contributors: Array,
    usd: Number,
})

watch(contributors, (_contributors) => {
    console.log('CONTRIBUTORS HAS CHANGED', _contributors)
})

const pledges = computed(() => {
    /* Validate contributors. */
    if (!props.contributors) return []

    /* Initialize contributors. */
    const contributors = []

    /* Handle contributors. */
    props.contributors.forEach(_contributor => {
        // NOTE: We filter out donation under 1 satoshi
// FIXME Big integer literals are not available in the configured target environment ("es2019")
        // if (_contributor.pledgeAmount.gt(10000000000n)) {
        //     contributors.push(_contributor)
        // }
    })

    /* Return contributors. */
    return contributors.reverse()
})

const displayBCH = (_wei) => {
    /* Calculate satoshis. */
// FIXME Big integer literals are not available in the configured target environment ("es2019")
    // const satoshis = _wei.div(10000000000n).toNumber() // reduce to 8 decimals

    /* Calculate BCH. */
    const bch = parseFloat(satoshis / 100000000.0)

    /* Return format. */
    return numeral(bch).format('0,0.00[0000]') + ' NEXA'
}

const displayUSD = (_wei) => {
    /* Calculate satoshis. */
// FIXME Big integer literals are not available in the configured target environment ("es2019")
    // const satoshis = _wei.div(10000000000n).toNumber() // reduce to 8 decimals

    /* Calculate BCH. */
    const bch = parseFloat(satoshis / 100000000.0)

    /* Calculate USD. */
    const usd = bch * props.usd

    /* Return format. */
    return numeral(usd).format('$0,0.00') + ' USD'
}

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
    <main>
        <div
            v-for="contributor of pledges" :key="contributor.id"
            class="p-5 my-10 bg-gray-200 border-2 border-gray-400 rounded-xl"
        >
            <div class="flex items-center">
                <h3 class="text-xl text-green-500 font-bold">
                    {{displayBCH(contributor.pledgeAmount)}}
                </h3>

                <h3 class="text-gray-600 ml-3 font-bold">
                    {{displayUSD(contributor.pledgeAmount)}}
                </h3>
            </div>

            <h3 class="flex text-gray-800 font-medium text-xs text-blue-500 items-center">
                <a :href="'https://www.smartscan.cash/address/' + contributor.address" target="_blank">
                    {{contributor.address}}
                </a>

                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </h3>

            <h3 v-if="contributor.label" class="text-xl text-gray-800 font-bold my-2">
                {{contributor.label}}
            </h3>

            <p v-if="contributor.comment" class="p-3 font-medium">
                {{contributor.comment}}
            </p>

            <a
                v-if="contributor.url"
                :href="contributor.url"
                target="_blank"
                class="flex text-blue-500 text-medium items-center"
            >
                {{contributor.url}}

                <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
        </div>
    </main>
</template>

<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    campaign: Object,
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
    <main>
        <div class="bg-gray-200 rounded-full overflow-hidden mt-20">
            <div class="h-2 bg-green-600 rounded-full" style="width: 20%"></div>
        </div>

        <div class="grid grid-cols-4 text-xs font-medium text-gray-600 mt-6">
            <div class="text-center text-green-600 uppercase">
                Funding
            </div>

            <div class="text-center text-gray-400 uppercase">
                Building
            </div>

            <div class="text-center text-gray-400 uppercase">
                Testing
            </div>

            <div class="text-center text-gray-400 uppercase">
                Delivered
            </div>
        </div>
    </main>
</template>

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
    <main class="border-t border-gray-200 mt-10 pt-10">
        <h3 class="text-lg font-medium text-gray-900">
            Legal Disclaimer
        </h3>

        <p class="mt-4 text-sm text-gray-500">
            <span class="inline sm:block">When you use Causes, you’re agreeing to all of our terms. </span>
            <router-link to="/help" class="font-medium text-indigo-600 hover:text-indigo-500">Read our terms of use.</router-link>
        </p>
    </main>
</template>

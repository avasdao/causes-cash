<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    campaign: Object,
})

const campaign = computed(() => {
    return props.campaign
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
    <main class="mt-4">
        <h1 class="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            {{campaign?.title}}
        </h1>

        <h2 id="information-heading" class="sr-only">
            Campaign Information
        </h2>

        <div class="flex justify-between items-center px-10 flex-col sm:flex-row">
            <a :href="campaign?.producer?.url" target="_blank">
                <img :src="campaign?.producer?.icon" alt="" class="w-8 h-8 rounded-full" />
            </a>

            <div>
                <p class="text-sm text-gray-500 mt-2 text-center mr-16">
                    Produced by <a class="text-red-500 font-medium" :href="campaign?.producer?.url" target="_blank">{{campaign?.producer?.name}}</a>
                </p>

                <p class="text-sm text-gray-500 mt-0 text-center ml-16">
                    Managed by <a class="text-red-500 font-medium" :href="campaign?.manager?.url" target="_blank">{{campaign?.manager?.name}}</a>
                </p>
            </div>

            <a :href="campaign?.manager?.url" target="_blank">
                <img :src="campaign?.manager?.icon" alt="" class="w-8 h-8 rounded-full" />
            </a>
        </div>
    </main>
</template>

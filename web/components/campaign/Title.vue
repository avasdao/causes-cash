<script setup>
/* Import modules. */
import { ref } from 'vue'

const props = defineProps({
    campaign: Object,
})

</script>

<template>
    <main class="mt-4">
        <h1 class="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            {{props.campaign?.title}}
        </h1>

        <h2 id="information-heading" class="sr-only">
            Campaign Information
        </h2>

        <div class="flex justify-between items-center px-10 flex-col sm:flex-row">
            <a :href="props.campaign?.producer?.url" target="_blank">
                <img :src="props.campaign?.producer?.icon" alt="" class="w-8 h-8 rounded-full" />
            </a>

            <div>
                <p class="text-sm text-gray-500 mt-2 text-center mr-16">
                    Produced by <a class="text-red-500 font-medium" :href="props.campaign?.producer?.url" target="_blank">{{props.campaign?.producer?.name}}</a>
                </p>

                <p class="text-sm text-gray-500 mt-0 text-center ml-16">
                    Managed by <a class="text-red-500 font-medium" :href="props.campaign?.manager?.url" target="_blank">{{props.campaign?.manager?.name}}</a>
                </p>
            </div>

            <a :href="props.campaign?.manager?.url" target="_blank">
                <img :src="props.campaign?.manager?.icon" alt="" class="w-8 h-8 rounded-full" />
            </a>
        </div>

    </main>
</template>

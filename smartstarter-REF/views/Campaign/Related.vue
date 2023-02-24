<template>
    <main class="max-w-2xl mx-auto mt-24 sm:mt-32 lg:max-w-none">
        <div class="flex items-center justify-between space-x-4">
            <h2 class="text-lg font-medium text-gray-900">
                Contributors also pledged to these campaigns
            </h2>

            <a href="javascript://" class="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">View all<span aria-hidden="true"> &rarr;</span></a>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div class="relative group">
                <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg"
                        alt="Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background."
                        class="object-center object-cover"
                    />

                    <div class="flex items-end opacity-0 p-4 group-hover:opacity-100" aria-hidden="true">
                        <div class="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center">
                            Open Campaign
                        </div>
                    </div>
                </div>

                <div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
                    <h3>
                        <a href="javascript://">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            Awesome Campaign #2
                        </a>
                    </h3>

                    <p>
                        $5,000.00
                    </p>
                </div>

                <p class="mt-1 text-sm text-gray-500">
                    Education
                </p>
            </div>

            <!-- More products... -->
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

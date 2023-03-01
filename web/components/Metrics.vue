<template>
    <main class="relative bg-gray-900">
        <div class="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
            <div class="h-full w-full xl:grid xl:grid-cols-2">
                <div class="h-full xl:relative xl:col-start-2">
                    <img
                        class="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                        src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                        alt="People working on laptops"
                    />
                    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"></div>
                </div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
            <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                <h2 class="text-sm font-semibold tracking-wide uppercase">
                    <span class="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                        Real-time Crowdfunding Metrics
                    </span>
                </h2>

                <p class="mt-3 text-3xl font-extrabold text-white">
                    Bitcoin Cash is leading the way in peer-to-peer crowdfunding.
                </p>

                <p class="mt-5 text-lg text-gray-300">
                    SmartBCH introduces an improved system for managing public, peer-to-peer fundraisers.
                </p>

                <p class="mt-5 text-lg text-gray-300">
                    All data is stored on-chain. This guarantees 100% transparency with every satoshi earned and spent.
                </p>

                <div class="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                    <p>
                        <span class="block text-2xl font-bold text-white">100+</span>
                        <span class="mt-1 block text-base text-gray-300"><span class="font-medium text-white">Flipstarter Campaigns</span> have been successfully funded.</span>
                    </p>

                    <p>
                        <span class="block text-2xl font-bold text-white">125+</span>
                        <span class="mt-1 block text-base text-gray-300"><span class="font-medium text-white">Countries around the globe</span> have supported Bitcoin crowdfunding.</span>
                    </p>

                    <p>
                        <span class="block text-2xl font-bold text-white">$0</span>
                        <span class="mt-1 block text-base text-gray-300"><span class="font-medium text-white">Supporter's Money</span> have been lost due to hacks or software bugs.</span>
                    </p>

                    <p>
                        <span class="block text-2xl font-bold text-white">12B+</span>
                        <span class="mt-1 block text-base text-gray-300"><span class="font-medium text-white">Total Crypto Donations</span> to charities over the past decade.</span>
                    </p>
                </div>

                <router-link to="/stats" class="hidden flex justify-center mt-20">
                    <span class="py-3 px-10 text-3xl text-white rounded-xl border-4 border-indigo-500 bg-indigo-300">
                        Show All Stats
                    </span>
                </router-link>
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

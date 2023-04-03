<template>
    <main class="bg-gradient-to-r from-lime-600 to-green-600 border-b-4 border-lime-700">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
            <div class="w-full py-6 flex flex-col sm:flex-row items-center justify-between border-b border-indigo-500 lg:border-none">
                <div class="flex items-center">
                    <NuxtLink to="/" class="flex flex-row sm:flex-col items-center">
                        <span class="sr-only">Causes Cash</span>

                        <img class="h-12 lg:h-16 w-auto" src="~/assets/logo.png" alt="" />

                        <h1 class="text-4xl font-bold bg-clip-text text-transparent tracking-tighter bg-gradient-to-r from-green-400 to-lime-300">
                            Causes<span class="mx-1 text-5xl text-lime-200">.</span>Cash
                        </h1>
                    </NuxtLink>

                    <div class="hidden ml-10 space-x-8 lg:flex items-center">
                        <NuxtLink to="/reports" class="text-2xl font-medium text-white hover:text-indigo-50" key="Reporting">
                            Report Cards
                        </NuxtLink>

                        <NuxtLink to="/spotlight" class="text-2xl font-medium text-white hover:text-indigo-50" key="Spotlight">
                            Spotlight
                        </NuxtLink>

                        <NuxtLink to="/help" class="text-base font-medium text-white hover:text-indigo-50" key="Support">
                            Need help?
                        </NuxtLink>
                    </div>
                </div>

                <div class="mt-3 sm:mt-0 sm:ml-10 sm:space-x-4">
                    <a href="javascript://" class="hidden inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                        Sign in
                    </a>

                    <NuxtLink to="/c/bootstrap" class="inline-block bg-lime-600 py-2 px-4 border-4 border-lime-300 rounded-xl hover:bg-lime-700 hover:border-lime-500">
                        <span class="text-2xl font-bold text-gray-50 tracking-tighter">
                            👉 Nexa Is Boostrapping 👀
                        </span>
                    </NuxtLink>
                </div>
            </div>

            <div class="hidden py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                <a href="javascript://" class="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
                    Solutions
                </a>

                <a href="javascript://" class="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
                    Pricing
                </a>

                <a href="javascript://" class="text-base font-medium text-white hover:text-indigo-50" key="Docs">
                    Docs
                </a>

                <a href="javascript://" class="text-base font-medium text-white hover:text-indigo-50" key="Company">
                    Company
                </a>
            </div>
        </nav>
    </main>
</template>

<script>
export default {
    props: {
        msg: String
    },
    data: () => {
        return {
            showSBCHMenu: null,
            hasProfile: null,
            hasWallet: null,
        }
    },
    created: function () {
        this.showSBCHMenu = false

        this.hasProfile = true

        this.hasWallet = false

        this.showCampaign = false
    },
    mounted: function () {
        //
    },
}
</script>

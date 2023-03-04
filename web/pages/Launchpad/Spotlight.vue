<template>
    <main>
        <legend class="text-lg font-medium text-gray-900">
            Spotlight Upgrade (optional)
        </legend>

        <p class="text-sm p-3">
            Spotlight campaigns are featured on sites like Causes Cash.

            If the campaign is successfully funded, 1% of proceeds will be sent to the
            <a class="text-red-500 font-medium" href="https://pif.cash" target="_blank">Pay It Forward Treasury</a>.

            Your campaign's supporters will receive
            <a class="text-red-500 font-medium" href="https://pif.cash" target="_blank">PIF</a> for staking and voting rights.
        </p>

        <div class="mt-1 bg-white rounded-md shadow-sm -space-y-px">
            <!-- Checked: "bg-sky-50 border-sky-200 z-10", Not Checked: "border-gray-200" -->
            <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                <input
                    type="radio"
                    name="privacy-setting"
                    value="Public access"
                    class="h-4 w-4 mt-0.5 cursor-pointer text-sky-600 border-gray-300 focus:ring-sky-500"
                    aria-labelledby="privacy-setting-0-label"
                    aria-describedby="privacy-setting-0-description"
                />
                <div class="ml-3 flex flex-col">
                    <!-- Checked: "text-sky-900", Not Checked: "text-gray-900" -->
                    <span id="privacy-setting-0-label" class="block text-sm font-medium">
                        FREE CAMPAIGN
                    </span>

                    <!-- Checked: "text-sky-700", Not Checked: "text-gray-500" -->
                    <span id="privacy-setting-0-description" class="block text-sm">
                        This campaign will be available to anyone who has the direct link.
                        {{publicDomain}}
                    </span>

                    <span class="block text-sm">
                        Rich-media (ie. photo, videos, etc) must be hosted on public servers.
                    </span>
                </div>
            </label>

            <!-- Checked: "bg-sky-50 border-sky-200 z-10", Not Checked: "border-gray-200" -->
            <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                <input
                    type="radio"
                    name="privacy-setting"
                    value="Private to Project Members"
                    class="h-4 w-4 mt-0.5 cursor-pointer text-sky-600 border-gray-300 focus:ring-sky-500"
                    aria-labelledby="privacy-setting-1-label"
                    aria-describedby="privacy-setting-1-description"
                />
                <div class="ml-3 flex flex-col">
                    <!-- Checked: "text-sky-900", Not Checked: "text-gray-900" -->
                    <span id="privacy-setting-1-label" class="block text-sm font-medium">
                        SPOTLIGHT CAMPAIGN
                    </span>
                    <!-- Checked: "text-sky-700", Not Checked: "text-gray-500" -->
                    <span id="privacy-setting-1-description" class="block text-sm">
                        This project will be discoverable on ALL supporting crowdfunding platforms.
                    </span>

                    <small class="text-xs text-red-500">1% will be sent to the PIF Treasury</small>

                    <span class="block text-sm">
                        Rich-media (ie. photo, videos, etc) must be hosted on OUR servers.
                    </span>
                </div>
            </label>

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

<template>
    <!--
    Mobile menu

    Off-canvas menu for mobile, show/hide based on off-canvas menu state.
  -->
    <main class="hidden fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
        <!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>

        <!--
      Off-canvas menu, show/hide based on off-canvas menu state.

      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    -->
        <div class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div class="px-4 pt-5 pb-2 flex">
                <button type="button" class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400">
                    <span class="sr-only">Close menu</span>
                    <!-- Heroicon name: outline/x -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Links -->
            <div class="mt-2">
                <div class="border-b border-gray-200">
                    <div class="-mb-px flex px-4 space-x-8" aria-orientation="horizontal" role="tablist">
                        <!-- Selected: "text-indigo-600 border-indigo-600", Not Selected: "text-gray-900 border-transparent" -->
                        <button id="tabs-1-tab-1" class="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium" aria-controls="tabs-1-panel-1" role="tab" type="button">
                            Wireframe Kits
                        </button>

                        <!-- Selected: "text-indigo-600 border-indigo-600", Not Selected: "text-gray-900 border-transparent" -->
                        <button id="tabs-1-tab-2" class="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium" aria-controls="tabs-1-panel-2" role="tab" type="button">
                            Icons
                        </button>
                    </div>
                </div>

                <!-- 'Wireframe Kits' tab panel, show/hide based on tab state. -->
                <div id="tabs-1-panel-1" class="pt-10 pb-8 px-4 space-y-10" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
                    <div class="grid grid-cols-2 gap-x-4">
                        <div class="group relative text-sm">
                            <div class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/product-page-05-menu-03.jpg"
                                    alt="Pricing page screenshot with tiered plan options and comparison table on colorful blue and green background."
                                    class="object-center object-cover"
                                />
                            </div>
                            <a href="javascript://" class="mt-6 block font-medium text-gray-900">
                                <span class="absolute z-10 inset-0" aria-hidden="true"></span>
                                Scaffold
                            </a>
                            <p aria-hidden="true" class="mt-1">Shop now</p>
                        </div>

                        <div class="group relative text-sm">
                            <div class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/product-page-05-menu-04.jpg"
                                    alt="Application screenshot with tiered navigation and account settings form on color red and purple background."
                                    class="object-center object-cover"
                                />
                            </div>
                            <a href="javascript://" class="mt-6 block font-medium text-gray-900">
                                <span class="absolute z-10 inset-0" aria-hidden="true"></span>
                                Bones
                            </a>
                            <p aria-hidden="true" class="mt-1">Shop now</p>
                        </div>
                    </div>

                    <div>
                        <p id="wireframe-application-heading-mobile" class="font-medium text-gray-900">
                            Application UI
                        </p>
                        <ul role="list" aria-labelledby="wireframe-application-heading-mobile" class="mt-6 flex flex-col space-y-6">
                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Home Screens
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Detail Screens
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Settings Screens
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p id="wireframe-marketing-heading-mobile" class="font-medium text-gray-900">
                            Marketing
                        </p>
                        <ul role="list" aria-labelledby="wireframe-marketing-heading-mobile" class="mt-6 flex flex-col space-y-6">
                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Landing Pages
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Pricing Pages
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Contact Pages
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p id="wireframe-ecommerce-heading-mobile" class="font-medium text-gray-900">
                            Ecommerce
                        </p>
                        <ul role="list" aria-labelledby="wireframe-ecommerce-heading-mobile" class="mt-6 flex flex-col space-y-6">
                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Storefront Pages
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Product Pages
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Category Pages
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Shopping Cart Pages
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Checkout Pages
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 'Icons' tab panel, show/hide based on tab state. -->
                <div id="tabs-1-panel-2" class="pt-10 pb-8 px-4 space-y-10" aria-labelledby="tabs-1-tab-2" role="tabpanel" tabindex="0">
                    <div class="grid grid-cols-2 gap-x-4">
                        <div class="group relative text-sm">
                            <div class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/product-page-05-menu-01.jpg"
                                    alt="Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background."
                                    class="object-center object-cover"
                                />
                            </div>
                            <a href="javascript://" class="mt-6 block font-medium text-gray-900">
                                <span class="absolute z-10 inset-0" aria-hidden="true"></span>
                                Application UI Pack
                            </a>
                            <p aria-hidden="true" class="mt-1">Shop now</p>
                        </div>

                        <div class="group relative text-sm">
                            <div class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                <img src="https://tailwindui.com/img/ecommerce-images/product-page-05-menu-02.jpg" alt="Calendar user interface screenshot with icon buttons and orange-yellow theme." class="object-center object-cover" />
                            </div>
                            <a href="javascript://" class="mt-6 block font-medium text-gray-900">
                                <span class="absolute z-10 inset-0" aria-hidden="true"></span>
                                Marketing Icon Pack
                            </a>
                            <p aria-hidden="true" class="mt-1">Shop now</p>
                        </div>
                    </div>

                    <div>
                        <p id="icons-general-heading-mobile" class="font-medium text-gray-900">
                            General Use
                        </p>
                        <ul role="list" aria-labelledby="icons-general-heading-mobile" class="mt-6 flex flex-col space-y-6">
                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Heroicons Solid
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Heroicons Outline
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Line Illustrations
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Hero Illustrations
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Branded Illustrations
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Skeuomorphic Illustrations
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Hand Drawn Illustrations
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p id="icons-application-heading-mobile" class="font-medium text-gray-900">
                            Application UI
                        </p>
                        <ul role="list" aria-labelledby="icons-application-heading-mobile" class="mt-6 flex flex-col space-y-6">
                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Outlined
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Solid
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Branded
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Small
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Illustrations
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p id="icons-marketing-heading-mobile" class="font-medium text-gray-900">
                            Marketing
                        </p>
                        <ul role="list" aria-labelledby="icons-marketing-heading-mobile" class="mt-6 flex flex-col space-y-6">
                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Outlined
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Solid
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Branded
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Small
                                </a>
                            </li>

                            <li class="flow-root">
                                <a href="javascript://" class="-m-2 p-2 block text-gray-500">
                                    Illustrations
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
                <div class="flow-root">
                    <a href="javascript://" class="-m-2 p-2 block font-medium text-gray-900">UI Kits</a>
                </div>

                <div class="flow-root">
                    <a href="javascript://" class="-m-2 p-2 block font-medium text-gray-900">Themes</a>
                </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
                <div class="flow-root">
                    <a href="javascript://" class="-m-2 p-2 block font-medium text-gray-900">Sign in</a>
                </div>
                <div class="flow-root">
                    <a href="javascript://" class="-m-2 p-2 block font-medium text-gray-900">Create account</a>
                </div>
            </div>

            <div class="border-t border-gray-200 py-6 px-4">
                <a href="javascript://" class="-m-2 p-2 flex items-center">
                    <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" class="w-5 h-auto block flex-shrink-0" />
                    <span class="ml-3 block text-base font-medium text-gray-900">
                        CAD
                    </span>
                    <span class="sr-only">, change currency</span>
                </a>
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

<template>
    <main class="relative bg-white">
        <p class="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
            Save 20% when you buy two or more kits
        </p>

        <nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="border-b border-gray-200">
                <div class="h-16 flex items-center">
                    <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. -->
                    <button type="button" class="bg-white p-2 rounded-md text-gray-400 lg:hidden">
                        <span class="sr-only">Open menu</span>
                        <!-- Heroicon name: outline/menu -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <!-- Logo -->
                    <div class="ml-4 flex lg:ml-0">
                        <a href="javascript://">
                            <span class="sr-only">Workflow</span>
                            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="" />
                        </a>
                    </div>

                    <!-- Flyout menus -->
                    <div class="hidden lg:ml-8 lg:block lg:self-stretch">
                        <div class="h-full flex space-x-8">
                            <div class="flex">
                                <div class="relative flex">
                                    <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->
                                    <button
                                        type="button"
                                        class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                                        aria-expanded="false"
                                    >
                                        Wireframe Kits
                                    </button>
                                </div>

                                <!--
                  'Wireframe Kits' flyout menu, show/hide based on flyout menu state.

                  Entering: "transition ease-out duration-200"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "transition ease-in duration-150"
                    From: "opacity-100"
                    To: "opacity-0"
                -->
                                <div class="absolute z-10 top-full inset-x-0 text-sm text-gray-500">
                                    <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                                    <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"></div>

                                    <div class="relative bg-white">
                                        <div class="max-w-7xl mx-auto px-8">
                                            <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                <div class="col-start-2 grid grid-cols-2 gap-x-8">
                                                    <div class="group relative text-base sm:text-sm">
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

                                                    <div class="group relative text-base sm:text-sm">
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
                                                <div class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                    <div>
                                                        <p id="Application UI-heading" class="font-medium text-gray-900">
                                                            Application UI
                                                        </p>
                                                        <ul role="list" aria-labelledby="Application UI-heading" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Home Screens
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Detail Screens
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Settings Screens
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <p id="Marketing-heading" class="font-medium text-gray-900">
                                                            Marketing
                                                        </p>
                                                        <ul role="list" aria-labelledby="Marketing-heading" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Landing Pages
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Pricing Pages
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Contact Pages
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <p id="Ecommerce-heading" class="font-medium text-gray-900">
                                                            Ecommerce
                                                        </p>
                                                        <ul role="list" aria-labelledby="Ecommerce-heading" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Storefront Pages
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Product Pages
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Category Pages
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Shopping Cart Pages
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Checkout Pages
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex">
                                <div class="relative flex">
                                    <!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->
                                    <button
                                        type="button"
                                        class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                                        aria-expanded="false"
                                    >
                                        Icons
                                    </button>
                                </div>

                                <!--
                  'Icons' flyout menu, show/hide based on flyout menu state.

                  Entering: "transition ease-out duration-200"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "transition ease-in duration-150"
                    From: "opacity-100"
                    To: "opacity-0"
                -->
                                <div class="absolute z-10 top-full inset-x-0 text-sm text-gray-500">
                                    <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                                    <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"></div>

                                    <div class="relative bg-white">
                                        <div class="max-w-7xl mx-auto px-8">
                                            <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                                <div class="col-start-2 grid grid-cols-2 gap-x-8">
                                                    <div class="group relative text-base sm:text-sm">
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

                                                    <div class="group relative text-base sm:text-sm">
                                                        <div class="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                            <img
                                                                src="https://tailwindui.com/img/ecommerce-images/product-page-05-menu-02.jpg"
                                                                alt="Calendar user interface screenshot with icon buttons and orange-yellow theme."
                                                                class="object-center object-cover"
                                                            />
                                                        </div>
                                                        <a href="javascript://" class="mt-6 block font-medium text-gray-900">
                                                            <span class="absolute z-10 inset-0" aria-hidden="true"></span>
                                                            Marketing Icon Pack
                                                        </a>
                                                        <p aria-hidden="true" class="mt-1">Shop now</p>
                                                    </div>
                                                </div>
                                                <div class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                    <div>
                                                        <p id="General Use-heading" class="font-medium text-gray-900">
                                                            General Use
                                                        </p>
                                                        <ul role="list" aria-labelledby="General Use-heading" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Heroicons Solid
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Heroicons Outline
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Line Illustrations
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Hero Illustrations
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Branded Illustrations
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Skeuomorphic Illustrations
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Hand Drawn Illustrations
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <p id="Application UI-heading" class="font-medium text-gray-900">
                                                            Application UI
                                                        </p>
                                                        <ul role="list" aria-labelledby="Application UI-heading" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Outlined
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Solid
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Branded
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Small
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Illustrations
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <p id="Marketing-heading" class="font-medium text-gray-900">
                                                            Marketing
                                                        </p>
                                                        <ul role="list" aria-labelledby="Marketing-heading" class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Outlined
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Solid
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Branded
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Small
                                                                </a>
                                                            </li>

                                                            <li class="flex">
                                                                <a href="javascript://" class="hover:text-gray-800">
                                                                    Illustrations
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="javascript://" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">UI Kits</a>

                            <a href="javascript://" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Themes</a>
                        </div>
                    </div>

                    <div class="ml-auto flex items-center">
                        <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <a href="javascript://" class="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</a>
                            <span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                            <a href="javascript://" class="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</a>
                        </div>

                        <div class="hidden lg:ml-8 lg:flex">
                            <a href="javascript://" class="text-gray-700 hover:text-gray-800 flex items-center">
                                <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" class="w-5 h-auto block flex-shrink-0" />
                                <span class="ml-3 block text-sm font-medium">
                                    CAD
                                </span>
                                <span class="sr-only">, change currency</span>
                            </a>
                        </div>

                        <!-- Search -->
                        <div class="flex lg:ml-6">
                            <a href="javascript://" class="p-2 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Search</span>
                                <!-- Heroicon name: outline/search -->
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </a>
                        </div>

                        <!-- Cart -->
                        <div class="ml-4 flow-root lg:ml-6">
                            <a href="javascript://" class="group -m-2 p-2 flex items-center">
                                <!-- Heroicon name: outline/shopping-bag -->
                                <svg class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                <span class="sr-only">items in cart, view bag</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
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

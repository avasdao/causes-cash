<template>
    <main class="relative bg-indigo-600 rounded-xl">
        <!-- Overlapping background -->
        <div aria-hidden="true" class="hidden absolute bg-gray-50 w-full h-6 bottom-0 lg:block"></div>

        <div class="relative max-w-2xl mx-auto pt-16 px-4 text-center sm:pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                <span class="block lg:inline">Compare Your Pricing Options</span>
            </h1>

            <p class="mt-4 text-xl text-indigo-100 font-bold">
                Causes Cash will always remain 100% Free and Open Source Software (FOSS)
            </p>
        </div>

        <h2 class="sr-only">Plans</h2>

        <!-- Cards -->
        <div class="relative mt-8 max-w-2xl mx-auto px-4 pb-8 sm:mt-12 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-0">
            <!-- Decorative background -->
            <div aria-hidden="true" class="hidden absolute top-4 bottom-6 left-8 right-8 inset-0 bg-indigo-700 rounded-tl-lg rounded-tr-lg lg:block"></div>

            <div class="relative space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3">
                <div class="bg-indigo-700 lg:bg-transparent pt-6 px-6 pb-3 rounded-lg lg:px-8 lg:pt-12">
                    <div>
                        <h3 class="text-white text-sm font-semibold uppercase tracking-wide">
                            Self-Hosted Campaign
                        </h3>

                        <div class="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                            <div class="mt-3 flex items-center">
                                <p class="text-white text-4xl font-extrabold tracking-tight">
                                    FREE
                                </p>

                                <div class="ml-4">
                                    <p class="text-white text-xs">&nbsp;</p>
                                    <p class="text-indigo-200 text-sm">as in beer</p>
                                </div>
                            </div>

                            <NuxtLink to="https://docs.causes.cash" target="_blank"
                                class="bg-white text-indigo-600 hover:bg-indigo-50 mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-md shadow-sm text-center text-lg font-medium sm:mt-0 sm:w-auto lg:mt-6 lg:w-full"
                            >
                                Start a SELF-HOSTED Campaign
                            </NuxtLink>
                        </div>
                    </div>

                    <h4 class="sr-only">Features</h4>

                    <ul role="list" class="border-indigo-500 divide-indigo-500 divide-opacity-75 mt-7 border-t divide-y lg:border-t-0">

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-200 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                3 - 6 HOURS Avg Setup Time
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-red-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Offer Token Rewards
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-red-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                FREE Media Hosting (photos, videos)
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-red-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Showcased on Premium Sites
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-red-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Automatically Return Expired Pledges
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-200 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Cloudflare DDoS Protection
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-200 w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Metadata Stored On-chain
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-200 w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Never Expires
                            </span>
                        </li>

                    </ul>
                </div>

                <div class="bg-white ring-2 ring-indigo-700 shadow-md pt-6 px-6 pb-3 rounded-lg lg:px-8 lg:pt-12">
                    <div>
                        <h3 class="text-indigo-600 text-sm font-semibold uppercase tracking-wide">
                            Premium Spotlight Campaign
                        </h3>

                        <div class="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                            <div class="mt-3 flex items-center">
                                <p class="text-indigo-600 text-5xl font-extrabold tracking-tight">
                                    1%
                                </p>

                                <div class="ml-4">
                                    <p class="text-gray-700 text-sm">
                                        Total Funding Goal
                                    </p>

                                    <p class="text-gray-500 text-sm">
                                        ONLY paid if successfully funded
                                    </p>
                                </div>
                            </div>

                            <div class="w-full flex justify-center">
                                <span class="text-xs text-rose-400 font-medium italic">
                                    automatic payout to ALL campaign stakeholders
                                </span>
                            </div>

                            <router-link to="/launchpad" class="bg-indigo-600 text-white hover:bg-indigo-700 mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-md shadow-sm text-center text-lg font-medium sm:mt-0 sm:w-auto lg:mt-6 lg:w-full">
                                Start a SPOTLIGHT Campaign
                            </router-link>
                        </div>
                    </div>

                    <h4 class="sr-only">Features</h4>

                    <ul role="list" class="border-gray-200 divide-gray-200 mt-7 border-t divide-y lg:border-t-0">

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                5 MINUTES Avg Setup Time
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                Offer Token Rewards
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                FREE Media Hosting (photos, videos)
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                Showcased on Premium Sites
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                Automatically Return Expired Pledges
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                Cloudflare DDoS Protection
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                Metadata Stored On-chain
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                Never Expires
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-500 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"></path>
                            </svg>

                            <span class="text-gray-600 ml-4 text-sm font-medium">
                                FREE bank transfers
                                <span class="text-rose-400 italic">coming soon...</span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="bg-indigo-700 lg:bg-transparent pt-6 px-6 pb-3 rounded-lg lg:px-8 lg:pt-12">
                    <div>
                        <h3 class="text-white text-sm font-semibold uppercase tracking-wide">
                            Blockchain-hosted Campaign
                        </h3>

                        <div class="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                            <div class="mt-3 flex items-center">
                                <p class="text-white text-4xl font-extrabold tracking-tight">FREE</p>
                                <div class="ml-4">
                                    <p class="text-white text-xs">&nbsp;</p>
                                    <p class="text-indigo-200 text-sm">as in beer</p>
                                </div>
                            </div>

                            <router-link to="/launchpad" class="bg-white text-indigo-600 hover:bg-indigo-50 mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-md shadow-sm text-center text-lg font-medium sm:mt-0 sm:w-auto lg:mt-6 lg:w-full">
                                Start an ON-CHAIN Campaign
                            </router-link>
                        </div>
                    </div>

                    <h4 class="sr-only">Features</h4>

                    <ul role="list" class="border-indigo-500 divide-indigo-500 divide-opacity-75 mt-7 border-t divide-y lg:border-t-0">

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-200 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                1 - 2 HOURS Avg Setup Time
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-red-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Offer Token Rewards
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-red-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                FREE Media Hosting (photos, videos)
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-red-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Showcased on Premium Sites
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-red-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Automatically Return Expired Pledges
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-200 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Cloudflare DDoS Protection
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-200 w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Metadata Stored On-chain
                            </span>
                        </li>

                        <li class="py-3 flex items-center">
                            <svg class="text-indigo-200 w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>

                            <span class="text-white ml-4 text-sm font-medium">
                                Never Expires
                            </span>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </main>
</template>

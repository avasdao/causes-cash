<template>
    <main class="relative bg-gray-800">
        <div class="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
            <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply" alt="" />
        </div>
        <div class="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div class="md:ml-auto md:w-1/2 md:pl-10">
                <h2 class="text-base font-semibold uppercase tracking-wider text-gray-300">
                    Ready to launch your next campaign?
                </h2>

                <p class="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Start accepting contributions in under 5 minutes!
                </p>

                <p class="mt-3 text-lg text-gray-300">
                    We heard that your community is eager to support your next big idea.
                    So we've made it super easy for you to get started.
                </p>

                <p class="mt-3 text-lg text-gray-300">
                    It only takes a few details to draft and launch your campaign.
                    Then, you are welcome to take as much time as needed to complete your final draft.
                </p>

                <p class="mt-1 text-sm text-gray-300 italic">
                    NOTE: All campaign updates are "permanently" saved to the on-chain changelog.
                </p>

                <div class="hidden mt-8">
                    <div class="inline-flex rounded-md shadow">
                        <a href="javascript://" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50">
                            Visit the help center
                            <!-- Heroicon name: solid/external-link -->
                            <svg class="-mr-1 ml-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
                    <router-link to="/help" class="flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700">
                        Watch a Video Demo
                    </router-link>

                    <router-link to="/launchpad" class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-800 bg-indigo-50 hover:bg-indigo-100">
                        Start a New Campaign
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

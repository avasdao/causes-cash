<template>
    <main class="relative">
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div class="absolute inset-0">
                    <img
                        class="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                        alt="People working on laptops"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply"></div>
                </div>

                <div class="relative px-4 py-8 sm:px-6 sm:py-12 lg:py-16 lg:px-8">
                    <h1 class="text-center font-extrabold tracking-tight text-4xl">
                        <span class="block text-white sm:text-5xl lg:text-8xl">
                            Causes Cash
                        </span>

                        <span class="block text-indigo-200">
                            Peer-to-Peer Crowdfunding
                        </span>
                    </h1>

                    <p class="mt-6 max-w-lg mx-auto text-center text-2xl text-indigo-200 sm:max-w-3xl">
                        Creators ALL ❤️ our first-class <span class="text-yellow-400 font-bold">Crowdfunding Experience (CX)</span> on the MOST effective platform to <span class="font-bold">Build</span>, <span class="font-bold">Collect</span> and <span class="font-bold">Manage</span> support for your next BIG project.
                    </p>

                    <div class="mt-10 max-w-sm mx-auto lg:max-w-none lg:flex lg:justify-center">
                        <div class="space-y-4 lg:space-y-0 lg:mx-auto lg:inline-grid lg:grid-cols-2 lg:gap-5">
                            <NuxtLink to="/launchpad" class="flex items-center justify-center px-4 py-3 border border-transparent text-xl sm:text-2xl font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8">
                                Start a Campaign
                            </NuxtLink>

                            <NuxtLink to="https://docs.causes.cash/pledging" target="_blank" class="flex items-center justify-center px-4 py-3 border border-transparent text-xl sm:text-2xl font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8">
                                How-To Pledge
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

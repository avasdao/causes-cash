<template>
    <main>

        <!-- Main content -->
        <div class="flex-1 xl:overflow-y-auto">
            <div class="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
                <h1 class="text-3xl font-extrabold text-gray-500">
                    Campaign Editor
                </h1>

                <div class="">
                    <p class="mt-1 text-lg text-blue-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div class="mt-5">
                        <label for="title" class="block text-xl font-medium text-gray-500">
                            Title
                        </label>

                        <input
                            v-model="title"
                            type="text"
                            name="title"
                            id="title"
                            autocomplete="given-name"
                            class="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-gray-700 text-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label for="combobox" class="mt-5 block text-lg font-medium text-gray-500">
                            Category
                        </label>

                        <div class="relative mt-1">
                            <input
                                @click="toggleCategory"
                                :value="$store.getters.getCategoryById(category)"
                                id="combobox"
                                type="text"
                                class="w-full rounded-md border border-gray-300 text-gray-700 text-lg bg-white py-2 pl-3 pr-12 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                role="combobox"
                                aria-controls="options"
                                aria-expanded="false"
                            />
                            <button @click="toggleCategory" type="button" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <!-- Heroicon name: solid/selector -->
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>

                            <ul v-if="showCategories" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" id="options" role="listbox">
                                <li @click="selectCategory('adoption')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'adoption' }">Adoption</span>

                                    <span v-if="category === 'adoption'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('community')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'community' }">Community</span>

                                    <span v-if="category === 'community'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('dapp')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'dapp' }">Decentralized App</span>

                                    <span v-if="category === 'dapp'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('design-art')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'design-art' }">Design &amp; Art</span>

                                    <span v-if="category === 'design-art'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('education')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'education' }">Education</span>

                                    <span v-if="category === 'education'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('film-video')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'film-video' }">Film &amp; Video</span>

                                    <span v-if="category === 'film-video'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('fun-games')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'fun-games' }">Fun &amp; Games</span>

                                    <span v-if="category === 'fun-games'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('hardware')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'hardware' }">Hardware</span>

                                    <span v-if="category === 'hardware'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('health-wellness')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'health-wellness' }">Health &amp; Wellness</span>

                                    <span v-if="category === 'health-wellness'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('infrastructure')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'infrastructure' }">Infrastructure</span>

                                    <span v-if="category === 'infrastructure'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('music')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'music' }">Music</span>

                                    <span v-if="category === 'music'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('privacy')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'privacy' }">Privacy</span>

                                    <span v-if="category === 'privacy'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('publishing')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'publishing' }">Publishing</span>

                                    <span v-if="category === 'publishing'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('security')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'security' }">Security</span>

                                    <span v-if="category === 'security'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('software')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'software' }">Software</span>

                                    <span v-if="category === 'software'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('world-view')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'world-view' }">World View</span>

                                    <span v-if="category === 'world-view'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                                <li @click="selectCategory('youth')" class="relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:text-white hover:bg-indigo-600" id="option-0" role="option" tabindex="-1">
                                    <span class="block truncate" :class="{ 'font-semibold' : category === 'youth' }">Youth</span>

                                    <span v-if="category === 'youth'" class="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600">
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div class="mt-5">
                        <label for="description" class="block text-xl font-medium text-gray-500">
                            Summary
                        </label>

                        <div class="mt-1">
                            <textarea
                                v-model="summary"
                                id="summary"
                                name="summary"
                                rows="3"
                                class="block w-full border border-blue-gray-300 rounded-md shadow-sm text-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500">
                            </textarea>
                        </div>

                        <p class="mt-3 text-sm text-blue-gray-500">
                            Brief description for your campaign. URLs are hyperlinked.
                        </p>
                    </div>

                    <div class="mt-5">
                        <label for="description" class="block text-xl font-medium text-gray-500">
                            Description
                        </label>

                        <div class="mt-1">
                            <textarea
                                v-model="description"
                                id="description"
                                name="description"
                                rows="5"
                                class="block w-full border border-blue-gray-300 rounded-md shadow-sm text-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500">
                            </textarea>
                        </div>

                        <p class="mt-3 text-sm text-blue-gray-500">
                            Detailed description for your campaign. URLs are hyperlinked.
                        </p>
                    </div>

                    <div class="mt-5">
                        <label for="banner" class="block text-xl font-medium text-gray-500">
                            Image Banner / Poster
                        </label>

                        <div class="mt-1">
                            <input
                                v-model="banner"
                                type="text"
                                name="banner"
                                id="banner"
                                autocomplete="given-name"
                                class="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-gray-700 text-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <p class="mt-3 text-sm text-blue-gray-500">
                            Supported images are: JPG, GIF and PNG
                        </p>
                    </div>

                    <div class="mt-5">
                        <label for="custom-domain" class="block text-xl font-medium text-gray-500">
                            Custom Domain
                        </label>

                        <input
                            v-model="domain"
                            type="text"
                            name="custom-domain"
                            id="custom-domain"
                            autocomplete="family-name"
                            class="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-gray-700 text-lg focus:ring-blue-500 focus:border-blue-500"
                        />

                        <p class="mt-3 text-sm text-blue-gray-500">
                            See <a href="javascript://">instructions</a> on how to configure your DNS (CNAME) entry.
                        </p>
                    </div>

                    <div class="mt-5">
                        <label for="highlights" class="block text-xl font-medium text-gray-500">
                            Highlights
                        </label>

                        <div class="mt-1 flex flex-row gap-4 items-center">
                            <h1 class="pl-5 text-xl text-indigo-300 font-bold">#1</h1>

                            <input
                                v-model="highlights[0]"
                                type="text"
                                name="highlights-0"
                                id="highlights-0"
                                autocomplete="family-name"
                                placeholder="Highlight #1"
                                class="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-gray-700 text-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div class="mt-1 flex flex-row gap-4 items-center">
                            <h1 class="pl-5 text-xl text-indigo-300 font-bold">#2</h1>

                            <input
                                v-model="highlights[1]"
                                type="text"
                                name="highlights-1"
                                id="highlights-1"
                                autocomplete="family-name"
                                placeholder="Highlight #2"
                                class="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-gray-700 text-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div class="mt-1 flex flex-row gap-4 items-center">
                            <h1 class="pl-5 text-xl text-indigo-300 font-bold">#3</h1>

                            <input
                                v-model="highlights[2]"
                                type="text"
                                name="highlights-2"
                                id="highlights-2"
                                autocomplete="family-name"
                                placeholder="Highlight #3"
                                class="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-gray-700 text-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div class="mt-1 flex flex-row gap-4 items-center">
                            <h1 class="pl-5 text-xl text-indigo-300 font-bold">#4</h1>

                            <input
                                v-model="highlights[3]"
                                type="text"
                                name="highlights-3"
                                id="highlights-3"
                                autocomplete="family-name"
                                placeholder="Highlight #4"
                                class="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-gray-700 text-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div class="mt-1 flex flex-row gap-4 items-center">
                            <h1 class="pl-5 text-xl text-indigo-300 font-bold">#5</h1>

                            <input
                                v-model="highlights[4]"
                                type="text"
                                name="highlights-4"
                                id="highlights-4"
                                autocomplete="family-name"
                                placeholder="Highlight #5"
                                class="mt-1 block w-full border-blue-gray-300 rounded-md shadow-sm text-gray-700 text-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <p class="mt-3 text-sm text-blue-gray-500">
                            Add up to 5 (optional) highlights to spotlight your campaign's most notable features.
                        </p>
                    </div>

                    <fieldset class="mt-5">
                        <label for="highlights" class="block text-xl font-medium text-gray-500">
                            Public Visibility
                        </label>

                        <div class="mt-2 bg-white rounded-md -space-y-px">
                            <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none" :class="[ isPublished === true ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200' ]">
                                <input
                                    @click="isPublished = true"
                                    :checked="isPublished"
                                    type="radio"
                                    name="privacy-setting"
                                    value="Public access"
                                    class="h-4 w-4 mt-0.5 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    aria-labelledby="privacy-setting-0-label"
                                    aria-describedby="privacy-setting-0-description"
                                />

                                <div class="ml-3 flex flex-col">
                                    <span id="privacy-setting-0-label" class="block text-lg font-medium" :class="[ isPublished === true ? 'text-indigo-900' : 'text-gray-900' ]">
                                        Public Access
                                    </span>

                                    <span id="privacy-setting-0-description" class="block text-base" :class="[ isPublished === true ? 'text-indigo-700' : 'text-gray-500' ]">
                                        This project would be available to anyone who has the link
                                    </span>
                                </div>
                            </label>

                            <label class="relative border p-4 flex cursor-pointer focus:outline-none border-gray-200" :class="[ isPublished !== true ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200' ]">
                                <input
                                    @click="isPublished = false"
                                    :checked="!isPublished"
                                    type="radio"
                                    name="privacy-setting"
                                    value="Private to Project Members"
                                    class="h-4 w-4 mt-0.5 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    aria-labelledby="privacy-setting-1-label"
                                    aria-describedby="privacy-setting-1-description"
                                />

                                <div class="ml-3 flex flex-col">
                                    <span id="privacy-setting-1-label" class="block text-lg font-medium" :class="[ isPublished !== true ? 'text-indigo-900' : 'text-gray-900' ]">
                                        Private to Project Members
                                    </span>

                                    <span id="privacy-setting-1-description" class="block text-base" :class="[ isPublished !== true ? 'text-indigo-700' : 'text-gray-500' ]">
                                        Only members of this project would be able to access
                                    </span>
                                </div>
                            </label>

                        </div>
                    </fieldset>

                </div>

            </div>
        </div>

        <div class="flex justify-end px-4">
            <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                Reset
            </button>

            <button
                @click="update"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
                Save Your Changes
            </button>
        </div>

    </main>
</template>

<script>
/* global BigInt ethereum */

/* Import modules. */
import { ethers } from 'ethers'

/* Import components. */
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            showCategories: null,

            category: null,
            domain: null,
            title: null,
            summary: null,
            description: null,
            banner: null,
            highlights: null,
            isPublished: null,
        }
    },
    watch: {
        displayCategory: {
            handler(_category) {
                this.category = _category
            },
            immediate: true,
        },

        displayDomain: {
            handler(_domain) {
                this.domain = _domain
            },
            immediate: true,
        },

        displayTitle: {
            handler(_title) {
                this.title = _title
            },
            immediate: true,
        },

        displaySummary: {
            handler(_summary) {
                this.summary = _summary
            },
            immediate: true,
        },

        displayDescription: {
            handler(_description) {
                this.description = _description
            },
            immediate: true,
        },

        displayBanner: {
            handler(_banner) {
                this.banner = _banner
            },
            immediate: true,
        },

        displayHighlights: {
            handler(_highlights) {
                /* Validate highlights has been initialized. */
                if (!this.highlights) return

                // NOTE: We need to use the "spread" format to avoid creating
                //       a constant that cannot be updated with reactivity.
                this.highlights = [ ..._highlights ]
            },
            immediate: true,
        },

        displayIsPublished: {
            handler(_isPublished) {
                this.isPublished = _isPublished
            },
            immediate: true,
        },

    },
    computed: {
        displayCategory() {
            if (!this.$store?.state?.category) return ''

            return this.$store?.state?.category
        },

        displayDomain() {
            if (!this.$store?.state?.domain) return ''

            return this.$store?.state?.domain
        },

        displayTitle() {
            if (!this.$store?.state?.title) return ''

            return this.$store?.state?.title
        },

        displaySummary() {
            if (!this.$store?.state?.summary) return ''

            return this.$store?.state?.summary
        },

        displayDescription() {
            if (!this.$store?.state?.description) return ''

            return this.$store?.state?.description
        },

        displayBanner() {
            if (!this.$store?.state?.banner) return ''

            return this.$store?.state?.banner
        },

        displayHighlights() {
            if (!this.$store?.state?.highlights) return ''

            return this.$store?.state?.highlights
        },

        displayIsPublished() {
            if (!this.$store?.state?.isPublished) return ''

            return this.$store?.state?.isPublished
        },

    },
    methods: {
        toggleCategory() {
            if (this.showCategories) {
                this.showCategories = false
            } else {
                this.showCategories = true
            }
        },

        selectCategory(_category) {
            this.showCategories = false

            this.category = _category
        },

        async update() {
            console.log('Updating campaign..')

            /* Validate embedded Web3 objects. */
            if (!window.ethereum && !window.bitcoin) {
                /* Validate embedded ethereum object. */
                if (window.bitcoin) {
                    console.info('Found Bitcoin provider.')
                } else if (window.ethereum) {
                    console.info('Found Ethereum provider.')
                } else {
                    return console.error('No Web3 provider found.')
                }
            }

            /* Connect accounts. */
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })
            // console.info('Connected Web3 accounts:', accounts)

            if (!accounts || accounts.length < 1) {
                return alert('Please connect your MetaMask account to continue.')
            }

            /* Initialize provider. */
            const provider = new ethers
                .providers
                .Web3Provider(window.ethereum, 'any')

            /* Set signer. */
            const signer = provider.getSigner()
            // console.log('SIGNER', signer)

            /* Set Campaign ABI. */
            const abi = this.$store.getters.getCampaignAbi

            /* Initialize campaign instance. */
            const campaign = new ethers.Contract(
                this.$store?.state?.campaignid, abi, signer)
            // console.log('CONTRACT (campaign):', campaign)

            const category = this.category || ''
            const domain = this.domain || ''
            const title = this.title || ''
            const summary = this.summary || ''
            const description = this.description || ''
            const banner = this.banner || ''
            const highlights = this.highlights || ['', '', '', '', '']
            const isPublished = this.isPublished || false

            /* Set gas price. */
            // NOTE: Current minimum is 1.05 gWei (1,050,000,000)
            const gasPrice = BigInt(1050000000)

            /* Set contract options. */
            const contractOptions = {
                gasPrice,
                // value,
            }
            // console.log('CONTRACT OPTIONS', contractOptions)

            /* Make pledge. */
            const response = await campaign
                .updateCampaign(
                    category,
                    domain,
                    title,
                    summary,
                    description,
                    banner,
                    highlights,
                    isPublished,
                    { ...contractOptions }
                )
                .catch(err => {
                    console.error(err)

                    /* Initialize message. */
                    let message = ''

                    /* Validate message. */
                    if (err.message) {
                        message += err.message

                        /* Validate account permissions. */
                        if (err.message.includes('execution reverted')) {
                            message = `Oops! You don't have permission to perform that update. Check your account and try again..`
                        }
                    }

                    /* Validate data message. */
                    if (err.data && err.data.message) {
                        message += ' - ' + err.data.message
                    }

                    /* Send notification request. */
                    this.$store.dispatch('showNotif', {
                        icon: 'error',
                        title: 'MetaMask Error!',
                        message,
                    })
                })
            console.log('DEPLOY RESPONSE', response)

            /* Send notification request. */
            // this.$store.dispatch('showNotif', {
            //     icon: 'success',
            //     title: 'Campaign Manager',
            //     message: `Your campaign has been updated successfully!`,
            // })

        },

    },
    created: function () {
        /* Initialize category combobox. */
        this.showCategories = false

        /* Initialize highlights. */
        this.highlights = ['', '', '', '', '']

    },
    mounted: function () {
        //
    },
}
</script>

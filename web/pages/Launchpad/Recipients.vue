<template>
    <main class="space-y-2">
        <div class="space-y-1">
            <label for="add-team-members" class="block text-lg font-medium text-gray-700">
                Add Fund Receipient(s)
            </label>

            <p id="add-team-members-helper" class="sr-only">Search by contact name</p>

            <div class="flex">
                <div class="flex-grow">
                    <input
                        type="text"
                        name="add-team-members"
                        id="add-team-members"
                        class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-lg border-gray-300 rounded-md"
                        placeholder="Search by contact name"
                        aria-describedby="add-team-members-helper"
                    />
                </div>

                <span class="ml-3">
                    <button
                        type="button"
                        class="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-lg font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                        <!-- Heroicon name: solid/plus -->
                        <svg class="-ml-2 mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        <span>Add</span>
                    </button>
                </span>
            </div>
        </div>

        <div class="border-b border-gray-200">
            <ul role="list" class="divide-y divide-gray-200">
                <li class="py-4 flex">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <div class="ml-3 flex flex-col">
                        <span class="text-sm font-medium text-gray-900">PIF Treasury</span>
                        <span class="text-sm text-gray-500">pif.cash</span>
                    </div>
                </li>

                <li class="py-4 flex">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <div class="ml-3 flex flex-col">
                        <span class="text-sm font-medium text-gray-900">Bessie Richards</span>
                        <span class="text-sm text-gray-500">bessie.richards@example.com</span>
                    </div>
                </li>

                <li class="py-4 flex">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <div class="ml-3 flex flex-col">
                        <span class="text-sm font-medium text-gray-900">Floyd Black</span>
                        <span class="text-sm text-gray-500">floyd.black@example.com</span>
                    </div>
                </li>
            </ul>
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

<template>
    <main aria-labelledby="notes-title">
        <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
            <div class="divide-y divide-gray-200">

                <div class="px-4 py-5 sm:px-6">
                    <h2 id="notes-title" class="text-lg font-medium text-gray-500">
                        Private Notes
                    </h2>

                    <div class="text-red-400">
                        <small class="block font-bold">
                            !! IMPORTANT !!
                        </small>

                        <small class="block">
                            Notes are encrypted with <strong>YOUR</strong> private key.
                        </small>

                        <small class="block">
                            <strong>ONLY YOU</strong> can read &amp; write them.
                        </small>
                    </div>
                </div>

                <div class="px-4 py-6 sm:px-6">
                    <ul role="list" class="space-y-8">

                        <li v-for="note of notes" :key="note.id">
                            <div class="flex space-x-3">
                                <div class="flex-shrink-0">
                                    <div v-html="displayIcon(note.icon)" class="text-yellow-500" />
                                </div>

                                <div>
                                    <div class="text-base">
                                        <a href="javascript://" class="font-medium text-gray-900">{{note.title}}</a>
                                    </div>

                                    <div class="mt-1 text-base text-gray-700">
                                        <p>
                                            {{note.body}}
                                        </p>
                                    </div>

                                    <div class="mt-2 text-sm space-x-2">
                                        <span class="text-gray-500 font-medium">
                                            {{displayLastUpdate(note.updatedAt)}}
                                        </span>

                                        <span class="text-gray-500 font-medium">&middot;</span>

                                        <button type="button" class="text-gray-900 font-medium">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>

            <div class="bg-gray-50 px-4 py-6 sm:px-6">
                <div class="flex space-x-3">
                    <div class="flex-shrink-0">
                        <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                    </div>

                    <div class="min-w-0 flex-1">
                        <form action="javascript://">
                            <div>
                                <label for="comment" class="sr-only">Private note</label>

                                <textarea
                                    v-model="note"
                                    id="comment"
                                    name="comment"
                                    rows="3"
                                    class="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                                    placeholder="Enter a new private note here. This can ONLY be read by you."
                                ></textarea>
                            </div>

                            <div class="mt-3 flex items-center justify-between">
                                <a href="javascript://" class="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                                    <!-- Heroicon name: solid/question-mark-circle -->
                                    <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>

                                    <span>
                                        Some HTML is okay.
                                    </span>
                                </a>

                                <button
                                    class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'

/* Import components. */
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            note: null,
            notes: null
        }
    },
    methods: {
        displayLastUpdate(_date) {
            return moment.unix(_date).fromNow()
        },

        displayIcon(_id) {
            switch(_id) {
            case 'action':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>'
            case 'bell':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>'
            case 'cash':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>'
            case 'chat':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"></path></svg>'
            case 'gift':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>'
            case 'heart':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>'
            case 'idea':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path></svg>'
            case 'star':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'
            case 'warning':
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>'
            default:
                return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>'
            }
        },

    },
    created: function () {
        /* Initialize notes. */
        this.notes = []

        this.notes.push({
            id: '5312eb66-2e3b-4442-86ba-675410297ab8',
            title: `Bitcoin Cash Node`,
            body: `Don't forget to show support before and after the May 15th upgrade.`,
            icon: 'cash',
            isHidden: false,
            updatedAt: 1648916791,
        })

        this.notes.push({
            id: 'cec13e3d-c417-4078-b975-c729058b7032',
            title: `Launch Reminder`,
            body: `Remember to reach out to ALL previous campaign supporters.`,
            icon: 'bell',
            isHidden: false,
            updatedAt: 1648806791,
        })
    },
    mounted: function () {
        //
    },
}
</script>

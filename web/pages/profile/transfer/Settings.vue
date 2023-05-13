<template>
    <main class="p-3">
        <div class="mt-5">
            <div class="hidden mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                <svg class="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
            </div>

            <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-3xl leading-6 font-medium text-gray-900" id="modal-title">
                    SETTINGS
                </h3>

                <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        Customize your transfer settings, to save time and make this experience the most enjoyable it can be ;-)
                    </p>
                </div>

            </div>
        </div>

        <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>

                    <p class="mt-1 text-sm text-gray-500">Decide which communications you'd like to receive and how.</p>
                </div>

                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form class="space-y-6" action="javascript://" method="POST">
                        <fieldset>
                            <legend class="text-base font-medium text-gray-900">By Email</legend>

                            <div class="mt-4 space-y-4">
                                <div class="flex items-start">
                                    <div class="h-5 flex items-center">
                                        <input id="comments" name="comments" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                    </div>

                                    <div class="ml-3 text-sm">
                                        <label for="comments" class="font-medium text-gray-700">Comments</label>
                                        <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                    </div>

                                    <div class="ml-3 text-sm">
                                        <label for="candidates" class="font-medium text-gray-700">Candidates</label>
                                        <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                                    </div>
                                </div>

                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="offers" name="offers" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                    </div>

                                    <div class="ml-3 text-sm">
                                        <label for="offers" class="font-medium text-gray-700">Offers</label>
                                        <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div>
                                <legend class="text-base font-medium text-gray-900">Push Notifications</legend>
                                <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                            </div>

                            <div class="mt-4 space-y-4">
                                <div class="flex items-center">
                                    <input id="push-everything" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700"> Everything </label>
                                </div>

                                <div class="flex items-center">
                                    <input id="push-email" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700"> Same as email </label>
                                </div>

                                <div class="flex items-center">
                                    <input id="push-nothing" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                    <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700"> No push notifications </label>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>

        <div class="flex justify-end">
            <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
            </button>

            <button
                type="submit"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Save
            </button>
        </div>

    </main>
</template>

<script>
/* Import components. */
// import HelloWorld from '@/components/HelloWorld'

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

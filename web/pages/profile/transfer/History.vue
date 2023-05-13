<template>
    <main class="p-3">
        <div class="mt-5">
            <div class="hidden mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                <svg class="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
            </div>

            <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-3xl leading-6 font-medium text-gray-900" id="modal-title">
                    HISTORY
                </h3>

                <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        We'll give you a full history on every transfer you've ever made using this platform.
                    </p>
                </div>

            </div>
        </div>

        <!-- Activity Feed -->
        <div class="mt-6 flow-root">
            <ul role="list" class="-mb-8">
                <li>
                    <div class="relative pb-8">
                        <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div class="relative flex space-x-3">
                            <div>
                                <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                    <!-- Heroicon name: solid/user -->
                                    <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </div>

                            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                    <p class="text-sm text-gray-500">Applied to <a href="javascript://" class="font-medium text-gray-900">Front End Developer</a></p>
                                </div>
                                <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time datetime="2020-09-20">Sep 20</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div class="relative pb-8">
                        <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div class="relative flex space-x-3">
                            <div>
                                <span class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                    <!-- Heroicon name: solid/thumb-up -->
                                    <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                                        />
                                    </svg>
                                </span>
                            </div>

                            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                    <p class="text-sm text-gray-500">Advanced to phone screening by <a href="javascript://" class="font-medium text-gray-900">Bethany Blake</a></p>
                                </div>
                                <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time datetime="2020-09-22">Sep 22</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div class="relative pb-8">
                        <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div class="relative flex space-x-3">
                            <div>
                                <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </div>

                            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                    <p class="text-sm text-gray-500">Completed phone screening with <a href="javascript://" class="font-medium text-gray-900">Martha Gardner</a></p>
                                </div>
                                <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time datetime="2020-09-28">Sep 28</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div class="relative pb-8">
                        <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div class="relative flex space-x-3">
                            <div>
                                <span class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                    <!-- Heroicon name: solid/thumb-up -->
                                    <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path
                                            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                                        />
                                    </svg>
                                </span>
                            </div>

                            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                    <p class="text-sm text-gray-500">Advanced to interview by <a href="javascript://" class="font-medium text-gray-900">Bethany Blake</a></p>
                                </div>
                                <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time datetime="2020-09-30">Sep 30</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div class="relative pb-8">
                        <div class="relative flex space-x-3">
                            <div>
                                <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                    <!-- Heroicon name: solid/check -->
                                    <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </div>

                            <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                    <p class="text-sm text-gray-500">Completed interview with <a href="javascript://" class="font-medium text-gray-900">Katherine Snyder</a></p>
                                </div>
                                <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time datetime="2020-10-04">Oct 4</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
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

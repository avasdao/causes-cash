<template>
    <main class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center block p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="inline-block align-middle h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-sm w-full p-6">
                <div>
                    <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-yellow-500">
                        <svg class="w-16 h-16 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
                    </div>

                    <div class="text-center mt-5">
                        <h3 class="text-2xl leading-6 font-medium text-gray-600" id="modal-title">
                            Loading On-chain Data
                        </h3>

                        <h3 class="mt-3 text-2xl leading-6 font-medium text-gray-600" id="modal-title">
                            Please Wait...
                        </h3>
                    </div>
                </div>
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

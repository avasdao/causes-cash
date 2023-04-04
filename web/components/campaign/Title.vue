<template>
    <main class="mt-4">
        <h1 class="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            {{title}}
        </h1>

        <h2 id="information-heading" class="sr-only">
            Campaign Information
        </h2>

        <div class="flex justify-between items-center px-10 flex-col sm:flex-row">
            <a href="https://avasdao.org" target="_blank">
                <img src="https://i.ibb.co/0ZMVPp7/logo.png" alt="" class="w-8 h-8 rounded-full" />
            </a>

            <div>
                <p class="text-sm text-gray-500 mt-2 text-center mr-16">
                    Produced by <a class="text-red-500 font-medium" href="https://avasdao.org" target="_blank">Ava's DAO</a>
                </p>

                <p class="text-sm text-gray-500 mt-0 text-center ml-16">
                    Managed by <a class="text-red-500 font-medium" href="https://twitter.com/0xShomari" target="_blank">Shomari</a>
                </p>
            </div>

            <a href="https://twitter.com/0xShomari" target="_blank">
                <img src="https://i.imgur.com/FVWFcSJ.png" alt="" class="w-8 h-8 rounded-full" />
            </a>
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
    computed: {
        title() {
            // return this.$store?.state?.title
            return `My Awesome Campaign`
        },

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

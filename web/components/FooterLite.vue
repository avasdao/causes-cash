<template>
    <main class="bg-white">
        <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
            <p class="mt-8 text-center text-base text-gray-400">
                <span>Copyright &copy; 2020-{{curYear}} <a class="text-red-400" href="https://avasdao.org" target="_blank">Ava's DAO</a>. </span>
                <span class="block sm:inline">All rights reserved.</span>
            </p>
        </div>
    </main>
</template>

<script>
/* Import modules. */
import moment from 'moment'

export default {
    components: {
        // HelloWorld
    },
    computed: {
        curYear() {
            return moment().format('YYYY')
        },

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

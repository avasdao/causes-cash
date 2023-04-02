<template>
    <main class="space-y-2">
        <div class="space-y-1">
            <label for="add-team-members" class="block text-xl font-medium text-gray-700">
                <span class="text-2xl text-indigo-500">4.</span>
                Which address will be the Owner?
                <span class="block ml-7 sm:inline sm:ml-2 text-gray-500 text-sm">( Campaign Manager )</span>
            </label>

            <div class="flex">
                <div class="flex-grow">
                    <input
                        v-model="owner"
                        @keyUp="handleOwner"
                        type="text"
                        name="add-team-members"
                        id="add-team-members"
                        class="px-3 py-1 block w-full bg-yellow-50 border-2 border-yellow-400 shadow text-lg text-yellow-700 font-medium rounded-md placeholder:text-yellow-500"
                        placeholder="Enter any valid nexa: address here"
                        aria-describedby="campaign-owner"
                    />
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
            owner: null,
        }
    },
    methods: {
        handleOwner() {
            this.$emit('set-owner', this.owner)
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

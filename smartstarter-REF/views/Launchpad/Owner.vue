<template>
    <main class="space-y-2">
        <div class="space-y-1">
            <label for="add-team-members" class="block text-xl font-medium text-gray-700">
                <span class="text-2xl text-indigo-500">4.</span>
                Set the owner (receiver account)
            </label>

            <div class="flex">
                <div class="flex-grow">
                    <input
                        v-model="owner"
                        @keyUp="handleOwner"
                        type="text"
                        name="add-team-members"
                        id="add-team-members"
                        class="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 text-lg border-gray-300 rounded-md"
                        placeholder="Enter a SmartBCH account / address"
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

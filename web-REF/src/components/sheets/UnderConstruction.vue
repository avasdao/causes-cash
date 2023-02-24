<template>
    <v-sheet class="sheet">
        what about here?

        <v-btn
            class="mt-6"
            text
            color="red"
            @click="isActive = !isActive"
        >
            close
        </v-btn>

        <div class="py-3">
            Thank you for previewing Causes Cash.
            Some of our features are still under construction.
        </div>
    </v-sheet>
</template>

<script>
export default {
    data: () => ({
        //
    }),
    computed: {

    },
    methods: {

    },
    created: function () {

    },
    mounted: function () {

    },
}
</script>

<style>
.sheet {
    height: 300px;
    border: 5pt solid red;
}
</style>

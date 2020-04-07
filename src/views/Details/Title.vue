<template>
    <div class="page-title background-campaign">
        <div class="container">
            <h1>{{title}}</h1>

            <div class="breadcrumbs">
                <ul>
                    <li>
                        <a href="/">Home</a><span>/</span>
                    </li>

                    <li>
                        {{title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            title: null,
        }
    },
    methods: {
        //
    },
    created: function () {
        /* Set title. */
        this.title = 'Nito Cash'
    }
}
</script>

<style scoped>
/*  */
</style>

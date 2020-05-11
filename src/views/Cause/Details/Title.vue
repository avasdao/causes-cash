<template>
    <!-- <div class="page-title background-campaign"> -->
    <div class="page-title" :style="{ 'background-image': 'url(' + bannerImg + ')' }">
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
            bannerUrl: null,
        }
    },
    computed: {
        /**
         * Banner Image
         */
        bannerImg() {
            return this.bannerUrl
        },
    },
    methods: {
        //
    },
    created: function () {
        /* Set title. */
        this.title = 'Nito Cash'

        /* Set banner URL. */
        // this.bannerUrl = 'https://i.imgur.com/3UPJZT6.jpg' // sofa
        // this.bannerUrl = 'https://i.imgur.com/2NuUJxd.jpg' // headphones
        this.bannerUrl = 'https://i.imgur.com/JQbiIbD.jpg' // working @ desk
        // this.bannerUrl = 'https://i.imgur.com/9vNfGgt.jpg' // organized desk
    }
}
</script>

<style scoped>
/*  */
</style>

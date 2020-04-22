<template>
    <div class="col-lg-2 col-sm-3 col-3">
        <div class="tab-menu">
            <ul id="bx-pager" class="menu-category">
                <li
                    v-for="slide of slides"
                    :key="slide.id"
                    :class="{active: activeSlide === slide.id}"
                >
                    <a
                        href="javascript://"
                        @click="setActive(slide.id)"
                        :data-slide-index="slide.index"
                    >{{slide.title}}</a>
                </li>
            </ul>

            <router-link to="/discover" class="all-project">
                View All Causes
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        //
    },
    data: () => {
        return {
            slides: [],
            activeSlide: null,
        }
    },
    computed: {
        active() {
            return true
        }
    },
    methods: {
        /**
         * Set Active
         */
        setActive(_slideId) {
            this.activeSlide = _slideId
        }
    },
    created: function () {
        /* Initialize active slide. */
        this.activeSlide = 'infrastructure'

        /* Initialize index. */
        // FOR DEVELOPMENT PURPOSES ONLY
        let index = 0

        /* Adoption. */
        this.slides.push({
            index: index++,
            id: 'adoption',
            title: 'Adoption'
        })

        /* Community. */
        this.slides.push({
            index: index++,
            id: 'community',
            title: 'Community'
        })

        /* DApps. */
        this.slides.push({
            index: index++,
            id: 'dapps',
            title: 'DApps'
        })

        /* Design & Art. */
        this.slides.push({
            index: index++,
            id: 'design-art',
            title: 'Design & Art'
        })

        /* Film & Video. */
        this.slides.push({
            index: index++,
            id: 'film-video',
            title: 'Film & Video'
        })

        /* Fun & Games. */
        this.slides.push({
            index: index++,
            id: 'fun-games',
            title: 'Fun & Games'
        })

        /* Hardware. */
        this.slides.push({
            index: index++,
            id: 'hardware',
            title: 'Hardware'
        })

        /* Health. */
        this.slides.push({
            index: index++,
            id: 'health',
            title: 'Health'
        })

        /* Infrastructure. */
        this.slides.push({
            index: index++,
            id: 'infrastructure',
            title: 'Infrastructure'
        })

        /* Music. */
        this.slides.push({
            index: index++,
            id: 'music',
            title: 'Music'
        })

        /* Privacy. */
        this.slides.push({
            index: index++,
            id: 'privacy',
            title: 'Privacy'
        })

        /* Publishing. */
        this.slides.push({
            index: index++,
            id: 'publishing',
            title: 'Publishing'
        })

        /* Security. */
        this.slides.push({
            index: index++,
            id: 'security',
            title: 'Security'
        })

        /* Software. */
        this.slides.push({
            index: index++,
            id: 'software',
            title: 'Software'
        })

        /* World. */
        this.slides.push({
            index: index++,
            id: 'world',
            title: 'World'
        })

    },
}
</script>

<style scoped>
/*  */
</style>

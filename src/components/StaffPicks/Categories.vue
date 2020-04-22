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
                View all projects
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
        this.activeSlide = 'bitcoin-cash'

        /* Initialize index. */
        // FOR DEVELOPMENT PURPOSES ONLY
        let index = 0

        /* Adoption. */
        this.slides.push({
            index: index++,
            id: 'adoption',
            title: 'Adoption'
        })

        /* Bitcoin Cash. */
        this.slides.push({
            index: index++,
            id: 'bitcoin-cash',
            title: 'Bitcoin Cash'
        })

        /* Comics. */
        this.slides.push({
            index: index++,
            id: 'comics',
            title: 'Comics?'
        })

        /* Design & Art. */
        this.slides.push({
            index: index++,
            id: 'design-art',
            title: 'Design & Art'
        })

        /* Fashion. */
        this.slides.push({
            index: index++,
            id: 'fasion',
            title: 'Fashion'
        })

        /* Film & Video. */
        this.slides.push({
            index: index++,
            id: 'film-video',
            title: 'Film & Video'
        })

        /* Food. */
        this.slides.push({
            index: index++,
            id: 'food',
            title: 'Food'
        })

        /* Fun & Games. */
        this.slides.push({
            index: index++,
            id: 'fun-games',
            title: 'Fun & Games'
        })

        /* Music. */
        this.slides.push({
            index: index++,
            id: 'music',
            title: 'Music'
        })

        /* Infrastructure. */
        this.slides.push({
            index: index++,
            id: 'infrastructure',
            title: 'Infrastructure'
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

        /* Technology. */
        this.slides.push({
            index: index++,
            id: 'technology',
            title: 'Technology'
        })

    },
}
</script>

<style scoped>
/*  */
</style>

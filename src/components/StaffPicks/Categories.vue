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

            <a class="all-project" href="javascript://">
                View all projects</a>
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
            title: 'Comics'
        })

        /* Crafts. */
        this.slides.push({
            index: index++,
            id: 'crafts',
            title: 'Crafts'
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

        /* Music. */
        this.slides.push({
            index: index++,
            id: 'music',
            title: 'Music'
        })

        /* Games. */
        this.slides.push({
            index: index++,
            id: 'games',
            title: 'Games'
        })

        /* Infrastructure. */
        this.slides.push({
            index: index++,
            id: 'infrastructure',
            title: 'Infrastructure'
        })

        /* Performances. */
        this.slides.push({
            index: index++,
            id: 'performances',
            title: 'Performances'
        })

        /* Publishing. */
        this.slides.push({
            index: index++,
            id: 'publishing',
            title: 'Publishing'
        })

        /* Technology. */
        this.slides.push({
            index: index++,
            id: 'technology',
            title: 'Technology'
        })

        /* Theater. */
        this.slides.push({
            index: index++,
            id: 'theater',
            title: 'Theater'
        })

    },
}
</script>

<style scoped>
/*  */
</style>

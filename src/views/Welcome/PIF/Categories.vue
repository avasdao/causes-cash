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
                    >{{slide.title}} <small>{{slide.pct}}</small></a>
                </li>
            </ul>

            <!-- <ul id="bx-pager" class="menu-category">
                <li>
                    <a
                        href="javascript://"
                        @click="openCategories"
                    >Show all</a>
                </li>
            </ul> -->

            <!-- <router-link to="/discover" class="all-project">
                View All Causes
            </router-link> -->
            <a
                href="javascript://"
                onClick="openCategories"
                class="all-project text-danger"
            >
                More categories
            </a>
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
        },

        openCategories() {
            alert('opening all categories')
        },

    },
    created: function () {
        /* Initialize active slide. */
        this.activeSlide = 'community'

        /* Initialize index. */
        // FOR DEVELOPMENT PURPOSES ONLY
        let index = 0

        /* Adoption. */
        this.slides.push({
            index: index++,
            id: 'adoption',
            title: 'Adoption',
            pct: 5,
        })

        /* Community. */
        this.slides.push({
            index: index++,
            id: 'community',
            title: 'Community',
            pct: 10,
        })

        /* DApp. */
        this.slides.push({
            index: index++,
            id: 'dapp',
            title: 'DApp',
            pct: 5,
        })

        /* Design & Art. */
        // this.slides.push({
        //     index: index++,
        //     id: 'design-art',
        //     title: 'Design & Art'
        // })

        /* Education. */
        this.slides.push({
            index: index++,
            id: 'education',
            title: 'Education',
            pct: 2,
        })

        /* Film & Video. */
        this.slides.push({
            index: index++,
            id: 'film-video',
            title: 'Film & Video',
            pct: 4,
        })

        /* Fun & Games. */
        this.slides.push({
            index: index++,
            id: 'fun-games',
            title: 'Fun & Games',
            pct: 3,
        })

        /* Hardware. */
        this.slides.push({
            index: index++,
            id: 'hardware',
            title: 'Hardware',
            pct: 2,
        })

        /* Health. */
        this.slides.push({
            index: index++,
            id: 'health',
            title: 'Health',
            pct: 10,
        })

        /* Infrastructure. */
        this.slides.push({
            index: index++,
            id: 'infrastructure',
            title: 'Infrastructure',
            pct: 5,
        })

        /* Music. */
        // this.slides.push({
        //     index: index++,
        //     id: 'music',
        //     title: 'Music'
        // })

        /* Privacy. */
        this.slides.push({
            index: index++,
            id: 'privacy',
            title: 'Privacy',
            pct: 15,
        })

        /* Publishing. */
        this.slides.push({
            index: index++,
            id: 'publishing',
            title: 'Publishing',
            pct: 4,
        })

        /* Security. */
        this.slides.push({
            index: index++,
            id: 'security',
            title: 'Security',
            pct: 10,
        })

        /* Software. */
        this.slides.push({
            index: index++,
            id: 'software',
            title: 'Software',
            pct: 3,
        })

        /* World View. */
        this.slides.push({
            index: index++,
            id: 'world-view',
            title: 'World View',
            pct: 4,
        })

        /* Youth. */
        this.slides.push({
            index: index++,
            id: 'youth',
            title: 'Youth',
            pct: 7,
        })

    },
}
</script>

<style scoped>
.menu-category small {
    display: none;
    /* font-size: 0.8em; */
    color: rgba(255, 0, 0, 0.5);
    font-weight: 500;
}
</style>

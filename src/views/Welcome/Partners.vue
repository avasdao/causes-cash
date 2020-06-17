<template>
    <div class="partners">
        <div class="container">
            <div class="partners-slider owl-carousel">
                <div>
                    <a href="javascript://"><img src="~@/assets/partners/partner-01.png" alt=""></a>
                </div>
                <div>
                    <a href="javascript://"><img src="~@/assets/partners/partner-02.png" alt=""></a>
                </div>
                <div>
                    <a href="javascript://"><img src="~@/assets/partners/partner-03.png" alt=""></a>
                </div>
                <div>
                    <a href="javascript://"><img src="~@/assets/partners/partner-04.png" alt=""></a>
                </div>
                <div>
                    <a href="javascript://"><img src="~@/assets/partners/partner-05.png" alt=""></a>
                </div>
                <div>
                    <a href="javascript://"><img src="~@/assets/partners/partner-06.png" alt=""></a>
                </div>
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
const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            //
        }
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        $('.partners-slider').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            items: 6,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },
                360: {
                    items: 2,
                },
                576: {
                    items: 3,
                },
                992: {
                    items: 6,
                }
            }
        })

    },
}
</script>

<style scoped>
.author {
    cursor: pointer;
    color: rgba(30, 30, 220, 0.8);
}

.blognews-thumb {
    border: 1px solid rgba(180, 180, 180, 0.2);
    padding: 2px;
}
</style>

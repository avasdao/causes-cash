<template>
    <main class="campaign-detail">
        <Header />
        <Title />
        <Content />
        <History />
        <Footer />
    </main>
</template>

<script>
/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

import Content from './Details/Content.vue'
import History from './Details/History.vue'
import Title from './Details/Title.vue'

/* Import jQuery. */
const $ = window.jQuery

function makePages() {
    $.each(this.owl.userItems, function(i) {
        $('.owl-controls .owl-page').eq(i)
        .css({
            'background': 'url(' + $(this).find('img').attr('src') + ')',
            'background-size': 'cover',
        })
    })
}

export default {
    components: {
        Footer,
        Header,

        Content,
        History,
        Title,
    },
    mounted: function () {
        /*  [ Project Love Slider ]
        - - - - - - - - - - - - - - - - - - - - */
        $('.project-love-slider').bxSlider({
            pagerCustom: '#bx-pager',
            mode: 'vertical',
            controls: false,
        })

        /*  [ Owl Campaign ]
        - - - - - - - - - - - - - - - - - - - - */
        $("#owl-campaign").owlCarousel({
            navigation: true,
            navigationText: ['<span class="ion-ios-arrow-back"></span>', '<span class="ion-ios-arrow-forward"></span>'],
            loop:true,
            autoplay:true,
            autoplayTimeout:3000,
            autoplayHoverPause:true,
            singleItem: true,
            afterInit: makePages,
            afterUpdate: makePages
        })

    },
}
</script>

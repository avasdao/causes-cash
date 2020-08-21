<template>
    <div class="home">

        <!-- <div class="preloading">
            <div class="preloader loading">
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
            </div>
        </div> -->

        <div id="wrapper">
            <Header />

            <main id="main" class="site-main">
                <Slideshow />
                <PIF />
                <Pledges />
                <Discover />
                <Articles />
                <Partners />
            </main>

            <Footer />
        </div>
    </div>
</template>

<script>
/* Import views. */
import Articles from '@/views/Welcome/Articles.vue'
import Discover from '@/views/Welcome/Discover.vue'
import Partners from '@/views/Welcome/Partners.vue'
import PIF from '@/views/Welcome/PIF.vue'
import Pledges from '@/views/Welcome/Pledges.vue'
import Slideshow from '@/views/Welcome/Slideshow.vue'

/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
    components: {
        Articles,
        Discover,
        Partners,
        Pledges,
        PIF,
        Slideshow,

        Footer,
        Header,
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        // setTimeout(function(){
        // 	$('.preloading').fadeOut()
		// }, 3000)
    }
}
</script>

<style scoped>
.site-main .sideshow {
    position: relative;
    /* height: 674px; */
    height: 424px;
    background-image: url('https://i.imgur.com/MazyCcK.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
</style>

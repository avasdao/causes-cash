<template>
    <div class="campaign-content">
        <div class="container">
            <div class="campaign">
                <div class="campaign-item clearfix">

                    <div class="campaign-image">
                        <div id="owl-campaign" class="campaign-slider owl-carousel owl-theme" style="opacity: 1; display: block;">
                            <div class="owl-wrapper-outer">
                                <div class="owl-wrapper" style="width: 3420px; left: 0px; display: block;">
                                    <div class="owl-item" style="width: 570px;">
                                        <div class="item">
                                            <img src="@/assets/img/campaign-recent-01.jpg" alt="">
                                        </div>
                                    </div>

                                    <div class="owl-item" style="width: 570px;">
                                        <div class="item">
                                            <img src="@/assets/img/campaign-recent-02.jpg" alt="">
                                        </div>
                                    </div>

                                    <div class="owl-item" style="width: 570px;">
                                        <div class="item">
                                            <img src="@/assets/img/campaign-recent-03.jpg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>


                        <div class="owl-controls clickable">
                            <div class="owl-pagination">
                                <div class="owl-page active" style="background: url(&quot;images/campaign-recent-01.jpg&quot;) 0% 0% / cover;">
                                    <span class=""></span>
                                </div>

                                <div class="owl-page" style="background: url(&quot;images/campaign-recent-02.jpg&quot;) 0% 0% / cover;">
                                    <span class=""></span>
                                </div>

                                <div class="owl-page" style="background: url(&quot;images/campaign-recent-03.jpg&quot;) 0% 0% / cover;">
                                    <span class=""></span>
                                </div>
                            </div>

                            <div class="owl-buttons">
                                <div class="owl-prev">
                                    <span class="ion-ios-arrow-back"></span>
                                </div>

                                <div class="owl-next">
                                    <span class="ion-ios-arrow-forward"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Summary />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
import Summary from './Content/Summary.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        Summary,
    },
    data: () => {
        return {
            //
        }
    },
    methods: {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

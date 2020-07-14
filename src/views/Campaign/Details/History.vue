<template>
    <div class="campaign-history">
        <div class="container">
            <div class="row">

                <div class="col-lg-8">
                    <div class="campaign-tabs">
                        <ul class="tabs-controls">
                            <li class="active" data-tab="story">
                                <a href="javascript://">Story</a>
                            </li>

                            <li data-tab="backers">
                                <a href="javascript://">Backers</a>
                            </li>

                            <li data-tab="budget">
                                <a href="javascript://">Budget</a>
                            </li>

                            <li data-tab="faq">
                                <a href="javascript://">FAQ</a>
                            </li>

                            <li data-tab="news">
                                <a href="javascript://">News</a>
                            </li>
                        </ul>

                        <a name="history"></a>
                        <div class="campaign-content">
                            <Story :campaign="campaign" />
                            <Backers :campaign="campaign" />
                            <Budget :campaign="campaign" />
                            <FAQ :campaign="campaign" />
                            <News :campaign="campaign" />
                        </div>
                    </div>
                </div>

                <Events :campaign="campaign" />
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
import Backers from './History/Backers'
import Budget from './History/Budget'
import Events from './History/Events'
import FAQ from './History/FAQ'
import News from './History/News'
import Story from './History/Story'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    props: {
        campaign: Object,
    },
    components: {
        Backers,
        Budget,
        Events,
        FAQ,
        News,
        Story,
    },
    data: () => {
        return {
            //
        }
    },
    methods: {
        //
    },
    mounted: function () {
        // change is-checked class on buttons
        $('.campaign-tabs').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });

        /*  [ Tab Controls ]
        - - - - - - - - - - - - - - - - - - - - */
        $('.menu-category li.mc-option').on('click', function(e) {
            e.preventDefault();
            var tab_id = $(this).attr('data-tab');
            $('.menu-category li.mc-option').removeClass('active');
            $('.popular-project .pp-item').removeClass('active');
            $(this).addClass('active');
            $("#" + tab_id).addClass('active');
        });

        $('.tabs-controls li').on('click', function(e) {
            e.preventDefault();
            var tab_id = $(this).attr('data-tab');
            $('.tabs-controls li').removeClass('active');
            $('.campaign-content .tabs').removeClass('active');
            $(this).addClass('active');
            $("#" + tab_id).addClass('active');
        });
        /*  [ Menu Category ]
        - - - - - - - - - - - - - - - - - - - - */
        $('.menu-category li.mc-option').on('click', function() {
            // var tab_id = $(this).attr('data-hash');
            $(this).attr('data-hash');
            $('.menu-category li.mc-option').removeClass('active');
            $(this).addClass('active');
        });
        $('.menu-category li.cat-more a').on('click', function() {
            var url = $(this).attr('href');
            window.location.href = url;
        });
    },
}
</script>

<style scoped>
/*  */
</style>

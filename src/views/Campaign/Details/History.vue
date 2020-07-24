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

                            <li data-tab="supporters">
                                <a href="javascript://">Supporters</a>
                            </li>

                            <li data-tab="funds">
                                <a href="javascript://">Funds</a>
                            </li>

                            <li data-tab="news">
                                <a href="javascript://">News</a>
                            </li>

                            <li data-tab="guide">
                                <a href="javascript://">Guide</a>
                            </li>

                            <li data-tab="premium">
                                <a href="javascript://">
                                    <span class="text-danger">Premium</span>
                                </a>
                            </li>
                        </ul>

                        <a name="history"></a>
                        <div class="campaign-content">
                            <Story :campaign="campaign" />
                            <Supporters :campaign="campaign" />
                            <Funds :campaign="campaign" />
                            <News :campaign="campaign" />
                            <Guide :campaign="campaign" />
                            <Premium :campaign="campaign" />
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
import Events from './History/Events'
import Funds from './History/Funds'
import Guide from './History/Guide'
import News from './History/News'
import Premium from './History/Premium'
import Story from './History/Story'
import Supporters from './History/Supporters'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    props: {
        campaign: Object,
    },
    components: {
        Events,
        Funds,
        Guide,
        News,
        Premium,
        Story,
        Supporters,
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

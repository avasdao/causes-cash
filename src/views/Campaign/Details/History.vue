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

                            <li data-tab="events">
                                <a href="javascript://">Events</a>
                            </li>

                            <li data-tab="backers">
                                <a href="javascript://">Backers</a>
                            </li>

                            <li data-tab="faq">
                                <a href="javascript://">FAQ</a>
                            </li>

                            <li data-tab="comment">
                                <a href="javascript://">Articles</a>
                            </li>
                        </ul>

                        <a name="history"></a>
                        <div class="campaign-content">
                            <Story :campaign="campaign" :fundId="fundId" />
                            <Events :campaign="campaign" :fundId="fundId" />
                            <Backers :campaign="campaign" :fundId="fundId" />
                            <FAQ :campaign="campaign" :fundId="fundId" />
                            <Articles :campaign="campaign" :fundId="fundId" />
                        </div>
                    </div>
                </div>

                <Funds :campaign="campaign" v-on:loadFund="loadFund" />
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
import Articles from './History/Articles'
import Backers from './History/Backers'
import Events from './History/Events'
import FAQ from './History/FAQ'
import Funds from './History/Funds'
import Story from './History/Story'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    props: {
        campaign: Object,
    },
    components: {
        Articles,
        Backers,
        Events,
        FAQ,
        Funds,
        Story,
    },
    data: () => {
        return {
            fundId: null,
        }
    },
    methods: {
        /**
         * Load Fund
         */
        loadFund(_fundId) {
            /* Set fund id. */
            this.fundId = _fundId

            /* Emit fund id. */
            this.$emit('loadFund', _fundId)

            // TODO: Adjust for mobile
            // window.scrollTo({ top: 1050, behavior: 'smooth' })
            window.scrollTo({ top: 425, behavior: 'smooth' })
        }
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

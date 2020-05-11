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

                            <li data-tab="backer">
                                <a href="javascript://">Backers</a>
                            </li>

                            <li data-tab="faq">
                                <a href="javascript://">FAQ</a>
                            </li>

                            <li data-tab="comment">
                                <a href="javascript://">Articles</a>
                            </li>
                        </ul>

                        <div class="campaign-content">
                            <Story :campaign="campaign" />

                            <div id="backer" class="tabs">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>Donate Amount</th>
                                            <th>Date</th>
                                        </tr>
                                        <tr>
                                            <td>Andrew</td>
                                            <td>$100</td>
                                            <td>June 25, 2017</td>
                                        </tr>
                                        <tr>
                                            <td>Andrew</td>
                                            <td>$60</td>
                                            <td>December 25, 2017</td>
                                        </tr>
                                        <tr>
                                            <td>Andrew</td>
                                            <td>$70</td>
                                            <td>November 25, 2017</td>
                                        </tr>
                                        <tr>
                                            <td>Andrew</td>
                                            <td>$90</td>
                                            <td>February 25, 2017</td>
                                        </tr>
                                        <tr>
                                            <td>Andrew</td>
                                            <td>$30</td>
                                            <td>January 25, 2017</td>
                                        </tr>
                                        <tr>
                                            <td>Andrew</td>
                                            <td>$80</td>
                                            <td>June 15, 2017</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div id="faq" class="tabs">
                                <h2>Frequently Asked Questions</h2>

                                <p>
                                    Looks like there aren't any frequently asked questions yet.
                                    Ask the project creator directly.
                                </p>

                                <a href="javascript://" class="btn-primary">Ask a question</a>
                            </div>

                            <div id="events" class="tabs">
                                <ul>
                                    <li>
                                        <p class="date">
                                            30-06-2017
                                        </p>

                                        <h3>New Project Launches in Bangalore</h3>

                                        <div class="desc">
                                            <p>
                                                Bacon spare ribs rump chuck turkey, ham hock capicola.
                                                Strip steak tongue kielbasa, boudin hamburger t-bone capicola turducken.
                                                Landjaeger meatloaf pork belly spare ribs chuck.
                                            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <p class="date">
                                            31-05-2018
                                        </p>

                                        <h3>Our First Office Start</h3>

                                        <div class="desc">
                                            <p>
                                                Corned beef leberkas fatback porchetta, strip steak salami turkey short loin flank ham hock landjaeger.
                                                Leberkas pork belly kevin shoulder filet mignon.
                                                Bacon spare ribs rump chuck turkey, ham hock capicola.
                                                Strip steak tongue kielbasa, boudin hamburger t-bone capicola turducken.
                                                Landjaeger meatloaf pork belly spare ribs chuck.
                                            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <p class="date">
                                            31-05-2018
                                        </p>

                                        <h3>We Touch the Million Dollar Milestone</h3>

                                        <div class="desc">
                                            <p>
                                                Corned beef leberkas fatback porchetta, strip steak salami turkey short loin flank ham hock landjaeger.
                                                Leberkas pork belly kevin shoulder filet mignon.
                                                Bacon spare ribs rump chuck turkey, ham hock capicola.
                                                Strip steak tongue kielbasa, boudin hamburger t-bone capicola turducken.
                                                Landjaeger meatloaf pork belly spare ribs chuck.
                                            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <p class="date">
                                            31-05-2018
                                        </p>

                                        <h3>Our Employee Reach 100 Person</h3>

                                        <div class="desc">
                                            <p>
                                                Sed cursus hendrerit odio, at aliquet leo hendrerit a.
                                                Nulla ultricies sagittis dolor, quis maximus magna consectetur eu.
                                                Cras pharetra aliquam fringilla.
                                                Integer placerat sapien dapibus varius luctus.
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Vestibulum in aliquam urna, ultrices lobortis lacus.
                                                Praesent mi enim, congue semper volutpat ut, bibendum tempor arcu.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div id="comment" class="tabs comment-area">
                                <h3 class="comments-title">1 Comment</h3>

                                <ol class="comments-list">
                                    <li class="comment clearfix">
                                        <div class="comment-body">
                                            <div class="comment-avatar">
                                                <img src="@/assets/img/comment.jpg" alt="">
                                            </div>

                                            <div class="comment-info">
                                                <header class="comment-meta"></header>
                                                <cite class="comment-author">Jordan B. Goodale</cite>
                                                <div class="comment-inline">
                                                    <span class="comment-date">2 days ago</span>
                                                    <a href="javascript://" class="comment-reply">Reply</a>
                                                </div>

                                                <div class="comment-content">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Equidem e Cn.
                                                        Sequitur disserendi ratio cognitioque naturae; Nunc vides, quid faciat.
                                                        Duo Reges: constructio interrete.
                                                        Memini vero, inquam; Quis Aristidem non mortuum diligit?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ol>

                                <div id="respond" class="comment-respond">
                                    <h3 id="reply-title" class="comment-reply-title">
                                        Leave A Comment?
                                    </h3>

                                    <form action="javascript://" id="commentForm">
                                        <div class="field-textarea">
                                            <textarea rows="8" placeholder="Your Comment"></textarea>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-4 field">
                                                <input type="text" value="" name="s" placeholder="Your Name">
                                            </div>

                                            <div class="col-md-4 field">
                                                <input type="text" value="" name="s" placeholder="Your Email">
                                            </div>

                                            <div class="col-md-4 field">
                                                <input type="text" value="" name="s" placeholder="Website">
                                            </div>
                                        </div>

                                        <button type="submit" value="Send Messager" class="btn-primary">
                                            Post Comment
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- .main-content -->

                <Pledge :campaign="campaign" />
            </div>
        </div>
    </div><!-- .campaign-history -->
</template>

<script>
/* Import components. */
import Pledge from './History/Pledge'
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
        Pledge,
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

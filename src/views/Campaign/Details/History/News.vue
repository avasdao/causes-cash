<template>
    <div id="news" class="tabs comment-area">
        <!-- <h3 class="comments-title">New &amp; Noteworthy</h3> -->

        <ol class="comments-list">

            <li v-for="article of articleList" :key="article.id" class="comment clearfix">
                <div class="comment-body">
                    <div class="comment-avatar">
                        <img class="avatar" :src="article.avatar" alt="">
                    </div>

                    <div class="comment-info">
                        <header class="comment-meta"></header>

                        <cite class="comment-author">
                            <a :href="article.url" target="_blank">
                            {{article.title}}</a>
                        </cite>

                        <div class="comment-inline">
                            <span class="comment-date">{{article.timeAgo}}</span>
                            <!-- <a href="javascript://" class="comment-reply">Reply</a> -->
                        </div>

                        <div class="comment-content">
                            <p>
                                {{article.summary}}
                            </p>
                        </div>
                    </div>
                </div>
            </li>

        </ol>
    </div>
</template>

<script>
/* Import modules. */
import moment from 'moment'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            articles: [],
        }
    },
    computed: {
        articleList() {
            const articles = this.articles.map(article => {
                /* Format data. */
                article.timeAgo = moment.unix(article.createdAt).format('lll')

                /* Return (formatted) article. */
                return article
            })

            /* Return (reversed) array. */
            return articles.reverse()
        }
    },
    created: function () {
        this.articles.push({
            id: 'an-og-dev-is-back-from-the-ashes-fb67b248',
            title: 'An OG dev is back from the ashes...',
            summary: `A quick thank you to the entire Bitcoin Cash BUIDL community for all the amazing (hard) work that everyone is doing. Read.cash in particular is a "technical" marvel (so impressed), it's also pretty easy on the eyes. Not sure how long this site has been alive, but it's inspired me to write/blog for the first time EVER.`,
            avatar: 'https://i.imgur.com/NuHGJME.png',
            url: 'https://read.cash/@nyusternie/an-og-dev-is-back-from-the-ashes-fb67b248',
            createdAt: 1579472160,
        })
    },
}
</script>

<style scoped>
.avatar {
    width: 75px;
    height: 75px;

    border-radius: 50% !important;
	-webkit-border-radius: 50% !important;
	-moz-border-radius: 50% !important;

    box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
	-webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
	-moz-box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
}
</style>

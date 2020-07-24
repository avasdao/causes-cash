<template>
    <div id="news" class="tabs comment-area">
        <!-- <h3 class="comments-title">New &amp; Noteworthy</h3> -->

        <ol v-if="articleList" class="comments-list">
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

        <div v-else class="campaigns">
            There is no news available
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            ownerSlug: null,
            extSlug: null,

            articles: [],
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
            'getCampaign',
        ]),

        ...mapGetters('profile', [
            'getSignedMessage',
        ]),

        articleList() {
            if (!this.articles || this.articles.length === 0) {
                return null
            }

            const articles = this.articles.map(article => {
                /* Format data. */
                article.timeAgo = moment.unix(article.createdAt).format('ll')

                /* Return (formatted) article. */
                return article
            })

            /* Return (reversed) array. */
            return articles.reverse()
        },

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

    },
    created: function () {
        /* Validate news. */
        if (this.campaign && this.campaign.news) {
            /* Set summary. */
            this.news = this.campaign.news
            console.log('NEWS', this.news)

            /* Add each news article. */
            this.news.forEach(news => {
                this.articles.push({
                    id: news.id,
                    title: news.title,
                    summary: news.summary,
                    avatar: news.avatar,
                    url: news.url,
                    createdAt: news.createdAt,
                })
            })
        }

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

span.comment-date {
    font-style: italic;
}
</style>

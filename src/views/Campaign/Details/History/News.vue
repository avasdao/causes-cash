<template>
    <main>
        <!-- <h3 class="comments-title">New &amp; Noteworthy</h3> -->

        <ol v-if="articleList" class="comments-list">

            <li
                v-for="article of articleList"
                :key="article.id"
                class="comment clearfix mb-3"
            >
                <div class="comment-body">
                    <div class="comment-avatar float-left mr-3 mb-3">
                        <img class="avatar" :src="article.avatar" alt="">
                    </div>

                    <div class="comment-info">
                        <header class="comment-meta"></header>

                        <div class="article-title">
                            <a :href="article.url" target="_blank">
                            {{article.title}}</a>
                        </div>

                        <div class="article-byline">
                            by <span class="comment-date">{{article.author}}</span>
                            &bullet; <span class="comment-date">{{article.timeAgo}}</span>
                        </div>

                        <div class="comment-content">
                            <p>
                                {{formatSummary(article.summary)}}
                            </p>
                        </div>
                    </div>
                </div>

                <hr />
            </li>

        </ol>

        <div v-else class="campaigns">
            <h1>Latest News</h1>

            <p class="m-3">
                There is no news available
            </p>
        </div>
    </main>
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
    watch: {
        campaign: function (_campaign) {
            if (_campaign && _campaign.news) {
                // console.log('CAMPAIGN HAS CHANGED, UPDATE NEWS!!', _campaign)

                if (_campaign && _campaign.news) {
                    /* Set summary. */
                    const news = this.campaign.news
                    // console.log('NEWS', news)

                    /* Add each news article. */
                    news.forEach(article => {
                        this.articles.push({
                            id: article.id,
                            title: article.title,
                            summary: article.summary,
                            url: article.url,
                            avatar: article.avatar,
                            author: article.author,
                            createdAt: article.createdAt,
                        })
                    })
                }
            }
        },
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

            /* Sort by date (newest first). */
            articles.sort((a, b) => {
                return b.createdAt - a.createdAt
            })

            /* Return (reversed) array. */
            return articles
        },


    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

        formatSummary(_summary) {
            if (_summary.length > 250) {
                return _summary.slice(0, 250) + ' [ more... ]'
            } else {
                return _summary
            }
        },

    },
    created: function () {
        /* Validate news. */
        if (this.campaign && this.campaign.news) {
            /* Set summary. */
            const news = this.campaign.news
            // console.log('NEWS', news)

            /* Add each news article. */
            news.forEach(article => {
                this.articles.push({
                    id: article.id,
                    title: article.title,
                    summary: article.summary,
                    url: article.url,
                    avatar: article.avatar,
                    author: article.author,
                    createdAt: article.createdAt,
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

div.article-title {
    font-size: 1.7em;
    font-weight: 600;
}

div.article-byline {
    font-style: italic;
    margin: 5px 0;
    color: rgba(30, 30, 30, 0.5);
}
</style>

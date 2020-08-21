<template>
    <div class="blognews">
        <div class="container">
            <h2 class="title">Featured Articles</h2>

            <div class="description">
                Take a read at some of the most recent featured articles from around the web.
            </div>

            <div class="blognews-content">
                <div class="row">

                    <div
                        v-for="article of articles"
                        :key="article.id"
                        class="col-lg-4">
                        <article class="post">
                            <div class="blognews-thumb">
                                <a class="overlay" :href="article.url" target="_blank">
                                    <img :src="article.coverUrl" alt="">
                                    <span class="ion-ios-search-strong"></span>
                                </a>
                            </div>
                            <div class="blognews-info">
                                <div class="blognews-cat">
                                    {{article.category}}
                                    <br />Posted: {{formatPosted(article.posted)}} by <span class="author" @click="openAuthor(article.authorUrl)">{{article.author}}</span>
                                </div>

                                <h3 class="blognews-title">
                                    <a :href="article.url" target="_blank">
                                        {{article.title}}
                                    </a>
                                </h3>

                                <div class="blognews-content">
                                    <p>
                                        {{article.summary}}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Import modules. */
import moment from 'moment'

/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            articles: [],
        }
    },
    methods: {
        /**
         * Open Author
         */
        openAuthor(_url) {
            window.open(_url)
        },

        /**
         * Format Posted
         */
        formatPosted(_timestamp) {
            return moment.unix(_timestamp).fromNow()
        }
    },
    created: function () {
        /* Article. */
        this.articles.push({
            id: '242b9090-776a-48a5-8818-dedc92700f73',
            title: `Flowee to use Flipstarter: help needed!`,
            summary: `Flowee is a family of products that together have the aim to accelerate the world towards a Bitcoin Cash economy. Flowee includes as one of the core products a full node implementation.`,
            url: 'https://read.cash/@TomZ/flowee-to-use-flipstarter-help-needed-c030a8fd',
            coverUrl: 'https://i.imgur.com/iJE34D4.png',
            category: 'Infrastructure Development',
            posted: 1585047865,
            author: '@TomZ',
            authorUrl: 'https://read.cash/@TomZ',
        })

        /* Article. */
        this.articles.push({
            id: '684def31-d493-4f88-ba4a-6be6485051c4',
            title: `Flipstarter beta campaign for EatBCH is live`,
            summary: `The EatBCH beta campaign. How to make a pledge - You must use the desktop version of Electron Cash to participate.`,
            url: 'https://read.cash/@flipstarter/flipstarter-beta-campaign-for-eatbch-is-live-ac2fb8b1#comment-4254954d',
            coverUrl: 'https://i.imgur.com/WCSy3Hv.png',
            category: 'Health & Wellness',
            posted: 1584226169,
            author: '@flipstarter',
            authorUrl: 'https://read.cash/@flipstarter',
        })

        /* Article. */
        this.articles.push({
            id: 'f05e91ab-fce0-427b-b336-a55afc6bbdcd',
            title: `Flipstarter 500k, 6 independent campaigns`,
            summary: `First, thank you to everyone for feedback and requests about Flipstarter. The response has been inspiring. Multiple requests to run campaigns and a lot of encouragement as well as constructive feedback.`,
            url: 'https://read.cash/@flipstarter/flipstarter-500k-6-independent-campaigns-0d30c1cf',
            coverUrl: 'https://i.imgur.com/OHaMTnc.png',
            category: 'Our Community',
            posted: 1584162801,
            author: '@flipstarter',
            authorUrl: 'https://read.cash/@flipstarter',
        })

    }
}
</script>

<style scoped>
.blognews-cat{
    font-size: 12px;
    color: #555555;
    margin-bottom: 8px;
}
.blognews-title{
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
    height: 20px;
    overflow: hidden;
}
.blognews{
    /* margin-bottom: 120px; */
    margin-bottom: 40px;
}
.blognews-thumb{
    margin-bottom: 17px;
    border-radius: 3px;
}
.blognews-content .post{
    margin-bottom: 0;
}

/*  */

.author {
    cursor: pointer;
    color: rgba(30, 30, 220, 0.8);
}

.blognews-thumb {
    border: 1px solid rgba(180, 180, 180, 0.2);
    padding: 2px;
}
</style>

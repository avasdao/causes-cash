<template>
    <div class="blognews">
        <div class="container">
            <h2 class="title">From the Journal</h2>

            <div class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>

            <div class="blognews-content">
                <div class="row">
                    <div class="col-lg-4">
                        <article class="post">
                            <div class="blognews-thumb">
                                <a class="overlay" href="https://read.cash/@flipstarter/flipstarter-500k-6-independent-campaigns-0d30c1cf" target="_blank">
                                    <!-- 370 x 240 -->
                                    <img src="https://i.imgur.com/EPRdQKH.png" alt="">
                                    <span class="ion-ios-search-strong"></span>
                                </a>
                            </div>
                            <div class="blognews-info">
                                <div class="blognews-cat">
                                    Bitcoin Cash
                                    <br />Posted: 3 days ago by <span class="author" @click="openAuthor('https://read.cash/@flipstarter')">@flipstarter</span>
                                </div>

                                <h3 class="blognews-title">
                                    <a href="https://read.cash/@flipstarter/flipstarter-500k-6-independent-campaigns-0d30c1cf">
                                        Flipstarter 500k, 6 independent campaigns
                                    </a>
                                </h3>

                                <div class="blognews-content">
                                    <p>
                                        First, thank you to everyone for feedback and requests about Flipstarter. The response has been inspiring. Multiple requests to run campaigns and a lot of encouragement as well as constructive feedback.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="col-lg-4">
                        <article class="post">
                            <div class="blognews-thumb">
                                <a class="overlay" href="https://preview.thememusion.com/ideapress/blog_details.html">
                                    <img src="https://preview.thememusion.com/ideapress/images/journal-02.jpg" alt="">
                                    <span class="ion-ios-search-strong"></span>
                                </a>
                            </div>
                            <div class="blognews-info">
                                <a href="javascript://" class="blognews-cat">Case Studies</a>
                                <h3 class="blognews-title"><a href="javascript://">Win a Set of TouchPoints Basic</a></h3>
                                <div class="blognews-content">
                                    <p>TouchPoints are neuroscientific wearables that are worn on either side of the body for 15 minutes to reduce stress and anxiety.</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="col-lg-4">
                        <article class="post">
                            <div class="blognews-thumb">
                                <a class="overlay" href="https://preview.thememusion.com/ideapress/blog_details.html">
                                    <img src="https://preview.thememusion.com/ideapress/images/journal-03.jpg" alt="">
                                    <span class="ion-ios-search-strong"></span>
                                </a>
                            </div>
                            <div class="blognews-info">
                                <a href="javascript://" class="blognews-cat">Products</a>
                                <h3 class="blognews-title"><a href="javascript://">This Smart Eye Mask Could Be The Answer</a></h3>
                                <div class="blognews-content">
                                    <p>Waking up is hard to do. That’s why this company is making sleep a priority by giving the classic face mask an upgrade.</p>
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
            //
        }
    },
    methods: {
        /**
         * Open Author
         */
        openAuthor(_url) {
            window.open(_url)
        },
    },
}
</script>

<style scoped>
.author {
    cursor: pointer;
    color: rgba(30, 30, 220, 0.8);
}
</style>

<template>
    <div class="project-love">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-sm-9 col-9">
                    <div class="project-love-title">
                        <h2 class="title left-title">Most ❤️ By Our Community</h2>

                        <div class="description left-description">
                            Pay-It-Forward (PIF) and vote for YOUR favorite cause(s).
                        </div>
                    </div>

                    <ul class="project-love-slider">
                        <li v-for="cause of causes" :key="cause.id">
                            <div class="project-love-item clearfix">
                                <router-link to="/details" class="project-love-image">
                                    <img :src="cause.imgUrl" class="img-rounded" alt="">
                                </router-link>

                                <div class="project-love-item-content project-love-box">
                                    <router-link to="/discover" class="category category-link">
                                        {{cause.category}}
                                    </router-link>

                                    <h3>
                                        <router-link to="/details">
                                            {{cause.title}}
                                        </router-link>
                                    </h3>

                                    <div class="project-love-description">
                                        {{cause.description}}
                                    </div>

                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" :href="cause.authorLink" target="_blank">
                                                <img :src="cause.authorAvatar" alt="">
                                            </a>
                                            by
                                            <a class="author-name" :href="cause.authorLink" target="_blank">
                                                {{cause.authorName}}
                                            </a>
                                        </div>

                                        <div class="author-address">
                                            <span class="ion-location"></span>
                                            {{cause.location}}
                                        </div>
                                    </div>

                                    <div class="process">
                                        <div class="raised"><span></span></div>

                                        <div class="process-info">
                                            <div class="process-pledged">
                                                <span>{{cause.pledged}}</span>pledged
                                            </div>

                                            <div class="process-funded">
                                                <span>{{cause.funded}}</span>funded
                                            </div>

                                            <div class="process-time">
                                                <span>{{cause.backers}}</span>backers
                                            </div>

                                            <div class="process-time">
                                                <span>{{cause.duration}}</span>days ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <Categories />
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
// import BitcoinCash from '@/components/PIF/BitcoinCash.vue'
import Categories from '@/components/PIF/Categories.vue'
// import Comics from '@/components/PIF/Comics.vue'

/* Import icons. */
import '@/compiled-icons/bitcoin-cash-logo-text'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        // BitcoinCash,
        Categories,
        // Comics,
    },
    data: () => {
        return {
            causes: [],
        }
    },
    methods: {
        //
    },
    created: function () {
        /* Adoption. */
        this.causes.push({
            id: '5f40508f-c083-4c3b-83bf-0e8c00641daa',
            title: `The Everlast Notebook`,
            category: 'Adoption',
            description: `One smart, reusable notebook to last the rest of your life? That's not magic, that's the Everlast.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/liW0dGR.jpg',
            pledged: '$5000',
            funded: '41%',
            backers: 37,
            duration: 23,
        })

        /* Community. */
        this.causes.push({
            id: '6dd01065-a6d3-410c-9bdb-02d76e6ca0f5',
            title: `Bitcoin Cash Please`,
            category: 'Community',
            description: `On a mission to spread the word about Bitcoin Cash throughout the world; with the goal of educating other on how to build and sustain wealth.`,
            authorName: `@ShomariPrince`,
            authorAvatar: 'https://i.imgur.com/wYsNUV4.png',
            authorLink: 'https://twitter.com/ShomariPrince',
            location: `Atlanta, Georgia`,
            imgUrl: 'https://i.imgur.com/jtMbAze.png',
            pledged: '10,000',
            funded: '1%',
            backers: 1,
            duration: 0,
        })

        /* DApps. */
        this.causes.push({
            id: '8ed37b3e-69ba-4ae7-a01e-6ecee5eb74e2',
            title: `The Dashboard`,
            category: 'DApps',
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/QCzNsDT.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Design & Art. */
        this.causes.push({
            id: '5b67dc8e-181e-4ed4-b7d4-d5ab5619a175',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Design & Art',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/KAF3EdH.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Film & Video. */
        this.causes.push({
            id: '04053df1-581a-412d-92d4-fcc6e720c27f',
            title: `Naomi Brockwell TV`,
            category: 'Film & Video',
            description: `Naomi Brockwell is an award-winning producer, who hosts some of the largest blockchain and economics conferences around the world. She interviews the biggest names in tech, business, and politics, while appearing regularly on US national television, discussing blockchain technology and current events.`,
            authorName: `Naomi Brockwell`,
            authorAvatar: 'https://i.imgur.com/wUw1Jmo.png',
            authorLink: 'https://twitter.com/naomibrockwell',
            location: `Wanderer`,
            imgUrl: 'https://i.imgur.com/JvvpQLN.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Fun & Games. */
        this.causes.push({
            id: '45be0df4-5a9e-4088-a3d9-52c6e99fff12',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Fun & Games',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/BKsh6tn.jpg',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Hardware. */
        this.causes.push({
            id: '6d43d008-b148-44db-bede-28c4c05ad744',
            title: `Bitcoin CashDrive`,
            category: 'Hardware',
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            authorName: `@PeterRizun`,
            authorAvatar: 'https://i.imgur.com/aX2GDOU.png',
            authorLink: 'https://twitter.com/PeterRizun',
            location: `Vancouver, British Columbia`,
            imgUrl: 'https://i.imgur.com/k6N8MI1.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Health. */
        this.causes.push({
            id: 'eec926cb-032c-45cb-97c3-b6ce6ceb819f',
            title: `eatBCH`,
            category: 'Health',
            description: `We've brought hope to thousands of the world's most vulnerable people. eatBCH is not a typical charity. We simply provide food to people that prepare and deliver meals to their community. Kind of like when a neighbor knocks on your door to share a freshly baked slice of apple pie.`,
            authorName: `eatBCH`,
            authorAvatar: 'https://i.imgur.com/wiPuwpt.png',
            authorLink: 'https://twitter.com/eatBCH',
            location: `Venezuela and South Sudan`,
            imgUrl: 'https://i.imgur.com/cNke3py.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Infrastructure. */
        this.causes.push({
            id: 'b3668bc5-7cc9-4a9c-907e-f837f2d17747',
            title: `Bitcoin Cash Node`,
            category: 'Infrastructure',
            description: `The primary goal of the Bitcoin Cash Node initiative is to provide a safe and professional node implementation that will neutrally follow the longest Bitcoin Cash chain without contributing to the risk of a chain split.`,
            authorName: `@freetrader`,
            authorAvatar: 'https://i.imgur.com/W0alMQM.png',
            authorLink: 'https://memo.cash/profile/1EDtyAxn8zh9qBdWxdCyhY7AFzLcHvFrtE',
            location: `Worldwide`,
            imgUrl: 'https://i.imgur.com/J4CN5kV.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Music. */
        this.causes.push({
            id: 'd4aa6c37-bfbe-42f7-802c-139b535b57f0',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Music',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/Qi1syth.jpg',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Privacy. */
        this.causes.push({
            id: '180e2149-0b51-445f-9122-07dd70f04162',
            title: `Nito Cash`,
            category: 'Privacy',
            description: `The most user-friendly, privacy shielding wallet for crypto newcomers. Easily use anonymity protocols CashShuffle and CashFusion while on-the-go.`,
            authorName: `@ShomariPrince`,
            authorAvatar: 'https://i.imgur.com/wYsNUV4.png',
            authorLink: 'https://twitter.com/ShomariPrince',
            location: `Atlanta, Georgia`,
            imgUrl: 'https://i.imgur.com/oj1uOCA.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Publishing. */
        this.causes.push({
            id: '894f9cf1-21d1-4914-858b-44c7d3cfe560',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Publishing',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/rTtwVzt.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Security. */
        this.causes.push({
            id: '6203f72c-334f-4c8f-94ec-443db3869688',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Security',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/Ndh1UrO.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Software. */
        this.causes.push({
            id: '6203f72c-334f-4c8f-94ec-443db3869688',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Software',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/fWuGeZy.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* World. */
        this.causes.push({
            id: 'e61f7109-a853-4087-80c2-93e037309d77',
            title: `Bike as a Mobile Art Gallery`,
            category: 'World',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            authorAvatar: 'https://i.imgur.com/mjxjScF.png',
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/Xy2SHPX.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

    },
    mounted: function () {
        $('.project-love-slider').bxSlider({
            pagerCustom: '#bx-pager',
            // mode: 'fade',
            mode: 'vertical',
            controls: false,
            startSlide: 8,
            touchEnabled : (navigator.maxTouchPoints > 0),
        })

    },
}
</script>

<style scoped>
.category-btn, .category-link {
    float: right;
}

.img-rounded {
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px; /* future proofing */
}
</style>

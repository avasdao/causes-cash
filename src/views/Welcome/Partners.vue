<template>
    <div class="partners">
        <div class="container">
            <div class="partners-slider owl-carousel">
                <div v-for="partner of partners" :key="partner.title">
                    <a :href="partner.url" target="_blank">
                        <img :src="partner.imageUrl" :alt="partner.title"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            partners: null,
        }
    },
    methods: {
        //
    },
    created: function () {
        /* Initialize partners. */
        this.partners = []

        /* Add partner. */
        this.partners.push({
            title: 'Bitcoin.com',
            url: 'https://bitcoin.com',
            imageUrl: 'https://i.imgur.com/oOIbAcA.png',
        })

        /* Add partner. */
        this.partners.push({
            title: 'Bitcoin-1',
            url: 'https://bitcoin.com/',
            imageUrl: 'https://i.imgur.com/otYhXUP.png',
        })

        /* Add partner. */
        this.partners.push({
            title: 'CoinSpice',
            url: 'https://coinspice.io/',
            imageUrl: 'https://i.imgur.com/BpzVRSD.png',
        })

        /* Add partner. */
        this.partners.push({
            title: 'SLP Foundation',
            url: 'https://simpleledger.io/',
            imageUrl: 'https://i.imgur.com/ZQg5IdB.png',
        })

        /* Add partner. */
        this.partners.push({
            title: 'Blockchain Poker',
            url: 'https://blockchain.poker/',
            imageUrl: 'https://i.imgur.com/5toFEp9.png',
        })

        /* Add partner. */
        this.partners.push({
            title: 'Bitcoin-2',
            url: 'https://bitcoin.com/',
            imageUrl: 'https://i.imgur.com/otYhXUP.png',
        })

    },
    mounted: function () {
        $('.partners-slider').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            items: 6,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                },
                360: {
                    items: 2,
                },
                576: {
                    items: 3,
                },
                992: {
                    items: 6,
                }
            }
        })

    },
}
</script>

<style scoped>
.author {
    cursor: pointer;
    color: rgba(30, 30, 220, 0.8);
}

.blognews-thumb {
    border: 1px solid rgba(180, 180, 180, 0.2);
    padding: 2px;
}
</style>

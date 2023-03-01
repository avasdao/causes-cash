<template>
    <main id="report-cards">
        <div
            v-for="card of cards" :key="card.id"
            class="mt-10 p-5 bg-gray-50 border-2 border-gray-200 rounded-xl"
        >
            <div class="text-right text-sm font-bold text-gray-500">
                {{card.category}}
            </div>

            <div class="text-right text-sm font-medium text-gray-500">
                posted 14 hours ago
            </div>

            <div v-html="card.body" />
        </div>
    </main>
</template>

<script>
/* Import modules. */
import DOMPurify from 'dompurify'
import showdown from 'showdown'

export default {
    components: {
        // HelloWorld
    },
    data: () => {
        return {
            cards: null,
            description: null,
        }
    },
    methods: {
        clean(_dirty) {
            /* Sanitize markdown (from description). */
            const markdown = DOMPurify.sanitize( _dirty, {
                USE_PROFILES: { html: true } // HTML ONLY
            })

            /* Initialize Showdown converter. */
            // Reference to docs: https://github.com/showdownjs/showdown/wiki
            const converter = new showdown.Converter()

            /* Convert markdown to HTML. */
            const html = converter.makeHtml(markdown)
            // console.log('HTML', html)

            return html

        },

    },
    created: function () {
        this.cards = []

        let card

        card = `
## Testnet is ONLINE!

The Smartstarter Testnet is now online.

### Completed

1. Deployed the first Smartstarter.sol contract on the Amber testnet.

### Links to other resources

- https://ipfs.io/ipfs/abc123

        `
        this.cards.push({
            id: '36eae832-f551-4433-9d6a-fa4c439cc374',
            body: this.clean(card),
            category: `ANNOUNCEMENT`,
        })

        card = `
## Introducing Report Cards!

Report Cards offer campaign managers the tools and resources they need to keep their supporters up-to-date.

### In-progress

1. Writing a NEW on-chain specification for Report Cards.

### Links to other resources

- https://ipfs.io/ipfs/abc123

        `
        this.cards.push({
            id: 'bba8b85a-b2c2-417e-a85f-26f4f7e9eaf3',
            body: this.clean(card),
            category: `UPDATE`,
        })

        card = `
## Introducing SMARTSTARTER!

The first release of this new SmartBCH peer-to-peer, crowdfunding platform.

### Completed

1. Launched smartstarter.cash Testnet
2. Created docs.smartstarter.cash
3. Published new GitLab repository

### Links to other resources

- https://ipfs.io/ipfs/abc123

        `
        this.cards.push({
            id: 'bb4717f7-8281-4576-baad-fa4d2b75352e',
            body: this.clean(card),
            category: `ANNOUNCEMENT`,
        })
    },
    mounted: function () {
        //
    },
}
</script>

<style>
#report-cards h1 {
    font-size: 1.875em;
}

#report-cards h2 {
    font-size: 1.375em;
    border-bottom: 1pt solid #999;
    margin-top: 20px;
    margin-bottom: 10px;
}

#report-cards h3 {
    margin-top: 15px;
    font-size: 1.15em;
    text-transform: uppercase;
    font-weight: bold;
}

#report-cards p {
    padding: 10px 0;
}

#report-cards a {
    color: blue;
}

#report-cards ol, #report-cards ul {
    padding: 10px 30px;
    /* background-color: purple; */
}

#report-cards ol > li {
    list-style-type: decimal;
}

#report-cards ul > li {
    list-style-type: disc;
}
</style>

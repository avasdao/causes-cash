<template>
    <div id="premium" class="tabs comment-area">
        <!-- <h3 class="comments-title">New &amp; Noteworthy</h3> -->

        <ol class="comments-list">

            <li v-for="item of itemList" :key="item.id" class="comment clearfix">
                <div class="comment-body">
                    <div class="comment-avatar">
                        <img class="avatar" :src="item.avatar" alt="">
                    </div>

                    <div class="comment-info">
                        <header class="comment-meta"></header>

                        <cite class="comment-author">
                            <a :href="item.url" target="_blank">
                            {{item.title}}</a>
                        </cite>

                        <div class="comment-inline">
                            <span class="comment-date">{{item.timeAgo}}</span>
                            <!-- <a href="javascript://" class="comment-reply">Reply</a> -->
                        </div>

                        <div class="comment-content">
                            <p>
                                {{item.summary}}
                            </p>
                        </div>
                    </div>
                </div>
            </li>

        </ol>
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

            items: [],
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

        itemList() {
            const items = this.items.map(item => {
                /* Format data. */
                item.timeAgo = moment.unix(item.createdAt).format('ll')

                /* Return (formatted) item. */
                return item
            })

            /* Return (reversed) array. */
            return items.reverse()
        },

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

    },
    created: async function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
        // console.log('OWNER SLUG', this.ownerSlug)

        /* Set extended slug. */
        this.extSlug = this.$route.params.extSlug
        // console.log('EXT SLUG', this.extSlug)

        /* Validate slug. */
        if (this.ownerSlug && this.extSlug) {
            /* Set slug. */
            const slug = this.extSlug.slice(0, this.extSlug.lastIndexOf('-'))

            /* Set campaign. */
            this.campaign = await this.getCampaign(this.ownerSlug, slug)
            // console.log('NEWS (campaign):', this.campaign)

            /* Validate premium. */
            if (this.campaign && this.campaign.premium) {
                /* Set summary. */
                this.premium = this.campaign.premium
                // console.log('NEWS', this.premium)

                /* Add each premium item. */
                this.premium.forEach(item => {
                    this.items.push({
                        id: item.id,
                        title: item.title,
                        summary: item.summary,
                        avatar: item.avatar,
                        url: item.url,
                        createdAt: item.createdAt,
                    })
                })
            }
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

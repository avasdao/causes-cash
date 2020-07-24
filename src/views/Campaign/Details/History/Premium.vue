<template>
    <div id="premium" class="tabs">
        <!-- <h3 class="comments-title">New &amp; Noteworthy</h3> -->

        <ol v-if="itemList" class="comments-list">
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

        <div v-else>
            <h1>Premium Content</h1>

            <p class="m-3">
                There is no premium content available
            </p>
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
            if (!this.items || this.items.length === 0) {
                return null
            }

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
    created: function () {
        /* Validate news. */
        if (this.campaign && this.campaign.premium) {
            /* Set summary. */
            this.premium = this.campaign.premium
            console.log('NEWS', this.premium)

            /* Add each premium article. */
            this.premium.forEach(premium => {
                this.articles.push({
                    id: premium.id,
                    title: premium.title,
                    summary: premium.summary,
                    avatar: premium.avatar,
                    url: premium.url,
                    createdAt: premium.createdAt,
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

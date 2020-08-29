<template>
    <div class="campaign-history">
        <div v-if="campaign && campaign.isPublished" class="container">
            <div class="row">

                <div class="col-lg-8">
                    <div class="campaign-tabs">
                        <ul class="tabs-controls">
                            <li :class="{ active: activeTab === 'story' }" data-tab="story">
                                <a href="javascript://" @click="activeTab = 'story'">Story</a>
                            </li>

                            <li :class="{ active: activeTab === 'supporters' }" data-tab="supporters">
                                <a href="javascript://" @click="activeTab = 'supporters'">Supporters</a>
                            </li>

                            <li :class="{ active: activeTab === 'funds' }" data-tab="funds">
                                <a href="javascript://" @click="activeTab = 'funds'">Funds</a>
                            </li>

                            <li :class="{ active: activeTab === 'news' }" data-tab="news">
                                <a href="javascript://" @click="activeTab = 'news'">News</a>
                            </li>

                            <li :class="{ active: activeTab === 'guide' }" data-tab="guide">
                                <a href="javascript://" @click="activeTab = 'guide'">Guide</a>
                            </li>

                            <li :class="{ active: activeTab === 'premium' }" data-tab="premium">
                                <a href="javascript://" @click="activeTab = 'premium'">
                                    <span class="text-danger">Premium</span>
                                </a>
                            </li>
                        </ul>

                        <a name="history"></a>
                        <!-- <div class="campaign-content"> -->
                        <div class="">
                            <Story v-if="activeTab === 'story'" :campaign="campaign" />
                            <Supporters v-if="activeTab === 'supporters'" :campaign="campaign" />
                            <Funds v-if="activeTab === 'funds'" :campaign="campaign" />
                            <News v-if="activeTab === 'news'" :campaign="campaign" />
                            <Guide v-if="activeTab === 'guide'" :campaign="campaign" />
                            <Premium v-if="activeTab === 'premium'" :campaign="campaign" />
                        </div>
                    </div>
                </div>

                <Events :campaign="campaign" />
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
import Events from './History/Events'
import Funds from './History/Funds'
import Guide from './History/Guide'
import News from './History/News'
import Premium from './History/Premium'
import Story from './History/Story'
import Supporters from './History/Supporters'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    props: {
        campaign: Object,
        isLoading: Boolean,
    },
    components: {
        Events,
        Funds,
        Guide,
        News,
        Premium,
        Story,
        Supporters,
    },
    data: () => {
        return {
            activeTab: null,
        }
    },
    methods: {
        // 
    },
    created: function () {
        /* Set active tab. */
        this.activeTab = 'story'
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

<template>
    <main class="faq">
        <Header />

        <div class="page-title" :style="{ 'background-image': 'url(' + bannerImg + ')' }">
			<div class="container">
				<h1>Manage Your Campaign</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Manage Your Campaign</li>
					</ul>
				</div>
			</div>
		</div>

        <section>
            <div class="container">
                <div class="design-process-section" id="process-tab">
                    <ul class="nav nav-tabs process-model more-icon-preocess" role="tablist">
                        <li>
                            <a href="javascript://">
                                <span><img class="img-button" src="@/assets/img/magic.svg" alt=""></span>
                                <p>Create New</p>
                            </a>
                        </li>

                        <li data-tab="general" class="pm-option active">
                            <a href="javascript://">
                                <span><img src="@/assets/img/single-folded.svg" alt=""></span>
                                <p>General</p>
                            </a>
                        </li>

                        <li data-tab="story" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/book-open.svg" alt=""></span>
                                <p>Story</p>
                            </a>
                        </li>

                        <li data-tab="rewards" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/alert-circle-i.svg" alt=""></span>
                                <p>Rewards</p>
                            </a>
                        </li>

                        <li data-tab="funds" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/award.svg" alt=""></span>
                                <p>Financial</p>
                            </a>
                        </li>

                        <li data-tab="social" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/single-02.svg" alt=""></span>
                                <p>Social</p>
                            </a>
                        </li>

                        <li>
                            <a :href="liveUrl" target="_blank">
                                <span><img src="@/assets/img/eye-17.svg" alt=""></span>
                                <p>Open Live</p>
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <General />
                        <Financial />
                        <Story />
                        <Social />
                        <Rewards />
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

import Financial from './Manage/Financial.vue'
import General from './Manage/General.vue'
import Rewards from './Manage/Rewards.vue'
import Social from './Manage/Social.vue'
import Story from './Manage/Story.vue'

export default {
    components: {
        Footer,
        Header,

        Financial,
        General,
        Rewards,
        Social,
        Story,
    },
    data: () => {
        return {
            liveUrl: null,
            slug: null,
        }
    },
    computed: {
        /* Banner Image */
        bannerImg() {
            return 'https://i.imgur.com/9vNfGgt.jpg'
        },

    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch
        // console.log('OWNER SLUG', this.ownerSlug)

        /* Set campaign slug. */
        this.slug = this.$route.params.slug
        // console.log('SLUG', this.slug)

        /* Set live URL. */
        // FOR DEVELOPMENT ONLY
        this.liveUrl = `http://localhost:8080/#/@${this.ownerSlug}/${this.slug}-null`

    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.img-button {
    width: 28px;
    height: 28px;
    color: white;
}

/* @media screen and (min-width: 576px) { */
@media screen and (min-width: 767px) {
    .img-button {
        width: 48px;
        height: 48px;
        color: white;
    }
}

</style>

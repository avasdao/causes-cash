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
                                <span><img src="@/assets/img/log-out.svg" alt=""></span>
                                <p>Cancel</p>
                            </a>
                        </li>
                        <li data-tab="basics" class="pm-option active">
                            <a href="javascript://">
                                <span><img src="@/assets/img/single-folded.svg" alt=""></span>
                                <p>Basics</p>
                            </a>
                        </li>
                        <li data-tab="rewards" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/award.svg" alt=""></span>
                                <p>Rewards</p>
                            </a>
                        </li>
                        <li data-tab="story" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/book-open.svg" alt=""></span>
                                <p>Story</p>
                            </a>
                        </li>
                        <li data-tab="about" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/alert-circle-i.svg" alt=""></span>
                                <p>About</p>
                            </a>
                        </li>
                        <li data-tab="account" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/single-02.svg" alt=""></span>
                                <p>Account</p>
                            </a>
                        </li>
                        <li>
                            <a href="javascript://">
                                <span><img src="@/assets/img/eye-17.svg" alt=""></span>
                                <p>Preview</p>
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <Basics />
                        <Rewards />
                        <Story />
                        <About />
                        <Account />
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

import About from './Manage/About.vue'
import Account from './Manage/Account.vue'
import Basics from './Manage/Basics.vue'
import Rewards from './Manage/Rewards.vue'
import Story from './Manage/Story.vue'

export default {
    components: {
        Footer,
        Header,

        About,
        Account,
        Basics,
        Rewards,
        Story,
    },
    computed: {
        /* Banner Image */
        bannerImg() {
            return 'https://i.imgur.com/9vNfGgt.jpg'
        },

    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

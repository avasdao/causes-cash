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

                        <li data-tab="funds" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/award.svg" alt=""></span>
                                <p>Finances</p>
                            </a>
                        </li>

                        <li data-tab="social" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/alert-circle-i.svg" alt=""></span>
                                <p>Social</p>
                            </a>
                        </li>

                        <li data-tab="messages" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/single-02.svg" alt=""></span>
                                <p>Messages</p>
                            </a>
                        </li>

                        <li>
                            <a href="http://localhost:8080/#/@bchplease/mecenas-oracle-audit-66477a47" target="_blank">
                                <span><img src="@/assets/img/eye-17.svg" alt=""></span>
                                <p>Live View</p>
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <General />
                        <Finances />
                        <Story />
                        <Social />
                        <Messages />
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

import Finances from './Manage/Finances.vue'
import General from './Manage/General.vue'
import Messages from './Manage/Messages.vue'
import Social from './Manage/Social.vue'
import Story from './Manage/Story.vue'

export default {
    components: {
        Footer,
        Header,

        Finances,
        General,
        Messages,
        Social,
        Story,
    },
    data: () => {
        return {
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
        /* Set campaign slug. */
        this.slug = this.$route.params.slug
        console.log('SLUG', this.slug)

    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

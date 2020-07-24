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

                        <li data-tab="dashboard" class="pm-option active">
                            <a href="javascript://">
                                <span><img src="@/assets/img/single-folded.svg" alt=""></span>
                                <p class="d-md-none">Dash</p>
                                <p class="d-none d-md-block">Dashboard</p>
                            </a>
                        </li>

                        <li data-tab="write" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/book-open.svg" alt=""></span>
                                <p>Write</p>
                            </a>
                        </li>

                        <li data-tab="calc" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/award.svg" alt=""></span>
                                <p>Calc</p>
                            </a>
                        </li>

                        <li data-tab="media" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/single-02.svg" alt=""></span>
                                <p>Media</p>
                            </a>
                        </li>

                        <li data-tab="team" class="pm-option">
                            <a href="javascript://">
                                <span><img src="@/assets/img/alert-circle-i.svg" alt=""></span>
                                <p>Team</p>
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
                        <Dashboard />
                        <Write />
                        <Calc />
                        <Media />
                        <Team />
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

import Calc from './Manage/Calc.vue'
import Dashboard from './Manage/Dashboard.vue'
import Media from './Manage/Media.vue'
import Team from './Manage/Team.vue'
import Write from './Manage/Write.vue'

export default {
    components: {
        Footer,
        Header,

        Calc,
        Dashboard,
        Media,
        Team,
        Write,
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

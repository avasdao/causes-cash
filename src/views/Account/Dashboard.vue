<template>
    <main class="faq">
        <Header />
        <Banner page="dashboard" />

		<section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="dashboard" />

					<div class="col-lg-9">
						<div class="account-content dashboard">
							<h3 class="account-title">Dashboard</h3>

                            <div class="account-main">
								<div class="author clearfix">
                                    <a class="author-avatar" href="javascript://">
                                        <img src="@/assets/img/dashboard-avatar.png" alt="">
                                    </a>

									<div class="author-content">
                                        <div class="author-title">
                                            <h3>
                                                <a href="javascript://">
                                                    {{getNickname}}
                                                </a>
                                            </h3>

                                            <a class="edit-profile" href="javascript://">Edit Profile</a>
                                        </div>

										<div class="author-info">
                                            <p>
                                                <a href="javascript://" class="">
                                                    {{getEmail}}
                                                </a>
                                            </p>
                                            <p>
                                                Causes Cash member since June 2020
                                            </p>
										</div>
									</div>
								</div>

                                <hr />

                                <div class="dashboard-latest my-causes">
									<h3>My Latest Causes</h3>

									<ul>
										<li>
											<a href="javascript://"><img src="@/assets/img/campaign-tabs.jpg" alt=""></a>
											<div class="dashboard-latest-box">
												<div class="category"><a href="javascript://">Film & Video</a></div>
												<h4><a href="javascript://">Space Odyssey - The Video Game</a></h4>
											</div>
										</li>
										<li>
											<a href="javascript://"><img src="@/assets/img/campaign-tabs.jpg" alt=""></a>
											<div class="dashboard-latest-box">
												<div class="category"><a href="javascript://">Box</a></div>
												<h4><a href="javascript://">Unbuonded: A Feature Documentary</a></h4>
											</div>
										</li>
									</ul>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

        <Footer />
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

/* Import (account) components. */
import Banner from '@/components/Account/Banner.vue'
import Sidenav from '@/components/Account/Sidenav.vue'

export default {
    components: {
        Footer,
        Header,

        Banner,
        Sidenav,
    },
    data: () => {
        return {
            ownerSlug: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('profile', [
            'getEmail',
            'getNickname',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
        ]),
    },
    methods: {
        ...mapActions('campaigns', [
            'addCampaign',
        ]),

    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
    },
}
</script>

<style scoped>
.author {
    margin: 20px 40px;
}

.my-causes {
    margin: 20px 40px;
}
</style>

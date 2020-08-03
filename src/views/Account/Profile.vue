<template>
    <main class="faq">
        <Header />
        <Banner page="profile" />

        <section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="profile" />

					<div class="col-lg-9">

						<div class="account-content profile">
							<h3 class="account-title">Profile</h3>

							<div class="author clearfix">
								<a class="author-avatar" href="javascript://">
                                    <img :src="getAvatar" alt="">
                                </a>

								<div class="author-content">
									<div class="author-title">
                                        <h3>
                                            <a href="javascript://">
                                                {{getNickname}}
                                            </a>
                                        </h3>
                                    </div>

									<div class="author-info">
										<p>
                                            <a href="javascript://" class="">
                                                {{getEmail}}
                                            </a>
                                        </p>
										<p>
                                            Causes Cash member since August 2020
                                        </p>
									</div>
								</div>
							</div>

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-2">
                                    <strong>Nickname</strong>
                                </div>

                                <div class="col-8">
                                    Satoshi N.
                                </div>

                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-2">
                                    <strong>About Me</strong>
                                </div>

                                <div class="col-8">
                                    <p>
                                        I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing
                                    </p>
                                </div>

                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-2">
                                    <strong>Bio</strong>
                                </div>

                                <div class="col-8">
                                    <p>
                                        Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me, that it might be the mirror of my soul, as my soul is the mirror of the infinite God!
                                    </p>
                                </div>

                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>
                            </div>
						</div>

                        <!-- <a href="javascript://" class="btn-primary mt-3">Save My Profile</a> -->

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
            'getAvatar',
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
</style>

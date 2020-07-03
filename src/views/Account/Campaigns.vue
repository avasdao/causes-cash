<template>
    <main class="faq">
        <Header />
        <Banner page="campaigns" />

        <section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="campaigns" />

					<div class="col-lg-9">
						<div class="account-content account-table">
							<h3 class="account-title">Campaigns</h3>

                            <div v-if="campaigns" class="campaigns">

                                <h2 class="campaign-title">My Campaigns</h2>

								<div class="campaign-item">
									<a class="campaign-image" href="javascript://">
                                        <img src="@/assets/img/my-campaigns-01.jpg" alt=""></a>

									<div class="campaign-box">
										<div class="campaign-category"><a href="javascript://">Tecnology</a></div>
										<div class="campaign-title"><a href="javascript://">Redefine Your VR Experience</a></div>
										<div class="campaign-desc">When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary.</div>
									</div>
								</div>

								<a href="javascript://" class="btn-primary mb-3">Create a New Campaign</a>

                                <h2 class="campaign-title">Saved Campaigns</h2>

								<div class="campaign-item">
									<a class="campaign-image" href="javascript://">
                                        <img src="@/assets/img/my-campaigns-02.jpg" alt=""></a>

									<div class="campaign-box">
										<div class="campaign-category"><a href="javascript://">Tecnology</a></div>
										<div class="campaign-title"><a href="javascript://">Smart Wallet with Solar Charge</a></div>
										<div class="campaign-desc">I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies.</div>
									</div>
								</div>
							</div>

                            <div v-else class="campaigns">
                                You haven't saved any campaigns
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
            campaigns: null,
        }
    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
    },
}
</script>

<style scoped>
.campaigns {
    margin: 20px 40px;
}
</style>

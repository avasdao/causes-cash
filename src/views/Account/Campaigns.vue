<template>
    <main class="faq">
        <Header />

        <div class="page-title background-page">
			<div class="container">
                <h1 class="text-capitalize">@{{this.ownerSlug}} Campaigns</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Campaigns</li>
					</ul>
				</div>
			</div>
		</div>

        <section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="causes" />

					<div class="col-lg-9">
						<div class="account-content my-campaigns account-table">
							<h3 class="account-title">My Campaigns</h3>

                            <div class="account-main">
								<div class="campaign-item">
									<a class="campaign-image" href="javascript://">
                                        <img src="@/assets/img/my-campaigns-01.jpg" alt=""></a>

									<div class="campaign-box">
										<div class="campaign-category"><a href="javascript://">Tecnology</a></div>
										<div class="campaign-title"><a href="javascript://">Redefine Your VR Experience</a></div>
										<div class="campaign-desc">When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary.</div>
									</div>
								</div>

								<div class="campaign-item">
									<a class="campaign-image" href="javascript://">
                                        <img src="@/assets/img/my-campaigns-02.jpg" alt=""></a>

									<div class="campaign-box">
										<div class="campaign-category"><a href="javascript://">Tecnology</a></div>
										<div class="campaign-title"><a href="javascript://">Smart Wallet with Solar Charge</a></div>
										<div class="campaign-desc">I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies.</div>
									</div>
								</div>

								<a href="javascript://" class="btn-primary">Create a Campaign</a>
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
import Sidenav from '@/components/Account/Sidenav.vue'

export default {
    components: {
        Footer,
        Header,

        Sidenav,
    },
    data: () => {
        return {
            ownerSlug: null,
        }
    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
    },
}
</script>

<style scoped>
/*  */
</style>

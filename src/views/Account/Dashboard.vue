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
									<a class="author-avatar" href="javascript://"><img src="@/assets/img/dashboard-avatar.png" alt=""></a>
									<div class="author-content">
										<div class="author-title"><h3><a href="javascript://">Melvin Martinez</a></h3><a class="edit-profile" href="javascript://">Edit Profile</a></div>
										<div class="author-info">
											<p><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="d2bfb7bea4bbbc92a6bab7bfb7b5bdb3bea1fcb1bdbf">[email&#160;protected]</a></p>
											<p>IdeaPress Member since July 2017</p>
										</div>
									</div>
								</div>
								<div class="dashboard-latest">
									<h3>My Latest Cause</h3>
									<ul>
										<li>
											<a href="javascript://"><img src="@/assets/img/my-campaigns-01.jpg" alt=""></a>
											<div class="dashboard-latest-box">
												<div class="category"><a href="javascript://">Film & Video</a></div>
												<h4><a href="javascript://">Space Odyssey - The Video Game</a></h4>
											</div>
										</li>
										<li>
											<a href="javascript://"><img src="@/assets/img/my-campaigns-02.jpg" alt=""></a>
											<div class="dashboard-latest-box">
												<div class="category"><a href="javascript://">Box</a></div>
												<h4><a href="javascript://">Unbuonded: A Feature Documentary</a></h4>
											</div>
										</li>
									</ul>
								</div>
								<div class="payment-info">
									<p>Payment Info:</p>
									<p>Paypal Receiver Email: <a href="javascript://"><span class="__cf_email__" data-cfemail="d9a9b8a0b4bcb7ad99adb1bcb4bcbeb6b8b5aaf7bab6b4">[email&#160;protected]</span></a></p>
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
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
    },
}
</script>

<style scoped>
/*  */
</style>

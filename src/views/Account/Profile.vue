<template>
    <main class="faq">
        <Header />

        <div class="page-title background-page">
			<div class="container">
				<h1 class="text-capitalize">@{{this.user}} Profile</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Profile</li>
					</ul>
				</div>
			</div>
		</div>

        <section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="profile" />

					<div class="col-lg-9">
						<div class="account-content profile">
							<h3 class="account-title">My Profile</h3>
							<div class="account-main">
								<div class="author clearfix">
									<a class="author-avatar" href="javascript://"><img src="@/assets/img/dashboard-avatar.png" alt=""></a>
									<div class="author-content">
										<div class="author-title"><h3><a href="javascript://">Melvin Martinez</a></h3></div>
										<div class="author-info">
											<p><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="dfb2bab3a9b6b19fabb7bab2bab8b0beb3acf1bcb0b2">[email&#160;protected]</a></p>
											<p>IdeaPress Member since July 2017</p>
										</div>
									</div>
								</div>
								<div class="profile-box">
									<h3>Profile Infomations</h3>
									<ul>
										<li>
											<strong>About Me:</strong>
											<div class="profile-text"><p>I feel the presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and sustains us, as it floats around us in an eternity of bliss; and then, my friend, when darkness overspreads my eyes, and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often think with longing</p></div>
										</li>
										<li>
											<strong>Bio:</strong>
											<div class="profile-text"><p>Oh, would I could describe these conceptions, could impress upon paper all that is living so full and warm within me, that it might be the mirror of my soul, as my soul is the mirror of the infinite God!</p></div>
										</li>
										<li>
											<strong>First Name</strong>
											<div class="profile-text"><p>Martinez</p></div>
										</li>
										<li>
											<strong>Last Name:</strong>
											<div class="profile-text"><p>Melvin</p></div>
										</li>
										<li>
											<strong>Mobile:</strong>
											<div class="profile-text"><p>(+1) 123 456 789</p></div>
										</li>
										<li>
											<strong>Fax:</strong>
											<div class="profile-text"><p>(+1) 987 654 321</p></div>
										</li>
									</ul>
								</div>
								<div class="profile-box">
									<h3>Shipping Address</h3>
									<ul>
										<li>
											<strong>First Name</strong>
											<div class="profile-text"><p>Martinez</p></div>
										</li>
										<li>
											<strong>Last Name:</strong>
											<div class="profile-text"><p>Melvin</p></div>
										</li>
										<li>
											<strong>Company:</strong>
											<div class="profile-text"><p>ThemeGoals Inc.</p></div>
										</li>
										<li>
											<strong>Address 1:</strong>
											<div class="profile-text"><p>PO Box 16122 Collins Street West</p></div>
										</li>
										<li>
											<strong>Address 2:</strong>
											<div class="profile-text"><p></p></div>
										</li>
										<li>
											<strong>City:</strong>
											<div class="profile-text"><p>Melbourne</p></div>
										</li>
										<li>
											<strong>Post Code:</strong>
											<div class="profile-text"><p>3000</p></div>
										</li>
										<li>
											<strong>State:</strong>
											<div class="profile-text"><p>Victoria</p></div>
										</li>
										<li>
											<strong>Country:</strong>
											<div class="profile-text"><p>Australia</p></div>
										</li>
									</ul>
								</div>
								<div class="profile-box">
									<h3>Billing Address</h3>
									<ul>
										<li>
											<strong>First Name</strong>
											<div class="profile-text"><p>Martinez</p></div>
										</li>
										<li>
											<strong>Last Name:</strong>
											<div class="profile-text"><p>Melvin</p></div>
										</li>
										<li>
											<strong>Company:</strong>
											<div class="profile-text"><p>ThemeGoals Inc.</p></div>
										</li>
										<li>
											<strong>Address 1:</strong>
											<div class="profile-text"><p>PO Box 16122 Collins Street West</p></div>
										</li>
										<li>
											<strong>Address 2:</strong>
											<div class="profile-text"><p></p></div>
										</li>
										<li>
											<strong>City:</strong>
											<div class="profile-text"><p>Melbourne</p></div>
										</li>
										<li>
											<strong>Post Code:</strong>
											<div class="profile-text"><p>3000</p></div>
										</li>
										<li>
											<strong>State:</strong>
											<div class="profile-text"><p>Victoria</p></div>
										</li>
										<li>
											<strong>Country:</strong>
											<div class="profile-text"><p>Australia</p></div>
										</li>
									</ul>
								</div>
								<div class="profile-box">
									<h3>Payment Infomation</h3>
									<ul>
										<li>
											<strong>First Name</strong>
											<div class="profile-text"><p>Martinez</p></div>
										</li>
										<li>
											<strong>Last Name:</strong>
											<div class="profile-text"><p>Melvin</p></div>
										</li>
										<li>
											<strong>Payment Email:</strong>
											<div class="profile-text"><p><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="3b565a574d52557b4f535e565e5c545a574815585456">[email&#160;protected]</a></p></div>
										</li>
									</ul>
								</div>
								<a href="javascript://" class="btn-primary">Edit Profiles</a>
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
            user: null,
        }
    },
    created: function () {
        /* Set user. */
        const user = this.$route.params.pathMatch

        /* Validate user. */
        // FIXME: What should we do if validation fails??
        this.user = user
    },
}
</script>

<style scoped>
/*  */
</style>

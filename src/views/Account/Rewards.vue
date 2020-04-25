<template>
    <main class="faq">
        <Header />

        <div class="page-title background-page">
			<div class="container">
                <h1 class="text-capitalize">@{{this.user}} Rewards</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Rewards</li>
					</ul>
				</div>
			</div>
		</div>

        <section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="rewards" />

					<div class="col-lg-9">
						<div class="account-content rewards account-table">
							<h3 class="account-title">Rewards</h3>
							<div class="account-main">
								<table>
									<thead>
										<tr>
											<th>Order</th>
											<th>Date</th>
											<th>Status</th>
											<th>Total</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>#1145</td>
											<td>July 21, 2017</td>
											<td>Pending</td>
											<td>$250 for 1 item</td>
											<td><a href="#">View</a></td>
										</tr>
										<tr>
											<td>#1146</td>
											<td>July 22, 2017</td>
											<td>Completed</td>
											<td>$5150 for 3 item</td>
											<td><a href="#">View</a></td>
										</tr>
										<tr>
											<td>#1147</td>
											<td>July 23, 2017</td>
											<td>Cancel</td>
											<td>$180 for 1 item</td>
											<td><a href="#">View</a></td>
										</tr>
										<tr>
											<td>#1148</td>
											<td>July 24, 2017</td>
											<td>Completed</td>
											<td>$2700 for 1 item</td>
											<td><a href="#">View</a></td>
										</tr>
									</tbody>
								</table>
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

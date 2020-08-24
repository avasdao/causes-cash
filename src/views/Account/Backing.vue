<template>
    <main class="faq">
        <Header />
        <Banner page="backing" />

        <section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="backing" />

					<div class="col-lg-9">
						<div class="account-content account-table">
							<h3 class="account-title">Backed Campaigns</h3>

							<div v-if="backingList" class="backing">
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
											<td><a href="javascript://">View</a></td>
										</tr>
										<tr>
											<td>#1146</td>
											<td>July 22, 2017</td>
											<td>Completed</td>
											<td>$5150 for 3 item</td>
											<td><a href="javascript://">View</a></td>
										</tr>
										<tr>
											<td>#1147</td>
											<td>July 23, 2017</td>
											<td>Cancel</td>
											<td>$180 for 1 item</td>
											<td><a href="javascript://">View</a></td>
										</tr>
										<tr>
											<td>#1148</td>
											<td>July 24, 2017</td>
											<td>Completed</td>
											<td>$2700 for 1 item</td>
											<td><a href="javascript://">View</a></td>
										</tr>
									</tbody>
								</table>
							</div>

                            <div v-else class="backing">
                                <div>
                                    You haven't backed any campaigns
                                </div>
                            </div>

                            <div class="backing">
                                <a
                                    v-if="!showFlipstarter"
                                    href="javascript://"
                                    class="btn-primary mt-3"
                                    @click="showFlipstarter = !showFlipstarter"
                                >
                                    Add Flipstarter Pledge
                                </a>

                                <a
                                    v-if="showFlipstarter"
                                    href="javascript://"
                                    class="btn-danger mt-3"
                                    @click="showFlipstarter = !showFlipstarter"
                                >
                                    Cancel Flipstarter Pledge
                                </a>
                            </div>

						</div>

                        <div v-if="showFlipstarter" class="account-content account-table mt-3">
                            <h3 class="account-title">Add Flipstarter Pledge</h3>

                            <Flipstarter />
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
import Footer from '@/components/Footer'
import Header from '@/components/Header'

/* Import (account) components. */
import Banner from '@/components/Account/Banner'
import Sidenav from '@/components/Account/Sidenav'

/* Import (local) components. */
import Flipstarter from './Backing/Flipstarter'

export default {
    components: {
        Footer,
        Header,

        Banner,
        Sidenav,

        Flipstarter,
    },
    data: () => {
        return {
            ownerSlug: null,
            backingList: null,
            showFlipstarter: null,

        }
    },
    computed: {
        ...mapGetters('profile', [
            'getMeta',
        ]),

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

    },
    created: async function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()

        /* Initialize show Flipstarter flag. */
        this.showFlipstarter = false
    },
}
</script>

<style scoped>
.backing {
    margin: 20px 40px;
}
</style>

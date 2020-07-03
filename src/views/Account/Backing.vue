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
							<h3 class="account-title">Backed Causes</h3>

							<div v-if="backing" class="backing">
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
                                <div v-if="accepting">
                                    <div class="row">
                                        <div class="col">
                                            <h3>Pledge details</h3>

                                            <small>
                                                Paste the details from your campaign below.
                                            </small>

                                            <textarea
                                                class="pledge-details mt-3"
                                                v-model="pledgeDetails"
                                                placeholder="Paste your pledge details here">
                                            </textarea>

                                        </div>

                                        <div class="col">
                                            <h3>Pledge authorization</h3>

                                            <small>
                                                Paste your authorization message into your campaign.
                                            </small>

                                            <textarea
                                                class="pledge-auth mt-3"
                                                v-model="pledgeAuth"
                                                placeholder="Waiting for confirmation...">
                                            </textarea>
                                        </div>
                                    </div>

                                    <button
                                        v-if="parsedDetails"
                                        class="btn-primary mt-3"
                                        @click="confirmFlipstarter"
                                        :disabled="pledgeAuth"
                                    >
                                        Confirm Flipstarter Pledge
                                    </button>

                                    <div v-if="parsedDetails" class="row mt-3 parsedJson">
                                        <pre>{{parsedDetails}}</pre>
                                    </div>
                                </div>

                                <div v-else>
                                    <div>
                                        You haven't backed any campaigns
                                    </div>

                                    <a
                                        href="javascript://"
                                        class="btn-primary mt-3"
                                        @click="addFlipstarter"
                                    >
                                        Add Flipstarter Campaign
                                    </a>
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
            backing: null,
            accepting: null,
            pledgeDetails: null,
            pledgeAuth: null
        }
    },
    computed: {
        /**
         * Pledge Authorization
         */
        // pledgeAuth() {
        //     if (this.pledgeAuth) {
        //         return this.pledgeAuth
        //     } else {
        //         return null
        //     }
        // },

        /**
         * Parsed Details
         */
        parsedDetails() {
            if (!this.pledgeDetails) {
                return null
            }

            /* Decode details to base64. */
            const b64 = Buffer.from(this.pledgeDetails, 'base64')

            /* Initialize counter. */
            let count = 0

            /* Initialize buffer. */
            const buf = Buffer.alloc(b64.length / 2)

            /* Convert 16-bit to 8-bit. */
            for (let i = 0; i < b64.length; i += 2) {
                buf[count++] = b64[i]
            }

            /* Parse json. */
            const json = JSON.parse(buf.toString())
            // console.log('\nFLIPSTARTER PLUGIN DETAILS (json):', json)

            /* Return json. */
            return json
        },

    },
    methods: {
        /**
         * Accept Flipstarter (Pledge)
         *
         * Allows a user to accept a non-platform pledge,
         * eg. from a self-hosted Flipstarter (Assurance) campaign.
         */
        addFlipstarter() {
            this.accepting = !this.accepting
        },

        /**
         * Confirm Flipstarter (Pledge)
         */
        confirmFlipstarter() {
            this.pledgeAuth = 'show me something special!'
        },

    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()

        /* Initialize accepting flag. */
        this.accepting = false
    },
}
</script>

<style scoped>
.backing {
    margin: 20px 40px;
}

.pledge-details, .pledge-auth {
    width: 300px;
    height: 100px;
    padding: 15px;
}

.parsedJson {
    padding: 5px;
    border-top: 3pt solid rgba(90, 90, 90, 0.5);
}
</style>

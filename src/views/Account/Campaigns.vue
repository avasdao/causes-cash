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
							<h3 class="account-title">My Campaigns</h3>

                            <div v-if="myCampaigns" class="campaigns">
								<div
                                    class="campaign-item"
                                    v-for="campaign of myCampaigns"
                                    :key="campaign.id"
                                >
									<a class="campaign-image" href="javascript://">
                                        <img :src="campaign.media ? campaign.media.main : null" alt=""></a>

									<div class="campaign-box">
										<div class="campaign-category">
                                            <a href="javascript://">{{campaign.category}}</a>
                                        </div>

                                        <div class="campaign-title">
                                            <router-link :to="campaign.slug + '-null'">
                                                {{campaign.title}}
                                            </router-link>
                                        </div>

                                        <div class="campaign-desc">
                                            {{campaign.summary}}
                                        </div>
									</div>
								</div>
							</div>

                            <div v-else class="campaigns">
                                You haven't created / joined any campaigns
                            </div>

						</div>

						<div class="account-content account-table">
							<h3 class="account-title">Supported Campaigns</h3>

                            <div v-if="supportedCampaigns" class="campaigns">
								<div
                                    class="campaign-item"
                                    v-for="campaign of supportedCampaigns"
                                    :key="campaign.id"
                                >
									<a class="campaign-image" href="javascript://">
                                        <img :src="campaign.media ? campaign.media.main : null" alt=""></a>

									<div class="campaign-box">
										<div class="campaign-category">
                                            <a href="javascript://">{{campaign.category}}</a>
                                        </div>

                                        <div class="campaign-title">
                                            <a href="javascript://">{{campaign.title}}</a>
                                        </div>

                                        <div class="campaign-desc">
                                            {{campaign.summary}}
                                        </div>
									</div>
								</div>
							</div>

                            <div v-else class="campaigns">
                                You haven't supported any campaigns
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
            campaigns: null,
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
            'getCampaign',
            'getCampaigns',
        ]),

        ...mapGetters('profile', [
            'getSignedMessage',
        ]),

        myCampaigns() {
            if (this.campaigns) {
                /* Set campaigns. */
                const campaigns = []

                this.campaigns.forEach(campaign => {
                    campaigns.push(campaign)
                })

                return campaigns
            } else {
                return null
            }
        },

        supportedCampaigns() {
            return null
        },

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),
    },
    created: async function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()

        /* Retrieve campaigns. */
        this.campaigns = await this.getCampaigns(this.ownerSlug)
        console.log('ACCOUNT CAMAPAIGNS', this.campaigns)
    },
}
</script>

<style scoped>
.campaigns {
    margin: 20px 40px;
}

.campaign-item img {
    width: 100px;
    height: 100px;
}
</style>

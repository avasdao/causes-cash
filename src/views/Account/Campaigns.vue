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
                                    v-for="(campaign, index) of myCampaigns"
                                    :key="campaign.id"
                                >
                                    <hr v-if="index !== 0" />

									<div class="campaign-box">
                                        <div class="ml-3 mb-5 float-right">
                                            <router-link :to="campaign.slug + '-null'" class="campaign-image">
                                                <img :src="campaign.media ? campaign.media.main : null" :alt="campaign.title">
                                            </router-link>

                                            <div class="text-center">
                                                <router-link :to="campaign.slug + '-null'">
                                                    open live
                                                </router-link>
                                                |
                                                <router-link :to="campaign.slug + '/manage'">
                                                    manage
                                                </router-link>
                                            </div>
                                        </div>

										<div class="campaign-category">
                                            {{formatCategory(campaign.category)}} | {{formatModel(campaign.model)}}
                                        </div>

                                        <div class="campaign-title">
                                            <router-link :to="campaign.slug + '-null'">
                                                {{campaign.title}}
                                            </router-link>
                                        </div>

                                        <div class="campaign-desc" v-html="formatSummary(campaign.summary)" />
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
                                <hr v-if="index !== 0" />

                                <div class="campaign-box">
                                    <router-link :to="campaign.slug + '-null'" class="campaign-image">
                                        <img :src="campaign.media ? campaign.media.main : null" :alt="campaign.title">
                                    </router-link>

                                    <div class="campaign-category">
                                        {{campaign.category}}
                                    </div>

                                    <div class="campaign-title">
                                        <router-link :to="campaign.slug + '-null'">
                                            {{campaign.title}}
                                        </router-link>
                                    </div>

                                    <div class="campaign-desc" v-html="formatSummary(campaign.summary)" />
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

        ...mapGetters('utils', [
            'getCategoryDisplay',
            'getMarkdown',
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

        formatSummary(_summary) {
            if (_summary) {
                return this.getMarkdown(_summary)
            } else {
                return null
            }
        },

        /**
         * Format Category
         */
        formatCategory(_category) {
            if (_category) {
                return this.getCategoryDisplay(_category)
            } else {
                return null
            }
        },

        /**
         * Format Model
         */
        formatModel(_model) {
            switch(_model) {
            case 'assurance':
                return 'Community Pledge'
            case 'direct':
                return 'Direct Cash'
            case 'payouts':
                return 'Daily Payouts'
            }
        }

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
    float: right;

    width: 140px;
    height: 100px;

    border: 1pt solid rgba(180, 180, 180, 0.5);
    padding: 1px;
    margin: 0 0 10px 10px;

    border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px;
}

.campaign-category {
    color: rgba(90, 90, 90, 0.5);
    cursor: default;
}

.campaign-title {
    font-size: 1.6em;
    font-weight: bold;
}

</style>

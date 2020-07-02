<template>
    <main class="faq">
        <Header />
        <Banner page="wallet" />

		<section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="wallet" />

					<div class="col-lg-9">

						<div class="account-content dashboard">
							<h3 class="account-title">Bitcoin Cash Wallet</h3>

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-2">
                                    <strong>Address</strong>
                                </div>

                                <div class="col-8">
                                    <a :href="'https://explorer.bitcoin.com/bch/address/' + getAddress" target="_blank">{{getAddress}}</a>
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
                                    <strong>Mnemonic</strong>
                                </div>

                                <div v-if="showMnemonic" class="col-8 mnemonic" @click="toggleMnemonic">
                                    <span class="text-danger">{{getMnemonic}}</span>
                                </div>

                                <div v-else class="col-8 mnemonic" @click="toggleMnemonic">
                                    [ <span class="text-danger">show</span> ]
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
                                    <strong>Balance</strong>
                                </div>

                                <div class="col-8">
                                    $0.00
                                </div>

                                <div class="col-1">
                                    <!-- offset fix -->
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
            showMnemonic: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
            'getMnemonic',
        ]),
    },
    methods: {
        ...mapActions([
            'displayError',
            'displayNotification',
        ]),

        // ...mapActions('campaigns', [
        //     'addCampaign',
        // ]),

        toggleMnemonic() {
            this.showMnemonic = !this.showMnemonic
        },
    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()

        /* Initialize mnemonic flag. */
        this.showMnemonic = false
    },
}
</script>

<style scoped>
.mnemonic {
    cursor: pointer;
}
</style>

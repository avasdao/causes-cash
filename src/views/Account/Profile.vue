<template>
    <main class="faq">
        <Header />
        <Banner page="profile" />

        <section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="profile" />

					<div class="col-lg-9">

						<div class="account-content profile">
							<h3 class="account-title">Profile</h3>

							<div class="author clearfix">
								<a class="author-avatar" href="javascript://">
                                    <img :src="getAvatar" alt="">
                                </a>

								<div class="author-content">
									<div class="author-title">
                                        <h3>
                                            {{getNickname}}
                                        </h3>
                                    </div>

									<div class="author-info">
										<p>
                                            {{getEmail}}
                                        </p>

										<p>
                                            <a :href="'https://explorer.bitcoin.com/bch/address/' + getRootAddress" target="_blank">
                                                <strong>{{getRootAddress}}</strong>
                                            </a>
                                            <i class="fa fa-copy ml-2 copy-address" @click="copyToClipboard"></i>
                                        </p>

										<p>
                                            Causes Cash member since August 2020
                                        </p>
									</div>
								</div>
							</div>

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-2">
                                    <strong>Nickname</strong>
                                </div>

                                <div class="col-8">
                                    {{getNickname}}
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
                                    <strong>About Me</strong>
                                </div>

                                <div class="col-8">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>

                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>
                            </div>

						</div>

                        <!-- <a href="javascript://" class="btn-primary mt-3">Save My Profile</a> -->

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
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('profile', [
            'getAvatar',
            'getEmail',
            'getNickname',
            'getRootAddress',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
        ]),
    },
    methods: {
        ...mapActions('utils', [
            'setClipboard',
            'toast',
        ]),

        /**
         * Copy To Clipboard
         */
        copyToClipboard() {
            /* Set clipboard. */
            this.setClipboard(this.getRootAddress)

            /* Set message. */
            const message = `Profile address was copied to clipboard`

            /* Display notification. */
            this.toast(['Done!', message, 'info'])
        },
    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
    },
}
</script>

<style scoped>
.author {
    margin: 20px 40px;
}
.author-info a {
    display: inline-block;
}
.author-title h3 {
    font-size: 2.2em;
}

.copy-address {
    cursor: pointer;
}
</style>

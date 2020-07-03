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

                            <div class="qr-code float-right d-none d-md-block m-3" v-html="qr" />

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-2">
                                    <strong>Address</strong>
                                </div>

                                <div class="col-8">
                                    <a :href="'https://explorer.bitcoin.com/bch/address/' + getAddress('deposit')" target="_blank">{{getAddress('deposit')}}</a>
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
                                    {{balanceDisplay}}
                                </div>

                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>
                            </div>

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-10">
                                    <div class="qr-code text-center d-md-none" v-html="qr" />
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

/* Import modules. */
import Nito from 'nitojs'
import QRCode from 'qrcode'

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

            blockchain: null,
            balance: null,
            showMnemonic: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
            'getBalance',
            'getMnemonic',
        ]),

        balanceDisplay() {
            if (!this.balance) {
                return 'loading...'
            }

            const balance = `${this.balance.rounded} ${this.balance.unit} | ${this.balance.fiat}`

            return balance
        },

        qr() {
            if (!this.getAddress('deposit')) {
                return null
            }

            /* Initialize (string) value. */
            let strValue = ''

            /* Initialize scanner parameters. */
            const params = {
                type: 'svg',
                width: 225,
                height: 225,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }

            QRCode.toString(this.getAddress('deposit'), params, (err, value) => {
                if (err) {
                    return console.error('QR Code ERROR:', err)
                }

                /* Set (string) value. */
                strValue = value
            })

            /* Return (string) value. */
            return strValue
        },

    },
    methods: {
        ...mapActions([
            'displayError',
            'displayNotification',
        ]),

        ...mapActions('wallet', [
            // 'updateCoins',
        ]),

        toggleMnemonic() {
            this.showMnemonic = !this.showMnemonic
        },

        /**
         * Initialize Blockchain
         */
        initBlockchain() {
            /* Initialize Nito blockchain. */
            this.blockchain = new Nito.Blockchain()
            console.log('NITO BLOCKCHAIN', this.blockchain)

            if (this.depositAddress) {
                /* Subscribe to address updates. */
                const watching = this.blockchain
                    .subscribe('address', this.depositAddress)
                console.log('DEPOSIT (watching):', watching)
            }

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.log('DEPOSIT RECEIVED BLOCKCHAIN UPDATE (msg):', _msg)

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()
            })
        },

        /**
         * Update Balance
         */
        async updateBalance() {
            /* Retreive session balance. */
            this.balance = await this
                .getBalance('USD')
                .catch(err => console.error(err))
            console.log('DEPOSIT (balance):', this.balance)
        },

        /**
         * Set Clipboard
         */
        setClipboard() {
            try {
                const textArea = document.createElement('textarea')
                textArea.value = this.depositAddress
                document.body.appendChild(textArea)

                if (navigator.userAgent.match(/ipad|iphone/i)) {
                    const range = document.createRange()
                    range.selectNodeContents(textArea)

                    const selection = window.getSelection()
                    selection.removeAllRanges()
                    selection.addRange(range)

                    textArea.setSelectionRange(0, 999999)
                } else {
                    textArea.select()
                }

                document.execCommand('copy')
                document.body.removeChild(textArea)

                /* Set message. */
                const message = `Your deposit address has been copied to your clipboard.`

                /* Display notification. */
                this.$notify({
                    message,
                    icon: 'ti-info-alt', // ti-info-alt | ti-alert
                    verticalAlign: 'top',
                    horizontalAlign: 'right',
                    type: 'info', // info | danger
                    // timeout: 0, // 0: persistent | 5000: default
                })

                return true
            } catch (err) {
                console.error(err) // eslint-disable-line no-console

                /* Bugsnag alert. */
                throw new Error(err)
            }
        },

    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()

        /* Initialize mnemonic flag. */
        this.showMnemonic = false

        /* Initialize blockchain. */
        this.initBlockchain()

        /* Update balance. */
        this.updateBalance()
    },
    beforeDestroy() {
        /* Validate blockchain. */
        if (this.blockchain) {
            /* Stop blockchain. */
            this.blockchain.stop()
        }
    },
}
</script>

<style scoped>
.mnemonic {
    cursor: pointer;
}

.qr-code {
    /* margin: 0 0 10px 10px; */
    /* margin: 20px auto; */
    padding: 0;
    /* border: 1pt solid rgba(200, 200, 200, 0.2); */
    /* float: right; */
}

</style>

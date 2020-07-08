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

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-10">
                                    <div class="account-content account-table">
                                        <h3>My Available Coins</h3>

                                        <div v-if="coinsTable" class="utxos">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Label</th>
                                                        <th>Value</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="coin of coinsTable" :key="coin.id">
                                                        <td>{{coin.status}}</td>
                                                        <td>{{coin.label}}</td>
                                                        <td>{{coin.satoshis}}</td>
                                                        <td class="actions">
                                                            <a href="javascript://">View</a> |
                                                            <a href="javascript://" @click="send(coin.details)">Send</a> |
                                                            <a href="javascript://">Shuffle</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <button class="btn btn-warning" @click="updateCoins">Update Coins</button>
                                    <input
                                        type="text"
                                        placeholder="Enter your destination address"
                                        v-model="output.address"
                                    >
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

            output: {
                address: null,
                satoshis: null,
                notes: null,
            },
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
            'getWallet',
        ]),

        balanceDisplay() {
            if (!this.balance) {
                return 'loading...'
            }

            /* Set balance. */
            const balance = `
                ${this.balance.value} ${this.balance.unit} |
                ${this.balance.fiat}
            `

            /* Return balance. */
            return balance
        },

        /**
         * Coins Table
         */
        coinsTable() {
            /* Set table data. */
            const tableData = []

            /* Validate wallet. */
            if (this.getWallet) {
                /* Initialize coins. */
                const coins = this.getWallet.coins
                console.log('COINS TABLE (coins):', coins)

                Object.keys(coins).forEach(async coinId => {
                    /* Initialize coin. */
                    const coin = coins[coinId]
                    // console.log('COINS (coin):', coin)

                    /* Set id. */
                    const id = `${coin.txid}:${coin.vout}`

                    /* Set label. */
                    const label = `${coin.txid.slice(0, 8)} ... ${coin.txid.slice(-8)} : ${coin.vout}`

                    /* Set status. */
                    // TODO: Will probably develop a rating scale??
                    const status = coin.status === 'active' ? '✓' : 'ⅹ'

                    /* Set satoshis. */
                    const satoshis = coin.satoshis

                    /* Build coin data. */
                    const coinData = {
                        id,
                        label,
                        status,
                        satoshis,
                        details: coin, // FIXME: Write this to outbox for multi-coin sending.
                    }

                    // TODO: Allow display of spent coins.
                    if (status === '✓') {
                        tableData.push(coinData)
                    }

                })

            }

            console.log('TABLE DATA:', tableData)
            return tableData
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
        ...mapActions('wallet', [
            'updateCoins',
        ]),

        /**
         * Initialize Blockchain
         */
        initBlockchain() {
            /* Initialize Nito blockchain. */
            this.blockchain = new Nito.Blockchain()
            console.log('NITO BLOCKCHAIN', this.blockchain)

            if (this.getAddress('deposit')) {
                /* Subscribe to address updates. */
                const watching = this.blockchain
                    .subscribe('address', this.getAddress('deposit'))
                console.log('DEPOSIT (watching):', watching)
            }

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.log('DEPOSIT RECEIVED BLOCKCHAIN UPDATE (msg):', _msg)

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()

                /* Update balance. */
                this.updateBalance()
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

        async send(_coin) {
            console.log('SENDING COIN', _coin)
            if (!this.output.address) {
                return console.error('NO output address!')
            }

            /* Build receivers. */
            const receivers = [
                {
                    address: this.output.address,
                    satoshis: _coin.satoshis,
                }
            ]

            /* Set auto fee (flag). */
            const autoFee = true

            const results = await Nito.Transaction
                .sendCoin(_coin, receivers, autoFee)
                .catch(err => console.error(err))
            console.log('OUTBOX SEND COIN (results):', results)

            if (results) {
                /* Update outbox. */
                // this.updateOutbox(null)

                /* Clear output address. */
                this.output.address = null

                /* Set message. */
                const message = `Your coins have been sent successfully!`
                console.log('MESSAGE', message)

                /* Display notification. */
                // this.$notify({
                //     message,
                //     icon: 'ti-info-alt', // ti-info-alt | ti-alert
                //     verticalAlign: 'top',
                //     horizontalAlign: 'right',
                //     type: 'info', // info | danger
                //     // timeout: 0, // 0: persistent | 5000: default
                // })

                /* Wait a bit then update coins. */
                // FIXME: How long should we wait?
                //        Probably better to update coins w/out on-chain query?
                setTimeout(() => {
                    /* Update coins. */
                    // FIXME: Why is this blocking the entire initial UI setup??
                    this.updateCoins()
                }, 2000)

            } else {
                /* Set message. */
                const message = `Oops! Something went wrong and your coin(s) were NOT sent.`
                console.error('MESSAGE', message)

                /* Display notification. */
                // this.$notify({
                //     message,
                //     icon: 'ti-alert', // ti-info-alt | ti-alert
                //     verticalAlign: 'top',
                //     horizontalAlign: 'right',
                //     type: 'danger', // info | danger
                //     // timeout: 0, // 0: persistent | 5000: default
                // })
            }

        },

        /**
         * Toggle Mnemonic
         */
        toggleMnemonic() {
            this.showMnemonic = !this.showMnemonic
        },

        /**
         * Set Clipboard
         */
        setClipboard() {
            try {
                const textArea = document.createElement('textarea')
                textArea.value = this.getAddress('deposit')
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
        console.log('WALLET', this.getWallet)

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

.actions a {
    display: inline-block;
}
</style>

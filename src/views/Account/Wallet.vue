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
							<h3 class="account-title">Cash Wallet</h3>

                            <div class="qr-code float-right d-none d-md-block m-3" v-html="qr" @click="copyAddress" />

                            <div class="row my-3">
                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>

                                <div class="col-2">
                                    <strong>Address</strong>
                                </div>

                                <div class="col-8">
                                    <a :href="'https://explorer.bitcoin.com/bch/address/' + getAddress('deposit')" target="_blank">{{addressDisplay('deposit')}}</a>
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
                                    <div class="qr-code text-center d-md-none" v-html="qr" @click="copyAddress" />
                                </div>

                                <div class="col-1">
                                    <!-- offset fix -->
                                </div>
                            </div>
						</div>

                        <div class="account-content dashboard">
							<h3 class="account-title">My Available Coins</h3>

                            <div v-if="coinsTable" class="account-content account-table my-available-coins p-3">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Label</th>
                                            <th class="text-center">Value (sats)</th>
                                            <th class="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="coin of coinsTable" :key="coin.id">
                                            <td v-html="coin.status"></td>
                                            <td v-html="coinLabelDisplay(coin)"></td>
                                            <td class="text-center">{{coinValueDisplay(coin)}}</td>
                                            <td class="actions text-right">
                                                <a href="javascript://">
                                                    View
                                                </a>

                                                <span v-if="coin.flags.spendable">
                                                    |
                                                    <a href="javascript://" @click="send(coin.details)">
                                                        Send
                                                    </a>

                                                    <span v-if="coin.flags.shuffled">
                                                        |
                                                        <a href="javascript://">
                                                            Re-shuffle
                                                        </a>
                                                    </span>
                                                    <span v-else>
                                                        |
                                                        <a href="javascript://">
                                                            Shuffle
                                                        </a>
                                                    </span>
                                                </span>

                                                <span v-if="coin.flags.locked">
                                                    |
                                                    <a href="javascript://" @click="unlock(coin.id)">
                                                        Unlock
                                                    </a>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="row p-2">
                                <div class="col">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="Enter your destination address"
                                        v-model="output.address"
                                    >
                                </div>

                                <div class="col">
                                    <button
                                        class="btn btn-warning btn-block"
                                        @click="updateCoins"
                                    >
                                        Update Coins
                                    </button>
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
import numeral from 'numeral'
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
    watch: {
        getCoins: function (_coins) {
            console.log('COINS HAS CHANGED', _coins)

            if (_coins) {
                /* Update balance. */
                this.updateBalance()
            }
        },

    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('profile', [
            'getMeta',
        ]),

        ...mapGetters('utils', [
            'getFormattedValue',
        ]),

        ...mapGetters('wallet', [
            'getAddress',
            'getBalance',
            'getCoins',
            'getMnemonic',
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

            /* Validate coins. */
            if (this.getCoins) {
                /* Initialize coins. */
                const coins = this.getCoins
                console.log('COINS TABLE (coins):', coins)

                Object.keys(coins).forEach(async coinId => {
                    /* Initialize coin. */
                    const coin = coins[coinId]
                    // console.log('COINS (coin):', coin)

                    /* Set id. */
                    const id = `${coin.txid}:${coin.vout}`

                    /* Set label. */
                    const label = `${coin.txid.slice(0, 8)} ... ${coin.txid.slice(-8)} : ${coin.vout}`

                    /* Initialize flags. */
                    const flags = {}

                    /* Set status. */
                    // TODO: Will probably develop a rating scale??
                    let status = null

                    switch(coin.status) {
                    case 'active':
                        status = '<icon class="fa fa-check"></icon>'
                        flags.spendable = true
                        break
                    case 'locked':
                        status = '<icon class="fa fa-lock text-danger"></icon>'
                        flags.locked = true
                        break
                    default:
                        status = ''
                    }

                    /* Set satoshis. */
                    const satoshis = coin.satoshis

                    /* Build coin data. */
                    const coinData = {
                        id,
                        label,
                        flags,
                        status,
                        satoshis,
                        details: coin, // FIXME: Write this to outbox for multi-coin sending.
                    }

                    // TODO: Allow display of spent coins.
                    if (status !== '') {
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
        ...mapActions('utils', [
            'setClipboard',
            'toast',
        ]),

        ...mapActions('wallet', [
            'updateCoin',
            'updateCoins',
            'updateMeta',
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
         * Coin Label Display
         */
        coinLabelDisplay(_coin) {
            if (_coin.flags.locked) {
                return `${_coin.label} <small class="text-danger">LOCKED</small>`
            } else {
                return _coin.label
            }
        },

        addressDisplay(_type) {
            console.log('this.getAddress(_type)', _type, this.getAddress(_type))
            if (this.getAddress(_type).indexOf('bitcoincash:') !== -1) {
                return this.getAddress(_type).slice(12)
            } else {
                return this.getAddress(_type)
            }
        },

        /**
         * Coin Value Display
         */
        coinValueDisplay(_coin) {
            return numeral(_coin.satoshis).format('0,0')
        },

        /**
         * Update Balance
         */
        async updateBalance() {
            // /* Retreive wallet balance. */
            // this.balance = await this
            //     .getBalance('USD')
            //     .catch(err => console.error(err))
            // console.log('DEPOSIT (balance):', this.balance)

            /* Initialize wallet balance. */
            let balance = 0

            /* Validate coins. */
            if (this.getCoins) {
                /* Initialize coins. */
                const coins = this.getCoins

                Object.keys(coins).forEach(async coinId => {
                    /* Initialize coin. */
                    const coin = coins[coinId]
                    // console.log('COINS (coin):', coin)

                    if (coin.status === 'active' || coin.status === 'locked') {
                        /* Add satoshis. */
                        balance += coin.satoshis
                    }
                })
            }

            /* Retrieve market price. */
            const marketPrice = await Nito.Markets.getTicker('BCH', 'USD')
            console.info(`Market price (USD)`, marketPrice) // eslint-disable-line no-console

            const formattedBalance =
                this.getFormattedValue(balance, marketPrice, 'USD')
            console.log('NEW BALANCE IS', formattedBalance)

            /* Set wallet balance. */
            this.balance = formattedBalance
        },

        async send(_coin) {
            console.log('SENDING COIN', _coin)
            if (!this.output.address) {
                return this.toast(['Oops!', 'Invalid destination address, please try again', 'error'])
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

                /* Display notification. */
                this.toast(['Done!', message, 'success'])

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
                const message = `Something went wrong and your coin(s) were NOT sent`

                /* Display notification. */
                this.toast(['Oops!', message, 'error'])
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
        copyAddress() {
            /* Set clipboard. */
            this.setClipboard(this.getAddress('deposit'))

            /* Set message. */
            const message = `Deposit address copied to your clipboard.`

            /* Display notification. */
            this.toast(['Done!', message, 'info'])
        },

        /**
         * Unlock
         */
        async unlock(_coinid) {
            /* Request metadata. */
            const meta = await this.getMeta
            console.log('WALLET (meta):', meta)

            /* Initialize coins. */
            const coins = this.getCoins

            const coin = coins[_coinid]

            /* Update flag. */
            coin.status = 'active'

            /* Update coin. */
            this.updateCoin(coin)
            // console.log('COIN', coin);

            /* Remove coin info from metadata. */
            delete meta.coins[_coinid]

            /* Update metadata. */
            this.updateMeta(meta)
            // console.log('META', meta)
        },

    },
    created: function () {
        console.log('COINS', this.getCoins)

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
            /* Unsubscribe from blockchain. */
            this.blockchain.unsubscribe()
        }
    },
}
</script>

<style>
.my-available-coins small {
    font-size: 0.7em;
    font-weight: 500;
}
</style>

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

/* .my-available-coins {
    padding: 15px;
} */
</style>

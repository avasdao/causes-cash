<template>
    <v-card class="mx-auto" max-width="480" flat>
        <v-container v-if="!showPledge">
            <div class="account-content dashboard pt-0">
                <!-- <h3 class="account-title">Cash Wallet</h3> -->

                <div class="qr-code float-right d-none d-md-block m-3" v-html="qr" @click="copyAddress" />

                <v-container>
                    <h3>Bitcoin (BCH) Deposit Address</h3>

                    <h3>
                        <a :href="'https://explorer.bitcoin.com/bch/address/' + getAddress('deposit')" target="_blank" style="text-decoration:none;">
                            {{addressDisplay('deposit')}}
                        </a>
                    </h3>
                </v-container>

                <div class="qr-code text-center d-md-none my-3" v-html="qr" @click="copyAddress" />

                <h3>Current Balance</h3>

                <div>
                    {{displayBalance}}
                </div>

            </div>

            <v-text-field
                v-if="coinsTable.length"
                class="mt-5"
                label="Destination address"
                placeholder="Enter a destination address"
                filled
                v-model="output.address"
            ></v-text-field>

            <div v-if="coinsTable.length">
                <h3 class="account-title">Active Coins</h3>

                <div v-if="coinsTable">
                    <div class="row">
                        <div class="col-8 text-center"><strong>Coin ID</strong></div>
                        <div class="col-4 text-center"><strong>Value (sats)</strong></div>
                    </div>

                    <v-sheet
                        v-for="coin of coinsTable" :key="coin.id"
                        color="grey lighten-4"
                        elevation="3"
                        rounded
                    >
                        <v-row>
                            <v-col cols="8" class="text-center">
                                <v-icon small color="success" v-if="coin.status === 'active'">mdi-check-bold</v-icon>
                                <v-icon small color="red" v-if="coin.status === 'locked'">mdi-lock</v-icon>
                                {{coin.label}}
                            </v-col>
                            <v-col cols="4" class="text-center">
                                {{coinValueDisplay(coin)}}
                                <small>{{coinUsdValueDisplay(coin)}}</small>
                            </v-col>
                        </v-row>

                        <v-container class="mt-n5">
                            <v-row no-gutters>
                                <v-col cols="4" class="px-1">
                                    <v-btn
                                        block
                                        small
                                        color="primary"
                                        @click="openExplorer(coin.details)"
                                    >
                                        Details
                                    </v-btn>
                                </v-col>

                                <v-col v-if="coin.flags.spendable" cols="4" class="px-1">
                                    <v-btn
                                        block
                                        small
                                        color="primary"
                                        @click="send(coin.details)"
                                    >
                                        Send
                                    </v-btn>
                                </v-col>

                                <v-col v-if="coin.flags.spendable" cols="4" class="px-1">
                                    <v-btn
                                        dark
                                        block
                                        small
                                        color="pink"
                                        @click="pledge(coin.details)"
                                    >
                                        Pledge
                                    </v-btn>
                                </v-col>

                            </v-row>
                        </v-container>

                        <div v-if="coin.flags.locked" class="row">
                            <div class="col-6">
                                <v-btn v-if="isBitcoinWalletApi" class="mx-1" rounded small outlined color="red" @click="reclaim(coin)">
                                    Cancel
                                </v-btn>
                            </div>

                            <div class="col-6">
                                <v-btn v-if="!isBitcoinWalletApi" class="mx-1" rounded small outlined color="orange" @click="unlock(coin.id)">
                                    Unlock
                                </v-btn>
                            </div>

                        </div>
                    </v-sheet>
                </div>

            </div>

            <div class="row mt-5 p-2">
                <div class="col-8">
                    <v-btn
                        block
                        color="warning"
                        @click="updateCoins"
                    >
                        Re-sync Wallet Coins
                    </v-btn>
                </div>

                <div class="col-4">
                    <!-- <v-btn
                        block
                        @click="updateCoins"
                    >
                        Update Coins
                    </v-btn> -->
                </div>
            </div>

            <div class="row my-3">
                <div class="col-offset-1 col-10">
                    <h3>(Mnemonic) Seed Phrase</h3>
                </div>

                <div v-if="showMnemonic" class="col-10 col-md-8 mnemonic" @click="toggleMnemonic">
                    <span class="text-danger">{{getMnemonic}}</span>
                </div>

                <div v-else class="col-10 col-md-8 mnemonic" @click="toggleMnemonic">
                    <v-btn color="error">show</v-btn>
                </div>

                <div class="col-1">
                    <!-- offset fix -->
                </div>
            </div>

        </v-container>

        <v-container v-if="showPledge">
            <h2>Coin Pledge</h2>

            <p>
                Select the campaign below to pledge this coin value.
            </p>

            <v-btn
                block
                large
                color="red"
                @click="showPledge = null"
            >
                Cancel
            </v-btn>

            <pre>
                {{showPledge}}
            </pre>

        </v-container>

    </v-card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import bitcoincomLink from 'bitcoincom-link'
import { Blockchain } from '@nexajs/blockchain'
import { sendCoin } from '@nexajs/purse'
import numeral from 'numeral'
import QRCode from 'qrcode'

/* Import components. */
// import Footer from '@/components/Footer.vue'
// import Header from '@/components/Header.vue'

/* Import (account) components. */
// import Banner from '@/components/Account/Banner.vue'
// import Sidenav from '@/components/Account/Sidenav.vue'

export default {
    components: {
        // Footer,
        // Header,

        // Banner,
        // Sidenav,
    },
    data: () => {
        return {
            usd: null,
            ownerSlug: null,

            blockchain: null,
            balance: null,

            output: {
                address: null,
                satoshis: null,
                notes: null,
            },

            isBitcoinWalletApi: null,

            showMnemonic: null,
            showPledge: null,
        }
    },
    watch: {
        getCoins: function (_coins) {
            // console.log('COINS HAS CHANGED', _coins)

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

        displayBalance() {
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
                // console.log('COINS TABLE (coins):', coins)

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
                        // status = '<icon class="fa fa-check"></icon>'
                        status = coin.status
                        flags.spendable = true
                        break
                    case 'locked':
                        // status = '<icon class="fa fa-lock text-danger"></icon>'
                        status = coin.status
                        flags.locked = true
                        break
                    default:
                        // status = ''
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

            // console.log('TABLE DATA:', tableData)
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
                width: 300,
                height: 300,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }

            QRCode.toString(this.getAddress('deposit'), params, (err, value) => {
                if (err) {
                    return console.error('QR Code ERROR:', err) // eslint-disable-line no-console
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
            'report',
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
            /* Initialize Blockchain. */
            this.blockchain = new Blockchain()
            // console.log('NITO BLOCKCHAIN', this.blockchain)

            if (this.getAddress('deposit')) {
                /* Subscribe to address updates. */
                this.blockchain
                    .subscribe('address', this.getAddress('deposit'))
            }

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.info('Blockchain update (msg):', _msg) // eslint-disable-line no-console

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()

                /* Update balance. */
                this.updateBalance()
            })
        },

        initLinkApi() {
            bitcoincomLink.getAddress({
                protocol: 'BCH',
            })
            .then(data => {
                const {
                    address,
                    // label,
                } = data

                // console.log('User address: ' + address);
                // console.log('User address label (Optional): ' + label);

                this.output.address = address
            })
            .catch((type, description, data) => {
                // console.log('ERROR (type):', type)
                // console.log('ERROR (description):', description)
                // console.log('ERROR (data):', data)

                /* Build package. */
                const pkg = { type, description, data }

                /* Report error description. */
                this.report(new Error(JSON.stringify(pkg)))

                /* Handle type. */
                switch(type) {
                case 'NO_PROVIDER':
                    console.info('No provider available.') // eslint-disable-line no-console
                    break
                case 'PROTOCOL_ERROR':
                    console.info('The provided protocol is not supported by this wallet.') // eslint-disable-line no-console
                    break
                case 'SEND_ERROR':
                    console.info('There was an error when broadcasting this transaction to the network.') // eslint-disable-line no-console
                    break
                case 'MALFORMED_INPUT':
                    console.info('The input provided is not valid.') // eslint-disable-line no-console
                    break
                case 'CANCELED':
                    console.info('The user has canceled this transaction request.') // eslint-disable-line no-console
                    break
                }
            })
        },

        openExplorer(_details) {
            window.open(`https://explorer.bitcoin.com/bch/tx/${_details.txid}`)
        },

        addressDisplay(_type) {
            // console.log('this.getAddress(_type)', _type, this.getAddress(_type))

            /* Initialize address. */
            let address = null

            if (this.getAddress(_type).indexOf('bitcoincash:') !== -1) {
                address = this.getAddress(_type).slice(12)
            } else {
                address = this.getAddress(_type)
            }

            /* Shorten address. */
            address = address.slice(0, 12) + ' ... ' + address.slice(-12)

            /* Return address. */
            return address
        },

        /**
         * Coin Value Display
         */
        coinValueDisplay(_coin) {
            return numeral(_coin.satoshis).format('0,0')
        },

        /**
         * Coin (USD) Value Display
         */
        coinUsdValueDisplay(_coin) {
            if (this.usd) {
                // console.log('CALC', (_coin.satoshis / 100000000.0) * this.usd)
                return numeral((_coin.satoshis / 100000000.0) * this.usd).format('$0,0.00')
            } else {
                return '$0.00'
            }
        },

        /**
         * Update Balance
         */
        async updateBalance() {
            /* Retreive wallet balance. */
            // this.balance = await this
            //     .getBalance('USD')
            //     .catch(err => {
            //         console.error(err) // eslint-disable-line no-console
            //
            //         /* Report error. */
            //         this.report(err)
            //     })
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
            // const marketPrice = await Markets.getTicker('BCH', 'USD')
            console.info(`Market price (USD)`, marketPrice) // eslint-disable-line no-console

            const formattedBalance =
                this.getFormattedValue(balance, marketPrice, 'USD')
            // console.log('NEW BALANCE IS', formattedBalance)

            /* Set wallet balance. */
            this.balance = formattedBalance
        },

        async send(_coin) {
            // console.log('SENDING COIN', _coin)
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

            const results = await sendCoin(_coin, receivers, autoFee)
                .catch(err => {
                    console.error(err) // eslint-disable-line no-console

                    /* Report error. */
                    this.report(err)
                })
            // console.log('OUTBOX SEND COIN (results):', results)

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
         * Pledge
         */
        pledge(_details) {
            console.log('PLEDGE (details):', _details) // eslint-disable-line no-console

            /* Set message. */
            const message = `This feature is not yet available.`

            /* Display notification. */
            this.toast(['Oops!', message, 'error'])

            // this.showPledge = _details
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
            // console.log('WALLET (meta):', meta)

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

        /**
         * Reclaim
         *
         * Allows the user to reclaim funds from their Causes wallet
         * back into their Bitcoin.com / Badger wallet.
         */
        async reclaim(_coin) {
            await this.unlock(_coin.id)
            await this.send(_coin.details)
        },

    },
    created: async function () {
        // console.log('COINS', this.getCoins)

        /* Set owner slug. */
        // this.ownerSlug = this.$route.params.pathMatch.toLowerCase()

        /* Initialize mnemonic flag. */
        this.showMnemonic = false

        /* Initialize pledge flag. */
        this.showPledge = false

        /* Request BCH/USD market price. */
        // this.usd = await Markets.getTicker('BCH', 'USD')
        // console.log('USD', this.usd)

        const providerStatuses = bitcoincomLink.getWalletProviderStatus()
        if (
            providerStatuses && (
            providerStatuses.badger === 'LOGGED_IN'
            || providerStatuses.android === 'AVAILABLE'
            || providerStatuses.ios === 'AVAILABLE'
        )) {
            this.initLinkApi()
        }

        /* Initialize blockchain. */
        this.initBlockchain()

        /* Update balance. */
        this.updateBalance()

    },
    beforeDestroy() {
        // console.log('WALLET IS BEING DESTROYED!!!');
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

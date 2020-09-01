<template>
    <main>
        <hr />

        <div class="row">
            <div class="col-12 col-md-7">
                <form action="javascript://">
                    <div class="text-center mb-3">
                        <a :href="'https://explorer.bitcoin.com/bch/address/' + pledgeAddress" target="_blank"><strong>{{pledgeAddress}}</strong></a>
                        <h4>Your <i class="fa fa-heart text-danger"></i> and support causes cash for this campaign <i class="fa fa-arrow-down text-danger"></i></h4>
                    </div>

                    <div class="code-area float-right">
                        <div class="qr-code" v-html="qr" />

                        <div class="text-center ml-2">
                            <i class="fa fa-arrow-up text-danger"></i>
                            instant pledge address
                            <i class="fa fa-arrow-up text-danger"></i>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-6">
                            <div class="form-group">
                                <label for="form-pledge-amount">
                                    Pledge Amount in USD
                                </label>

                                <input
                                    type="range"
                                    class="form-control-range"
                                    id="form-pledge-amount"
                                    v-model="pledgeRange"
                                    @change="onRangeChange($event)"
                                >
                            </div>
                        </div>

                        <div class="col-6">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="pledge amount (usd)"
                                v-model="pledgeUSD"
                                @blur="onPledgeUpdate"
                                @keyup.enter="$refs.pledgeName.focus()"
                             />
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="input-name" class="col-md-4 col-form-label text-right">
                            Name
                        </label>

                        <div class="col-md-8">
                            <input
                                ref="pledgeName"
                                class="form-control"
                                type="text"
                                id="input-name"
                                placeholder="(optional)"
                                v-model="pledgeName"
                                @keyup.enter="$refs.pledgeComment.focus()"
                             />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="input-comment" class="col-md-4 col-form-label text-right">
                            Comment
                        </label>

                        <div class="col-md-8">
                            <input
                                ref="pledgeComment"
                                class="form-control"
                                type="text"
                                id="input-comment"
                                placeholder="(optional)"
                                v-model="pledgeComment"
                             />
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col">
                            <button class="btn btn-primary btn-block" @click="copyDetails">Copy Details</button>
                        </div>

                        <div class="col">
                            <button class="btn btn-primary btn-block" @click="walletPledge">
                                Use Wallet
                            </button>
                        </div>
                    </div>

                    <div class="form-group row pledge-group">
                        <label for="pledge-details">
                            Pledge details <small class="text-danger">(base64 encoded)</small>
                        </label>

                        <textarea
                            id="pledge-details"
                            :value="pledgeDetails"
                            class="pledge-output"
                            @click="copyDetails"
                        />
                    </div>

                    <div class="form-group row pledge-group">
                        <label for="pledge-auth">
                            Pledge authorization <small class="text-danger">(base64 encoded)</small>
                        </label>

                        <textarea
                            ref="pledgeAuth"
                            id="pledge-auth"
                            type="text"
                            class="form-control pledge-auth"
                            placeholder="Waiting... Paste your encoded authorization message here."
                            v-model="pledgeAuth"
                            @change="handleAuth"
                            @keyup="handleAuth"
                            @paste="handleAuth"
                         />
                    </div>
                </form>
            </div>

            <div class="col-12 col-md-5">
                <a href="javascript://" class="btn-danger float-right" @click="$emit('cancel')">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    Close Community Pledge
                </a>

                <h3>Community Pledge</h3>

                <p class="mt-3">
                    Make a pledge that will ONLY be fullfilled if the rest of the community also contributes to the full amount requrested by this campaign.
                </p>

                <p class="mt-3">
                    Install the plugin for the Electron-Cash desktop wallet and use the flipstarter tab to prepare your pledge.
                </p>
            </div>
        </div>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'
import numeral from 'numeral'
import QRCode from 'qrcode'
import Swal from 'sweetalert2'

/* Set dust amount (satoshis). */
const DUST = 546

/* Set fee amount (satoshis). */
const FEE = 270

export default {
    props: {
        campaign: Object,
    },
    components: {
        //
    },
    data: () => {
        return {
            blockchain: null,
            usd: null,
            satoshis: null,

            pledgeUSD: null,
            pledgeSatoshis: null,
            pledgeName: null,
            pledgeComment: null,
            pledgeRange: null,
            pledgeGoal: null,
            pledgeAuth: null,
        }
    },
    watch: {
        getCoins: async function (_coins) {
            console.log('COINS HAS CHANGED', _coins)

            if (_coins && this.userPledge) {
                /* Update balance. */
                // await this.updateBalance()

                /* Apply balance. */
                this.applyBalance()
            }
        },

    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('campaigns', [
            'getFullfillment',
        ]),

        ...mapGetters('wallet', [
            'getAccounts',
            'getAddress',
            'getCoins',
        ]),

        pledgeAddress() {
            if (this.getAddress('causes')) {
                return this.getAddress('causes')
            } else {
                return null
            }
        },

        /**
         * User Pledge
         */
        userPledge() {
            if (!this.pledgeDetails) {
                return null
            }

            /* Decode details to base64. */
            const b64 = Buffer.from(this.pledgeDetails, 'base64')

            let json = null

            try {
                /* Parse json. */
                json = JSON.parse(b64.toString())
            } catch (err) {
                console.error('JSON ERROR:', err)
            }

            /* Validate json. */
            if (!json) {
                try {
                    /* Initialize counter. */
                    let count = 0

                    /* Initialize buffer. */
                    const buf = Buffer.alloc(b64.length / 2)

                    /* Convert from 16-bit to 8-bit. */
                    // NOTE: The Flipstarter plugin encodes with 16-bit JavaScript.
                    for (let i = 0; i < b64.length; i += 2) {
                        buf[count++] = b64[i]
                    }

                    /* Parse json. */
                    json = JSON.parse(buf.toString())
                } catch (err) {
                    console.error('JSON (CONVERTED) ERROR:', err)
                }
            }

            /* Return json. */
            return json
        },

        /**
         * Pledged Value
         *
         * States the current value of all funds pledged to this campaign.
         */
        pledgedValue() {
            const assuranceid = 0

            if (!this.campaign.assurances[assuranceid].pledges) {
                return 0
            }

            /* Set pledges. */
            const pledges = this.campaign.assurances[assuranceid].pledges
            console.log('PLEDGES', pledges)

            /* Calculate pledged (satoshis). */
            const pledged = Object.keys(pledges)
                .reduce((accumulator, pledgeid) => {
                    if (pledges[pledgeid].isSpent === true) {
                        return accumulator
                    } else {
                        return accumulator + pledges[pledgeid].satoshis
                    }
                }, 0)
            console.log('PLEDGED', pledged)

            return pledged
        },

        pledgeDetails() {
            /* Validate assurance. */
            if (!this.campaign.assurances) {
                return null
            }

            const assuranceid = 0

            /* Build (pledge) package. */
            const pkg = {
                outputs: [
                    {
                        value: this.campaign.assurances[assuranceid].recipient.satoshis,
                        address: this.campaign.assurances[assuranceid].recipient.address
                    }
                ],
                data: {
                    alias: this.pledgeName || '',
                    comment: this.pledgeComment || ''
                },
                donation: {
                    amount: this.pledgeSatoshis
                },
                expires: this.campaign.assurances[assuranceid].expiresAt
            }

            /* Format to base-64. */
            const formatted = Buffer.from(JSON.stringify(pkg, null, 2)).toString('base64')

            /* Return formatted. */
            return formatted
        },

        qr() {
            if (!this.getAddress('causes')) {
                return null
            }

            /* Initialize (string) value. */
            let strValue = ''

            /* Initialize scanner parameters. */
            const params = {
                type: 'svg',
                width: 250,
                height: 250,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }

            /* Calculate pledge amount (in BCH). */
            const amount = parseFloat(this.pledgeSatoshis / 100000000.0)

            /* Set payment URL. */
            const paymentUrl = `${this.pledgeAddress}?amount=${amount}`

            QRCode.toString(paymentUrl, params, (err, value) => {
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
        ...mapActions('campaigns', [
            'addAssurance',
            'buildPledgeAuth',
        ]),

        ...mapActions('profile', [
            'updateMeta',
        ]),

        ...mapActions('utils', [
            'setClipboard',
            'toast',
        ]),

        ...mapActions('wallet', [
            'preparePledge',
            'updateCoins',
        ]),

        _setPledgeUSD(_satoshis) {
            /* Calculate USD. */
            const usd = parseFloat(_satoshis / 100000000.0) * this.usd

            /* Set (formatted) value. */
            this.pledgeUSD = numeral(usd).format('$0,0.00')
        },

        onRangeChange() {
            /* Calculate remaining (satoshis). */
            const remaining = this.pledgeGoal - this.pledgedValue
            console.log('REMAINING', remaining)

            /* Calculate satoshis. */
            const satoshis = parseInt(remaining * (this.pledgeRange / 100.0))

            /* Update pledge amount (satoshis). */
            this.pledgeSatoshis = satoshis

            /* Set pledge (USD). */
            this._setPledgeUSD(satoshis)
        },

        onPledgeUpdate() {
            // console.log('UPDATE THE PLEDGE AMOUNT (USD)', this.pledgeUSD)

            /* Validate USD pledge. */
            if (!this.pledgeUSD) {
                return null
            }

            // TODO Perform a smart calculation of value units
            //        1. satoshis (no comma, decimal)
            //        2. USD (has comma or decimal)

            /* Retrieve pledge amount (usd). */
            const pledgeUSD = numeral(this.pledgeUSD).value()
            console.log('PLEDGE AMOUNT (usd)', pledgeUSD)

            /* Calculate satoshis. */
            const satoshis = parseInt((pledgeUSD / this.usd) * 100000000)
            console.log('SATOSHIS', satoshis)

            /* Update pledge amount (satoshis). */
            this.pledgeSatoshis = satoshis

            /* Update pledge display. */
            this._setPledgeUSD(satoshis)
        },

        handleAuth() {
            /* Validate pledge authorization. */
            if (!this.pledgeAuth) {
                return
            }

            /* Wait a bit. */
            setTimeout(() => {
                /* Initialize pledge authorization. */
                let pledgeAuth = null

                try {
                    /* Decode base-64. */
                    pledgeAuth = Buffer.from(this.pledgeAuth, 'base64')
                    // console.log('PLEDGE AUTH (buffer)', pledgeAuth.toString())

                    /* Parse JSON. */
                    pledgeAuth = JSON.parse(pledgeAuth)

                    /* Add campaign id. */
                    pledgeAuth.campaignid = this.campaign.id
                    console.log('PLEDGE AUTH', pledgeAuth)

                    this.addAssurance(pledgeAuth)

                    /* Calculate remaining (satoshis). */
                    const remaining = this.pledgeGoal - this.pledgedValue
                    console.log('REMAINING', remaining)

                    if (remaining <= 0) {
                        this.broadcast()
                    }

                    Swal.fire({
                        title: 'Thank you!',
                        text: 'Your generous pledge has been successfully accepted! Until this campaign completes, you can "unlock" and spend your coin at anytime from the Causes wallet.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Done'
                    })
                } catch (err) {
                    console.error(err)
                }
            }, 100)
        },

        /**
         * Initialize Blockchain
         */
        initBlockchain() {
            /* Initialize Nito blockchain. */
            this.blockchain = new Nito.Blockchain()
            // console.log('NITO BLOCKCHAIN', this.blockchain)

            if (this.getAddress('causes')) {
                /* Subscribe to address updates. */
                this.blockchain
                    .subscribe('address', this.getAddress('causes'))
            }

            /* Handle blockchain updates. */
            this.blockchain.on('update', (_msg) => {
                console.log('ASSURANCE RECEIVED BLOCKCHAIN UPDATE (msg):', _msg)

                /* Update coins. */
                // FIXME: Why is this blocking the entire initial UI setup??
                this.updateCoins()
            })
        },

        /**
         * Apply Balance
         */
        async applyBalance() {
            /* Request accounts. */
            const accounts = this.getAccounts
            // console.log('ACCOUNTS', accounts)

            /* Validate accounts. */
            if (!accounts) {
                return null
            }

            /* Request coins. */
            const coins = this.getCoins
            // console.log('COINS', coins)

            /* Validate coins. */
            if (!coins) {
                return null
            }

            /* Filter spendable coins. */
            const spendable = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'active'
            })
            // console.log('SPENDABLE', spendable)

            /* Filter locked coins. */
            const locked = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'locked'
            })
            // console.log('LOCKED', locked)

            /* Initialize pledge coin. */
            let pledgeCoin = null

            /* Set donation amount. */
            const donation = this.userPledge.donation.amount
            // console.log('DONATION', donation)

            /* Loop through all locked. */
            locked.forEach(coinid => {
                if (coins[coinid].satoshis === donation) {
                    /* Set source coin. */
                    pledgeCoin = coins[coinid]
                }
            })

            /* Validate pledge coin. */
            if (!pledgeCoin) {
                /* Loop through all spendables. */
                // FIXME FOR DEVELOPMENT ONLY
                spendable.forEach(coinid => {
                    if (coins[coinid].satoshis === donation) {
                        /* Set source coin. */
                        pledgeCoin = coins[coinid]
                    }
                })
                // console.log('PLEDGE COIN', pledgeCoin)
            }

            /* Validate pledge coin. */
            if (pledgeCoin) {
                /* Set pledge. */
                const source = 'flipstarter'

                /* Build pledge package. */
                const pledgePkg = {
                    coin: pledgeCoin,
                    userPledge: this.userPledge,
                    source,
                }

                /* Request pledge authorization. */
                this.pledgeAuth = await this.buildPledgeAuth(pledgePkg)

                /* Set clipboard. */
                // this.setClipboard(this.pledgeAuth)

                /* Handle authorization. */
                this.handleAuth()
            } else {
                // Swal.fire({
                //     title: 'Wallet Error!',
                //     text: `Your wallet is missing the exact coin amount you specified in your pledge. Scan the QR Code shown to send the exact pledge amount to your Causes wallet.`,
                //     icon: 'error',
                //     confirmButtonColor: '#3085d6',
                //     confirmButtonText: 'Okay'
                // })
            }
        },

        async broadcast() {
            console.log('STARTED BROADCASTING...')

            // // Create a buffered version statement.
            // const version = Buffer.from("02000000", "hex");
            //
            // // Create the input counter and input data buffers.
            // const inputCount = bitcoinCashUtilities.varInt(this.inputs.length);
            // const inputs = this.serializeCommitments();
            //
            // // Create the output counter and output data buffer.
            // const outputCount = bitcoinCashUtilities.varInt(
            //   Object.keys(this.outputs).length
            // );
            // const outputs = this.serializeOutputs();
            //
            // // Create a buffered disable locktime statement.
            // const locktime = Buffer.from("00000000", "hex");
            //
            // // Return the assembled transaction.
            // return Buffer.concat([
            //   version,
            //   inputCount,
            //   inputs,
            //   outputCount,
            //   outputs,
            //   locktime,
            // ]);

            try {
                // Assemble pledges into transaction
                const rawTransaction = this.getFullfillment(this.campaign)
                console.log('RAW TRANSACTION', rawTransaction.toString('hex'))

                const response = await Nito.Transaction
                    .sendRawTransaction(rawTransaction.toString('hex'))
                    .catch(err => console.error(err))
                console.log('BROADCAST RESPONSE', response)
            } catch (err) {
                console.error(err)
            }

        },

        /**
         * Set Clipboard
         */
        copyDetails() {
            /* Set clipboard. */
            this.setClipboard(this.pledgeDetails)

            /* Set message. */
            const message = `Pledge details copied to your clipboard.`

            /* Display notification. */
            this.toast(['Done!', message, 'success'])
        },

        /**
         * Wallet Pledge
         */
        walletPledge() {
            Swal.fire({
                title: 'Please Wait!',
                text: 'Your pledge is being prepared and locked in your Causes wallet. This should ONLY take a few moments...',
                imageUrl: require('@/assets/identity-setup.png'), // 500 x 400
                imageWidth: 500,
                imageHeight: 300,
                imageAlt: 'Processing identity photo.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
            })

            /* Request accounts. */
            const accounts = this.getAccounts
            console.log('ACCOUNTS', accounts)

            /* Validate accounts. */
            if (!accounts) {
                return null
            }

            /* Request coins. */
            const coins = this.getCoins
            console.log('COINS', coins)

            /* Validate coins. */
            if (!coins) {
                return null
            }

            const spendable = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'active'
            })
            console.log('SPENDABLE', spendable)

            const locked = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'locked'
            })
            console.log('LOCKED', locked)

            /* Initialized locked flag. */
            let isAlreadyLocked = false

            /* Initialize source coin. */
            let sourceCoin = null

            /* Set donation amount. */
            const donation = this.userPledge.donation.amount
            console.log('DONATION AMOUNT', donation)

            /* Loop through all locked. */
            locked.forEach(coinid => {
                if (coins[coinid].satoshis === donation) {
                    /* Set flag. */
                    isAlreadyLocked = true

                    /* Set source coin. */
                    sourceCoin = coins[coinid]
                }
            })

            /* Loop through all spendables. */
            // FIXME FOR DEVELOPMENT ONLY
            spendable.forEach(coinid => {
                if (coins[coinid].satoshis === donation) {
                    /* Set flag. */
                    isAlreadyLocked = true

                    /* Set source coin. */
                    sourceCoin = coins[coinid]
                }
            })

            /* Validate pledge availability. */
            if (!isAlreadyLocked) {
                console.error('MAKE THE DEPOSIT')

                // TODO Sort spendables by value low->high.

                /* Handle all spendable coins. */
                for (let i = 0; i < spendable.length; i++) {
                    /* Set coin. */
                    const coin = coins[spendable[i]]

                    /* Validate coin value. */
                    if (coin.satoshis > donation + DUST + FEE) {
                        /* Set source coin. */
                        sourceCoin = coin // FIXME: Search for minimum sufficient coin(s).
                        console.log('SOURCE COIN', sourceCoin)

                        break
                    }
                }

                /* Validate source coin. */
                if (sourceCoin) {
                    const pkg = {
                        sourceCoin,
                        donation,
                    }

                    /* Prepare pledge. */
                    this.preparePledge(pkg)
                } else {
                    Swal.fire({
                        title: 'Wallet Error!',
                        text: `Your wallet has insufficient funds for the amount you specified in your pledge. Please lower your pledge amount, OR scan the QR Code shown to send the exact pledge amount to your Causes wallet.`,
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Okay'
                    })
                    // throw new Error(`Could not find a source coin for [ ${donation} ]`)
                }
            } else {
                console.error('RE-USE CURRENT DEPOSIT', sourceCoin)

                // FIXME: We must be able to support identical pledge amounts
                //        for independent campaigns (see issue #18)

                /* Apply balance. */
                this.applyBalance(sourceCoin)
            }

            /* Close the popup. */
            // setTimeout(() => {
            //     Swal.close()
            // }, 5000)

        },

    },
    created: async function () {
        /* Initialize pledge range. */
        this.pledgeRange = 5 // FIXME

        /* Initialize pledge. */
        this.pledgeUSD = 1 // FIXME

        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        // console.info(`Market price (USD)`, this.usd)

        /* Update pledge. */
        this.onPledgeUpdate()

        /* Set assurance id. */
        // FIXME: Will we support more than one??
        const assuranceid = 0

        /* Validate assurance. */
        if (this.campaign.assurances) {
            /* Set pledge goal. */
            this.pledgeGoal = this.campaign.assurances[assuranceid].recipient.satoshis
            console.log('PLEDGE GOAL', this.pledgeGoal)
        }

        /* Initialize blockchain. */
        this.initBlockchain()

    },
    mounted: function () {
        //
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

<style scoped>
form {
    /* border: 1pt solid rgba(180, 180, 180, 0.3); */
    border-right: 1pt solid rgba(180, 180, 180, 0.3);
    padding: 15px;
    /* margin: 20px 0 10px 10px; */

    /* border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px; */
}

.code-area {
    /* border: 1pt solid rgba(180, 180, 180, 0.3); */
    border-left: 1pt solid rgba(180, 180, 180, 0.3);
    /* padding: 1px; */
    /* margin: 0 0 15px 15px; */

    /* border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px; */
}

.qr-code {
    /* border: 1pt solid rgba(180, 180, 180, 0.3); */
    /* border-left: 1pt solid rgba(180, 180, 180, 0.3); */
    /* padding: 1px; */
    margin: 0 0 -10px 10px;
    /* margin-left: 10px; */

    /* border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px; */
}

.pledge-group {
    width: 100%;
    margin: 15px;
}

.pledge-output {
    width: 90%;
    height: 100px;
    cursor: grab;
}
.pledge-auth {
    width: 90%;
}
textarea {
    background-color: rgba(141, 195, 81, 0.5);
}


</style>

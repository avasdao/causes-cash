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

                    <div class="row mb-3">
                        <div class="col btn-pledge-select" @click="handlePledge(1.00)">
                            $1.00/mo
                        </div>

                        <div class="col btn-pledge-select" @click="handlePledge(5.00)">
                            $5.00/mo
                        </div>

                        <div class="col btn-pledge-select" @click="handlePledge(10.00)">
                            $10.00/mo
                        </div>

                        <div class="col btn-pledge-select" @click="handlePledge(20.00)">
                            $20.00/mo
                        </div>

                        <div class="col btn-pledge-select" @click="handlePledge(50.00)">
                            $50.00/mo
                        </div>

                        <div class="col btn-pledge-select">
                            Custom
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
                                @keyup.enter="$refs.pledgeAlias.focus()"
                             />
                        </div>
                    </div>

                    <div class="form-group row mt-3">
                        <label for="input-name" class="col-md-4 col-form-label text-right">
                            Name
                        </label>

                        <div class="col-md-8">
                            <input
                                ref="pledgeAlias"
                                class="form-control"
                                type="text"
                                id="input-name"
                                placeholder="(optional)"
                                v-model="pledgeAlias"
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
                            <button
                                class="btn btn-primary btn-block"
                                @click="savePledge"
                            >
                                Copy/Save Pledge
                            </button>
                        </div>

                        <div class="col">
                            <button class="btn btn-primary btn-block" @click="walletPay">
                                Use Wallet
                            </button>
                        </div>
                    </div>

                </form>
            </div>

            <div class="col-12 col-md-5">
                <a href="javascript://" class="btn-danger float-right" @click="$emit('cancel')">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    Close Payouts Manager
                </a>

                <h3>Payouts Manager</h3>

                <p class="mt-3">
                    Create a recurring payment for this campaign.
                    This allows this team/provider to improve their financial planning for long-term success.
                </p>

                <p class="mt-3">
                    You can cancel your payouts at anytime.
                    All remaining funds will be returned to your Causes wallet.
                </p>

                <a href="javascript://" class="btn-outline-danger float-right mt-3">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    Cancel Payout
                </a>
                <a href="javascript://" class="btn-outline-warning float-right mt-3 mr-3">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    Scan for Payouts
                </a>
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
import superagent from 'superagent'
// import Swal from 'sweetalert2'

// const { Contract, SignatureTemplate } = require('cashscript')
import { Contract, SignatureTemplate } from 'cashscript'

export default {
    props: {
        campaign: Object,
    },
    components: {
        //
    },
    data: () => {
        return {
            usd: null,
            satoshis: null,
            blockHeight: null,

            payoutsContract: null,
            receipientAddress: null,

            pledgeUSD: null,
            pledgeSatoshis: null,
            pledgeAlias: null,
            pledgeComment: null,
            pledgeRange: null,
            pledgeGoal: null,
            pledgeAddress: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        // ...mapGetters('campaigns', [
        //     'getFullfillment',
        // ]),

        ...mapGetters('wallet', [
            'getAddress',
        ]),

        pledgedValue() {
            /* Calculate pledged (satoshis). */
            const pledged = this.campaign.payouts.pledges
                .reduce((accumulator, pledge) => {
                    if (pledge.isSpent === true) {
                        return accumulator
                    } else {
                        return accumulator + pledge.satoshis
                    }
                }, 0)
            console.log('PLEDGED', pledged)

            return pledged
        },

        qr() {
            if (!this.pledgeAddress) {
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
            'addPayout',
        ]),

        ...mapActions('utils', [
            'setClipboard',
            'toast',
        ]),

        handlePledge(_amountUSD) {
            this.pledgeUSD = _amountUSD

            this.onPledgeUpdate()

            this.createPledge()
        },

        _setPledgeUSD(_satoshis) {
            /* Calculate USD. */
            const usd = (_satoshis / 100000000) * this.usd

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

        async savePledge() {
            this.copyToClipboard()

            /* Set campaign id. */
            const campaignid = this.campaign.id

            /* Set funder address. */
            // NOTE: Generated from next unused causes address.
            const funderAddress = this.getAddress('causes')
            const publicKeyHash = Nito.Address
                .toPubKeyHash(funderAddress).slice(6, -4)
            // console.log('publicKeyHash', publicKeyHash)

            /* Set alias. */
            const alias = this.pledgeAlias

            /* Set comment. */
            const comment = this.pledgeComment

            const pledgeUSD = numeral(this.pledgeUSD).value()
            const monthlyPledgeAmt = Math.round(pledgeUSD * 100)
            const minValidBlock = this.blockHeight
            const scriptVer = 'v20.8.3-fixed'

            const pkg = {
                campaignid,
                publicKeyHash,
                alias,
                comment,
                monthlyPledgeAmt,
                minValidBlock,
                scriptVer,
            }

            /* Add payout. */
            this.addPayout(pkg)
        },

        /**
         * Copy To Clipboard
         */
        copyToClipboard() {
            /* Set clipboard. */
            this.setClipboard(this.pledgeAddress)

            /* Set message. */
            const message = `Pledge address copied to your clipboard.`

            /* Display notification. */
            this.toast(['Done!', message, 'success'])
        },

        /**
         * Wallet Pay
         */
        walletPay() {
            this.toast(['Oops!', 'Your wallet balance is not enough', 'error'])

            // Swal.fire({
            //     title: 'Are you sure?',
            //     text: "You won't be able to revert this!",
            //     icon: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Yes, delete it!'
            // }).then((result) => {
            //     if (result.value) {
            //         Swal.fire(
            //             'Deleted!',
            //             'Your file has been deleted.',
            //             'success'
            //         )
            //     }
            // })
        },

        /**
         * Reclaim Pledge
         */
        async reclaimPledge() {
            const funder = ''
            const funderPk = ''
            const funderAddress = ''

            /**
             * Instantiate a new Mecenas Oracle contract with constructor arguments:
             *
             * NOTE: Timeout value can only be block number, not a timestamp.
             */
            const instance = this.payoutsContract.new(
                // FIXME
            )
            // console.log('Instance', instance)

            const tx = await instance.functions
                .reclaim(funderPk, new SignatureTemplate(funder))
                // .from([contractUtxos.find(utxo => utxo.satoshis === 2000)])
                .to(funderAddress, 1000)
                .withHardcodedFee(1000)
                .send()
                .catch(err => console.error(err))
            console.log('TX RESULTS', tx)
        },

        /**
         * Create Pledge
         */
        async createPledge() {
            /* Set network. */
            const network = 'mainnet'

            /* Set contract URL. */
            const contractUrl = 'https://ipfs.io/ipfs/QmZYoUt92FNVLqUQ7yyesLf9WdZSu1eXH5wWnxv9wDurFV'

            /* Set contract path. */
            const contract = await superagent.get(contractUrl)
            // console.log('CONTRACT', contract.text)

            if (contract && contract.text) {
                /* Compile the Mecenas Oracle contract. */
                this.payoutsContract = Contract.compile(contract.text, network)
                console.log('Payouts Contract', this.payoutsContract)

                const recipientPkh = Nito.Address
                    .toPubKeyHash(this.receipientAddress).slice(6, -4)
                console.log('recipientPkh', recipientPkh)

                /* Set funder address. */
                // NOTE: Generated from next unused causes address.
                const funderAddress = this.getAddress('causes')
                const funderPkh = Nito.Address
                    .toPubKeyHash(funderAddress).slice(6, -4)
                console.log('funderPkh', funderPkh)

                /* Set oracle public key. */
                const oraclePk = '03fb19e8f648f9901709cad8ff8a0659bc6356aa64eeb1c460aed468255838c184'
                console.log('oraclePk', oraclePk)

                /* Initialize minimum valid block. */
                const minValidBlock = this.blockHeight
                console.log('MIN VALID BLOCK', minValidBlock)

                /* Initialize monthly pledge amount. */
                const pledgeUSD = numeral(this.pledgeUSD).value()
                const monthlyPledgeAmt = Math.round(pledgeUSD * 100)
                console.log('MONTHLY PLEDGE AMOUNT', pledgeUSD, monthlyPledgeAmt)

                /**
                 * Instantiate a new Mecenas Oracle contract with constructor arguments:
                 *
                 * NOTE: Timeout value can only be block number, not a timestamp.
                 */
                const instance = this.payoutsContract.new(
                    recipientPkh,       // recipient public key hash
                    funderPkh,          // funder public key hash
                    oraclePk,           // oracle public key
                    minValidBlock,      // minimum valid block (signature & message)
                    monthlyPledgeAmt,   // monthly pledge amount
                )
                console.log('Instance', instance)

                /* Set pledge address. */
                this.pledgeAddress = instance.address
            }

        },

    },
    created: async function () {
        /* Set USD price. */
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        // console.info(`Market price (USD)`, this.usd)

        /* Set block height. */
        this.blockHeight = await Nito.Blockchain.getBlockHeight()

        /* Initialize pledge range. */
        this.pledgeRange = 5 // FIXME

        /* Initialize pledge. */
        this.pledgeUSD = 5.00
        this.onPledgeUpdate()

        /* Validate payouts. */
        if (this.campaign.payouts) {
            /* Set pledge goal. */
            this.pledgeGoal = this.campaign.payouts.recipient.satoshis
            console.log('PLEDGE GOAL', this.pledgeGoal)

            /* Set pledge goal. */
            this.receipientAddress = this.campaign.payouts.recipient.address
            console.log('RECIPIENT ADDRESS', this.receipientAddress)
        }

        /* Create new pledge. */
        this.createPledge()

    },
    mounted: function () {
        //
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
}

.btn-pledge-select {
    display: flex;
    border: 1pt solid rgba(255, 0, 255, 0.3);
    background-color: rgba(220, 220, 220, 0.2);
    height: 50px;
    margin: 2px;

    align-items:center;
    justify-content:center;

    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;

    cursor: pointer;
}

</style>

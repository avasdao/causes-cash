<template>
    <main class="backing">
        <div class="row">
            <div class="col">
                <h3>STEP 1: Copy your pledge details</h3>

                <div class="col-9">
                    <span>
                        On the Flipstarter campaign's page, find the box that says <strong class="text-primary">"1. Copy details"</strong> and click the green <strong class="text-primary">"COPY DETAILS"</strong> button, which will:
                    </span>

                    <ol class="ml-5">
                        <li>
                            Lock-in your pledge details
                        </li>
                        <li>
                            Package your pledge details
                        </li>
                        <li>
                            Copy pledge package to your clipboard
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <hr />

        <div class="row">
            <div class="col">
                <h3>STEP 2: Paste your pledge (package) details</h3>

                <div class="col-9">
                    <span>
                        Paste the pledge details you copied from the campaign page into the box below.
                        Then review the camapign and pledge details from the Flipstarter package.
                    </span>
                </div>

                <textarea
                    class="pledge-details mt-3"
                    v-model="pledgeDetails"
                    placeholder="Paste your pledge details here">
                </textarea>

                <!-- <div v-if="userPledge" class="row mt-3 parsedJson"> -->
                <div v-if="userPledge" class="row mt-3">
                    <div class="col-12 text-center">
                        <h2>Campaign Details</h2>
                    </div>

                    <div class="row">
                        <div class="col-5 text-right">
                            Fulfillment address
                        </div>
                        <div class="col-7 recipient-address">
                            <a :href="campaignAddressLink" target="_blank">
                                <i class="fa fa-check-circle text-success mr-1"></i>
                                <strong>{{campaignAddress}}</strong>
                            </a>

                            (<a href="javascript://">view proof</a>)
                        </div>

                        <div class="col-5 text-right">
                            Fulfillment amount
                        </div>
                        <div class="col-7" v-html="campaignValue" />

                        <div class="col-5 text-right">
                            Expiration date
                        </div>
                        <div class="col-7" v-html="expirationDate" />
                    </div>

                    <div class="col-12 text-center">
                        <h2>Pledge Details</h2>
                    </div>

                    <div class="row">
                        <div class="col-5 text-right">
                            Pledge alias
                        </div>
                        <div class="col-7">
                            {{userPledge.data.alias}}
                        </div>

                        <div class="col-5 text-right">
                            Pledge comment
                        </div>
                        <div class="col-7">
                            {{userPledge.data.comment}}
                        </div>

                        <div class="col-5 text-right">
                            Donation amount
                        </div>
                        <div class="col-7" v-html="donationAmount" />
                    </div>
                </div>

            </div>
        </div>

        <hr v-if="userPledge" />

        <div v-if="userPledge" class="row">
            <div class="col-12">
                <h3>STEP 3: Confirm your pledged coins</h3>

                <div class="col-9">
                    Please choose from one or more options to fund your pledge:

                    <ol class="ml-5">
                        <li>
                            Pledge directly from your Causes wallet
                            <i class="fa fa-question-circle-o" aria-hidden="true" @click="getHelp('community/intro')"></i>
                        </li>
                        <li>
                            Pledge using a QR Code Payment Request
                            <i class="fa fa-question-circle-o" aria-hidden="true" @click="getHelp('community/payment')"></i>
                        </li>
                    </ol>
                </div>
            </div>

            <div class="col-7">
                <h3>Payment Request</h3>

                <div class="qr-code m-3" v-html="qr" @click="copyAddress" />
            </div>

            <div class="col-5">
                <h3>Wallet Balance</h3>

                <input
                    class="mt-3 mb-2"
                    type="text"
                    placeholder="Fiat wallet value"
                    v-model="fiatContribution"
                    disabled
                 />

                <input
                    class="mt-3 mb-2"
                    type="text"
                    placeholder="Satoshi wallet value"
                    v-model="satoshiContribution"
                    disabled
                 />

                <a
                    href="javascript://"
                    class="btn-primary btn-block mt-3"
                    @click="applyBalance"
                >
                    Apply to pledge
                </a>

                <a
                    href="javascript://"
                    class="btn-warning btn-block mt-3"
                    @click="updateCoins"
                >
                    Update coins
                </a>
            </div>

            <div v-if="pledgeAuth" class="col-12">
                <textarea
                    class="pledge-auth mt-3"
                    v-model="pledgeAuth">
                </textarea>

                <a
                    href="javascript://"
                    class="btn-primary mt-3"
                    @click="copyAuth"
                >
                    Copy authorization to clipboard
                </a>
            </div>
        </div>

        <hr v-if="pledgeAuth" />

        <div v-if="pledgeAuth" class="row">
            <div class="col">
                <h3>STEP 4: Submit pledge authorization</h3>

                <div class="col-9">
                    <span>
                        On the Flipstarter campaign's page, find the box that says <strong class="text-primary">"3. Paste pledge"</strong>, then paste in the clipboard you copied above, finally click the green <strong class="text-primary">"SUBMIT PLEDGE"</strong> button, which will:
                    </span>

                    <ol class="ml-5">
                        <li>
                            Submit your pledge to the campaign's server
                        </li>
                        <li>
                            Add your pledge to the campaign's page
                        </li>
                    </ol>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'
import Nito from 'nitojs'
import numeral from 'numeral'
import QRCode from 'qrcode'

export default {
    components: {
        //
    },
    data: () => {
        return {
            usd: null,
            fiatContribution: null,
            satoshiContribution: null,

            pledgeDetails: null,
            pledgeAuth: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('profile', [
            'getMeta',
        ]),

        ...mapGetters('wallet', [
            'getAccounts',
            'getAddress',
            'getCoins',
        ]),

        /**
         * User Pledge
         */
        userPledge() {
            if (!this.pledgeDetails) {
                return null
            }

            /* Decode details to base64. */
            const b64 = Buffer.from(this.pledgeDetails, 'base64')

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
            const json = JSON.parse(buf.toString())

            /* Return json. */
            return json
        },

        /**
         * Campaign Address
         */
        campaignAddress() {
            /* Validate fulfillment address. */
            if (this.userPledge && this.userPledge.outputs[0].address) {
                /* Initialize address. */
                let address = this.userPledge.outputs[0].address

                /* Strip prefix. */
                if (address.indexOf('bitcoincash:') !== -1) {
                    address = address.slice(12)
                }

                /* Shorten. */
                address = `${address.slice(0, 8)} ... ${address.slice(-8)}`

                /* Return fulfillment address. */
                return address
            } else {
                return null
            }
        },

        /**
         * Campaign AddressLink
         */
        campaignAddressLink() {
            /* Validate fulfillment address. */
            if (this.userPledge && this.userPledge.outputs[0].address) {
                return 'https://explorer.bitcoin.com/bch/address/' + this.userPledge.outputs[0].address
            } else {
                return null
            }
        },

        /**
         * Campaign Value
         */
        campaignValue() {
            if (this.userPledge && this.userPledge.outputs[0].value && this.usd) {
                const satoshis = numeral(this.userPledge.outputs[0].value / 100000000).format('0,0.00[000000]')

                const fiat = numeral((
                    this.userPledge.outputs[0].value / 100000000.0) * this.usd)
                    .format('$0.00')

                return `${satoshis} <small>BCH</small> <span class="text-danger">|</span> ${fiat} <small>USD</small>`
            } else {
                return null
            }

        },

        /**
         * Expiration Date
         */
        expirationDate() {
            /* Validate expiration date. */
            if (this.userPledge && this.userPledge.expires) {
                const dateTime = moment.unix(this.userPledge.expires).format('ll')

                const timeFrom = moment.unix(this.userPledge.expires).fromNow()

                return `${dateTime} <span class="text-danger">|</span> ${timeFrom}`
            } else {
                return null
            }
        },

        /**
         * Donation Amount
         */
        donationAmount() {
            /* Validate donation amount. */
            if (this.userPledge && this.userPledge.donation.amount) {
                const satoshis = numeral(this.userPledge.donation.amount / 100000000).format('0,0.00[000000]')

                const fiat = numeral((
                    this.userPledge.donation.amount / 100000000.0) * this.usd)
                    .format('$0.00')

                return `${satoshis} <small>BCH</small> <span class="text-danger">|</span> ${fiat} <small>USD</small>`
                    + `<br /><small class="text-danger">(${this.donationPct} of total campaign value)</small>`
            } else {
                return null
            }
        },

        /**
         * Donation Percentage
         */
        donationPct() {
            /* Validate donation amount. */
            if (this.userPledge && this.userPledge.donation.amount) {
                const campaign = this.userPledge.outputs[0].value
                const user = this.userPledge.donation.amount

                const pct = user / campaign

                return numeral(pct).format('0.00[00]%')
            } else {
                return null
            }
        },

        qr() {
            if (!this.getAddress('causes') || !this.userPledge) {
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

            /* Calculate pledge amount (in BCH). */
            const amount = parseFloat(this.userPledge.donation.amount / 100000000.0)

            /* Set payment URL. */
            const paymentUrl = `${this.getAddress('causes')}?amount=${amount}`

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
        ...mapActions('profile', [
            'updateMeta',
        ]),

        ...mapActions('utils', [
            'setClipboard',
            'toast',
        ]),

        ...mapActions('wallet', [
            'updateCoins',
        ]),

        /**
         * Assemble Signature Hash Digest
         */
        assembleSighashDigest(
            previousTransactionHash,
            previousTransactionOutputIndex,
            previousTransactionOutputValue,
            inputLockScript
        ) {
            /* Initialize an empty array of outpoints. */
            const transactionOutpoints = []

            /* Initialize value. */
            let value = null

            /* Set value. */
            value = Nito.Utils
                .encodeNumber(this.userPledge.outputs[0].value)
            // console.log('Encoded value:', value)

            /* Set locking script. */
            const locking_script = Nito.Address
                .toPubKeyHash(this.userPledge.outputs[0].address)
            // console.log('Campaign (locking_script):', locking_script)

            /* Set current output. */
            // NOTE: This is the pledge recipient.
            // FIXME: Allow multiple pledge recipients.
            const thisOutputs = [{ value, locking_script }]

            /* Add each output in the current contract. */
            for (const currentOutput in thisOutputs) {
                // Add the output value.
                transactionOutpoints.push(thisOutputs[currentOutput].value)

                // Add the output lockscript.
                transactionOutpoints.push(
                    Nito.Utils.varBuf(thisOutputs[currentOutput].locking_script)
                )
            }
            // console.log('Transaction outpoints:', transactionOutpoints)

            /* Set version. */
            const nVersion = Buffer.from('02000000', 'hex')

            /* Set hash previous output. */
            const hashPrevouts = Buffer.from(''.padStart(64, '0'), 'hex')

            /* Set hash sequence. */
            const hashSequence = Buffer.from(''.padStart(64, '0'), 'hex')

            /* Set outpoint. */
            const outpoint = Buffer.concat([
                Nito.Utils.reverseBuffer(previousTransactionHash),
                previousTransactionOutputIndex,
            ])

            /* Set script code. */
            const scriptCode = Buffer.concat([
                Buffer.from('19', 'hex'),
                inputLockScript,
            ])

            /* Set (transaction) value. */
            value = previousTransactionOutputValue

            /* Set sequence. */
            const nSequence = Buffer.from('FFFFFFFF', 'hex')

            /* Set hash outputs. */
            const hashOutputs = Nito.Crypto
                .hash(Buffer.concat(transactionOutpoints), 'sha256sha256')

            /* Set locktime. */
            const nLocktime = Buffer.from('00000000', 'hex')

            /* Set signature hash type. */
            const sighashType = Buffer.from('c1000000', 'hex')

            /* Construct signature hash message. */
            const sighashMessage = Buffer.concat([
                nVersion,
                hashPrevouts,
                hashSequence,
                outpoint,
                scriptCode,
                value,
                nSequence,
                hashOutputs,
                nLocktime,
                sighashType,
            ])
            // console.log('sighashMessage', sighashMessage.toString('hex'));

            /* Create signature hash digest (of message). */
            const sighashDigest = Nito.Crypto.hash(sighashMessage, 'sha256sha256')
            // console.log('sighashDigest', sighashDigest.toString('hex'));

            /* Return signature hash digest. */
            return sighashDigest
        },

        /**
         * Make Pledge
         */
        async makePledge(_coin) {
            /* Initialize verification key. */
            const verificationKey = Nito.Purse.fromWIF(_coin.wif)
            // console.log('verificationKey', verificationKey, _coin.wif)

            /* Set public key. */
            const publicKey = verificationKey.publicKey.toString()
            // console.log('\nPublic key:', publicKey)

            /* Set cash address. */
            const cashAddress = Nito.Address.toCashAddress(verificationKey)
            // console.log('FLIPSTARTER (pledge address)', cashAddress)

            // console.log('USER PLEDGE', this.userPledge)

            const alias = this.userPledge.data.alias
            // console.log('ALIAS:', alias)

            const comment = this.userPledge.data.comment
            // console.log('COMMENT:', comment)

            const expires = this.userPledge.expires
            // console.log('EXPIRES:', expires)

            if (!_coin.txid || !_coin.satoshis) {
                return console.error('No UTXO available for pledge.')
            }

            const previousTransactionHash = _coin.txid
            const previousTransactionOutputValue = Nito.Utils.encodeNumber(_coin.satoshis)

            // const previousTransactionOutputIndex = '01000000'
            const previousTransactionOutputIndex = Buffer.allocUnsafe(4)
            previousTransactionOutputIndex.writeUIntLE(_coin.vout, 0, 4)
            console.log('PREVIOUS TX OUT IDX', previousTransactionOutputIndex)
            console.log('PREVIOUS TX OUT IDX (hex)', previousTransactionOutputIndex.toString('hex'))
            const inputLockScript = Nito.Address.toPubKeyHash(cashAddress)

            /* Validate commitment signature. */
            const verificationMessage = this.assembleSighashDigest(
                Buffer.from(previousTransactionHash, 'hex'),
                // Buffer.from(previousTransactionOutputIndex, 'hex'),
                previousTransactionOutputIndex,
                Buffer.from(previousTransactionOutputValue, 'hex'),
                Buffer.from(inputLockScript, 'hex')
            )
            // console.log('verificationMessage', verificationMessage.toString('hex'))

            const pledgeSig = Nito.Account.sign(verificationMessage, verificationKey)
            // console.log('PLEDGE SIGNATURE', pledgeSig.toString())

            const previous_output_transaction_hash = previousTransactionHash
            // const previous_output_index = 0
            const previous_output_index = _coin.vout
            const sequence_number = 4294967295 // NOTE: 0xFFFFFFFF | 32-bit max int

            const unlocking_script =
                (pledgeSig.toString().slice(2, 4) === '44' ? '47' : '48') + // FIXME??
                pledgeSig.toString() +
                'c1' + // NOTE: sigHashType
                '21' +
                publicKey
            // console.log('UNLOCKING SCRIPT:', unlocking_script)

            const assuranceOutput = {
                inputs: [{
                    previous_output_transaction_hash,
                    previous_output_index,
                    sequence_number,
                    unlocking_script,
                }],
                data: {
                    alias,
                    comment,
                },
                data_signature: null
            }
            console.info('Assurance output:', assuranceOutput)

            /* Encode assurance pledge. */
            const encodedPledge = Buffer.from(JSON.stringify(assuranceOutput)).toString('base64')
            console.log('Flipstarter encoded pledge (base64):', encodedPledge)

            /* Update pledge authorization. */
            this.pledgeAuth = encodedPledge

            /* Initialize meta. */
            let meta = await this.getMeta
            console.log('FLIPSTARTER (meta):', meta)

            /* Validate metadata. */
            // NOTE: Added to schema on 2020.7.27
            if (!meta) {
                meta = {}
            }

            /* Validate coins. */
            // NOTE: Added to schema on 2020.7.27
            if (!meta.coins) {
                meta.coins = {}
            }

            /* Set coin id. */
            const coinid = `${_coin.txid}:${_coin.vout}`

            /* Update meta data. */
            meta['coins'][coinid] = {
                label: alias,
                comment,
                lock: {
                    isActive: true,
                    source: 'flipstarter',
                    createdAt: moment().unix(),
                    expiresAt: expires,
                }
            }

            /* Update metadata. */
            const metaUpdate = await this.updateMeta(meta)
            console.log('FLIPSTARTER (metaUpdate):', metaUpdate)

            /* Set message. */
            const message = `Your coin has been locked!`

            /* Display notification. */
            this.toast(['Done!', message, 'success'])
        },

        /**
         * Apply Balance
         */
        async applyBalance() {
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

            /* Request metadata. */
            const meta = await this.getMeta
            console.log('BACKING (meta):', meta)

            const spendable = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'active'
            })
            console.log('SPENDABLE', spendable)

            const locked = Object.keys(coins).filter(coinid => {
                return coins[coinid].status === 'locked'
            })
            console.log('LOCKED', locked)

            /* Initialize source coin. */
            let sourceCoin = null

            /* Set donation amount. */
            const donation = this.userPledge.donation.amount
            console.log('DONATION', donation)

            /* Loop through all locked. */
            locked.forEach(coinid => {
                if (coins[coinid].satoshis === donation) {
                    /* Set source coin. */
                    sourceCoin = coins[coinid]
                }
            })

            /* Loop through all spendables. */
            // FIXME FOR DEVELOPMENT ONLY
            spendable.forEach(coinid => {
                if (coins[coinid].satoshis === donation) {
                    /* Set source coin. */
                    sourceCoin = coins[coinid]
                }
            })
            console.log('SOURCE COIN', sourceCoin);

            if (sourceCoin) {
                /* Make pledge. */
                this.makePledge(sourceCoin)
            } else {
                this.toast(['Oops!', 'Your wallet is missing pledge amount', 'error'])

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
            }
        },

        walletValidation(_evt) {
            console.log('WALLET VALIDATION', _evt)
        },

        /**
         * Copy (Pledge) Authorization
         */
        copyAuth() {
            /* Set clipboard. */
            this.setClipboard(this.pledgeAuth)

            /* Set message. */
            const message = `Pledge authorization copied to your clipboard.`

            /* Display notification. */
            this.toast(['Done!', message, 'info'])
        },

        /**
         * Copy Clipboard
         */
        copyAddress() {
            /* Set clipboard. */
            this.setClipboard(this.getAddress('causes'))

            /* Set message. */
            const message = `Pledge address copied to your clipboard.`

            /* Display notification. */
            this.toast(['Done!', message, 'info'])
        },

        /**
         * Cancel Pledge
         */
        cancelPledge(_coin) {
            console.log('TODO', _coin)
        },

    },
    created: async function () {
        this.fiatContribution = '$0.00'
        this.satoshiContribution = '0'

        /* Request BCH/USD market price. */
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')

        const meta = await this.getMeta
        console.log('FLIPSTARTER (meta):', meta);
    },
    mounted: function () {
        // return this.toast(['Done!', 'Blank mounted successfully!', 'success'])
    },
}
</script>

<style scoped>
textarea {
    background-color: rgba(141, 195, 81, 0.5);
}

.pledge-details, .pledge-auth {
    /* width: 300px; */
    width: 100%;
    height: 100px;
    padding: 15px;
}

.parsedJson {
    padding: 5px;
    border-top: 3pt solid rgba(90, 90, 90, 0.5);
}

.recipient-address a {
    display: inline-block;
}
</style>

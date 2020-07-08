<template>
    <main class="faq">
        <Header />
        <Banner page="backing" />

        <section>
			<div class="container">
				<div class="row">
                    <Sidenav tab="backing" />

					<div class="col-lg-9">
						<div class="account-content account-table">
							<h3 class="account-title">Backed Causes</h3>

							<div v-if="backing" class="backing">
								<table>
									<thead>
										<tr>
											<th>Order</th>
											<th>Date</th>
											<th>Status</th>
											<th>Total</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>#1145</td>
											<td>July 21, 2017</td>
											<td>Pending</td>
											<td>$250 for 1 item</td>
											<td><a href="javascript://">View</a></td>
										</tr>
										<tr>
											<td>#1146</td>
											<td>July 22, 2017</td>
											<td>Completed</td>
											<td>$5150 for 3 item</td>
											<td><a href="javascript://">View</a></td>
										</tr>
										<tr>
											<td>#1147</td>
											<td>July 23, 2017</td>
											<td>Cancel</td>
											<td>$180 for 1 item</td>
											<td><a href="javascript://">View</a></td>
										</tr>
										<tr>
											<td>#1148</td>
											<td>July 24, 2017</td>
											<td>Completed</td>
											<td>$2700 for 1 item</td>
											<td><a href="javascript://">View</a></td>
										</tr>
									</tbody>
								</table>
							</div>

                            <div v-else class="backing">
                                <div v-if="accepting">
                                    <div class="row">
                                        <div class="col">
                                            <h3>Pledge details</h3>

                                            <small>
                                                Paste the details from your campaign below.
                                            </small>

                                            <textarea
                                                class="pledge-details mt-3"
                                                v-model="pledgeDetails"
                                                placeholder="Paste your pledge details here">
                                            </textarea>

                                        </div>

                                        <div class="col">
                                            <h3>Pledge authorization</h3>

                                            <small>
                                                Paste your authorization message into your campaign.
                                            </small>

                                            <textarea
                                                class="pledge-auth mt-3"
                                                v-model="pledgeAuth"
                                                placeholder="Waiting for confirmation...">
                                            </textarea>
                                        </div>
                                    </div>

                                    <button
                                        v-if="userPledge"
                                        class="btn-primary mt-3"
                                        @click="confirmFlipstarter"
                                        :disabled="pledgeAuth"
                                    >
                                        Confirm Flipstarter Pledge
                                    </button>

                                    <div v-if="userPledge" class="row mt-3 parsedJson">
                                        <pre>{{userPledge}}</pre>
                                    </div>
                                </div>

                                <div v-else>
                                    <div>
                                        You haven't backed any campaigns
                                    </div>

                                    <a
                                        href="javascript://"
                                        class="btn-primary mt-3"
                                        @click="addFlipstarter"
                                    >
                                        Add Flipstarter Campaign
                                    </a>
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
            backing: null,
            accepting: null,

            pledgeDetails: null,
            pledgeAuth: null,

        }
    },
    computed: {
        ...mapGetters('wallet', [
            'getAddress',
            'getBalance',
            'getDerivationPath',
            'getHDNode',
            'getWallet',
        ]),

        /**
         * Parsed Details
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

            /* Convert 16-bit to 8-bit. */
            for (let i = 0; i < b64.length; i += 2) {
                buf[count++] = b64[i]
            }

            /* Parse json. */
            const json = JSON.parse(buf.toString())
            // console.log('\nFLIPSTARTER PLUGIN DETAILS (json):', json)

            /* Return json. */
            return json
        },

    },
    methods: {
        ...mapActions('wallet', [
            'updateCoins',
        ]),

        /**
         * Accept Flipstarter (Pledge)
         *
         * Allows a user to accept a non-platform pledge,
         * eg. from a self-hosted Flipstarter (Assurance) campaign.
         */
        addFlipstarter() {
            this.accepting = !this.accepting
        },

        /**
         * Parse Key Hash Unlock Script
         */
        parseKeyHashUnlockScript(unlockScript) {
            /**
             * The signature is the first pushed item, with a varying length
             * depending on signature type.
             */
            const signature = unlockScript.slice(1, -34)

            /* The public key is the last pushed item of 33 bytes. */
            const publicKey = unlockScript.slice(-33)

            /* Return the parsed unlock script. */
            return {
                publicKey,
                signature
            }
        },

        /**
         * Encode Output Value
         *
         * Encodes a number of satoshis to be used as part of an output
         * structure in a raw transaction.
         */
        encodeOutputValue(_satoshis) {
            // Check if the provided satoshis is of the correct type.
            if (isNaN(_satoshis)) {
                throw `Cannot encode output value, provided satoshis '${_satoshis}' is not a number.`
            }

            // Check if the provided satoshis is an integer.
            if (!Number.isInteger(_satoshis)) {
                throw `Cannot encode output value, provided satoshis '${_satoshis}' is not an integer.`
            }

            // Check if the provided satoshis is a positive number.
            if (_satoshis < 0) {
                throw `Cannot encode output value, provided satoshis '${_satoshis}' is negative.`
            }

            // Check if the provided satoshis is within our accepted number range.
            if (_satoshis > Math.pow(2, 53)) {
                throw `Cannot encode output value, provided satoshis '${_satoshis}' is larger than javacripts 53bit limit.`
            }

            /* Allocate 8 bytes. */
            const value = Buffer.alloc(8)

            /* Split the number into high and low bits. */
            const highValue = Math.floor(_satoshis / Math.pow(2, 32))
            const lowValue = _satoshis % Math.pow(2, 32)

            /* Write the satoshi number to the buffer in 64bit. */
            value.writeUInt32LE(highValue, 4)
            value.writeUInt32LE(lowValue, 0)

            // Return the encoded value.
            return value
        },

        /**
         * Decode Output Value
         */
        decodeOutputValue(_value) {
            // TODO: Properly validate and error check.

            // Parhse the high and low value sets.
            const highValue = _value.readUInt32LE(4);
            const lowValue = _value.readUInt32LE(0);

            // Return the decoded value.
            return highValue * Math.pow(2, 32) + lowValue;
        },

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

            /* Set campaign value. */
            const campaignValue = this.userPledge.outputs[0].value
            console.log('Campaign value:', campaignValue)

            /* Set value. */
            value = this.encodeOutputValue(campaignValue)
            console.log('Encoded value:', value)

            /* Set campaign address. */
            const campaignAddress = this.userPledge.outputs[0].address
            console.log('Campaign address:', campaignAddress)

            /* Set locking script. */
            const locking_script = Nito.Address.toPubKeyHash(campaignAddress)
            console.log('Campaign (locking_script):', locking_script)

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
            console.log('Transaction outpoints:', transactionOutpoints)

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
            // const hashOutputs = bitbox.Crypto.hash256(
            //     Buffer.concat(transactionOutpoints)
            // )
            const hashOutputs = Nito.Crypto.hash(
                Buffer.concat(transactionOutpoints), 'sha256sha256'
            )

            /* Set locktime. */
            const nLocktime = Buffer.from('00000000', 'hex')

            /* Set signature hash type. */
            const sighashType = Buffer.from('c1000000', 'hex')

            // console.log('nVersion', nVersion);
            // console.log('hashPrevouts', hashPrevouts);
            // console.log('hashSequence', hashSequence);
            // console.log('outpoint', outpoint);
            // console.log('scriptCode', scriptCode);
            // console.log('value', value);
            // console.log('nSequence', nSequence);
            // console.log('hashOutputs', hashOutputs);
            // console.log('nLocktime', nLocktime);
            // console.log('sighashType', sighashType);

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

            /* Create signature hash digest (of message). */
            const sighashDigest = Nito.Crypto.hash(sighashMessage, 'sha256sha256')

            /* Return signature hash digest. */
            return sighashDigest
        },

        /**
         * Load Funds
         */
        async loadFunds(_coin, _address, _satoshis) {
            console.log('SENDING COIN', _coin)
            if (!_address) {
                return console.error('NO output address!')
            }

            /* Build receivers. */
            const receivers = [
                {
                    address: _address,
                    satoshis: _satoshis,
                }
            ]

            /* Set auto fee (flag). */
            const autoFee = false

            const results = await Nito.Transaction
                .sendCoin(_coin, receivers, autoFee)
                .catch(err => console.error(err))
            console.log('OUTBOX SEND COIN (results):', results)

            if (results) {
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
         * Confirm Flipstarter (Pledge)
         *
         * Transfers the pledge amount into a dedicated UTXO.
         */
        async confirmFlipstarter() {
            /* Initialize wallet. */
            const wallet = this.getWallet
            console.log('WALLET', wallet)

            /* Set accounts. */
            const accounts = wallet.accounts
            console.log('ACCOUNTS', accounts)

            /* Set coins. */
            const coins = wallet.coins
            console.log('COINS', coins)

            /* Validate accounts. */
            if (!accounts) {
                return null
            }

            /* Validate coins. */
            if (!coins) {
                return null
            }

            const spendable = Object.keys(coins).filter(coinId => {
                return coins[coinId].status === 'active'
            })
            console.log('SPENDABLE', spendable)

            let isPledged = false

            let sourceCoin = null

            /* Set donation amount. */
            const donation = this.userPledge.donation.amount
            console.log('DONATION', donation)

            /* Loop through all spendables. */
            spendable.forEach(coinId => {
                if (coins[coinId].status === 'active' && coins[coinId].satoshis === donation) {
                    /* Set flag. */
                    isPledged = true

                    /* Set source coin. */
                    sourceCoin = coins[coinId]
                }
            })

            /* Validate pledge balance. */
            if (!isPledged) {
                console.error('MAKE THE DEPOSIT')

                /* Initialize current (coin) index. */
                const currentIndex = accounts['causes']
                console.log('FLIPSTARTER (currentIndex):', currentIndex)

                /* Set (Causes Cash) chain. */
                const chain = 6767

                /* Set derivation path. */
                const path = this.getDerivationPath(chain, currentIndex)
                console.log('FLIPSTARTER (path)', path)

                /* Set source coin. */
                sourceCoin = coins[spendable[1]] // FIXME: Search for minimum sufficient coin(s).
                console.log('SOURCE COIN', sourceCoin)

                /* Set pledge address. */
                const pledgeAddress = this.getAddress('causes')
                console.log('PLEDGE ADDRESS', pledgeAddress)

                /* Retrieve (address) balances. */
                // const pledgeBalance = await Nito.Address.balance(pledgeAddress)
                // console.log('PLEDGE BALANCE', pledgeBalance)

                this.loadFunds(sourceCoin, pledgeAddress, donation)
            } else {
                console.error('RE-USE CURRENT DEPOSIT', sourceCoin)

                this.makePledge(sourceCoin)

            }


        },

        /**
         * Make Pledge
         */
        makePledge(_coin) {
            /* Initialize HD node. */
            // const hdNode = this.getHDNode

            /* Initialize verification key. */
            // const verificationKey = hdNode.deriveChild(_path)
            const verificationKey = Nito.Purse.fromWIF(_coin.wif)
            // console.log('verificationKey', verificationKey)

            /* Set public key. */
            const publicKey = verificationKey.publicKey.toString()
            console.log('\nPublic key:', publicKey)

            /* Set cash address. */
            const cashAddress = Nito.Address.toCashAddress(verificationKey)
            console.log('FLIPSTARTER (pledge address)', cashAddress)

            console.log('USER PLEDGE', this.userPledge)

            const alias = this.userPledge.data.alias
            console.log('ALIAS:', alias)

            const comment = this.userPledge.data.comment
            console.log('COMMENT:', comment)

            if (!_coin.txid || !_coin.satoshis) {
                return console.error('No UTXO available for pledge.')
            }

            const previousTransactionHash = _coin.txid
            const previousTransactionOutputValue = this.encodeOutputValue(_coin.satoshis)
            const previousTransactionOutputIndex = '00000000'
            const inputLockScript = Nito.Address.toPubKeyHash(cashAddress)

            // Validate commitment signature
            const verificationMessage = this.assembleSighashDigest(
                Buffer.from(previousTransactionHash, 'hex'),
                Buffer.from(previousTransactionOutputIndex, 'hex'),
                Buffer.from(previousTransactionOutputValue, 'hex'),
                Buffer.from(inputLockScript, 'hex')
            )
            console.log('verificationMessage', verificationMessage.toString('hex'))

            const pledgeSig = Nito.Account.sign(verificationMessage, verificationKey)
            console.log('PLEDGE SIGNATURE', pledgeSig)

            const previous_output_transaction_hash = previousTransactionHash
            const previous_output_index = 0
            const sequence_number = 4294967295

            const unlocking_script =
                (pledgeSig.toString().slice(2, 4) === '44' ? '47' : '48') + // FIXME??
                pledgeSig.toString() +
                'c1' + // NOTE: sigHashType
                '21' +
                publicKey
            console.log('UNLOCKING SCRIPT:', unlocking_script)

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
            console.log('ASSURANCE OUTPUT:', assuranceOutput)

            /* Encode assurance pledge. */
            const encodedPledge = Buffer.from(JSON.stringify(assuranceOutput)).toString('base64')
            console.log('Flipstarter encoded pledge (base64):', encodedPledge)

            /* Update pledge authorization. */
            this.pledgeAuth = encodedPledge
        },

    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()

        /* Initialize accepting flag. */
        this.accepting = false
    },
}
</script>

<style scoped>
.backing {
    margin: 20px 40px;
}

.pledge-details, .pledge-auth {
    width: 300px;
    height: 100px;
    padding: 15px;
}

.parsedJson {
    padding: 5px;
    border-top: 3pt solid rgba(90, 90, 90, 0.5);
}
</style>

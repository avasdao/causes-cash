<template>
    <main>
        <v-card class="mx-auto" max-width="600" shaped color="#2f4858">
            <v-card-text>
                <h2 class="my-5 white--text">My Monthly PIF Budget</h2>

                <v-row class="mb-4" justify="space-between">
                    <v-col class="text-left">
                        <span class="subheading font-weight-light white--text mr-1">$</span>
                        <span
                            class="display-3 font-weight-light white--text"
                            v-text="displayAmountUSD"
                        ></span>

                        <span class="subheading font-weight-light white--text mr-1">.00</span>
                        <span class="subheading font-weight-light white--text mr-1">USD</span>
                    </v-col>
                </v-row>

                <v-slider
                    v-model="pledgeAmountUSD"
                    :color="color"
                    track-color="grey"
                    always-dirty
                    min="1"
                    max="10000"
                >
                    <template v-slot:prepend>
                        <v-icon
                            :color="color"
                            @click="decrement"
                        >
                            mdi-minus
                        </v-icon>
                    </template>

                    <template v-slot:append>
                        <v-icon
                            :color="color"
                            @click="increment"
                        >
                            mdi-plus
                        </v-icon>
                    </template>
                </v-slider>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="#8dc351">Min</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined>25%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined>50%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded dark outlined>75%</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded color="#8dc351">Max</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>

            <v-container>
                <v-btn x-large block dark color="#8dc351" class="my-5" @click="makePledge">
                    Make My Pledge
                </v-btn>
            </v-container>

            <v-card-text>
                <h3 class="white--text">(Optional) Pledge Details</h3>

                <v-select
                    class="my-3"
                    v-model="userType"
                    :hint="userType.comment"
                    :items="userTypes"
                    item-text="label"
                    item-value="value"
                    label="Select a user type"
                    dark
                    return-object
                    single-line
                ></v-select>

                <v-text-field
                    class="my-3"
                    label="Your nickname or label"
                    value=""
                    hint="Enter an identity for your pledge"
                    dark
                ></v-text-field>

                <v-text-field
                    class="my-3"
                    label="Your pledge comment"
                    value=""
                    hint="NOTE: Your comment will be displayed in public"
                    dark
                ></v-text-field>

                <v-text-field
                    class="my-3"
                    label="Your web link"
                    value=""
                    hint="This will display a (http/https) link from your pledge"
                    dark
                ></v-text-field>
            </v-card-text>

            <v-card-text class="mt-n10">
                <h3 class="my-5 white--text">(Optional) SLP / Token Details</h3>

                <v-text-field
                    class="my-3"
                    label="Your SLP address"
                    value=""
                    hint="May be used to offer rewards for supporters"
                    dark
                ></v-text-field>
            </v-card-text>
        </v-card>
    </main>
</template>

<script>
/* global _bitcoinWalletApi */

/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import numeral from 'numeral'

export default {
    data: () => ({
        pledgeAmountUSD: 40,
        interval: null,
        isPlaying: false,

        userType: { label: `I'm a Bitcoin user`, value: 'user', comment: `Casual user of cryptocurrencies` },
        userTypes: [
          { label: `I'm a Bitcoin user`, value: 'user', comment: `Casual user of cryptocurrencies` },
          { label: `I'm a Bitcoin developer`, value: 'developer', comment: `BUIDLer of crypto services` },
          { label: `I'm a Bitcoin investor`, value: 'investor', comment: `Investor in crypto services` },
        ],

        currentMinerFee: null,
        totalContractOutputValue: null,
        currentCommittedSatoshis: null,
        currentContributionCount: null,

    }),
    computed: {
        // ...mapGetters([
        //     'getHelp',
        // ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),

        color () {
            if (this.pledgeAmountUSD < 50) return 'grey'
            if (this.pledgeAmountUSD < 500) return 'teal'
            if (this.pledgeAmountUSD < 5000) return 'green'
            if (this.pledgeAmountUSD < 50000) return 'orange'
            return 'red'
        },

        animationDuration () {
            return `${60 / this.pledgeAmountUSD}s`
        },

        displayAmountUSD() {
            return numeral(this.pledgeAmountUSD).format('0,0')
        },

    },
    methods: {
        decrement () {
            this.pledgeAmountUSD--
        },

        increment () {
            this.pledgeAmountUSD++
        },

        toggle () {
            this.isPlaying = !this.isPlaying
        },

        makePledge() {

            if (window._bitcoinWalletApi) {
                const command = 'sendAssets'
                const messageId = command + (Date.now() + Math.random()).toString()
                const data = {
                    to: 'bitcoincash:qrd9khmeg4nqag3h5gzu8vjt537pm7le85lcauzezc',
                    protocol: 'BCH',
                    value: '0.000123',
                }

                const message = {
                    messageId,
                    command,
                    data,
                    websiteMetadata: {
                        title: `Causes Cash Pledge 😇`,
                        description: `You're about to contribute BCH to a community pledge campaign. Unless the campaign reaches its goal, your funds will never leave your wallet. \n\nYou can cancel your pledge at anytime.`,
                    },
                }

                _bitcoinWalletApi.receiveMessage = (_message) => {
                    console.log('SOMETHING CAME BACK FROM THE WALLET', _message);
                    this.debugOutput = JSON.stringify(_message, null, 2)

                  try {
                    if (typeof _message === 'string') {
                      _message = JSON.parse(_message);
                    }
                    const {
                      messageId,
                      data,
                      error,
                    } = _message;

                    const messageQueue = {}
                    const messageResolver = messageQueue[messageId];
                    if (messageResolver) {
                      const { resolve, timeout, reject } = messageResolver;
                      timeout && clearTimeout(timeout);
                      error ? reject(error) : resolve(data);
                    }
                  } catch (err) {
                      console.error(err)
                  }
                }

                window._bitcoinWalletApi.messageHandler(JSON.stringify(message));

                // const messageQueue = {}
                // const isBrowser = typeof window !== 'undefined';
                // const safeWindow = isBrowser ? window : global;

                // safeWindow._bitcoinWalletApi = safeWindow._bitcoinWalletApi ? safeWindow._bitcoinWalletApi : {};
                // _receiveMessage;

            } else {
                try {

                    console.log('WINDOW', window);
                    console.log('web4bch-1', window.web4bch)
                    console.log('currentProvider', window.web4bch.currentProvider)
                    const web4bch = new window.Web4Bch(window.web4bch.currentProvider)
                    console.log('web4bch-2', web4bch)
                    console.log('web4bch.currentProvider', web4bch.currentProvider)
                    console.log('web4bch.balance', web4bch.balance)
                    console.log('DEFAULT ACCOUNT', web4bch.bch.defaultAccount)

                    const _fromFixed = (_numberStr, _decimals) => {
                        return Number((Number(_numberStr) * Math.pow(10, _decimals)).toString().split('.')[0])
                    }

                    const to = 'bitcoincash:qrd9khmeg4nqag3h5gzu8vjt537pm7le85lcauzezc'
                    const value = '0.00013370'
                    const txParams = {
                        to,
                        from: web4bch.bch.defaultAccount,
                    }
                    txParams.value = _fromFixed(value, 8).toString()
                    console.log('VALUES', value, txParams.value);

                    web4bch.bch.sendTransaction(txParams, (err, txid) => {
                        if (err) {
                            const app = this.$f7
                            const title = 'ERROR'
                            const msg = JSON.stringify(err)
                            app.dialog.alert(msg, title)

                            if (err.message.includes('User denied transaction signature')) {
                                // return reject({
                                //     type: 'CANCELED',
                                //     data: err.message,
                                // })
                                return console.error('DENIED:', err)
                            }

                            // return reject({
                            //     type: 'SEND_ERROR',
                            //     data: err.message,
                            // })
                            return console.error('ERROR:', err)
                        } else {
                            // resolve({txid})
                            console.log('TXID', txid)
                        }
                    })

                } catch (err) {
                    console.error(err)

                    if (this.pledgeAmount > 1000000000) {
                        this.showingInsufficientSheet = true
                        console.log('OPENING INSUFICIENT');
                    } else {
                        this.showingPledgeSheet = true
                        console.log('OPENING PLEDGE');
                    }
                }

            }

            // const app = this.$f7
            // const title = 'Send Sample'
            // const msg = `Don't be cheap!`
            // app.dialog.alert(msg, title)

        },

        pay() {

            if (window._bitcoinWalletApi) {
                const command = 'getAddress'
                const messageId = command + (Date.now() + Math.random()).toString()
                const data = {
                    protocol: 'BCH',
                }

                const message = {
                    messageId,
                    command,
                    data,
                }

                _bitcoinWalletApi.receiveMessage = (_message) => {
                    console.log('SOMETHING CAME BACK FROM THE WALLET', _message);
                    this.debugOutput = JSON.stringify(_message, null, 2)

                  try {
                    if (typeof _message === 'string') {
                      _message = JSON.parse(_message);
                    }
                    const {
                      messageId,
                      data,
                      error,
                    } = _message;

                    const messageQueue = {}
                    const messageResolver = messageQueue[messageId];
                    if (messageResolver) {
                      const { resolve, timeout, reject } = messageResolver;
                      timeout && clearTimeout(timeout);
                      error ? reject(error) : resolve(data);
                    }
                  } catch (err) {
                      console.error(err)
                  }
                }

                window._bitcoinWalletApi.messageHandler(JSON.stringify(message));
            } else {
                // const url = 'bitcoincash:?r=https://bitpay.com/i/JbouTMQLKY4BCnRecDdD7R'
                // const data = {
                //     paymentRequestUrl: url,
                // }

                const app = this.$f7
                const title = 'Payment Error'
                const msg = `This feature is ONLY available on mobile wallets.`
                app.dialog.alert(msg, title)
            }

        },


    },
    created: function () {
        // this.totalContractOutputValue = ?
        // this.currentMinerFee = ?
        // this.currentCommittedSatoshis = ?
        // this.currentContributionCount = ?

    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>

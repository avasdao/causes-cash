<template>
    <main>
        <v-img
            :aspect-ratio="16/9"
            width="100%"
            src="./assets/mcp-banner.jpg"
        ></v-img>

        <div class="container">
            <div class="row">
                <!-- <div class="content-column col-lg-8 col-md-12 col-sm-12 order-2"> -->
                <div class="col-12">
                    <div class="inner-column">
                        <h2 class="mb-5 text-center">Welcome to MyCoinParty!</h2>

                        <p class="mb-0">
                            Our team has been working tirelessly since January of this year creating and delivering greater value to Bitcoin's BCH community;
                            <a href="https://causes.cash" target="_blank"><strong>Causes Cash</strong></a> has been our most public project to date, but we aim to use this final month of 2020 to showcase our hard-work by leveraging our
                            <a href="https://nitojs.org" target="_blank"><strong>NitoJS Library and SDK</strong></a> to finally bring
                            <a href="https://cashfusion.org" target="_blank"><strong>CashFusion</strong></a> to one of the first and most popular multi-crypto mobile wallets,
                            <a href="https://edge.app" target="_blank"><strong>Edge (formerly Airbitz)</strong></a>.
                        </p>

                        <div class="text-center my-5">
                            <h2 class="text-danger">
                                <strong>Bitcoin.com HushYourMoney</strong>
                                <br />is coming in Q1 2021
                            </h2>
                        </div>

                        <a href="https://lbry.tv/$/embed/BCHDevCon3-Hush-Your-Money-Presentation/7d2adb31d4db8ceb7dd0fac6108549d9cdaf07f8?r=CY4YhquVZJapZKiP4HHjMq7W3Yae9anX" target="_blank">
                            <v-img
                                center
                                width="100%"
                                src="https://i.imgur.com/PlSi1tM.png"
                            ></v-img>
                        </a>

                        <div class="text-center mt-1 mb-3">
                            <a href="https://github.com/BCHDEVCON3/hush-your-money" target="_blank">
                                <small><em>check out our BCHDevCon3 GitHub repository</em></small>
                            </a>
                        </div>

                        <p>
                            Through no affiliation, but in the spirit of the <a href="https://coinparty.org" target="_blank"><strong>BU CoinParty</strong></a>, we've forked our own little 2-week hackathon event to bring you a behind-the-scenes look at what it takes to build the next <strong>"killer app"</strong> in the world of crypto.
                        </p>

                        <p>
                            <strong>Admission is FREE!</strong>

                            But we'd sure appreciate your support in helping our team delivery the greatest privacy solution in all of crypto to your mobile device.
                        </p>

                    </div>
                </div>
            </div>

            <v-card
                class="my-0 mx-auto"
                max-width="400"
                color="#2f4858"
                shaped
            >
                <v-card-title>
                    <h3 class="white--text">Purchase MCP Tickets</h3>
                </v-card-title>

                <v-card-text>
                    <div class="form-group">
                        <v-text-field
                            type="number"
                            label="Ticket bonuses are calculated automatically"
                            placeholder="Enter amount in USD"
                            outlined
                            dark
                            v-model="usdSpent"
                            :disabled="!readyForCalc"
                        ></v-text-field>

                        <div class="text-right mt-n5">
                            <small class="mr-2 white--text">The cost of each MCP ticket is exactly <strong class="text-info">US$1.00</strong></small>
                        </div>

                        <div class="text-right mb-3">
                            <small class="mr-2 white--text">Curent BCH/USD exchange rate is <strong class="text-info">{{displayUSD}}</strong></small>
                        </div>
                    </div>

                    <hr />

                    <div class="white--text">
                        <h5>Early Bird Special Bonus</h5>
                        <h2 class="text-info mb-1">x2</h2>
                        <small>( <strong class="text-danger white--text">{{displayRemainingStage}}</strong> blocks until <strong class="text-danger">x2</strong> bonus )</small>
                    </div>

                    <hr />

                    <div class="white--text">
                        <h5>Block <strong class="text-danger">{{displayCurrentBlock}}</strong> Bonus</h5>
                        <h2 class="text-info mb-1">x{{displayBlockBonus}}</h2>
                        <small>( <strong class="text-danger">{{displayRemainingBlocks}}</strong> blocks remaining in MyCoinParty )</small>
                    </div>

                    <hr />

                    <div class="white--text">
                        <h5>Your Expected MCP Tickets</h5>
                        <h2 class="text-info mb-1">{{displayEstimatedTickets}}</h2>
                        <strong class="text-danger">{{displayEstimatedPct}}</strong> of total MCP ticket supply
                        <br /><small>( subject to market conditions )</small>
                    </div>
                </v-card-text>

                <v-container>
                    <v-btn
                        x-large
                        color="success"
                        block
                        @click="buyTickets()"
                    >
                        Make Payment Request
                    </v-btn>

                    <div class="text-center">
                        <small class="white--text">* read disclaimer before purchase</small>
                    </div>
                </v-container>
            </v-card>

            <div class="row">
                <div class="col-12">
                    <div class="inner-column">
                        <div class="text-center my-5">
                            <h3 class="text-danger">
                                TICKET BONUSES ARE REDUCED AFTER EVERY BLOCK...
                                <br /><h2 class="text-danger">SO DON'T WAIT!!</h2>
                            </h3>
                        </div>

                        <h3>Benefits for MCP ticket holders</h3>

                        <p>
                            <strong>We LOVE giving gifts!</strong>

                            For your support during our 2-week showcase, we've got some awesome goodies along with a once-in-a-lifetime governance vote to offer you:
                        </p>

                        <ul class="list-style-one mb-5">
                            <li>
                                Airdrop 2.1M Nito Cloud (NITO) tokens
                            </li>

                            <li>
                                Exclusive LIVE stream contests &amp; rewards
                            </li>

                            <li>
                                Vote on the 2021 Roadmap for Dark Edge
                            </li>

                            <li>
                                Future Bitcoin Please airdrops
                            </li>
                        </ul>

                        <h3>Airdrop 2.1M Nito Cloud (NITO) tokens</h3>

                        <p class="mb-3">
                            Nito.Cloud is poised to become one of the most exciting technology projects of 2021; as the first <strong>Content Delivery Protocol</strong> powered by Bitcoin's BCH blockchain.
                            Dark Edge is the first mobile application to support the new <strong>UNSTOPPABLE Web.</strong>
                        </p>

                        <p class="mb-0">
                            Every MyCoinParty (MCP) ticket will receive an even (proportional) share from the 2.1 MILLION tokens set to be airdropped on January 3rd, 2021.
                        </p>

                        <div class="mt-3 mb-0">
                            <strong>Learn more about Nito Cloud:</strong>

                            <ul class="ml-3 mb-1">
                                <li><a href="https://nito.cloud" target="_blank">https://nito.cloud</a></li>
                                <li><a href="https://canvas.nito.cloud" target="_blank">https://canvas.nito.cloud</a></li>
                                <li><a href="https://docs.nito.cloud" target="_blank">https://docs.nito.cloud</a></li>
                                <li><a href="https://tour.nito.cloud" target="_blank">https://tour.nito.cloud</a></li>
                            </ul>
                        </div>

                        <small class="text-danger"><strong>* NOTE:</strong> at least ONE MCP ticket is required to qualify for the NITO token airdrop</small>

                        <h3 class="mt-4">Exclusive LIVE stream contests & rewards</h3>

                        <p class="mb-5">
                            Ticket holders will be able to participate in daily vlog contests and giveaways.
                        </p>

                        <h3>Vote on the 2021 Roadmap for Dark Edge</h3>

                        <p class="mb-5">
                            Governance is important!
                            So we're offering to 2x your MCP tickets for all participants in our Roadmap governance voting.
                        </p>

                        <h3>Future Bitcoin Please airdrops</h3>

                        <p>
                            Even after the event, <strong>hold on to those tickets!</strong>
                            As our team continues to develop new ideas and applications, we'll be looking to offer additional airdrops to MyCoinParty ticket holders.

                            <br /><small class="text-danger"><strong>* NOTE:</strong> any tickets you've transferred for voting and/or staking will be re-minted after the event</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
/* global BigInt */

/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import bitcoincomLink from 'bitcoincom-link'
import Nito from 'nitojs'
import numeral from 'numeral'
import Swal from 'sweetalert2'

const MCP_VENDING_ADDRESS = 'bitcoincash:qzpwncftddx7f59z93w4qv4hnj4as335vvz8gftqvr'

export default {
    components: {
        //
    },
    props: {
        isOpen: Boolean,
    },
    data: () => ({
        usd: null,
        usdSpent: null,
        totalTickets: null,
        stageBonus: null,
        nextStage: null,

        ticketActivity: null,

        currentBlock: null,
        finalBlock: null,
        remainingBlocks: null,
        remainingStage: null,
    }),
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),

        displayUSD() {
            if (!this.usd) {
                return '$0.00'
            }

            return numeral(this.usd).format('$0,0.00')
        },

        displayCurrentBlock() {
            if (!this.currentBlock) {
                return 0
            }

            return '#' + numeral(this.currentBlock).format('0,0')
        },

        displayRemainingStage() {
            if (!this.remainingStage) {
                return 0
            }

            return numeral(this.remainingStage).format('0,0')
        },

        displayRemainingBlocks() {
            if (!this.remainingBlocks) {
                return 0
            }

            return numeral(this.remainingBlocks).format('0,0')
        },

        blockBonus() {
            if (!this.remainingBlocks) {
                return 0
            }

            // NOTE: Divide by the average blocks per day
            //       Add one day so we don't "fractionally" reduce last day purchases.
            return (this.remainingBlocks / 144) + 1.00
        },

        displayBlockBonus() {
            if (!this.blockBonus) {
                return 0
            }

            return numeral(this.blockBonus).format('0,0.0000')
        },

        estimatedTickets() {
            if (!this.usdSpent || !this.blockBonus) {
                return 0
            }

            return BigInt(this.stageBonus)
                * BigInt(parseInt(this.blockBonus * 10000))
                * BigInt(parseInt(this.usdSpent * 100))
                * BigInt(10 * 10**8) // 8 decimal places
                / BigInt(1000000)
        },

        displayEstimatedTickets() {
            if (!this.estimatedTickets) {
                return 0
            }

            return numeral(this.estimatedTickets / BigInt(10 * 10**8)).format('0,0')
        },

        estimatedPct() {
            if (!this.estimatedTickets) {
                return 0
            }

            return this.estimatedTickets * BigInt(10000) / (this.totalTickets + this.estimatedTickets)
        },

        displayEstimatedPct() {
            if (!this.estimatedPct) {
                return '0.00%'
            }

            return numeral(this.estimatedPct.toString() / 10000).format('0.00%')
        },

        readyForCalc() {
            if (!this.blockBonus) {
                return false
            }

            return true
        },

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        /**
         * Set Clipboard
         */
        copyAddress() {
            try {
                const textArea = document.createElement('textarea')
                textArea.value = MCP_VENDING_ADDRESS
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
            } catch (err) {
                console.error(err) // eslint-disable-line no-console

                /* Bugsnag alert. */
                throw new Error(err)
            }

            /* Set title. */
            const title = 'Done!'

            /* Set message. */
            const message = `Tickets address copied to your clipboard`

            /* Set icon. */
            const icon = 'info'

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            })

            /* Fire toast. */
            Toast.fire(title, message, icon)
        },

        buyTickets() {

            if (!this.usdSpent > 0) {
                Swal.fire({
                    title: 'How many tickets?',
                    text: `Please 'Enter amount in USD' for 'Your Expected MCP Tickets' to be calculated.`,
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                })

                return
            }

            const providerStatuses = bitcoincomLink.getWalletProviderStatus()
            if (
                providerStatuses && (
                providerStatuses.badger === 'LOGGED_IN'
                || providerStatuses.android === 'AVAILABLE'
                || providerStatuses.ios === 'AVAILABLE'
            )) {
                const pkg = {
                    to: MCP_VENDING_ADDRESS,
                    protocol: 'BCH',
                    value: (this.usdSpent / this.usd).toFixed(8),
                    websiteMetadata: {
                        title: `MyCoinParty (MCP) Tickets`,
                        description: `Thanks SOOO much for your support! You'll receive approx ${this.displayEstimatedTickets} tickets to this wallet very shortly.`,
                    },
                }
                console.log('SEND ASSETS (pkg):', pkg)

                bitcoincomLink.sendAssets(pkg)
                .then(data => {
                    const {
                        txid,
                    } = data

                    console.log('Completed transaction id: ' + txid)
                })
                .catch((type, description, data) => {
                    console.log('ERROR (type):', type)
                    console.log('ERROR (description):', description)
                    console.log('ERROR (data):', data)

                    switch(type) {
                    case 'NO_PROVIDER':
                        console.log('No provider available.')
                        break
                    case 'PROTOCOL_ERROR':
                        console.log('The provided protocol is not supported by this wallet.')
                        break
                    case 'SEND_ERROR':
                        console.log('There was an error when broadcasting this transaction to the network.')
                        break
                    case 'MALFORMED_INPUT':
                        console.log('The input provided is not valid.')
                        break
                    case 'CANCELED':
                        console.log('The user has canceled this transaction request.')
                        break
                    }
                })
            }

        },

    },
    created: async function () {
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        console.log('USD', this.usd)

        const request = {
            v: 3,
            q: {
                db: ['c', 'u'],
                find: {
                    $and: [
                        {'slp.valid': true},
                        {'slp.detail.tokenIdHex': 'fcc68073e8c70c70386fd41c51b61a74897e953d1c774d281dcc9127dc97221c'},
                        {'slp.detail.transactionType': 'MINT'}
                    ]
                },
            },
            r: {
                f: '[ .[] | { slp } ]'
            }
        }

        this.ticketActivity = await Nito.SLP.Query.request(request)
        // console.log('TICKET ACTIVITY (all)', this.ticketActivity)

        /* Initialize total ticket count. */
        this.totalTickets = BigInt(0)

        // NOTE: Confirmed
        Object.keys(this.ticketActivity.c).forEach(txNum => {
            const tx = this.ticketActivity.c[txNum]
            // console.log('TICKET TRANSACTION', tx)

            // const address = tx.slp.detail.outputs[0].address
            // console.log('CONFIRMED TICKET TRANSACTION (address)', address)

            const amount = BigInt(tx.slp.detail.outputs[0].amount * (10 * 10**8))
            // console.log('CONFIRMED TICKET TRANSACTION (amount)', amount)
            this.totalTickets += amount
        })

        // NOTE: Unconfirmed
        Object.keys(this.ticketActivity.u).forEach(txNum => {
            const tx = this.ticketActivity.u[txNum]
            // console.log('TICKET TRANSACTION', tx)

            const address = tx.slp.detail.outputs[0].address
            console.log('UNCONFIRMED TICKET TRANSACTION (address)', address)

            const amount = BigInt(tx.slp.detail.outputs[0].amount * (10 * 10**8))
            console.log('UNCONFIRMED TICKET TRANSACTION (amount)', amount)
            this.totalTickets += amount
        })

        // this.currentBlock = 664875
        this.currentBlock = await Nito.Blockchain.Query.getBlockHeight()
        console.log('CURRENT BLOCK', this.currentBlock)

        // this.totalTickets = BigInt(30575416667)
        console.log('TOTAL TICKETS', this.totalTickets)

        // FIXME: This MUST be dynamically tied to the current block height.
        this.stageBonus = 2
        console.log('STAGE BONUS', this.stageBonus)

        this.nextStage = 671235 // ~1/20 (end-of-day)
        console.log('NEXT STAGE', this.nextStage)

        this.finalBlock = 673000 // 1/31 (end-of-day)
        console.log('FINAL BLOCK', this.finalBlock)

        this.remainingStage = this.nextStage - this.currentBlock
        console.log('REMAINING STAGE', this.remainingStage)

        this.remainingBlocks = this.finalBlock - this.currentBlock
        console.log('REMAINING BLOCKS', this.remainingBlocks)

        // this.usdSpent = 0
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.vending-qrcode {
    width: 320px;
    height: 320px;
}

.vending-link {
    text-decoration: none;
}

div h5 {
    font-size: 1.4em;
}

hr {
    margin: 10px 0;
}
</style>

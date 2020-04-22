<template>
    <div class="home">

        <!-- <div class="preloading">
            <div class="preloader loading">
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
            </div>
        </div> -->

        <div id="wrapper">
            <Header />

            <main id="main" class="site-main">
                <Slideshow />
                <PIF />

                <div class="how-it-work">
                    <div class="container">
                        <h2 class="title">See How It Work</h2>
                        <div class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="item-work">
                                    <div class="item-icon"><span>01</span><i class="fa fa-flask" aria-hidden="true"></i></div>
                                    <div class="item-content">
                                        <h3 class="item-title">Discover Ideas</h3>
                                        <div class="item-desc">
                                            <p>A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="item-work">
                                    <div class="item-icon"><span>02</span><i class="fa fa-leaf" aria-hidden="true"></i></div>
                                    <div class="item-content">
                                        <h3 class="item-title">Create a NEW Cause</h3>
                                        <div class="item-desc">
                                            <p>Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="item-work">
                                    <div class="item-icon"><span>03</span><i class="fa fa-money" aria-hidden="true"></i></div>
                                    <div class="item-content">
                                        <h3 class="item-title">Get Funded</h3>
                                        <div class="item-desc">
                                            <p>Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Discover />
                <Articles />

                <!-- .latest -->
                <!-- .story -->
                <div class="partners">
                    <div class="container">
                        <div class="partners-slider owl-carousel">
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-01.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-02.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-03.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-04.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-05.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-06.png" alt=""></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- .partners -->
            </main>
            <!-- .site-main -->

            <Footer />
        </div>
        <!-- #wrapper -->

    </div>
</template>

<script>
/* Import views. */
import Articles from '@/views/Welcome/Articles.vue'
import Discover from '@/views/Welcome/Discover.vue'

/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import PIF from '@/components/PIF.vue'
import Slideshow from '@/components/Slideshow.vue'

/* Initialize ethers. */
import { ethers } from 'ethers'

/* Initialize BITBOX. */
// const bitbox = new window.BITBOX()

export default {
    components: {
        Discover,
        Articles,

        Footer,
        Header,
        PIF,
        Slideshow,
    },
    methods: {
        async initEthers () {
            console.log('ETHERS')

            if (typeof web3 !== 'undefined') {
              const provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
              const balance = await provider.getBalance('0x27a9b30DBe015842098F4CD31f0301a1cEE74bfe')
              console.log('BALANCE', balance)

              var etherString = ethers.utils.formatEther(balance)
              console.log("Balance: " + etherString);

              const signer = provider.getSigner()
              console.log('SIGNER', signer)

              const message = 'hi there!'

              const sig = await signer.signMessage(message)
              console.log('SIG', sig)
            }
        },

        // async initEthereum () {
        //     if (window.ethereum) {
        //         window.web3 = new Web3(ethereum)
        //         // const provider = new ethers.providers.Web3Provider(web3.currentProvider)
        //
        //         try {
        //             // Request account access if needed
        //             console.log('window.ethereum')
        //
        //             ethereum.enable()
        //         } catch (error) {
        //             // User denied account access...
        //         }
        //     } else if (window.web3) { // Legacy dapp browsers...
        //         window.web3 = new Web3(web3.currentProvider)
        //
        //         console.log('window.currentProvider')
        //         // Acccounts always exposed
        //     } else { // Non-dapp browsers...
        //         alert('Non-Ethereum browser detected.\nYou should consider trying MetaMask!')
        //     }
        //
        //     /* Validate web3. */
        //     if (window.web3) {
        //         /* Retrieve accounts. */
        //         const accounts = await window.web3.eth.getAccounts()
        //
        //         if (typeof accounts !== 'undefined') {
        //             /* Set address. */
        //             const defaultAddress = accounts[0]
        //
        //             console.log('Default address', defaultAddress)
        //
        //             this.profileAddress = defaultAddress
        //         }
        //     }
        // },

        createSSPKWallet() {
            console.log('SEND DONATION')

            if (typeof window.web4bch !== 'undefined') {
                /* Initialize Web4BCH. */
                const web4bch = new window.Web4Bch(window.web4bch.currentProvider)
                console.log('web4bch', web4bch)

                /* Validate web4BCH. */
                if (!web4bch) {
                    // return installBadger()
                }

                console.log('DEFAULT ACCOUNT', web4bch.bch.defaultAccount)

                /* Validate account. */
                if (web4bch.bch && web4bch.bch.defaultAccount === undefined) {
                    alert('please unlock your badgerwallet');
                }

                /* Set transaction parameters. */
                // const txParams = {
                //     to: donationAddress,
                //     from: web4bch.bch.defaultAccount,
                //     value: donationAmount
                // }

                /* Initialize transaction function. */
                // const txFunc = (err, res) => {
                //     if (err) {
                //         console.error('ERROR: sendTransaction', err)
                //
                //         console.log('ERROR MSG', err.message)
                //
                //         /* Validate user approval. */
                //         if (err && err.message) {
                //             if (err.message.indexOf('User denied transaction signature') !== -1) {
                //                 // FIXME: Add a modal message here.
                //                 alert('User rejected the signature transaction.')
                //             }
                //         }
                //
                //         return
                //     }
                //
                //     console.log('TRANSACTION RESULT', res)
                // }

                /* Set signature text. */
                // const sigText = 'somethingnice'
                // const sigText = {
                //     data: 'hi-there!'
                // }
                /* Set signature request. */
                // const sigRequest = {
                //     type: 'eth_sign',
                //     data: 'cashid:',
                // }
                // const sigRequest = '0x' + Buffer.from(sigText, 'utf8').toString('hex')
                // const sigRequest = JSON.stringify(sigText)
                // const sigRequest = 'cashid:api.causes.cash/v1/cashid?x=476431778'
                // const sigRequest = 'cashid:localhost?x=476431778'
                // const sigRequest = 'cashid:'
                // console.log('SIGNATURE REQUEST', sigRequest)

                /* Send transaction. */
                // web4bch.bch.sendTransaction(txParams, txFunc)
                // console.log('WEB4BCH.BCH', web4bch)
                // web4bch.personal.sign(
                //     'qr5cv5xee23wdy8nundht82v6637etlq3u6kzrjknk',
                //     'hi there!'
                // )
                // web4bch.bch.sign(
                //     web4bch.bch.defaultAccount,
                //     sigRequest,
                //     (err, res) => {
                //         console.log('SIGN ERROR', err)
                //         console.log('SIGN RESULT', res)
                //     }
                // )
             } else {
                 /* Install Badger. */
                 // installBadger()
             }

        },
    },
    created: function () {
        console.log('WEB4BCH', window.web4bch)
        // window.web4bch.bch.sign(
        //     window.web4bch.bch.defaultAccount,
        //     'hello world',
        //     (err, res) => {
        //         console.log('SIGN ERROR', err)
        //         console.log('SIGN RESULT', res)
        //     }
        // )
        // this.createSSPKWallet()
        // this.initEthereum()
        // this.initEthers()
    },
}
</script>

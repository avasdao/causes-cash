<template>
    <header id="header" class="site-header">
        <div class="top-header clearfix">
            <div class="container">
                <ul class="socials-top">
                    <li><a href="https://twitter.com/search?q=%23BitcoinCauses" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="https://reddit.com/r/CausesCash" target="_blank"><i class="fa fa-reddit" aria-hidden="true"></i></a></li>
                    <li><a href="https://github.com/modenero/causes-cash" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a></li>
                </ul>
                <div class="phone"><em>Bring YOUR Cause to the Blockchain</em></div>
            </div>
        </div>

        <div class="content-header">
            <div class="container">
                <div class="site-brand">
                    <a href="/"><img src="https://preview.thememusion.com/ideapress/images/assets/logo.png" alt=""></a>
                </div>

                <div class="right-header">
                    <nav class="main-menu">
                        <button class="c-hamburger c-hamburger--htx"><span></span></button>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="javascript://">Discover</a>
                            </li>
                            <li>
                                <a href="javascript://">Causes<i class="fa fa-caret-down" aria-hidden="true"></i></a>
                                <ul class="sub-menu">
                                    <li><a href="javascript://">Create a campaign</a></li>
                                    <li><a href="javascript://">Manage a campaign</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript://">Contact</a></li>
                            <li>
                                <a href="javascript://">Account<i class="fa fa-caret-down" aria-hidden="true"></i></a>
                                <ul class="sub-menu">
                                    <li><a href="javascript://">Dashboard</a></li>
                                    <li><a href="javascript://">Profile</a></li>
                                    <li><a href="javascript://">My Causes</a></li>
                                    <li><a href="javascript://">Pledges Received</a></li>
                                    <li><a href="javascript://">Backed Causes</a></li>
                                    <li><a href="javascript://">Rewards</a></li>
                                    <li><a href="javascript://">Payments</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    <div class="search-icon">
                        <a href="javascript://" class="ion-ios-search-strong"></a>

                        <div class="form-search"></div>

                        <form action="javascript://" method="POST" id="searchForm">
                            <input type="text" value="" name="search" placeholder="Search..." />
                            <button type="submit" value=""><span class="ion-ios-search-strong"></span></button>
                        </form>
                    </div>

                    <div class="login login-button">
                        <a href="javascript://" class="btn-primary" @click="signIn">Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Initialize Web3. */
// const Web3 = require('web3')

export default {
    data: () => {
        return {
            //
        }
    },
    methods: {
        async signIn() {
            // const web3 = new Web3(window.ethereum)
            // const address = await web3.eth.getCoinbase()
            // web3.eth.sign('0x74657374206d657373616765', address)
            //     .then(console.log)

            // var hash = web3.utils.sha3('hi there!')
            // web3.eth.personal.sign(hash, address)
            //     .then(console.log)
            // web3.eth.personal.sign('hi there!', address)
            //     .then(console.log)

            // const message = 'hi there!'
            // const prefixed = web3.utils.keccak256("\x19Ethereum Signed Message:\n" + message.length + message)
            // console.log('PREFIXED', prefixed)

            // web3.eth.sign(
            //     message,
            //     address,
            //     (err, res) => {
            //         console.log('SIGN ERROR', err)
            //         console.log('SIGN RESULT', res)
            //     }
            // )
                // .then(console.log)

            // const account = await window.web3.eth.getCoinbase()
            // console.log('ACCOUNT', account)
            //
            // let mySig = null
            //
            // const result = await window.web3.eth.sign('test message', account)
            //     .then(sig => {
            //         console.log('SIGNATURE', sig)
            //     })
            // // const result = await window.web3.eth.sign('0x74657374206d657373616765', account)
            // console.log('SIGNING RESULT', result)
        },
    },
    created: function () {
        // const web3 = new Web3(window.ethereum)
        // web3.eth.getAccounts().then(console.log)
        // const test = Buffer.from('686920746865726521', 'hex')
        // console.log('DECODED', test.toString('utf8'))
    }
}
</script>

<style scoped>
/*  */
</style>

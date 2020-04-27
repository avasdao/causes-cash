<template>
    <header id="header" class="site-header">
        <div class="top-header clearfix">
            <div class="container">
                <ul class="socials-top">
                    <li><a href="https://twitter.com/search?q=%23BitcoinCauses" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="https://reddit.com/r/CausesCash" target="_blank"><i class="fa fa-reddit" aria-hidden="true"></i></a></li>
                    <li><a href="https://gitlab.com/bchplease/causes.cash" target="_blank"><i class="fa fa-gitlab" aria-hidden="true"></i></a></li>
                </ul>

                <div class="slogan">
                    <em class="text-muted">
                        Raising <strong>Bitcoin Cash</strong> and the <strong>Freedom to Wealth™</strong>
                    </em>
                </div>
            </div>
        </div>

        <div class="content-header">
            <div class="container">
                <div class="site-brand">
                    <router-link to="/" exact>
                        <img src="@/assets/logo.png" alt="">
                    </router-link>
                </div>

                <div class="right-header">
                    <nav class="main-menu">
                        <button class="c-hamburger c-hamburger--htx">
                            <span></span>
                        </button>

                        <ul>
                            <li>
                                <router-link to="/" exact>Home</router-link>
                            </li>

                            <li>
                                <router-link to="/discover">Discover</router-link>
                            </li>

                            <li>
                                <a href="javascript://">
                                    Causes<i class="fa fa-caret-down" aria-hidden="true"></i>
                                </a>

                                <ul class="sub-menu">
                                    <li>
                                        <router-link to="/create">Create a cause</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/manage">Manage a cause</router-link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <router-link to="/contact">Contact</router-link>
                            </li>

                            <li>
                                <a href="javascript://">
                                    Account<i class="fa fa-caret-down" aria-hidden="true"></i>
                                </a>

                                <ul class="sub-menu">
                                    <li>
                                        <router-link to="/account/dashboard">Dashboard</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/account/profile">My Profile</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/account/causes">My Causes</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/account/backing">Backed Causes</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/account/received">Pledges Received</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/account/rewards">Rewards</router-link>
                                    </li>

                                    <li>
                                        <router-link to="/account/payments">Payments</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    <div class="search-icon">
                        <a href="javascript://" class="ion-ios-search-strong"></a>

                        <div class="form-search"></div>

                        <form action="javascript://" method="POST" id="searchForm">
                            <input type="text" value="" name="search" placeholder="What are you looking for?" />

                            <button type="submit" value="">
                                <span class="ion-ios-search-strong"></span>
                            </button>
                        </form>
                    </div>

                    <div class="login login-button signin-btn">
                        <a href="javascript://" class="btn-primary" @click="signIn">Sign In</a>

                        <div class="form-signin"></div>

                        <form action="javascript://" method="POST" id="signinForm">
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    &nbsp;
                                    <!-- offset fix -->
                                </div>

                                <label for="inputEmail3" class="col-sm-2 col-form-label">
                                    Email
                                </label>

                                <div class="col-sm-6">
                                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    &nbsp;
                                    <!-- offset fix -->
                                </div>

                                <label for="inputPassword3" class="col-sm-2 col-form-label">
                                    Password
                                </label>

                                <div class="col-sm-6">
                                    <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    &nbsp;
                                    <!-- offset fix -->
                                </div>

                                <div class="col-sm-8 text-right">
                                    <button type="submit" class="btn btn-primary">Sign in</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </header>
</template>

<script>
/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    data: () => {
        return {
            //
        }
    },
    methods: {
        async signIn() {
            // alert('This feature is currently unavailable.')
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
    },
    mounted: function () {
        /* Search handler. */
        $('.search-icon a').on('click', function (e) {
            e.preventDefault()

            $(this).parent().find('.form-search').fadeToggle()
            $(this).parent().find('#searchForm').fadeToggle()
        })
        $('.form-search').on('click', function (e) {
            e.preventDefault()

            $(this).fadeToggle()
            $(this).parent().find('#searchForm').fadeToggle()
        })

        /* Signin handler. */
        $('.signin-btn a').on('click', function (e) {
            e.preventDefault()

            $(this).parent().find('.form-signin').fadeToggle()
            $(this).parent().find('#signinForm').fadeToggle()
        })
        $('.form-signin').on('click', function (e) {
            e.preventDefault()

            $(this).fadeToggle()
            $(this).parent().find('#signinForm').fadeToggle()
        })

		// $('.button-popup').on('click', function (e) {
		// 	e.preventDefault()
        //     $('.popup').addClass('open')
        // })
        // $('.close').on('click', function () {
        //     $('.popup').removeClass('open')
        // })

    },
}
</script>

<style scoped>
.slogan strong {
    font-weight: 500;
}

/* Search */
.form-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 99;
    display: none;
}
.search-icon form {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    max-width: 960px;
    margin: 0 auto;
    line-height: 60px;
    border-radius: 3px;
    overflow: hidden;
    z-index: 9999;
    display: none;
    padding: 0 15px;
}
.search-icon form input {
    width: 100%;
    padding: 0 73px 0 15px;
    line-height: 60px;
    border: 0;
    border-radius: 3px;
    overflow: hidden;
}
.search-icon form button {
    position: absolute;
    top: 0;
    right: 15px;
    bottom: 0;
    border: 0;
    background-color: #fff;
    padding: 0 20px;
    border-radius: 3px;
    overflow: hidden;
}
.search-icon form button span {
    font-size: 24px;
    vertical-align: -6px;
}

/* Signin */
.form-signin {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 99;
    display: none;
}
.signin-btn form {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    max-width: 960px;
    margin: 0 auto;
    line-height: 60px;
    border-radius: 3px;
    overflow: hidden;
    z-index: 9999;
    display: none;
    /* padding: 0 15px; */

    background-color: rgba(180, 180, 180, 0.9);
    padding: 50px 0 30px;
}
.signin-btn form input {
    width: 100%;
    padding: 0 73px 0 15px;
    line-height: 60px;
    border: 0;
    border-radius: 3px;
    overflow: hidden;
}

</style>

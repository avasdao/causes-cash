<template>
    <header id="header" class="site-header">
        <div class="top-header clearfix">
            <div class="container">
                <ul class="socials-top">
                    <li>
                        <a href="https://twitter.com/search?q=%23BitcoinCauses" target="_blank">
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                    </li>

                    <li>
                        <a href="https://reddit.com/r/CausesCash" target="_blank">
                            <i class="fa fa-reddit" aria-hidden="true"></i>
                        </a>
                    </li>

                    <li>
                        <a href="https://gitlab.com/bchplease/causes.cash" target="_blank">
                            <i class="fa fa-gitlab" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>

                <div class="slogan">
                    <em class="text-muted">
                        <strong>Uncensorable</strong> Funding For <strong>Radical</strong> Creators
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
                                <router-link to="/" exact>
                                    Home
                                </router-link>
                            </li>

                            <li>
                                <router-link to="/discover">
                                    Discover
                                </router-link>
                            </li>

                            <li>
                                <a href="javascript://">
                                    Causes<i class="fa fa-caret-down" aria-hidden="true"></i>
                                </a>

                                <ul class="sub-menu">
                                    <li>
                                        <!-- <router-link to="/create"> -->
                                        <router-link to="/">
                                            Create a cause
                                        </router-link>
                                    </li>

                                    <li>
                                        <!-- <router-link to="/manage"> -->
                                        <router-link to="/">
                                            Manage a cause
                                        </router-link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <router-link to="/contact">
                                    Contact
                                </router-link>
                            </li>

                            <li v-if="hasAuth">
                                <a href="javascript://">
                                    My Account<i class="fa fa-caret-down" aria-hidden="true"></i>
                                </a>

                                <ul class="sub-menu">
                                    <li>
                                        <div class="nav-section-title">
                                            Your Public Information
                                            <br /><span>(published transparently)</span>
                                        </div>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname">
                                            Profile
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/campaigns'">
                                            Campaigns
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/payments'">
                                            Payments Received
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/rewards'">
                                            Rewards Received
                                        </router-link>
                                    </li>

                                    <li>
                                        <div class="nav-section-title">
                                            Your Private Information
                                            <br /><span>(encryption + anonymity)</span>
                                        </div>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/dashboard'">
                                            Dashboard
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/wallet'">
                                            Cash Wallet
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/received'">
                                            Pledges Received
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/backing'">
                                            Backed Causes
                                        </router-link>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </nav>

                    <div class="search-icon">
                        <a href="javascript://" class="ion-ios-search-strong"></a>

                        <div class="form-search"></div>

                        <form action="javascript://" method="POST" id="searchForm">
                            <input
                                type="text"
                                value=""
                                name="search"
                                placeholder="What are you looking for?"
                            >

                            <button type="submit" value="">
                                <span class="ion-ios-search-strong"></span>
                            </button>
                        </form>
                    </div>

                    <Signin />
                </div>
            </div>
        </div>
    </header>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import components. */
import Signin from './Header/Signin'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        Signin,
    },
    data: () => {
        return {
            //
        }
    },
    computed: {
        ...mapGetters('profile', [
            'getNickname',
        ]),

        /**
         * Has Authorization
         */
        hasAuth() {
            // TODO: Improve authorization scheme.
            if (this.getNickname) {
                return true
            } else {
                return false
            }
        },

    },
    methods: {
        //
    },
    created: function () {
        //
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

    },
}
</script>

<style scoped>
/*------------------------------------------------------------------
2. Header / #header
-------------------------------------------------------------------*/
.top-header{
    /* padding: 12px 0; */
    background-color: #f9fbfb;
}
.top-header .slogan {
    float: right;
    color: #6a6a6a;
}

ul.socials-top{
    float: left;
}
ul.socials-top li{
    list-style: none;
    display: inline-block;
    margin-right: 12px;
}
ul.socials-top li:last-child{
    margin-right: 0;
}
ul.socials-top li i{
    color: #6a6a6a;
}
ul.socials-top li:hover i{
    color: #00a6eb;
}
.site-header.fixed{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 99;
    -webkit-box-shadow: 0 3px 3px rgba(0,0,0,.1);
    -moz-box-shadow: 0 3px 3px rgba(0,0,0,.1);
    box-shadow: 0 3px 3px rgba(0,0,0,.1);
}
.site-header .container{
    position: relative;
}
.site-header .site-brand{
    float: left;
    /* line-height: 80px; */
}
.site-header .right-header{
    float: right;
}
.site-header .login .btn-primary{
    height: 38px;
    line-height: 38px;
}
.site-header .login,
.site-header .search-icon,
.site-header .main-menu{
    display: inline-block;
    margin-left: 45px;
    /* line-height: 80px; */
}
.site-header .main-menu,
.site-header .main-menu li:first-child{
    margin-left: 0px;
}
.site-header .login a{
    display: inline-block;
}
.site-header .search-icon a{
    font-size: 22px;
    line-height: normal;
    display: inline-block;
    vertical-align: middle;
    padding: 0 5px;
}
.main-menu ul{
    letter-spacing: -0.3em;
}
.main-menu ul li{
    list-style: none;
    display: inline-block;
    letter-spacing: normal;
    margin-left: 35px;
    position: relative;
}
.main-menu ul li i{
    display: none;
}
.main-menu ul li > .sub-menu{
    position: absolute;
    top: 100px;
    z-index: 99;
    width: 200px;
    left: 0;
    background-color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s;
}
.main-menu ul li:hover > .sub-menu{
    top: 80px;
    visibility: visible;
    opacity: 1;
}
.main-menu ul li > .sub-menu li{
    line-height: normal;
    display: block;
    margin: 0;
    border-top: 1px solid #ededed;
}
.main-menu ul li > .sub-menu li a{
    padding: 12px 15px;
}
.main-menu ul li a{
    color: #20222b;
}
.main-menu ul li:hover > a{
    color: #00a6eb;
}

/*  */

.slogan strong {
    font-weight: 500;
}

.nav-section-title {
    margin: 10px 0 5px 15px;
    font-size: 0.8em;
    font-weight: 600;
    color: rgba(255, 90, 90, 0.8);
}
.nav-section-title span {
    font-weight: 500;
    color: rgba(150, 150, 150, 0.8);
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

</style>

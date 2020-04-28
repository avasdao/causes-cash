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
                        Raising <strong>Bitcoin Cash</strong> and the
                        <strong>Freedom to Wealth™</strong>
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
                                        <router-link to="/create">
                                            Create a cause
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link to="/manage">
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
                                        <router-link :to="'/@' + getNickname + '/dashboard'">
                                            Dashboard
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname">
                                            My Profile
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/causes'">
                                            My Causes
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/backing'">
                                            Backed Causes
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/received'">
                                            Pledges Received
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/rewards'">
                                            Rewards
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link :to="'/@' + getNickname + '/payments'">
                                            Payments
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
.top-header .slogan {
    float: right;
    color: #6a6a6a;
}
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

</style>

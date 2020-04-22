import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../views/Welcome.vue'

/* Account. */
import AccountBacking from '../views/Account/Backing.vue'
import AccountCampaigns from '../views/Account/Campaigns.vue'
import AccountDashboard from '../views/Account/Dashboard.vue'
import AccountPayments from '../views/Account/Payments.vue'
import AccountProfile from '../views/Account/Profile.vue'
import AccountReceived from '../views/Account/Received.vue'
import AccountRewards from '../views/Account/Rewards.vue'

import ComingSoon from '../views/ComingSoon.vue'
import Details from '../views/Details.vue'
import FAQ from '../views/FAQ.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Welcome
}, {
    path: '/account/backing',
    component: AccountBacking
}, {
    path: '/account/campaigns',
    component: AccountCampaigns
}, {
    path: '/account/dashboard',
    component: AccountDashboard
}, {
    path: '/account/payments',
    component: AccountPayments
}, {
    path: '/account/profile',
    component: AccountProfile
}, {
    path: '/account/received',
    component: AccountReceived
}, {
    path: '/account/rewards',
    component: AccountRewards
}, {
    path: '/coming-soon',
    component: ComingSoon
}, {
    path: '/details',
    component: Details
}, {
    path: '/faq',
    component: FAQ
}]

const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    mode: 'hash',
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

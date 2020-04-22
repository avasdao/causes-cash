import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../views/Welcome.vue'

/* Account. */
import AccountBacking from '../views/Account/Backing.vue'
import AccountCauses from '../views/Account/Causes.vue'
import AccountDashboard from '../views/Account/Dashboard.vue'
import AccountPayments from '../views/Account/Payments.vue'
import AccountProfile from '../views/Account/Profile.vue'
import AccountReceived from '../views/Account/Received.vue'
import AccountRewards from '../views/Account/Rewards.vue'

/* Causes. */
import CauseCreate from '../views/Cause/Create.vue'
import CauseDetails from '../views/Cause/Details.vue'
import CauseDiscover from '../views/Cause/Discover.vue'
import CauseManage from '../views/Cause/Manage.vue'

/* Coming soon. */
import ComingSoon from '../views/ComingSoon.vue'

/* Contact. */
import Contact from '../views/Contact.vue'

/* FAQ. */
import FAQ from '../views/FAQ.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Welcome
}, {

    /* Account. */
    path: '/account/backing',
    component: AccountBacking
}, {
    path: '/account/causes',
    component: AccountCauses
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
    path: '/account/rewards',
    component: AccountRewards
}, {

    /* Causes. */
    path: '/create',
    component: CauseCreate
}, {
    // TODO: Create alias for UUID at root.
    //       eg. https://causes.cash/ffcf25d3-103e-406d-8551-007d8680bb0e
    path: '/details',
    component: CauseDetails
}, {
    path: '/discover',
    component: CauseDiscover
}, {
    // TODO: Create alias for UUID at root.
    //       eg. https://causes.cash/ffcf25d3-103e-406d-8551-007d8680bb0e/manage
    path: '/manage',
    component: CauseManage
}, {

    /* Coming soon. */
    path: '/coming-soon',
    component: ComingSoon
}, {

    /* Contact. */
    path: '/contact',
    component: Contact
}, {

    /* FAQ. */
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

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
    path: '/@*/backing',
    component: AccountBacking
}, {
    path: '/@*/causes',
    component: AccountCauses
}, {
    path: '/@*/dashboard',
    component: AccountDashboard
}, {
    path: '/@*/payments',
    component: AccountPayments
}, {
    path: '/@*/profile',
    // TODO: Do we still need this??
    component: AccountProfile
}, {
    path: '/@*/received',
    component: AccountReceived
}, {
    path: '/@*/rewards',
    component: AccountRewards
}, {

    /* Causes. */
    path: '/create',
    component: CauseCreate
}, {
    path: '/discover',
    component: CauseDiscover
}, {
    // eg. https://causes.cash/@bchplease/nito-cash-8680bb0e/manage
    // NOTE: Avoid other wildcard conflicts.
    path: '/@*/:cause/manage',
    component: CauseManage
}, {
    // eg. https://causes.cash/@bchplease/nito-cash-8680bb0e
    // NOTE: Avoid other wildcard conflicts.
    path: '/@*/:cause',
    component: CauseDetails
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
}, {

    /* (Wildcard) Account Profile. */
    // NOTE: Avoid other wildcard conflicts.
    path: '/@*',
    component: AccountProfile
}, {

    /* 404 Error. */
    path: '*',
    component: Welcome
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

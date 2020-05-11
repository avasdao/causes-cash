/* Import core modules. */
import Vue from 'vue'
import VueRouter from 'vue-router'

/* Welcome */
import Welcome from '../views/Welcome.vue'

/* Account */
import AccountBacking from '../views/Account/Backing.vue'
import AccountCauses from '../views/Account/Causes.vue'
import AccountDashboard from '../views/Account/Dashboard.vue'
import AccountPayments from '../views/Account/Payments.vue'
import AccountProfile from '../views/Account/Profile.vue'
import AccountReceived from '../views/Account/Received.vue'
import AccountRewards from '../views/Account/Rewards.vue'
import AccountWallet from '../views/Account/Wallet.vue'

/* Causes */
import CauseCreate from '../views/Cause/Create.vue'
import CauseDetails from '../views/Cause/Details.vue'
import CauseManage from '../views/Cause/Manage.vue'

/* Coming Soon */
import ComingSoon from '../views/ComingSoon.vue'

/* Contact. */
import Contact from '../views/Contact.vue'

/* Discover */
import Discover from '../views/Discover.vue'

/* FAQ */
import FAQ from '../views/FAQ.vue'

/* Initialize vue router. */
Vue.use(VueRouter)

/* Initialize (navigation) routes. */
const routes = [{
    path: '/',
    component: ComingSoon
}, {
    path: '/welcome',
    component: Welcome
}, {

    /* Account. */
    path: '/@*/backing', // Backing
    component: AccountBacking
}, {
    path: '/@*/causes', // Causes
    component: AccountCauses
}, {
    path: '/@*/dashboard', // Dashboard
    component: AccountDashboard
}, {
    path: '/@*/payments', // Payments
    component: AccountPayments
}, {
    path: '/@*/received', // Received
    component: AccountReceived
}, {
    path: '/@*/rewards', // Rewards
    component: AccountRewards
}, {
    path: '/@*/wallet', // Wallet
    component: AccountWallet
}, {

    /* Causes */
    path: '/create', // Create
    component: CauseCreate
}, {
    // eg. https://causes.cash/@bchplease/nito-cash-8680bb0e/manage
    // NOTE: Avoid other wildcard conflicts.
    path: '/@*/:cause/manage', // Manage
    component: CauseManage
}, {
    // eg. https://causes.cash/@bchplease/nito-cash-8680bb0e
    // NOTE: Avoid other wildcard conflicts.
    path: '/@*/:cause', // Details
    component: CauseDetails
}, {

    /* Contact */
    path: '/contact',
    component: Contact
}, {

    /* Discover */
    path: '/discover',
    component: Discover
}, {

    /* FAQ */
    path: '/faq',
    component: FAQ
}, {

    /* (Wildcard) Account Profile */
    // NOTE: Avoid other wildcard conflicts.
    path: '/@*',
    component: AccountProfile
}, {

    /* 404 Error */
    path: '*',
    component: Welcome
}]

/* Initialize (page navigation) router. */
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

/* Export module. */
export default router

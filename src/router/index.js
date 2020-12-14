import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'

import Discover from '../views/Discover.vue'
import Events from '../views/Events.vue'
import Influence from '../views/Influence.vue'
import PIF from '../views/PIF.vue'
import Treasury from '../views/Treasury.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/discover',
        name: 'Discover',
        component: Discover
    },
    {
        path: '/events',
        name: 'Events',
        component: Events
    },
    {
        path: '/influence',
        name: 'Influence',
        component: Influence
    },
    {
        path: '/pif',
        name: 'PIF',
        component: PIF
    },
    {
        path: '/treasury',
        name: 'Treasury',
        component: Treasury
    },

    // TODO: Add wildcard to handle campaign detail deep-linking
    //       eg. https://app.causes.cash/@BCHPlease/hush-your-money-abc123

]

/* Initialize (page navigation) router. */
const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        // console.log('SAVEDPOSITION', savedPosition);
        // FIXME: ALLOW FOR RESTORING SAVED POSITION ON DISCOVER AND EVENTS
        if (savedPosition) {
            return savedPosition
        } else {
            /* Handle infinite scrolling views. */
            // if (to.path === '/discover' || to.path === '/events') {
            //     return
            // }

            return { x: 0, y: 0 }
        }
    },
    mode: process.env.BASE_URL === '/' ? 'history': 'hash',
    // mode: 'hash',
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

/* Export module. */
export default router

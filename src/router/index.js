import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '../views/Admin.vue'
import Main from '../views/Main.vue'

import Discover from '../views/Discover.vue'
import Events from '../views/Events.vue'
import Treasury from '../views/Treasury.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/admin',
        component: Admin
    },
    {
        path: '/discover',
        component: Discover
    },
    {
        path: '/events',
        component: Events
    },
    {
        path: '/treasury',
        component: Treasury
    },
]

/* Initialize (page navigation) router. */
const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    mode: process.env.BASE_URL === '/' ? 'history': 'hash',
    base: process.env.BASE_URL,
    routes,
})

/* Export module. */
export default router

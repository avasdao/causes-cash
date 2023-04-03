import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from 'vue-router'

import Home from '../views/Home'

import Manage from '../views/Manage'
import Portal from '../views/Portal'
import Profile from '../views/Profile'
import Reports from '../views/Reports'
import Sponsors from '../views/Sponsors'
import Stats from '../views/Stats'

import Help from '../views/Help'
import HelpPledging from '../views/Help/Pledging'

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/compare',
        component: Compare,
    },

    {
        path: '/help',
        component: Help,
    },
    {
        path: '/help/pledging',
        component: HelpPledging,
    },

    {
        path: '/launchpad',
        component: Launchpad,
    },
    {
        path: '/manage/:campaignid',
        component: Manage,
    },
    {
        path: '/portal/:portalid',
        component: Portal,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/reports',
        component: Reports,
    },
    {
        path: '/sponsors',
        component: Sponsors,
    },
    {
        path: '/stats',
        component: Stats,
    },
    {
        path: '/:campaignid',
        component: Campaign,
    },
]

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
    history: process.env.BASE_URL === '/'
        ? createWebHistory(process.env.BASE_URL)
        : createWebHashHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,
    routes,
})

export default router

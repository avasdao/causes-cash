import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Welcome',
    component: Welcome
}, {
    path: '/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue')
}]

const router = new VueRouter({
    mode: 'hash',
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Home,
    },
    {
        path: '/order-table',
        name: 'OrderTable',
        component: () => import(/* webpackChunkName: "order-table" */ '../views/TablePage.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router

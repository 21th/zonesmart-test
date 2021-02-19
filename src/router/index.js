import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/LoginPage.vue'
import store from '@/store'

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
        meta: {
            requires_auth: true,
        },
        component: () => import(/* webpackChunkName: "order-table" */ '../views/TablePage.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
})

router.beforeEach((to, from, next) => {
    const is_authenticated = store.getters['auth/is_authenticated']
    const { requires_auth } = to.meta

    if (requires_auth) {
        if (is_authenticated) return next()
        return next({ name: 'Login' })
    }
    return next()
})

export default router

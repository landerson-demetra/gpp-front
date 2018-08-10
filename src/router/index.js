import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import { AUTH_LOGOUT } from '../store/actions/auth'

import Login from '@/components/Login'
import Painel from '@/components/Painel'
import NotFound from '@/components/NotFound'

import AdminRoutes from './admin'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next({ name: 'painel' })
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next({ name: 'login' })
}

const Logout = (to, from, next) => {
  store.dispatch(AUTH_LOGOUT)
}

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
          path: '/',
          redirect: { name: 'login' }
        },
        {
          name: 'login',
          path: '/login',
          component: Login,
          beforeEnter: ifNotAuthenticated
        },
        {
            name: 'painel',
            path: '/painel',
            component: Painel,
            children: AdminRoutes,
            beforeEnter: ifAuthenticated
        },
        {
            name: 'logout',
            path: '/logout',
            beforeEnter: Logout
        },
        { path: '*', component: NotFound }
    ]
})

export default router
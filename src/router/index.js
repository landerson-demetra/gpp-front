import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/Login.vue'
import Painel from '@/components/Painel.vue'

import AdminRoutes from './admin'

var router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/login', component: Login },
        {
            path: '/painel',
            component: Painel,
            children: AdminRoutes,
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to, from, next) => {
  var requiresAuth = to.matched[0].meta.requiresAuth

  if (requiresAuth) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login'
      })
    }else{
      next()
    }
  }else{
    next ()
  }
})

Vue.use(VueRouter)

export default router
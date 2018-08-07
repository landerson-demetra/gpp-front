import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/Login.vue'
import Painel from '@/components/Painel.vue'
import NotFound from '@/components/NotFound.vue'

import AdminRoutes from './admin'

var router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
          path: '/',
          redirect: {
            name: 'login'
          }
        },
        {
          name: 'login',
          path: '/login',
          component: Login,
          beforeEnter: (to, from, next) => {
            if(localStorage.getItem('gpp_token')){
              next('/painel')
            }else{
              next()
            }
          }
        },
        {
            name: 'painel',
            path: '/painel',
            component: Painel,
            children: AdminRoutes,
            meta: { requiresAuth: true }
        },
        {
            name: 'logout',
            path: '/logout',
            beforeEnter (to, from, next){
              localStorage.removeItem('gpp_token')
              next('/login')
            }
        },
        { path: '*', component: NotFound }
    ]
})

router.beforeEach((to, from, next) => {
  var requiresAuth = to.matched[0].meta.requiresAuth

  if (requiresAuth) {
    if (!localStorage.getItem('gpp_token')) {
      next('/login')
    }else{
      next()
    }
  }else{
    next ()
  }
})

Vue.use(VueRouter)

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import HelloWorld from './components/HelloWorld.vue'
import HelloWorld2 from './components/HelloWorld2.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: HelloWorld },
        { path: '/2', component: HelloWorld2 }
    ]
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

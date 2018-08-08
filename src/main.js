import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import router from './router/index'
import http from './modules/http'
import App from './App.vue'
import 'bootstrap'

import WOW from 'wowjs'

Vue.prototype.$http = http
Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
    router,
    store,
    mounted(){
        new WOW.WOW().init()
    },
    render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import router from './router/index'
import http from './modules/http'
import App from './App.vue'

import WOW from 'wowjs'

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
    router,
    created() {
        
    },
    mounted() {
        new WOW.WOW().init()
    },
    render: h => h(App)
}).$mount('#app')

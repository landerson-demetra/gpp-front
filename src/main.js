import Vue from 'vue'
import router from './router/index'
import http from '@/plugins/http'
import App from './App.vue'

import WOW from 'wowjs'

Vue.config.productionTip = false

new WOW.WOW().init();

new Vue({
    router,
    beforeCreate: function () {
        http.setAxios()
    },
    render: h => h(App)
}).$mount('#app')

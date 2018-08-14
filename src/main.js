import Vue from 'vue' 
import Vuex from 'vuex'
import store from './store'
import router from './router/index'
import http from './modules/http'
import config from './config'
import App from './App'

/* [ Components ] */
import 'bootstrap'
import vSelect from 'vue-select'
import Datatable from 'vue2-datatable-component'
import Notifications from 'vue-notification'
import WOW from 'wowjs'

window.$ = require('jquery')

Vue.prototype.$config = config
Vue.prototype.$http = http
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Datatable)
Vue.use(Notifications)

Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  mounted(){
    new WOW.WOW().init()
  },
  render: h => h(App)
}).$mount('#app')

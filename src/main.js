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
import locale from 'vue2-datatable-component/locale/pt-br'
import Notifications from 'vue-notification'
import WOW from 'wowjs'

/* [ Globals ] */
window._ = require('lodash')
window.$ = require('jquery')

/* [ Extends ] */
Vue.prototype.$config = config
Vue.prototype.$http = http

/* [ Configs ] */
Vue.config.productionTip = false

/* [ Use's ] */
Vue.use(Vuex)
Vue.use(Datatable, { locale })
Vue.use(Notifications)

/* [ Register components ] */
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  mounted(){
    new WOW.WOW().init()
  },
  render: h => h(App)
}).$mount('#app')

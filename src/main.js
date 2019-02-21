import Vue from 'vue'
import Vuex from 'vuex'
import Bus from './bus'
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
import VueCurrencyFilter from 'vue-currency-filter'
import VueMoney from 'v-money'
import VueTheMask from 'vue-the-mask'
import VeeValidate from 'vee-validate'
import Validatept_BR from 'vee-validate/dist/locale/pt_BR'
import GppErrors from './components/includes/GppErrors'
import WOW from 'wowjs'

/* [ Globals ] */
window._ = require('lodash')
window.$ = require('jquery')

/* [ Extends ] */
Vue.prototype.$config = config
Vue.prototype.$http = http

/* [ Configs ] */
Vue.config.productionTip = false
VeeValidate.Validator.localize('pt_BR', Validatept_BR)

/* [ Use's ] */
Vue.use(Vuex)
Vue.use(Datatable, { locale })
Vue.use(Notifications)
Vue.use(VueCurrencyFilter, Vue.prototype.$config.currency)
Vue.use(VueMoney, Vue.prototype.$config.vMoney)
Vue.use(VueTheMask)
Vue.use(VeeValidate)

/* [ Register components ] */
Vue.component('v-select', vSelect)

/* [ Numeral ] */
var numeral = require('numeral')

/* [ Filtros ] */
Vue.filter('numeral', (number, format) => {
  return numeral(number).format('0,0')
})

Vue.filter('cpfcnpj', (str) => {
  str = str.replace(/\D/g, '')

  if (str.length <= 14) {
    str = str.replace(/(\d{3})(\d)/, '$1.$2')
    str = str.replace(/(\d{3})(\d)/, '$1.$2')
    str = str.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    str = str.replace(/^(\d{2})(\d)/, '$1.$2')
    str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    str = str.replace(/\.(\d{3})(\d)/, '.$1/$2')
    str = str.replace(/(\d{4})(\d)/, '$1-$2')
  }

  return str
})

new Vue({
  router,
  store,
  mounted(){
    new WOW.WOW().init()

    // Tratando os erros de resposta
    Bus.$on('response-errors', (event) => {
        this.$notify({ group: 'normal', clean: true })

        _.forEach(event.messages, (v) => {
            this.$notify({
              group: 'normal',
              type: 'warn',
              text: Array.isArray(v) ? v.join("\n") : v,
              duration: 2000
            })
        })
    })
  },
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import WOW from 'wowjs';

Vue.config.productionTip = false

new WOW.WOW().init();

new Vue({router, render: h => h(App)}).$mount('#app')

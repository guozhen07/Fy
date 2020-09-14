import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './registerServiceWorker'
import router from './router'
import store from './store'
import HTTP from './assets/unit/http.js'
import Plugin from './assets/unit/plugin'

Vue.use(ElementUI)
Vue.use(Plugin)
Vue.prototype.$http = HTTP
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

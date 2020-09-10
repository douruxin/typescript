import Vue from 'vue'
import App from './layouts/App.vue'
import router from './plugins/router'
import axios from './plugins/axios'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

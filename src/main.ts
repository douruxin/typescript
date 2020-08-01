import Vue from 'vue'
import App from './layouts/App.vue'
import router from './plugins/router'
import axios from './plugins/axios'

// 将 axios 挂载到 window 上
window.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 导入全局样式
import './assets/css/global.css'

Vue.prototype.$axios = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')

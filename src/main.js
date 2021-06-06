import Vue from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import {
	provinceAndCityData,
	regionData,
	provinceAndCityDataPlus,
	regionDataPlus,
	CodeToText,
	TextToCode
} from 'element-china-area-data'

// 导入全局样式
import './assets/css/global.css'

axios.defaults.baseURL = 'http://127.0.0.1:8888/'

axios.interceptors.request.use(config => {
	console.log(config)
	config.headers.Authorization = window.sessionStorage.getItem('taken')
	return config
})

Vue.prototype.$axios = axios
Vue.use(regionData)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')

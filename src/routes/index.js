import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/home',
			component: Home
		},
	]
})
//挂载路由导航守卫

router.beforeEach((to, from, next) => {
	// to 将要访问的路径
	// from 从哪个路径跳转回来
	// next 放行函数

	if (to.path === '/login') {
		next()
	} else {
		//获取token
		const tokenStr = window.sessionStorage.getItem('sss')
		if (!tokenStr) {
			next('/login')
		}else{
			next()
		}
	}
	
	//next()
})

export default router

/*
 * @Author: 清羽
 * @Date: 2022-12-09 22:47:21
 * @LastEditTime: 2022-12-17 00:35:46
 * @LastEditors: you name
 * @Description: 
 */
// router.js
import { RouterMount, createRouter } from 'uni-simple-router';
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'

const whiteList = ['login', 'menu', 'productInfo', 'home']

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach(async (to, from, next) => {

	const userToken = getToken()

	//如果存在token，即存在已登陆的令牌
	if (userToken) {

		//如果用户存在令牌的情况请求登录页面，就让用户直接跳转到首页，避免存在重复登录的情况
		if (to.name == 'login') {
			next({ name: 'home' })
		} else {
			//如果已经有令牌的用户请求的不是登录页，是其他页面
			//就从Vuex里拿到用户的信息，这里也证明用户不是第一次登录了
			const hasGetUserInfo = store.getters.name
			if (hasGetUserInfo) {
				next();
			} else {
				try {
					await store.dispatch('user/getUserInfo')
					next();
				} catch (error) {
					await store.dispatch('user/resetToken')
					next({ name: 'login' })
				}
			}
		}
	} else {

		if (whiteList.indexOf(to.name) !== -1) {

			next();
		} else {
			next({ name: 'login' })
		}
	}
	// next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log('跳转结束')
})

export {
	router,
	RouterMount
}

/*
 * @Author: 清羽
 * @Date: 2022-12-15 21:52:01
 * @LastEditTime: 2022-12-27 22:06:08
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import shopCart from './modules/shopCart'
import address from './modules/address'
import pay from './modules/pay'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		shopCart,
		address,
		pay
	},
	getters
})

export default store
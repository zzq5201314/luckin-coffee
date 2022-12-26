/*
 * @Author: 清羽
 * @Date: 2022-12-15 21:52:01
 * @LastEditTime: 2022-12-26 22:31:37
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import shopCart from './modules/shopCart'
import address from './modules/address'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		shopCart,
		address
	},
	getters
})

export default store
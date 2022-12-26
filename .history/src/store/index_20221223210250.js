/*
 * @Author: 清羽
 * @Date: 2022-12-15 21:52:01
 * @LastEditTime: 2022-12-17 22:57:36
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import shopCart from './modules/shopCart'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		shopCart
	},
	getters
})

export default store
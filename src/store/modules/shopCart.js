/*
 * @Author: 清羽
 * @Date: 2022-12-17 22:15:05
 * @LastEditTime: 2022-12-17 23:13:16
 * @LastEditors: you name
 * @Description: 
 */
import { findAllShopCart, getShopCartCount, getShopCartRows } from '@/api/menu'
const getDefaultState = () => {
	return {
		shopCartSum: 0,
		shopCartList: [],
		shopCartRows: 0,
		money: 0
	}
}

const state = getDefaultState()

const mutations = {
	SET_SUM: (state, num) => {
		state.shopCartSum = num
	},
	SET_SHOP_CART_LIST: (state, data) => {
		state.shopCartList = data
	},
	SET_SHOP_CART_ROWS: (state, num) => {
		state.shopCartRows = num
	},
	SET_MONEY: (state, money) => {
		state.money = money
	}
}

const actions = {
	// 获取购物车数据
	getShopCartData ({ commit }) {
		// 获取用户所有购物车数据
		findAllShopCart().then(response => {
			console.log("findAllShopCart => response", response.result)
			let money = 0
			response.result.forEach(item => {
				money = money + item.price * item.count
			})
			commit('SET_MONEY', money)
			commit('SET_SHOP_CART_LIST', response.result)
		})

		// 获取购物车条目
		getShopCartRows().then(response => {
			commit('SET_SHOP_CART_ROWS', response.result)
		})

		// 获取购物车总数量
		getShopCartCount().then(response => {
			commit('SET_SUM', response.result)
		})
	}
}

export default {
	namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	mutations,
	actions
}
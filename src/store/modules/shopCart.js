/*
 * @Author: 清羽
 * @Date: 2022-12-17 22:15:05
 * @LastEditTime: 2022-12-18 19:16:37
 * @LastEditors: you name
 * @Description: 
 */
import { findAllShopCart, getShopCartCount, getShopCartRows } from '@/api/menu'
const getDefaultState = () => {
	return {
		shopCartSum: 0,
		shopCartList: [],
		shopCartRows: 0,
		numSelectList: [],
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
	},
	SET_NUM_SELECT_LIST: (state, data) => {
		state.numSelectList = data
	}
}

const actions = {
	// 获取购物车数据
	getShopCartData ({ commit }) {
		// 获取用户所有购物车数据
		findAllShopCart().then(response => {
			console.log("findAllShopCart => response", response.result)
			// 总金额
			let money = 0
			// 构造新的空数组用来存储合并后的商品列表
			let numSelectList = []

			response.result.forEach(item => {
				// 计算总价格
				money = money + item.price * item.count

				// 查询 数组里是否有名字 pid 相同的  返回索引
				// 如果没有符合条件的元素返回 -1
				const index = numSelectList.findIndex(numItem => numItem.name === item.name && numItem.pid === item.pid)

				// if index > -1 则表示该商品已经出现过，则直接在 count 里加上重复的商品 数量
				if (index > -1) {
					numSelectList[index].count = numSelectList[index].count + item.count

				}
				// if index < 0 (-1) 则表示暂时没有相同的 名字 pid 商品数据 ，往 numSelectList 里添加当前数据
				else {
					let obj = JSON.stringify({
						name: item.name,
						pid: item.pid,
						count: item.count
					})
					numSelectList.push(JSON.parse(obj))
				}

			})
			// console.log("findAllShopCart => numSelectList", numSelectList)
			// 设置总金额
			commit('SET_MONEY', money)
			// 设置购物车数据
			commit('SET_SHOP_CART_LIST', response.result)
			// 设置菜单选中商品列表数据
			commit('SET_NUM_SELECT_LIST', numSelectList)


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
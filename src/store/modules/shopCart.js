/*
 * @Author: 清羽
 * @Date: 2022-12-17 22:15:05
 * @LastEditTime: 2022-12-19 18:24:59
 * @LastEditors: you name
 * @Description: 
 */
import { findAllShopCart, getShopCartCount, getShopCartRows, updateShopCartCount } from '@/api/menu'
const getDefaultState = () => {
	return {
		shopCartSum: 0,
		shopCartList: [],
		shopCartRows: 0,
		numSelectList: [],
		money: 0,
		checkAll: true
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
	},
	SET_CHECK_ALL: (state, type) => {
		state.checkAll = type
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
			// 总数
			let num = 0
			// 构造新的空数组用来存储合并后的商品列表
			let numSelectList = []

			let count = 0

			response.result.forEach(item => {

				item.activeKey = true

				// 计算总价格
				money = money + item.price * item.count
				// 计算总数
				num = num + item.count
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

				if (item.activeKey == true) {
					count++
				}

			})
			// console.log("findAllShopCart => numSelectList", numSelectList)

			// 设置总金额
			commit('SET_MONEY', money)
			// 设置购物车总数量
			commit('SET_SUM', num)

			// 设置购物车数据
			commit('SET_SHOP_CART_LIST', response.result)
			// 设置菜单选中商品列表数据
			commit('SET_NUM_SELECT_LIST', numSelectList)

			// 设置购物车条目
			commit('SET_SHOP_CART_ROWS', response.result.length)


			if (count == response.result.length) {
				commit('SET_CHECK_ALL', true)
			} else {
				commit('SET_CHECK_ALL', false)
			}

		})
	},

	// 更新购物车商品数量
	updateShopCartCount ({ commit }, data) {
		return new Promise((resole, reject) => {
			updateShopCartCount(data).then(response => {
				console.log("updateShopCartCount => response", response)

				resole()
			})
		})
	},

	// 选择 商品
	selectShopCartProduct (context, shopCartItem) {
		// 总金额
		let money = 0
		// 总数
		let num = 0

		let count = 0
		context.state.shopCartList.forEach((item) => {
			// 修改选中状态
			if (item.sid == shopCartItem.sid) item.activeKey = !item.activeKey

			if (item.activeKey == true) {
				// 计算总价格
				money = money + item.price * item.count
				// 计算总数
				num = num + item.count

				count++
			}

		})
		if (count == context.state.shopCartList.length) {
			// 设置全选状态
			context.commit('SET_CHECK_ALL', true)
		} else {
			context.commit('SET_CHECK_ALL', false)
		}

		// 设置总金额
		context.commit('SET_MONEY', money)
		// 设置购物车总数量
		context.commit('SET_SUM', num)

	},

	// 全选
	checkAll (context, type) {

		// 总金额
		let money = 0
		// 总数
		let num = 0

		context.state.shopCartList.forEach(item => {
			item.activeKey = type

			if (item.activeKey == true) {
				// 计算总价格
				money = money + item.price * item.count
				// 计算总数
				num = num + item.count


			}
		})

		// 设置总金额
		context.commit('SET_MONEY', money)
		// 设置购物车总数量
		context.commit('SET_SUM', num)
		// 设置全选状态
		context.commit('SET_CHECK_ALL', type)



	}
}

export default {
	namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	mutations,
	actions
}
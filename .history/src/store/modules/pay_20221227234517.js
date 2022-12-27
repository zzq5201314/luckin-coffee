/*
 * @Author: 清羽
 * @Date: 2022-12-27 20:32:37
 * @LastEditTime: 2022-12-27 23:45:17
 * @LastEditors: you name
 * @Description: 
 */
import store from '../index'
import { getShopCartCount, getShopCartRows, updateShopCartCount, removeShopCart } from '@/api/menu'
import { addShopCart } from '@/api/productInfo'


const getDefaultState = () => {
	return {
		payNowSid: '',
		payNowData: {},
		oldData: {}
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},

	SET_PAY_NOW_SID: (state, data) => {
		state.payNowSid = data
	},
	SET_PAY_NOW_DATA: (state, data) => {
		state.payNowData = data
	},
	SET_OLD_DATA: (state, data) => {
		state.oldData = data
	}

}

const actions = {
	setPayNowData (context, data) {
		console.log("setPayNowData => context", context)

		return new Promise((resolve, reject) => {

			addShopCart(data).then(response => {

				if (response.code === 3000) {

					// status === 0 表示修改数量 (购物车里已经有一样规格的商品)
					if (response.status === 0) {

						context.rootGetters.shopCartList.forEach(item => {

							if (item.sid == response.sid) {

								let oldData = {
									count: item.count,
									pid: item.pid,
									rule: item.rule

								}
								// 把购物车里相同规格的商品 暂时储存起来
								context.commit('SET_OLD_DATA', oldData)

								/**
										因为status === 0 表示修改数量
									所以把数据库中购物车的商品数量修改成立即购买的数量
								**/
								updateShopCartCount({ sid: item.sid, count: data.count }).then(response => {
									// console.log('修改数量');
								})

							}

						})

					}

					// 储存sid
					context.commit('SET_PAY_NOW_SID', response.sid)
					// 储存当前购买的商品信息 (商品pid、商品数量、商品规格)
					context.commit('SET_PAY_NOW_DATA', data)

					// 返回sid
					resolve(response.sid)
				} else {

					reject("错误操作")

				}

			})

		})

	},

	// 重置 state
	resetState (context, sid) {

		return new Promise((resolve, reject) => {

			let data = { sids: JSON.stringify(sid) }
			// 删除购物车api
			removeShopCart(data).then(response => {

				if (response.code === 7000) {
					// console.log('删除购物车成功');

					/**
					 * 判断是否有旧数据
					 * 有旧数据代表在立即购买 进入确认订单页前，购物车已经存在一样规格的数据
					 */
					if (Object.keys(context.state.oldData).length !== 0) {


						// 把原来购物车的数据重新执行添加购物车、达到复原数据
						addShopCart(context.state.oldData).then(response => {

							console.log('恢复购物车原来的数据');
						})

					}

					// 重置 state
					context.commit('RESET_STATE')

					resolve()
				} else {
					reject("错误操作")
				}

			})

		})



	}


}

export default {
	namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	mutations,
	actions
}
/*
 * @Author: 清羽
 * @Date: 2022-12-27 20:32:37
 * @LastEditTime: 2022-12-27 23:21:12
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

					if (response.status === 0) {

						context.rootGetters.shopCartList.forEach(item => {

							if (item.sid == response.sid) {

								let oldData = {
									count: item.count - data.count,
									pid: item.pid,
									rule: item.rule

								}
								context.commit('SET_OLD_DATA', oldData)


								updateShopCartCount({ sid: item.sid, count: data.count }).then(response => {
									console.log('修改数量');
								})

							}

						})

					}

					context.commit('SET_PAY_NOW_SID', response.sid)
					context.commit('SET_PAY_NOW_DATA', data)
					resolve(response.sid)
				} else {

					reject("错误操作")

				}

			})

		})

	},


	resetState (context, sid) {

		return new Promise((resolve, reject) => {

			let data = { sids: JSON.stringify(sid) }
			removeShopCart(data).then(response => {

				if (response.code === 7000) {
					console.log('删除购物车成功');

					context.commit('RESET_STATE')

					if (context.state.oldData) {
						console.log("removeShopCart => context.state.oldData", context.state.oldData)

						addShopCart(context.state.oldData).then(response => {
							console.log("addShopCart => response", response)
							console.log('恢复购物车原来的数据');
						})

					}

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
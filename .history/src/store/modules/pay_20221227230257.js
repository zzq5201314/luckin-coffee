/*
 * @Author: 清羽
 * @Date: 2022-12-27 20:32:37
 * @LastEditTime: 2022-12-27 23:02:56
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
	}

}

const actions = {
	setPayNowData (context, data) {
		console.log("setPayNowData => context", context)

		return new Promise((resolve, reject) => {

			addShopCart(data).then(response => {

				if (response.code === 3000) {

					context.commit('SET_PAY_NOW_SID', response.sid)
					context.commit('SET_PAY_NOW_DATA', data)
					resolve(response.sid)
				} else {

					reject("错误操作")

				}

			})

		})

	},


	resetState ({ commit }, sid) {

		return new Promise((resolve, reject) => {

			let data = { sids: JSON.stringify(sid) }
			removeShopCart(data).then(response => {

				if (response.code === 7000) {
					console.log('删除购物车成功');

					commit('RESET_STATE')

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
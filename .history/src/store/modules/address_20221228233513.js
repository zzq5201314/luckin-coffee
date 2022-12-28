/*
 * @Author: 清羽
 * @Date: 2022-12-26 22:18:40
 * @LastEditTime: 2022-12-28 23:35:13
 * @LastEditors: you name
 * @Description: 
 */
import { findAddress } from "@/api/address"

const getDefaultState = () => {
	return {
		addressList: []
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_ADDRESS_LIST: (state, data) => {
		state.addressList = data
	},

}

const actions = {

	// 获取地址列表
	findAddress ({ commit }) {
		return new Promise((resolve, reject) => {

			findAddress().then(response => {

				if (response.code === 20000) {


					if (response.result.length > 0) {

						let reg = /^(\d{3})\d+(\d{4})$/;
						let count = 0
						let tempArr = []

						for (let index in response.result) {

							response.result[index].phone = response.result[index].tel
							// 电话格式转换
							response.result[index].tel = response.result[index].tel.replace(reg, "$1****$2");


							// 默认收货地址置顶
							if (response.result[index].isDefault == 1) {
								tempArr = [response.result[index], ...tempArr]
							}
							else {

								tempArr.push(response.result[index])

								// 统计没设置默认收货地址的数量
								count++
							}
						}

						// 如果全部都没有设置默认收货地址，则把第一个地址设置为默认收货地址
						if (count == tempArr.length) {
							tempArr[0].isDefault = 1
						}

						commit("SET_ADDRESS_LIST", tempArr)

					}

					resolve()
				}
				else {

					reject(response.msg)
				}


			})
		})
	},

	// 选择地址
	selectAddress (context, aid) {

		return new Promise((resolve, reject) => {

			let tempArr = []
			context.state.addressList.forEach(item => {

				if (item.aid == aid) {
					// 设置默认地址
					item.isDefault = 1

					// 置顶默认收货地址
					tempArr = [item, ...tempArr]

				} else {

					// 其他未被选中的设置非默认收货地址
					item.isDefault = 0

					tempArr.push(item)
				}

			})

			context.commit("SET_ADDRESS_LIST", tempArr)

			resolve()
		})

	},

	resetState ({ commit }) {
		commit("RESET_STATE")
	}


}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
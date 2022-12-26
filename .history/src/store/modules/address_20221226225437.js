/*
 * @Author: 清羽
 * @Date: 2022-12-26 22:18:40
 * @LastEditTime: 2022-12-26 22:54:02
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
	SET_ADDRESS_LIST: (state, data) => {
		state.addressList = data
	},

}

const actions = {
	findAddress ({ commit }) {
		return new Promise((resolve, reject) => {

			findAddress().then(response => {

				if (response.code === 20000) {
					let reg = /^(\d{3})\d+(\d{4})$/;
					let count = 0
					let tempArr = []

					if (response.result.length > 0) {

						for (let index in response.result) {

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

	selectAddress (context, aid) {

		context.state.addressList.forEach(item => {

			if (item.aid == aid) {
				item.isDefault = 1
			} else {
				item.isDefault = 0
			}

		})

	}


}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
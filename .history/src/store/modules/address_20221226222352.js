/*
 * @Author: 清羽
 * @Date: 2022-12-26 22:18:40
 * @LastEditTime: 2022-12-26 22:23:52
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
	FIND_ADDRESS: (state, data) => {
		state.addressList = data
	}

}

const actions = {
	findAddress ({ commit }) {
		return new Promise((resolve, reject) => {

			findAddress().then(response => {

				if (response.code === 20000) {
					let reg = /^(\d{3})\d+(\d{4})$/;

					let tempArr = []

					for (let index in response.result) {

						response.result[index].tel = response.result[index].tel.replace(reg, "$1****$2");

						if (response.result[index].isDefault == 1) {
							tempArr = [response.result[index], ...tempArr]
						} else {
							tempArr.push(response.result[index])
						}
					}

					commit("FIND_ADDRESS", tempArr)

					resolve()
				}
				else {

					reject(response.msg)
				}


			})
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
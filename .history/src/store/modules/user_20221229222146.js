/*
 * @Author: 清羽
 * @Date: 2022-12-15 22:02:24
 * @LastEditTime: 2022-12-29 22:21:46
 * @LastEditors: you name
 * @Description:
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/login'
import { findAllLike } from "@/api/collect"
import { getUserInfo, logout, getUser } from '@/api/user'
import store from '../index'

const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		userImg: '',
		phone: '',
		desc: '',
		collect: 0
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_USER_IMG: (state, img) => {
		state.userImg = img
	},
	SET_PHONE: (state, phone) => {
		state.phone = phone
	},
	SET_DESC: (state, desc) => {
		state.desc = desc
	},
	SET_COLLECT: (state, count) => {
		state.collect = count
	}
}

const actions = {
	login ({ commit }, userInfo) {
		const { phone, password } = userInfo
		return new Promise((resolve, reject) => {
			login(userInfo).then(response => {
				// console.log("login => response", response)
				const token = response.token
				setToken(token)
				commit('SET_TOKEN', token)

				resolve()
			})
		})
	},

	getUserInfo ({ commit }) {
		console.log('获取用户信息');
		return new Promise((resolve, reject) => {
			getUserInfo().then(response => {
				const { nickName, userImg, phone, desc } = response.result[0]
				console.log("getUserInfo => response.result[0]", response.result[0])

				commit("SET_DESC", desc)
				commit("SET_PHONE", phone)
				commit('SET_NAME', nickName)
				commit('SET_USER_IMG', userImg)


				// 获取购物车数据
				store.dispatch('shopCart/getShopCartData')

				// 获取收货地址
				store.dispatch('address/findAddress')

				store.dispatch('user/getCollectCount')
				resolve()
			})


		})
	},

	// 退出登录
	logout (context) {
		return new Promise((resolve, reject) => {

			logout().then(response => {
				console.log("logout => response", response)

				if (response.code === "F001") {

					// 删除token
					removeToken()

					// 重置vuex
					store.dispatch("shopCart/resetState")
					store.dispatch("address/resetState")

					context.commit("RESET_STATE")

					resolve(response.msg)

				} else {

					reject(response.msg)

				}



			})



		})
	},

	getCollectCount ({ commit }) {

		return new Promise((resolve, reject) => {

			findAllLike().then(response => {

				if (response.code === 2000) {
					commit("SET_COLLECT", response.result.length)

					resolve()

				} else {
					reject(response.msg)
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
/*
 * @Author: 清羽
 * @Date: 2022-12-15 22:02:24
 * @LastEditTime: 2022-12-28 23:38:11
 * @LastEditors: you name
 * @Description:
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/login'
import { getUserInfo, logout } from '@/api/user'
import store from '../index'

const getDefaultState = () => {
	return {
		token: getToken(),
		name: '',
		userImg: ''
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
	}
}

const actions = {
	login ({ commit }, userInfo) {
		const { phone, password } = userInfo
		return new Promise((resolve, reject) => {
			login(userInfo).then(response => {
				console.log("login => response", response)
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
				const { nickName, userImg } = response.result[0]
				// console.log("getUserInfo => response.result[0]", response.result[0])
				// 获取购物车数据
				commit('SET_NAME', nickName)
				commit('SET_USER_IMG', userImg)
				// 获取购物车数据
				store.dispatch('shopCart/getShopCartData')

				// 获取收货地址
				store.dispatch('address/findAddress')
				resolve()
			})


		})
	},

	// 退出登录
	logout (context) {
		return new Promise((resolve, reject) => {

			logout().then(response => {
				console.log("logout => response", response)

				// 删除token
				removeToken()

				// 重置vuex
				store.dispatch("shopCart/resetState")
				store.dispatch("address/resetState")
				context.commit("RESET_STATE")

			})

			resolve()

		})
	}
}


export default {
	namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	mutations,
	actions
}
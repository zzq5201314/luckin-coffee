/*
 * @Author: 清羽
 * @Date: 2022-12-15 22:02:24
 * @LastEditTime: 2022-12-16 19:51:15
 * @LastEditors: you name
 * @Description:
 */
import { getToken, setToken, removeToken } from '@/utils/auth'

import { login } from '@/api/login'
import { getUserInfo } from '@/api/user'

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
				console.log("getUserInfo => response.result[0]", response.result[0])
				commit('SET_NAME', nickName)
				commit('SET_USER_IMG', userImg)
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
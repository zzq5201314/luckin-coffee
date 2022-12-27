import store from '../index'
import { getShopCartCount, getShopCartRows, updateShopCartCount, removeShopCart } from '@/api/menu'
import { addShopCart } from '@/api/productInfo'


const getDefaultState = () => {
	return {
		payNowData: {}
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},

	SET_PAY_NOW_DATA: (state, data) => {
		state.payNowData = data
	}

}

const actions = {
	setPayNowData ({ commit }, data) {

		addShopCart().then(response => {

		})

	}
}

export default {
	namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	mutations,
	actions
}
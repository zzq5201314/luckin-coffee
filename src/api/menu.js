/*
 * @Author: 清羽
 * @Date: 2022-12-11 20:50:45
 * @LastEditTime: 2022-12-19 17:25:47
 * @LastEditors: you name
 * @Description: 菜单页api
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 获取商品类型
export function getType () {
	return request({
		url: '/type',
		method: 'get'
	})
}

// 获取用户所有购物车数据
export function findAllShopCart () {
	return request({
		url: '/findAllShopcart',
		method: 'get',
		params: {
			tokenString: getToken()
		}
	})
}

// 获取购物车商品条目
export function getShopCartRows () {
	return request({
		url: '/shopcartRows',
		method: 'get',
		params: {
			tokenString: getToken()
		}
	})
}

// 获取购物车商品总数量
export function getShopCartCount () {
	return request({
		url: '/shopcartCount',
		params: {
			tokenString: getToken()
		}
	})
}

// 修改购物车商品数量
export function updateShopCartCount (data) {
	return request({
		url: '/modifyShopcartCount',
		method: 'post',
		data: {
			...data,
			tokenString: getToken()
		}
	})
}

// 删除 一个或者多个 购物车商品  （假删除）
export function removeShopCart (data) {
	return request({
		url: '/removeShopcart',
		method: 'post',
		data: {
			...data,
			tokenString: getToken()
		}
	})
}

// 删除 一个或者多个 购物车商品  （真删除）
export function deleteShopCart (data) {
	return request({
		url: '/deleteShopcart',
		method: 'post',
		data: {
			...data,
			tokenString: getToken()
		}
	})
}
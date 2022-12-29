/*
 * @Author: 清羽
 * @Date: 2022-12-13 19:17:59
 * @LastEditTime: 2022-12-29 22:11:47
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 获取商品详情
export function getProductInfo (params) {
	return request({
		url: '/productDetail',
		method: 'get',
		params
	})
}

//  根据商品pid查询收藏商品接口
export function findLike (pid) {
	return request({
		url: '/findlike',
		method: 'get',
		params: {
			pid,
			tokenString: getToken()
		}
	})
}




// 添加购物车
export function addShopCart (data) {
	return request({
		url: '/addShopcart',
		method: 'post',
		data: {
			...data,
			tokenString: getToken()
		}
	})
}
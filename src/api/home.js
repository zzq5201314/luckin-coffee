/*
 * @Author: 清羽
 * @Date: 2022-12-11 16:45:35
 * @LastEditTime: 2022-12-11 21:33:14
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// 获取轮播图
export function getBanner () {
	return request({
		url: '/banner',
		method: 'get',
	})
}

// 获取热门商品
export function getProductList (params) {

	return request({
		url: '/typeProducts',
		method: 'get',
		params
	})
}
/*
 * @Author: 清羽
 * @Date: 2022-12-13 19:17:59
 * @LastEditTime: 2022-12-13 19:19:42
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

// 获取商品详情
export function getProductInfo (params) {
	return request({
		url: '/productDetail',
		method: 'get',
		params
	})
}
/*
 * @Author: 清羽
 * @Date: 2022-12-11 20:50:45
 * @LastEditTime: 2022-12-11 20:51:39
 * @LastEditors: you name
 * @Description: 菜单页api
 */
import request from '@/utils/request'

// 获取商品类型
export function getType () {
	return request({
		url: '/type',
		method: 'get'
	})
}
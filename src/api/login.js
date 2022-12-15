/*
 * @Author: 清羽
 * @Date: 2022-12-15 22:16:52
 * @LastEditTime: 2022-12-15 22:47:51
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'

export function login (data) {
	return request({
		url: '/login',
		method: 'post',
		data
	})
}
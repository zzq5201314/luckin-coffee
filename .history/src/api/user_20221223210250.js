/*
 * @Author: 清羽
 * @Date: 2022-12-15 22:17:17
 * @LastEditTime: 2022-12-17 16:25:15
 * @LastEditors: you name
 * @Description: 
 */
import request from "@/utils/request"
import { getToken, setToken, removeToken } from '@/utils/auth'

// 获取用户详情
export function getUserInfo () {
	return request({
		url: "/findAccountInfo",
		method: 'get',
		params: {
			tokenString: getToken()
		}
	})
}

export function getUser () {
	return request({
		url: "/findMy",
		method: 'get',
		params: {
			tokenString: getToken()
		}
	})
}
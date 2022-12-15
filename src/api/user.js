/*
 * @Author: 清羽
 * @Date: 2022-12-15 22:17:17
 * @LastEditTime: 2022-12-15 23:44:28
 * @LastEditors: you name
 * @Description: 
 */
import request from "@/utils/request"
import { getToken, setToken, removeToken } from '@/utils/auth'

export function getUserInfo () {
	return request({
		url: "/findAccountInfo",
		method: 'get',
		params: {
			tokenString: getToken()
		}
	})
}
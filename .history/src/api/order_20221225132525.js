/*
 * @Author: 清羽
 * @Date: 2022-12-25 13:21:11
 * @LastEditTime: 2022-12-25 13:25:25
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'
import { getToken } from '@utils/auth'

export function findOrder (status = 0) {
	return request({
		url: "/findOrder",
		method: "get",
		params: {
			tokenString: getToken(),
			status
		}
	})
}
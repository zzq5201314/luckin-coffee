/*
 * @Author: 清羽
 * @Date: 2022-12-25 13:21:11
 * @LastEditTime: 2022-12-25 13:25:25
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'
import { getToken } from '@utils/auth'

// 查询订单
// 其中 status 值为 0, 1, 2 ==> 0: 全部，1: 进行中，2: 已完成
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
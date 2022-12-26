/*
 * @Author: 清羽
 * @Date: 2022-12-25 13:21:11
 * @LastEditTime: 2022-12-25 13:29:08
 * @LastEditors: you name
 * @Description: 
 */
import request from '@/utils/request'
import { getToken } from '@utils/auth'

// 查询订单

export function findOrder (status = 0) {
	return request({
		url: "/findOrder",
		method: "get",
		params: {
			tokenString: getToken(),
			status // 其中 status 值为 0, 1, 2 ==> 0: 全部，1: 进行中，2: 已完成
		}
	})
}

// 确认收货
export function receive (oid) {
	return request({
		url: "/receive",
		method: "post",
		data: {
			tokenString: getToken(),
			oid      // 订单oid
		}
	})
}

// 删除订单
export function removeOrder (oid) {
	return request({
		url: "/removeOrder",
		method: "post",
		data: {
			tokenString: getToken(),
			oid      // 订单oid
		}
	})
}
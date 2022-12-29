/*
 * @Author: 清羽
 * @Date: 2022-12-29 22:08:07
 * @LastEditTime: 2022-12-29 22:11:56
 * @LastEditors: you name
 * @Description: 
 */
import request from "@/utils/request"
import { getToken } from "@/utils/auth"

// 获取所有收藏
export function findAllLike () {
	return request({
		url: "/findAllLike",
		method: "get",
		params: {
			tokenString: getToken()
		}
	})
}

// 收藏商品
export function likeProduct (pid) {
	return request({
		url: '/like',
		method: 'post',
		data: {
			pid,
			tokenString: getToken()
		}
	})
}

// 取消收藏
export function notLike (pid) {
	return request({
		url: '/notlike',
		method: 'post',
		data: {
			pid,
			tokenString: getToken()
		}
	})
}
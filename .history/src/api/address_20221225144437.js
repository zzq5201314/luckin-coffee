/*
 * @Author: 清羽
 * @Date: 2022-12-25 14:42:11
 * @LastEditTime: 2022-12-25 14:44:37
 * @LastEditors: you name
 * @Description: 
 */
import request from "@/utils/request"
import { getToken } from "@/utils/auth"

// 获取地址
export function findAddress () {
	return request({
		url: "/findAddress",
		method: "get",
		params: {
			tokenString: getToken()
		}
	})
}
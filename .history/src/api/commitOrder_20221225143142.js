/*
 * @Author: 清羽
 * @Date: 2022-12-25 14:28:37
 * @LastEditTime: 2022-12-25 14:31:42
 * @LastEditors: you name
 * @Description: 
 */
import request from "@/utils/request"
import { getToken } from "@/utils/auth"

// 获取提交订单页商品信息
export function getCommitOrderProductData (sids) {
	return request({
		url: "/commitShopcart",
		method: "get",
		params: {
			tokenString: getToken(),
			sids
		}
	})
}
/*
 * @Author: 清羽
 * @Date: 2022-12-25 14:28:37
 * @LastEditTime: 2022-12-27 20:08:28
 * @LastEditors: you name
 * @Description: 提交订单页api
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
			sids: JSON.stringify(sids)
		}
	})
}

// 结算
export function pay (data) {
	console.log("pay => data", data)
	return request({
		url: "/pay",
		method: "post",
		data: {
			sids: JSON.stringify(data.sid),
			phone: data.phone,
			receiver: data.receiver,
			address: data.address,
			tokenString: getToken()
		}
	})
}
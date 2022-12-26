/*
 * @Author: 清羽
 * @Date: 2022-12-25 14:42:11
 * @LastEditTime: 2022-12-26 20:49:56
 * @LastEditors: you name
 * @Description: 地址 api
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

// 新增地址
export function addAddress (data) {
	return request({
		url: "/addAddress",
		method: "post",
		data: {
			...data,
			tokenString: getToken()
		}
	})
}

// 删除地址
export function deleteAddress (aid) {
	return request({
		url: "/deleteAddress",
		method: "post",
		data: {
			aid,
			tokenString: getToken()
		}
	})
}

// 编辑地址
export function editAddress (data) {
	return request({
		url: "/editAddress",
		method: "post",
		data: {
			...data,
			tokenString: getToken()
		}
	})
}

// 根据地址aid查询地址
export function findAddressInfo (aid) {
	return request({
		url: "/findAddressByAid",
		method: "get",
		params: {
			tokenString: getToken(),
			aid
		}
	})
}
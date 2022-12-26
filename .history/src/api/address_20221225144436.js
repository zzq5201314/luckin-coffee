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
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
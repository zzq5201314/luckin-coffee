/*
 * @Author: 清羽
 * @Date: 2022-12-15 22:06:54
 * @LastEditTime: 2022-12-15 23:43:01
 * @LastEditors: you name
 * @Description: 
 */
// import 

const TokenKey = 'userToken'
// 设置token -- 异步
export function setToken (token) {
	console.log('设置token');
	return uni.setStorageSync(TokenKey, token)
}

// 获取token -- 同步
export function getToken () {
	return uni.getStorageSync(TokenKey)
}

// 删除token -- 异步
export function removeToken () {
	return uni.removeStorageSync(TokenKey)
}
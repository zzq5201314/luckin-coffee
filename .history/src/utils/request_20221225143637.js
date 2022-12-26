/*
 * @Author: 清羽
 * @Date: 2022-12-11 16:40:26
 * @LastEditTime: 2022-12-25 14:36:37
 * @LastEditors: you name
 * @Description: 
 */

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
import { router } from '../router'

// create an axios instance
const service = axios.create({
	baseURL: 'http://www.kangliuyong.com:10002', // url = base url + request url
	//withCredentials: true, // send cookies when cross-domain requests 注意：withCredentials和后端配置的cross跨域不可同时使用
	timeout: 6000, // request timeout
	crossDomain: true
})

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
	config => {
		// if (store.state.token) {
		//     // 给请求头添加user-token
		//     config.headers["user-token"] = store.state.token;
		// }
		let appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
		if (config.method === 'get') {
			config.params = { ...config.params, appkey }
		} else {
			config.data = qs.stringify({ ...config.data, appkey })

		}
		console.log("config", config)

		config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
		// console.log("config", config)
		console.log('请求拦截成功')
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

//配置成功后的拦截器
service.interceptors.response.use(res => {
	// console.log("res", res)
	if (res.data.msg == 'token检验无效，请先登录') {
		uni.showToast({
			title: '请登录',
			duration: 2000,
			icon: 'none'
		})

		setTimeout(() => {
			router.push({ name: 'login' })
		}, 500)


		return Promise.reject(res.data.msg)
	} else if (res.status == 200) {
		return res.data
	} else {

		return Promise.reject(res.data.msg);
	}
}, error => {
	if (error.response.status) {
		switch (error.response.status) {
			case 401:
				break;
			default:
				break;
		}
	}
	return Promise.reject(error)
})


// 在main.js中放入这段自定义适配器的代码，就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie
axios.defaults.adapter = function (config) {
	return new Promise((resolve, reject) => {
		console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete (response) {
				console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

export default service

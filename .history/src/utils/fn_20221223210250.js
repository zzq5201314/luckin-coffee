/*
 * @Author: 清羽
 * @Date: 2022-12-14 23:26:35
 * @LastEditTime: 2022-12-14 23:38:06
 * @LastEditors: you name
 * @Description: 
 */
// 节流
export function _throttle (fn, delay = 200) {
	let timer = null
	return function () {
		let context = this
		if (timer) {
			return
		}
		timer = setTimeout(() => {
			fn.apply(context)
			timer = null
		}, delay)
	}
}


// 防抖
export function _debounce (fn, delay = 200) {
	let timer;
	return function () {
		let context = this;
		let args = arguments;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, delay)
	}
}

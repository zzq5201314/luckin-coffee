/*
 * @Author: 清羽
 * @Date: 2022-12-08 16:41:24
 * @LastEditTime: 2022-12-15 22:32:20
 * @LastEditors: you name
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import store from './store'
import { router, RouterMount } from './router'
Vue.use(router)
// 引入 tailwind 样式
import "@/style/tailwind.css"


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})

RouterMount(app, router, '#app')
app.$mount()

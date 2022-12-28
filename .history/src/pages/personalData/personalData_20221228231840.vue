<!--
 * @Author: 清羽
 * @Date: 2022-12-28 22:57:56
 * @LastEditTime: 2022-12-28 23:18:23
 * @LastEditors: you name
 * @Description: 个人资料页面
-->
<!-- personalData 页 -->
<template>
  <view
    class="personalData bg-bgColor p-4"
    :style="{height:windowHeight+'px'}"
  >

    <view class="p-3 bg-white rounded-lg flex flex-col gap-4 text-xl">

      <view class="flex items-center justify-between">
        <view>头像</view>
        <view class="iconfont flex items-center">
          <text>
            <image
              :src="userImg"
              class="w-16 h-16"
            ></image>
          </text>
          <text>&#xe605;</text>
        </view>
      </view>

      <view class="flex">
        <view>用户名</view>
        <view class="iconfont">
          <text>{{name}}</text>
          <text>&#xe605;</text>
        </view>
      </view>

      <view class="flex">
        <view>关联手机号</view>
        <view class="iconfont">
          <text>内容</text>
          <text>&#xe605;</text>
        </view>
      </view>

      <view class="flex">
        <view>收货地址</view>
        <view class="iconfont">
          <text>内容</text>
          <text>&#xe605;</text>
        </view>
      </view>

    </view>

  </view>
</template>

<script>

import { mapGetters } from "vuex"
export default {
  name: "personalData",
  data () {
    return {
      windowHeight: 0
    }
  },
  components: {},
  computed: {
    ...mapGetters(["name", "userImg"])
  },
  onLoad () {
    uni.getSystemInfo({
      success: (res) => {
        this.windowHeight = res.windowHeight
      }
    })
  },
  // 函数
  methods: {

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.personalData {
}
</style>
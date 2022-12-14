<!--
 * @Author: 清羽
 * @Date: 2022-12-14 23:42:30
 * @LastEditTime: 2022-12-15 01:05:06
 * @LastEditors: you name
 * @Description: 
-->
<!-- login 页 -->
<template>
  <view class="login w-full ">

    <view class="w-full h-screen fixed">
      <image
        src="../../static/img/R-C.jpg"
        class=" h-full w-full"
        mode="aspectFill"
      ></image>
    </view>

    <view class="relative h-full">

      <view class=" bg-white fixed bottom-0 w-full ">
        <image
          class="absolute svg "
          src="../../static/img/1671036047492.svg.svg"
          alt="example"
        ></image>
        <view class="mx-6">
          <text class="text-3xl">Login</text>
          <view class="mt-5">
            <view class="text-xs text-gray-500">Your Mobile</view>
            <input
              type="text"
              placeholder="Mobile"
              class="border border-solid border-gray-300 py-3 h-full pl-6 rounded-lg"
            >
          </view>
          <view class="mt-4">
            <view class="text-xs text-gray-500">Your password</view>
            <input
              type="password"
              placeholder="Password"
              class="border border-solid border-gray-300 py-3 h-full pl-6 rounded-lg"
            >
          </view>
          <view class="flex justify-between pl-16 mt-8">
            <view class="flex-1"></view>
            <view
              class="iconfont bg-gray-400 flex-1 rounded-full flex justify-between text-center text-white py-2"
            >
              <text class="flex-1">Login</text>
              <text class="flex-1">&#xe603;</text>
            </view>
          </view>

          <view class="h-14"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: "login",
  data () {
    return {

    }
  },
  components: {},
  onLoad () {

  },
  // 函数
  methods: {

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.login {
  // background-image: url('@/static/img/R-C.jpg');
}
.svg {
  width: 120vw;
  top: 0;
  transform: translate(0, -60%);
  z-index: -10;
}
</style>
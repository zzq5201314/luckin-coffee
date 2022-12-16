<!--
 * @Author: 清羽
 * @Date: 2022-12-14 23:42:30
 * @LastEditTime: 2022-12-17 01:06:40
 * @LastEditors: you name
 * @Description: 登录页
-->
<!-- login 页 -->
<template>
  <view class="login w-full ">

    <!-- 自定义导航栏 -->
    <view class="navBarBox absolute top-0 px-4 z-10">
      <!-- 状态栏占位 -->
      <view
        class="statusBar"
        :style="{ paddingTop: statusBarHeight + 'px' }"
      ></view>
      <!-- 真正的导航栏内容 -->

      <view class="navBar pt-1">
        <text
          class="iconfont z-10 bg-white bg-opacity-70 rounded-full w-8 h-8 flex justify-center items-center text-black text-xl"
        > &#xe601;</text>
        <!-- <view>我是导航栏标题</view> -->
      </view>
    </view>

    <view class="w-full h-screen fixed">
      <image
        src="https://ts1.cn.mm.bing.net/th/id/R-C.b327e316c2ab5ec4263964b0fa5dd57f?rik=AGmCS2Wadp1xYQ&riu=http%3a%2f%2fwww.guojicoffee.com%2fuploadfile%2f2018%2f0314%2f20180314115357326.jpg&ehk=kOM%2fCWhLdSEmRLQLN0yDUVEik3DCAc6fnW5FSFpUBw8%3d&risl=&pid=ImgRaw&r=0"
        class=" h-full w-full"
        mode="aspectFill"
      ></image>
    </view>

    <view class="relative h-full">

      <view class=" bg-white fixed bottom-0 w-full form">
        <image
          class="absolute svg "
          src="../../static/img/1671036047492.svg.svg"
          alt="example"
        ></image>
        <view class="mx-6 ">
          <text class="text-3xl">Login</text>
          <view class="mt-5">
            <view class="text-xs text-gray-500">Your Mobile</view>
            <input
              type="text"
              placeholder="Mobile"
              class="border border-solid border-gray-300 py-3 h-full pl-6 rounded-lg"
              v-model="phone"
            >
          </view>
          <view class="mt-4">
            <view class="text-xs text-gray-500">Your password</view>
            <input
              type="password"
              placeholder="Password"
              class="border border-solid border-gray-300 py-3 h-full pl-6 rounded-lg"
              v-model="password"
            >
          </view>
          <view class="flex justify-between pl-16 mt-8">
            <view class="flex-1"></view>
            <view
              class="iconfont bg-gray-400 flex-1 rounded-full flex justify-between text-center text-white py-2"
              @click="login"
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
      // 状态栏高度
      statusBarHeight: 0,
      phone: '',
      password: '',
    }
  },
  components: {},
  created () {
    //获取手机状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
    console.log("created => this.statusBarHeight", this.statusBarHeight)
  },
  onLoad () {

  },
  // 函数
  methods: {
    login () {
      const data = {
        phone: this.phone,
        password: this.password
      }
      this.$store.dispatch('user/login', data).then(() => {
        this.$store.dispatch('user/getUserInfo')
      })
    }
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
.form {
  height: 50%;
}
</style>
<!--
 * @Author: 清羽
 * @Date: 2022-12-28 22:57:56
 * @LastEditTime: 2022-12-29 23:08:13
 * @LastEditors: you name
 * @Description: 个人资料页面
-->
<!-- personalData 页 -->
<template>
  <view
    class="personalData bg-bgColor p-4"
    :style="{height:windowHeight+'px'}"
  >

    <view
      class="px-3 py-5 bg-white rounded-lg flex flex-col gap-6 text-lg text-gray-500"
    >

      <view class="flex items-center justify-between gap-4">
        <view>头像</view>
        <view class="iconfont flex items-center">
          <text>
            <image
              :src="userImg"
              class="w-16 h-16 rounded-full"
            ></image>
          </text>
          <text class="text-gray-400 ml-1">&#xe605;</text>
        </view>
      </view>

      <view class="flex justify-between items-center gap-4">
        <view>用户名</view>
        <view class="iconfont">
          <text class="text-black">{{name}}</text>
          <text class="text-gray-400 ml-1">&#xe605;</text>
        </view>
      </view>

      <view class="flex justify-between items-center gap-4">
        <view>个性签名</view>
        <view class="iconfont">
          <text class="text-black">{{desc}}</text>
          <text class="text-gray-400 ml-1">&#xe605;</text>
        </view>
      </view>

      <view class="flex justify-between items-center gap-4">
        <view>关联手机号</view>
        <view class="iconfont">
          <text class="text-black">{{phone}}</text>
          <text class="text-gray-400 ml-1">&#xe605;</text>
        </view>
      </view>

      <view
        class="flex justify-between items-center gap-4"
        @click="goAddress"
      >
        <view>收货地址</view>
        <view class="iconfont">
          <text class="text-gray-400 ml-1">&#xe605;</text>
        </view>
      </view>

    </view>

    <view class="fixed bottom-0 left-0 right-0">
      <view
        class="bg-selectText text-white m-3 rounded-full py-3 text-center"
        @click="logout"
      >
        退出登录</view>

      <view class="page"></view>
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
    ...mapGetters(["name", "userImg", "phone", "desc"])
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
    logout () {
      this.$store.dispatch("user/logout").then(msg => {
        if (msg === "退出登录成功") {
          uni.showToast({
            title: msg,
            icon: "none"
          })

          setTimeout(() => {
            this.$Router.pushTab({
              name: "home"
            })
          }, 500)
        }

      })
    },

    goAddress () {
      this.$Router.push({
        name: "address"
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.personalData {
}

.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
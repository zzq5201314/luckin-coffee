<!--
 * @Author: 清羽
 * @Date: 2022-12-28 22:57:56
 * @LastEditTime: 2022-12-28 23:12:34
 * @LastEditors: you name
 * @Description: 个人资料页面
-->
<!-- personalData 页 -->
<template>
  <view
    class="personalData bg-bgColor p-4"
    :style="{height:windowHeight+'px'}"
  >

    <view class="p-3 bg-white rounded-lg">

      <view class="flex">
        <view>头像</view>
        <view>内容</view>
      </view>

      <view class="flex">
        <view>用户名</view>
        <view>内容</view>
      </view>

      <view class="flex">
        <view>关联手机号</view>
        <view>内容</view>
      </view>

      <view class="flex">
        <view>收货地址</view>
        <view>内容</view>
      </view>

    </view>

  </view>
</template>

<script>

export default {
  name: "personalData",
  data () {
    return {
      windowHeight: 0
    }
  },
  components: {},
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
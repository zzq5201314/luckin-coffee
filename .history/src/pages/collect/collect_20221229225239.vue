<!--
 * @Author: 清羽
 * @Date: 2022-12-29 22:06:27
 * @LastEditTime: 2022-12-29 22:52:35
 * @LastEditors: you name
 * @Description: 
-->
<!-- collect 页 -->
<template>
  <view class="collect py-3">

    <view class="bg-white p-4 rounded-lg flex flex-col gap-3">

      <view
        v-for="(item ,index ) in productList"
        :key="index"
        class="flex gap-4 "
      >

        <image
          :src="item.smallImg"
          class="w-32 h-32 rounded-xl"
        ></image>

        <view class="flex-auto">
          <view>{{ item.name }}</view>
          <view>
            <text>￥</text>
            <text>{{ item.price }}</text>
          </view>
        </view>

      </view>

    </view>

  </view>
</template>

<script>


import { findAllLike } from "@/api/collect"
export default {
  name: "collect",
  data () {
    return {
      productList: [],
      windowHeight: 0
    }
  },
  components: {},
  onLoad () {
    this.getData()

    uni.getSystemInfo({
      success: (res) => {
        this.windowHeight = res.windowHeight
        console.log("onLoad => this.windowHeight", this.windowHeight)
        console.log("onLoad => res", res)
      }
    })

  },
  // 函数
  methods: {
    getData () {
      findAllLike().then(response => {
        console.log("findAllLike => response", response)

        if (response.code === 2000) {
          this.productList = response.result

        }

      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.collect {
}
</style>
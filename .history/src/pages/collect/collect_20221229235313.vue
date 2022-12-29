<!--
 * @Author: 清羽
 * @Date: 2022-12-29 22:06:27
 * @LastEditTime: 2022-12-29 23:53:13
 * @LastEditors: you name
 * @Description: 
-->
<!-- collect 页 -->
<template>
  <view class="collect py-3">

    <view class="bg-white p-4 rounded-lg ">

      <uni-swipe-action class="flex flex-col gap-3">

        <uni-swipe-action-item
          v-for="(item ,index ) in productList"
          :key="index"
        >

          <view
            class="flex gap-4 "
            @click="goProductInfo(item.pid)"
          >
            <image
              :src="item.smallImg"
              class="w-32 h-32 rounded-xl"
            ></image>

            <view class="flex-auto">
              <view class="text-lg">{{ item.name }}</view>
              <view class="text-red-500">
                <text>￥</text>
                <text class="text-lg">{{ parseFloat(item.price) }}</text>
              </view>
            </view>
          </view>

          <template v-slot:right>
            <view
              class="w-20 flex items-center justify-center bg-red-500 text-white rounded-r-lg"
              @click="notLike(item.pid)"
            >删除</view>
          </template>

        </uni-swipe-action-item>

      </uni-swipe-action>

    </view>

  </view>
</template>

<script>


import { findAllLike, notLike } from "@/api/collect"
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
    },

    // 跳转商品详情页
    goProductInfo (id) {
      this.$Router.push({
        path: '/pages/productInfo/productInfo',
        query: { productId: id },
      })
    },

    notLike (id) {
      notLike(id).then(response => {
        // console.log("notLike => response", response)

        if (response.code === 900) {
          this.getData()
          this.$store.dispatch("user/getCollectCount")
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
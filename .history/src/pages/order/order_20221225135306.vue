<!--
 * @Author: 清羽
 * @Date: 2022-12-10 15:06:26
 * @LastEditTime: 2022-12-25 13:53:06
 * @LastEditors: you name
 * @Description: 订单页
-->
<!-- order 页 -->
<template>
  <view class="order bg-bgColor px-4 py-2 relative">
    <view
      class="grid grid-cols-3 gap-3 text-center bg-selectText text-white border-2 border-solid border-selectText rounded-full text-lg sticky top-0"
    >
      <text
        class="rounded-full py-1 "
        v-for="(item,index) in tabberItems"
        :key="index"
        :class="{'bg-white':(activeTabber==index),'text-selectText':(activeTabber==index)}"
        @click="selectTabberItem(index)"
      >{{item}}</text>
    </view>
    <!-- tabber end -->

    <view>
      <view v-if="orderList.length>0">

      </view>
      <!-- 商品item -->

      <view
        v-else
        class="h-screen flex justify-center items-center"
      >
        <view class="text-center">
          <text class="text-gray-500">您还没有订单哦</text>
          <view
            class="bg-selectText text-white px-16 py-4 rounded-full text-lg mt-8"
          >
            去喝一杯
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import { findOrder } from "@/api/order"
export default {
  name: "order",
  data () {
    return {
      tabberItems: ['全部', '进行中', '已完成'],
      activeTabber: 0,
      orderList: []
    }
  },
  onLoad () {
    this.getData()
  },
  // 函数
  methods: {
    selectTabberItem (index) {
      this.activeTabber = index
    },

    getData () {
      findOrder().then(response => {
        console.log("findOrder => response", response)
        // if (response.code === 70000) {
        //   this.orderList = response.result
        // }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.order {
}
</style>
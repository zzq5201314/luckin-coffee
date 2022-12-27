<!--
 * @Author: 清羽
 * @Date: 2022-12-10 15:06:26
 * @LastEditTime: 2022-12-27 17:26:33
 * @LastEditors: you name
 * @Description: 订单页
-->
<!-- order 页 -->
<template>
  <view
    class="order bg-bgColor"
    :style="{height:windowHeight+'px'}"
  >

    <view
      class="p-4 sticky z-10 bg-bgColor"
      :style="{top:windowTop+'px'}"
    >
      <view
        class="grid grid-cols-3 gap-3 text-center bg-selectText text-white border-2 border-solid border-selectText rounded-full text-lg sticky top-0 "
      >
        <text
          class="rounded-full py-1 "
          v-for="(item,index) in tabberItems"
          :key="index"
          :class="{'bg-white':(activeTabber==index),'text-selectText':(activeTabber==index)}"
          @click="selectTabberItem(index)"
        >{{item}}</text>
      </view>
    </view>
    <!-- tabber end -->

    <view
      class="mx-4 p-4 rounded-lg h-full overflow-y-scroll hidden"
      :class="{'bg-white':orderList.length>0}"
    >
      <view v-if="orderList.length>0">
        <view
          v-for="(productItem,productIndex) in orderList"
          :key="productIndex"
          class="flex py-3"
        >

          <image
            :src="productItem.smallImg"
            class="w-24 h-24 rounded-full"
          ></image>

          <view class="flex-auto">
            <view class="font-semibold text-lg">{{productItem.name}}</view>
            <view>{{productItem.rule}}</view>
          </view>

          <view>
            <view>{{productItem.price}}</view>
          </view>

        </view>
      </view>
      <!-- 商品item -->

      <view
        v-else
        class="flex justify-center items-center h-full"
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
      windowTop: 0,
      windowHeight: 0,
      tabberItems: ['全部', '进行中', '已完成'],
      activeTabber: 0,
      orderList: []
    }
  },
  onLoad () {

    uni.getSystemInfo({
      success: (res) => {
        this.windowTop = res.windowTop
        this.windowHeight = res.windowHeight
        console.log("onLoad => res", res)
      }
    })
  },
  onShow () {
    this.getData()

  },
  // 函数
  methods: {
    selectTabberItem (index) {
      this.activeTabber = index
      this.getData(index)
    },

    getData (type = 0) {
      console.log('获取订单');
      findOrder(type).then(response => {
        console.log("findOrder => response", response)
        if (response.code === 70000) {
          this.orderList = response.result
        }
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
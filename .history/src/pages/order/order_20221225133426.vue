<!--
 * @Author: 清羽
 * @Date: 2022-12-10 15:06:26
 * @LastEditTime: 2022-12-25 13:34:26
 * @LastEditors: you name
 * @Description: 
-->
<!-- order 页 -->
<template>
  <view class="order bg-bgColor px-4 py-2">
    <view
      class="grid grid-cols-3 gap-3 text-center bg-selectText text-white border-2 border-solid border-selectText rounded-full text-lg"
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
      商品
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
        if (response.code === 70000) {
          this.orderList = response.result

        }
        console.log("findOrder => this.orderList", this.orderList)
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
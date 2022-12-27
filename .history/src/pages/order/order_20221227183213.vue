<!--
 * @Author: 清羽
 * @Date: 2022-12-10 15:06:26
 * @LastEditTime: 2022-12-27 18:32:13
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
      class="p-4 sticky z-10 bg-bgColor tabber"
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
      class="mx-4 pb-4"
      :style="{height:contentHeight+'px'}"
    >

      <view
        v-if="orderList.length>0"
        class="overflow-y-scroll h-full "
      >
        <view
          v-for="(productItem,productIndex) in orderList"
          :key="productIndex"
          class="p-4 my-4 bg-white rounded-lg"
        >

          <view
            class="pb-4 text-right border-0 border-gray-200 border-b border-dotted"
          >
            <view v-show="productItem.status==1">
              <text>订单</text>
              <text class="text-selectText">进行中</text>
            </view>
            <view v-show="productItem.status==2">
              <text>订单</text>
              <text class="text-selectText">已完成</text>
            </view>
          </view>

          <view
            class="flex  items-center gap-2 border-0 border-gray-200 border-b border-dotted py-5"
          >
            <image
              :src="productItem.smallImg"
              class="w-24 h-24 rounded-full"
            ></image>

            <view class="flex-auto">
              <view class="font-semibold text-lg">{{productItem.name}}</view>
              <view class="text-gray-400">{{productItem.rule}}</view>
            </view>

            <view>
              <view>
                <text>¥</text>
                <text>{{productItem.price}}</text>
              </view>

              <view>
                <text class="iconfont text-xs">&#xe685;</text>
                <text>{{productItem.count}}</text>
              </view>
            </view>
          </view>

          <view class="flex justify-end pt-4 gap-3 items-center">

            <view class="flex flex-col gap-3">

              <view class="flex justify-end items-center">
                <text>合计</text>
                <text class="ml-2">¥</text>
                <text
                  class="text-lg">{{productItem.price*productItem.count}}</text>
              </view>
              <!-- 价格 end -->

              <view class="flex gap-3">
                <view
                  class="text-selectText border border-solid border-selectText rounded-full px-4 py-1"
                  @click="receive(productItem.oid)"
                  v-if="productItem.status ===1"
                >
                  确认收货</view>

                <view
                  class="text-selectText border border-solid border-selectText rounded-full px-4 py-1"
                  v-if="productItem.status ===2"
                  @click="goShopping"
                >
                  再来一单</view>

                <view
                  class="text-selectText border border-solid border-selectText rounded-full px-4 py-1"
                  v-if="productItem.status ===2"
                  @click="removeOrder(productItem.oid)"
                >
                  删除订单</view>

              </view>
            </view>
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
            @click="goShopping"
          >
            去喝一杯
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import { findOrder, receive, removeOrder } from "@/api/order"
export default {
  name: "order",
  data () {
    return {
      windowTop: 0,
      windowHeight: 0,
      contentHeight: 0,
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

        let tabber = uni.createSelectorQuery().select(".tabber")
        tabber.boundingClientRect((data) => {
          this.contentHeight = this.windowHeight - data.height
        }).exec()
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

          let tempArr = []

          response.result.forEach(item => {

            item.price = parseFloat(item.price)

            let tempObj = {
              updatedAt: item.updatedAt,
              price: item.price * item.count,
              oid: item.oid,
              status: item.status,
              children: [item]
            }

            if (tempArr.length == 0) {

              tempArr.push(tempObj)
            } else {

              const index = tempArr.findIndex(i => i.oid === item.oid)
              console.log("findOrder => index", index)
              if (index > -1) {
                tempArr[index].children.push(item)
              } else {
                tempArr.push(tempObj)
              }

            }

          })

          console.log("findOrder => tempArr", tempArr)
          this.orderList = response.result
        }
      })
    },

    // 确认收货
    receive (oid) {
      console.log("receive => oid", oid)
      receive(oid).then(response => {
        console.log("receive => response", response)
        if (response.code === 80000) {

          uni.showToast({
            title: response.msg,
            icon: "none"
          })

          this.getData(this.activeTabber)
        }


      })
    },

    // 去购物
    goShopping () {
      this.$Router.push({
        name: "menu"
      })
    },

    // 删除订单
    removeOrder (oid) {
      removeOrder(oid).then(response => {
        console.log("removeOrder => response", response)
        if (response.code === 90000) {

          uni.showToast({
            title: '删除成功',
            icon: "none"
          })

          this.getData(this.activeTabber)
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
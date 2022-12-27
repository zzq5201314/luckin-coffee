<!--
 * @Author: 清羽
 * @Date: 2022-12-10 15:06:26
 * @LastEditTime: 2022-12-27 22:20:27
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
          v-for="(orderItem,orderIndex) in orderList"
          :key="orderIndex"
          class="p-4 my-4 bg-white rounded-lg"
        >

          <view
            class="pb-4 border-0 border-gray-200 border-b border-dotted flex justify-between"
          >
            <view>{{orderItem.updatedAt}}</view>
            <view v-show="orderItem.status==1">
              <!-- <text>订单</text> -->
              <text class="text-selectText">进行中</text>
            </view>
            <view v-show="orderItem.status==2">
              <!-- <text>订单</text> -->
              <text class="text-selectText">已完成</text>
            </view>
          </view>

          <view class="border-0 border-gray-200 border-b border-dotted">

            <view
              class="flex  items-center gap-2  py-5"
              v-for="(productItem ,productIndex) in orderItem.children"
              :key="productIndex"
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

          </view>
          <!-- 商品集合详情 end -->

          <view class="flex justify-end pt-4 gap-3 items-center">

            <view class="flex flex-col gap-3">

              <view class="flex justify-end items-center">
                <text>合计</text>
                <text class="ml-2">¥</text>
                <text class="text-lg">{{orderItem.price}}</text>
              </view>
              <!-- 价格 end -->

              <view class="flex gap-3">
                <view
                  class="text-selectText border border-solid border-selectText rounded-full px-4 py-1"
                  @click="receive(orderItem.oid)"
                  v-if="orderItem.status ===1"
                >
                  确认收货</view>

                <view
                  class="text-selectText border border-solid border-selectText rounded-full px-4 py-1"
                  v-if="orderItem.status ===2"
                  @click="goShopping"
                >
                  再来一单</view>

                <view
                  class="text-selectText border border-solid border-selectText rounded-full px-4 py-1"
                  v-if="orderItem.status ===2"
                  @click="removeOrder(orderItem.oid)"
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

    // uni.getSystemInfo({
    //   success: (res) => {
    //     this.windowTop = res.windowTop
    //     this.windowHeight = res.windowHeight

    //     let tabber = uni.createSelectorQuery().select(".tabber")
    //     tabber.boundingClientRect((data) => {
    //       this.contentHeight = this.windowHeight - data.height
    //     }).exec()
    //   }
    // })
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

            /* 将UTC时间转换成东八区时间 */
            function formatTime (utc_datetime) {
              // 转为正常的时间格式 年-月-日 时:分:秒
              var new_datetime = utc_datetime.split("T")[0] + " " + utc_datetime.split("T")[1].split(".")[0];
              // 处理成为时间戳
              timestamp = new Date(Date.parse(new_datetime));
              timestamp = timestamp.getTime();
              timestamp = timestamp / 1000;
              // 增加8个小时，北京时间比utc时间多八个时区
              var timestamp = timestamp + 8 * 60 * 60;
              // 时间戳转为时间
              var n = parseInt(timestamp) * 1000;
              var D = new Date(n);
              var year = D.getFullYear(); //四位数年份
              var month = D.getMonth() + 1; //月份(0-11),0为一月份
              month = month < 10 ? ('0' + month) : month;
              var day = D.getDate(); //月的某一天(1-31)
              day = day < 10 ? ('0' + day) : day;
              var hours = D.getHours(); //小时(0-23)
              hours = hours < 10 ? ('0' + hours) : hours;
              var minutes = D.getMinutes(); //分钟(0-59)
              minutes = minutes < 10 ? ('0' + minutes) : minutes;
              var seconds = D.getSeconds(); //秒(0-59)
              seconds = seconds < 10 ? ('0' + seconds) : seconds;
              var beijing_datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
              return beijing_datetime; // 2020-10-11 15:32:06
            };

            // 格式化金额 （不保留小数点的 0）
            item.price = parseFloat(item.price)

            let tempObj = {
              updatedAt: formatTime(item.updatedAt),
              price: item.price * item.count,
              oid: item.oid,
              status: item.status,
              children: [item]
            }

            if (tempArr.length == 0) {

              tempArr.push(tempObj)

            } else {

              const index = tempArr.findIndex(i => i.oid === item.oid)
              if (index > -1) {
                tempArr[index].children.push(item)

                tempArr[index].price = tempArr[index].price + item.price * item.count
              } else {
                tempArr.push(tempObj)
              }

            }

          })

          console.log("findOrder => tempArr", tempArr)
          this.orderList = tempArr.reverse()
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
      this.$Router.pushTab({
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
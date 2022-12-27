<!--
 * @Author: 清羽
 * @Date: 2022-12-25 13:52:44
 * @LastEditTime: 2022-12-27 16:34:24
 * @LastEditors: you name
 * @Description: 提交订单页
-->
<!-- commitOrder 页 -->
<template>
  <view
    class="commitOrder bg-bgColor p-3 overflow-y-scroll"
    :style="{height:windowHeight+'px'}"
  >
    <!-- commitOrder 页 -->

    <view
      @click="goAddress"
      class="bg-white p-4 rounded-lg flex items-center justify-between"
    >
      <view class="flex-auto">
        <view class="text-sm">
          {{ addressList[0].province }}{{ addressList[0].city }}{{ addressList[0].county }}
        </view>
        <view class="text-lg font-semibold">{{ addressList[0].addressDetail }}
        </view>
        <view>{{addressList[0].name}} {{ addressList[0].tel }}</view>
      </view>

      <view class="iconfont">&#xe605;</view>
    </view>

    <view class="flex flex-col bg-white mt-3 p-4 rounded-lg">

      <view
        v-for="(productItem,productIndex) in productList"
        :key="productIndex"
        class="flex items-center gap-2 py-3"
      >

        <view class="w-24 h-24 rounded-full overflow-hidden">
          <image
            :src="productItem.small_img"
            class="h-full w-full transform scale-110"
          ></image>
        </view>

        <view class="flex-auto ">
          <view class="text-lg">{{productItem.name}}</view>
          <view class="text-gray-400">{{productItem.rule}}</view>
        </view>

        <view>
          <view class="text-orange-500 text-lg font-semibold">
            <text>¥</text>
            <text class="text-xl ml-1">{{productItem.price}}</text>
          </view>

          <view class="flex justify-end items-center">
            <text class="iconfont text-sm">&#xe685;</text>
            <text>{{productItem.count}}</text>
          </view>
        </view>

      </view>

      <view
        class="flex justify-end pt-3 border-0 border-t border-gray-200 border-dashed"
      >

        <view>
          <text>应付</text>
          <text class="font-semibold ml-2">¥</text>
          <text class="font-semibold text-lg">{{price}}</text>
        </view>

      </view>

    </view>

    <view class="fixed bottom-0 left-0 right-0 bg-white p-3 bottom">

      <view class="flex items-center">

        <view class="flex-auto">
          <text>应付</text>
          <text class="font-semibold text-lg ml-2">¥</text>
          <text class="font-semibold text-2xl tracking-tighter">{{price}}</text>
        </view>

        <view
          class="bg-orange-600 text-white px-12 py-3 rounded-full "
          @click="pay"
        >去支付
        </view>

      </view>

      <view class="page"></view>
    </view>

  </view>
</template>

<script>

import { getCommitOrderProductData, pay } from "@/api/commitOrder"
import { findAddress } from "@/api/address"
import { mapGetters } from "vuex"
import { nextTick } from 'vue'
export default {
  name: "commitOrder",
  data () {
    return {
      windowHeight: 0,
      sids: this.$Route.query.sids,
      productList: [], // 商品列表
      price: 0  // 总价
    }
  },
  components: {},
  computed: {
    ...mapGetters(['addressList'])
  },
  onLoad () {
    // console.log('sids =>', this.$Route.query.sids);
    // console.log('sids => =>', this.sids);
    this.getData()
  },
  onReady () {

    uni.getSystemInfo({
      success: (res) => {
        console.log("onReady => res", res)

        let bottom = uni.createSelectorQuery().select(".bottom")
        bottom.boundingClientRect((data) => {
          console.log("bottom.boundingClientRect => data", data)
          this.windowHeight = res.windowHeight - data.height
        }).exec()
        console.log("bottom.boundingClientRect =>  this.windowHeight", this.windowHeight)

      }
    })

  },
  // 函数
  methods: {
    getData () {
      getCommitOrderProductData(this.$Route.query.sids).then(response => {
        if (response.code === 50000) {

          response.result.forEach(item => {

            item.price = parseFloat(item.price)

            this.price = this.price + item.price * item.count


          })

          this.productList = response.result
          console.log("getCommitOrderProductData => this.productList", this.productList)

        }

      })

      // if (this.addressList.length > 0) {

      //   this.addressList.forEach(item => {
      //     if (item.isDefault == 1) {
      //       this.addressList[0] = item
      //     }

      //   })


      // }

    },

    goAddress () {
      this.$Router.push({
        path: '/pages/address/address',
        query: {
          select: 'true'
        }
      })
    },

    pay () {

      let data = {
        sids: JSON.stringify(this.sids),
        phone: this.addressList[0].phone,
        address: this.addressList[0].province + this.addressList[0].city + this.addressList[0].county + this.addressList[0].addressDetail,
        receiver: this.addressList[0].name
      }
      console.log("pay => data", data)


      pay(data).then(response => {
        console.log("pay => response", response)
        if (response.code === 60000) {

          uni.showToast({
            title: response.msg,
            icon: "none"
          })

          setTimeout(() => {

            this.$Router.back(1)
          }, 500)


        }

      })

    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.commitOrder {
}

.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
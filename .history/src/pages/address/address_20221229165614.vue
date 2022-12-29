<!--
 * @Author: 清羽
 * @Date: 2022-12-26 21:28:20
 * @LastEditTime: 2022-12-29 16:55:56
 * @LastEditors: you name
 * @Description: 
-->
<!-- address 页 -->
<template>
  <view
    class="address bg-bgColor p-3 overflow-y-scroll "
    :style="{height:windowHeight+'px'}"
  >

    <view
      class=" bg-white rounded-lg"
      v-show="addressList.length>0"
    >
      <!-- {{ addressList }} -->
      <view
        v-for="(item , index) in addressList"
        :key="index"
        class="flex items-center py-3 border-0 border-b border-solid border-gray-100 gap-4 relative"
        @click="select(item.aid)"
      >

        <view v-if="item.isDefault==1">
          <text
            class="iconfont text-xl bg-selectText text-white rounded-full">&#xe807;
          </text>
        </view>
        <!-- 选择按钮 end -->

        <view class="flex-auto">
          <view class="text-gray-500 text-sm">
            {{ item.province }}{{ item.city }}{{ item.county }}
          </view>
          <view class="text-lg font-semibold">{{ item.addressDetail }}</view>
          <view class="text-sm">
            <text>{{ item.name }}</text>
            <text class="ml-1 text-gray-500">{{ item.tel }}</text>
          </view>
        </view>
        <!-- 地址详情 end -->

        <view class="iconfont text-xl">&#xe612;</view>
        <!-- 修改按钮 end -->

        <view class="remove">删除</view>
      </view>

      <!-- <view :style="{height:btnHeight+'px'}"></view> -->

    </view>

    <view class="btn fixed bottom-0 left-0 right-0 bg-white">
      <view
        class="text-white bg-selectText py-2 m-2  rounded-full text-center"
        @click="goAddAddress"
      >
        新增收货地址</view>

      <view class="page"></view>
    </view>

  </view>
</template>

<script>

import { findAddress } from "@/api/address"
import { mapGetters } from "vuex"
export default {
  // name: "address",
  data () {
    return {
      windowHeight: 0,
      btnHeight: 0
    }
  },
  components: {},
  computed: {
    ...mapGetters(['addressList'])
  },
  onLoad () {


  },

  onReady () {
    uni.getSystemInfo({
      success: (res) => {

        let bottom = uni.createSelectorQuery().select('.btn')
        bottom.boundingClientRect((data) => {
          this.btnHeight = data.height
          this.windowHeight = res.windowHeight - this.btnHeight
        }).exec()

      }
    })
  },
  // 函数
  methods: {

    goAddAddress () {
      this.$Router.push({
        name: "addAddress"
      })
    },

    select (aid) {

      if (this.$Route.query.select == "true") {

        this.$store.dispatch("address/selectAddress", aid).then(_ => {

          this.$Router.back(1)
        })
      }
    }

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
  .remove {
    width: 80px;
    height: 100%;
    background: red;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(100%);
  }
}

.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
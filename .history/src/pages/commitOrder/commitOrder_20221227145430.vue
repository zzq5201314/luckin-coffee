<!--
 * @Author: 清羽
 * @Date: 2022-12-25 13:52:44
 * @LastEditTime: 2022-12-27 14:54:11
 * @LastEditors: you name
 * @Description: 提交订单页
-->
<!-- commitOrder 页 -->
<template>
  <view class="commitOrder bg-bgColor p-3">
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

    <view>

      <view
        v-for="(productItem,productIndex) in productList"
        :key="productIndex"
        class="flex items-center"
      >

        <image
          :src="productItem.small_img"
          class="w-28 h-28 rounded-full"
        ></image>

        <view>
          <view>{{productItem.name}}</view>
          <view>{{productItem.rule}}</view>
        </view>

        <view>
          <view>价格</view>
          <view>数量</view>
        </view>

      </view>

    </view>

  </view>
</template>

<script>

import { getCommitOrderProductData } from "@/api/commitOrder"
import { findAddress } from "@/api/address"
import { mapGetters } from "vuex"
export default {
  name: "commitOrder",
  data () {
    return {
      sids: this.$Route.query.sids,
      productList: [],
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
  // 函数
  methods: {
    getData () {
      getCommitOrderProductData(this.$Route.query.sids).then(response => {
        console.log("getCommitOrderProductData => response", response)
        if (response.code === 50000) {
          this.productList = response.result
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
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.commitOrder {
}
</style>
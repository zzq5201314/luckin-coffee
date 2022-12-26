<!--
 * @Author: 清羽
 * @Date: 2022-12-25 13:52:44
 * @LastEditTime: 2022-12-26 21:16:06
 * @LastEditors: you name
 * @Description: 提交订单页
-->
<!-- commitOrder 页 -->
<template>
  <view class="commitOrder bg-bgColor p-3">
    <!-- commitOrder 页 -->

    <view
      @click="goAddress"
      class="bg-white p-3"
    >
      <view>
        {{ addressData.province }}{{ addressData.city }}{{ addressData.county }}
      </view>
      <view>{{ addressData.addressDetail }}</view>
      <view>{{ addressData.tel }}</view>
    </view>

  </view>
</template>

<script>

import { getCommitOrderProductData } from "@/api/commitOrder"
import { findAddress } from "@/api/address"
export default {
  name: "commitOrder",
  data () {
    return {
      sids: this.$Route.query.sids,
      productList: [],
      addressData: {}
    }
  },
  components: {},
  onLoad () {
    // console.log('sids =>', this.$Route.query.sids);
    console.log('sids => =>', this.sids);
    this.getData()
  },
  // 函数
  methods: {
    getData () {
      getCommitOrderProductData(this.sids).then(response => {
        console.log("getCommitOrderProductData => response", response)
        if (response.code === 50000) {
          this.productList = response.result
        }

      })

      findAddress().then(response => {
        // console.log("findAddress => response", response)
        if (response.code === 20000) {

          let count = 0
          response.result.forEach(item => {
            if (item.isDefault == 1) {
              this.addressData = item
            } else {
              count++
            }
          })

          if (count == response.result.length) {
            this.addressData = response.result[0]
          }
          console.log("findAddress => this.addressData", this.addressData)
        }
      })
    },

    goAddress () {
      this.$Router.push({
        name: "address"
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
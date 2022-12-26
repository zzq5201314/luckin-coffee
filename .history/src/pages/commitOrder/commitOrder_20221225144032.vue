<!--
 * @Author: 清羽
 * @Date: 2022-12-25 13:52:44
 * @LastEditTime: 2022-12-25 14:39:39
 * @LastEditors: you name
 * @Description: 提交订单页
-->
<!-- commitOrder 页 -->
<template>
  <view class="commitOrder">
    commitOrder 页
  </view>
</template>

<script>

import { getCommitOrderProductData } from "@/api/commitOrder"
export default {
  name: "commitOrder",
  data () {
    return {
      sids: this.$Route.query.sids,
      productList: []
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
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.commitOrder {
}
</style>
<!--
 * @Author: 清羽
 * @Date: 2022-12-26 21:28:20
 * @LastEditTime: 2022-12-26 22:03:38
 * @LastEditors: you name
 * @Description: 
-->
<!-- address 页 -->
<template>
  <view class="address">
    address 页
  </view>
</template>

<script>

import { findAddress } from "@/api/address"

export default {
  name: "address",
  data () {
    return {

    }
  },
  components: {},
  onLoad () {
    this.getData()
  },
  // 函数
  methods: {
    getData () {
      findAddress().then(response => {
        // console.log("findAddress => response", response)
        if (response.code === 20000) {
          let reg = /^(\d{3})\d+(\d{4})$/;

          let count = 0
          response.result.forEach(item => {

            item.tel = item.tel.replace(reg, "$1****$2");

            if (item.isDefault == 1) {

            } else {
              count++
            }
          })

          if (count == response.result.length) {

          }
          console.log("findAddress => response.result", response.result)

        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
}
</style>
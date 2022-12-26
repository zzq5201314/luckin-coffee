<!--
 * @Author: 清羽
 * @Date: 2022-12-26 21:28:20
 * @LastEditTime: 2022-12-26 23:00:06
 * @LastEditors: you name
 * @Description: 
-->
<!-- address 页 -->
<template>
  <view class="address bg-bgColor p-3">

    <view class="p-3 bg-white">

      {{ addressList }}
      <view
        v-for="(item , index) in addressList"
        :key="index"
      >

        <view>
          {{ item }}
        </view>

      </view>

    </view>

  </view>
</template>

<script>

import { findAddress } from "@/api/address"
import { mapGetters } from "vuex"
export default {
  name: "address",
  data () {
    return {
      addressList: []
    }
  },
  components: {},
  comments: {
    ...mapGetters(['addressList'])
  },
  onLoad () {
    // this.getData()
  },
  // 函数
  methods: {
    // getData () {
    //   findAddress().then(response => {
    //     // console.log("findAddress => response", response)
    //     if (response.code === 20000) {
    //       let reg = /^(\d{3})\d+(\d{4})$/;

    //       let count = 0
    //       let tempArr = []

    //       for (let index in response.result) {

    //         response.result[index].tel = response.result[index].tel.replace(reg, "$1****$2");

    //         if (response.result[index].isDefault == 1) {
    //           tempArr = [response.result[index], ...tempArr]
    //         } else {
    //           tempArr.push(response.result[index])
    //         }
    //       }

    //       this.addressList = tempArr
    //       console.log("findAddress => this.addressList", this.addressList)


    //     }
    //   })
    // }


  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
}
</style>
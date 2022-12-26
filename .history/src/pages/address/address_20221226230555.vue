<!--
 * @Author: 清羽
 * @Date: 2022-12-26 21:28:20
 * @LastEditTime: 2022-12-26 23:04:58
 * @LastEditors: you name
 * @Description: 
-->
<!-- address 页 -->
<template>
  <view class="address bg-bgColor p-3">

    <view class="p-3 bg-white">

      <view
        v-for="(item , index) in addressList"
        :key="index"
        class="flex items-center"
      >

        <view>选择</view>

        <view>
          <view>
            {{ item.province }}{{ item.city }}{{ item.county }}
          </view>
          <view>{{ item.addressDetail }}</view>
          <view>{{ item.name }} {{ item.tel }}</view>
        </view>

      </view>

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

    }
  },
  components: {},
  computed: {
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

    //       this.item = tempArr
    //       console.log("findAddress => this.item", this.item)


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
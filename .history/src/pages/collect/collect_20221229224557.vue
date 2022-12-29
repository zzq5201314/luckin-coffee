<!--
 * @Author: 清羽
 * @Date: 2022-12-29 22:06:27
 * @LastEditTime: 2022-12-29 22:45:57
 * @LastEditors: you name
 * @Description: 
-->
<!-- collect 页 -->
<template>
  <view class="collect bg-bgColor p-3">

    <view class="bg-white p-4 rounded-lg flex flex-col gap-6">

      <view
        v-for="(item ,index ) in productList"
        :key="index"
        class="flex gap-4 "
      >

        <image
          :src="item.smallImg"
          class="w-32 h-32 rounded-xl"
        ></image>

        <view class="flex-auto">
          <text>{{ item.name }}</text>
        </view>

      </view>

    </view>

  </view>
</template>

<script>


import { findAllLike } from "@/api/collect"
export default {
  name: "collect",
  data () {
    return {
      productList: []
    }
  },
  components: {},
  onLoad () {
    this.getData()
  },
  // 函数
  methods: {
    getData () {
      findAllLike().then(response => {
        console.log("findAllLike => response", response)

        if (response.code === 2000) {
          this.productList = response.result

        }

      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.collect {
}
</style>
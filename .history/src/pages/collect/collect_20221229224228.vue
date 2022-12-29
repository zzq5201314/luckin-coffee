<!--
 * @Author: 清羽
 * @Date: 2022-12-29 22:06:27
 * @LastEditTime: 2022-12-29 22:42:22
 * @LastEditors: you name
 * @Description: 
-->
<!-- collect 页 -->
<template>
  <view class="collect">

    <view>

      <view
        v-for="(item ,index ) in productList"
        :key="index"
      >

        <image :src="item.smallImg"></image>

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
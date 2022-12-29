<!--
 * @Author: 清羽
 * @Date: 2022-12-29 22:06:27
 * @LastEditTime: 2022-12-29 22:12:41
 * @LastEditors: you name
 * @Description: 
-->
<!-- collect 页 -->
<template>
  <view class="collect">
    collect 页
  </view>
</template>

<script>


import { findAllLike } from "@/api/collect"
export default {
  name: "collect",
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
      findAllLike().then(response => {
        console.log("findAllLike => response", response)

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
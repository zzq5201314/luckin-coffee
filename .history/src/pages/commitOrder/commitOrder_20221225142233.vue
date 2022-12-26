<!--
 * @Author: 清羽
 * @Date: 2022-12-25 13:52:44
 * @LastEditTime: 2022-12-25 14:22:24
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

export default {
  name: "commitOrder",
  data () {
    return {
      sids: this.$Route.query.sids
    }
  },
  components: {},
  onLoad () {
    // console.log('sids =>', this.$Route.query.sids);
    console.log('sids => =>', this.sids);
  },
  // 函数
  methods: {

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.commitOrder {
}
</style>
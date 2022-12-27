<!--
 * @Author: 清羽
 * @Date: 2022-12-16 18:09:56
 * @LastEditTime: 2022-12-27 19:52:47
 * @LastEditors: you name
 * @Description: 
-->
<!-- tabProductList 页 -->
<template>
  <view class="tabProductList grid grid-cols-2 gap-3">
    <view
      v-for="(productItem, productIndex) in productList"
      :key="productIndex"
      class="flex flex-col rounded-xl bg-white overflow-hidden"
      @click="goProductInfo(productItem.pid)"
    >
      <!-- {{productItem}} -->
      <image
        :src="productItem.smallImg"
        class="w-full h-44 "
        mode="aspectFill"
      ></image>
      <text class="px-2 py-1 text-lg">{{productItem.name}}</text>
      <view class="px-2 pb-1">
        <text>¥</text>
        <text class="text-lg">{{parseFloat(productItem.price)}}</text>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: "tabProductList",
  props: {
    productList: {
      type: Array,
      default: new Array
    }
  },
  data () {
    return {

    }
  },
  components: {},
  onLoad () {

  },
  // 函数
  methods: {
    // 跳转商品详情页
    goProductInfo (id) {
      console.log('跳转');
      this.$Router.push({
        path: '/pages/productInfo/productInfo',
        query: { productId: id },
      })
    },
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.tabProductList {
}
</style>
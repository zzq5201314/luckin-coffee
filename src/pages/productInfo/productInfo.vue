<!--
 * @Author: 清羽
 * @Date: 2022-12-12 23:32:41
 * @LastEditTime: 2022-12-13 21:09:21
 * @LastEditors: you name
 * @Description: 
-->
<!-- productInfo 页 -->
<template>
  <view class="productInfo">
    <!-- <image
      :src="productData.large_img"
      class="w-full h-80"
      mode="aspectFill"
    ></image> -->

    <swiper
      indicator-dots="true"
      class=" h-80"
      indicator-active-color="#fff"
      autoplay="true"
      circular="true"
    >
      <swiper-item
        v-for="(imgItem,imgIndex) in productData.large_img"
        :key="imgIndex"
      >
        <image
          :src="imgItem"
          class="w-full h-full"
          mode="aspectFill"
        ></image>
      </swiper-item>
    </swiper>
    <view class="p-3 pt-0 relative">
      <text class="text-lg">{{productData.name}}</text>
      <view class="absolute right-0 top-0 flex flex-col text-center -mt-4 mr-3">
        <view>
          <text
            class="iconfont text-3xl bg-white rounded-full p-2">&#xe7df;</text>
        </view>
        <text class="text-sm">收藏口味</text>
      </view>

      <view class="mt-3">
        <view
          v-for="(rulesItem,rulesIndex) in productData.productRules"
          :key="rulesIndex"
          class="flex h-14 items-center "
        >
          <view class="title">{{rulesItem.title}}</view>
          <view class="key grid grid-cols-3 gap-4">
            <text
              v-for="(keyItem,keyIndex) in rulesItem.ruleItem"
              :key="keyIndex"
              :class="[{actice:rulesItem.acticeIndex==keyIndex}]"
              class=" py-2 bg-gray-50 rounded-md text-center border border-gray-50 text-gray-600"
            >{{keyItem.key}}</text>

          </view>
        </view>
      </view>
    </view>

    <view class="p-3 bg-gray-100">
      <view class="bg-white p-1 px-2 rounded-md">
        <text>商品详情</text>

        <view class="flex flex-col">
          <text
            class="text-sm"
            v-for="(item,index) in productData.desc"
          >{{index+1}}、{{item}}</text>
        </view>

      </view>
    </view>
  </view>
</template>

<script>
import { getProductInfo } from '@/api/productInfo'
export default {
  name: "productInfo",
  data () {
    return {
      productId: this.$Route.query.productId,
      productData: {}
    }
  },
  components: {},

  onLoad () {
    this.productId = this.$Route.query.productId
    console.log("onLoad => this.$Route.query", this.$Route.query)
    // console.log("onLoad => this.$Route.query", this.$Route)
    this.getData()
  },
  // 函数
  methods: {
    getData () {
      getProductInfo({ pid: this.productId }).then(response => {
        // console.log("getProductInfo => response", response)
        const data = response.result[0]
        // 裁剪
        data.desc = data.desc.split('\n')
        // 所有规格组
        var rules = ["tem", "sugar", "milk", "cream"];
        // 新规格
        var newRule = []

        rules.forEach((item) => {
          // 拦截不存在的规格项
          if (!data[item]) {
            return
          }
          console.log(item);
          var rule = {
            // 规格标题
            title: data[item + '_desc'],
            // 默认激活
            acticeIndex: 0,
            // 规格项
            ruleItem: [],
          }
          data[item] = data[item].split('/')

          data[item].forEach((i) => {
            rule.ruleItem.push({ key: i })
          })
          newRule = [...newRule, ...[rule]]
        })

        data.productRules = newRule

        data.large_img = [...[data.large_img], ...[data.large_img], ...[data.large_img]]
        this.productData = data
        console.log("getProductInfo => this.productData", this.productData)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.productInfo {
  .title {
    width: 15%;
  }
  .key {
    width: 85%;
  }
}

.actice {
  background: #eaeeff;
  color: #0022ab;
  border-color: #0022ab;
}

v-deep .uni-swiper-dot-active {
  width: 20px;
  border-radius: 4px;
}
</style>
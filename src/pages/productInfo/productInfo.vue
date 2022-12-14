<!--
 * @Author: 清羽
 * @Date: 2022-12-12 23:32:41
 * @LastEditTime: 2022-12-14 23:38:38
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
            <!-- :class="[{actice:rulesItem.acticeIndex==keyIndex}]" -->
            <text
              v-for="(keyItem,keyIndex) in rulesItem.ruleItem"
              :key="keyIndex"
              @click="selectRules(rulesItem,keyIndex)"
              :class="[{actice:rulesItem.acticeIndex==keyIndex}]"
              class=" py-2 bg-gray-50 rounded-md text-center border border-gray-50 text-gray-600 border-solid"
            >{{keyItem.key}}</text>

          </view>
        </view>
      </view>
    </view>

    <view class="p-3 bg-gray-100 min-h-screen">
      <view class="bg-white p-1 px-2 rounded-md">
        <text class="text-lg">商品详情</text>

        <view class="flex flex-col">
          <text
            class="text-sm"
            v-for="(item,index) in productData.desc"
            :key="index"
          >{{index+1}}、{{item}}</text>
        </view>

      </view>
    </view>

    <view class="goods-carts fixed bottom-0 left-0 right-0 bg-white">
      <view class="px-4 py-2 h-full">

        <view class="flex justify-between mb-3 tracking-tighter">
          <text class="text-orange-600">￥<text
              class="text-2xl">{{productData.price}}</text></text>
          <view class="flex items-center">
            <view
              class="iconfont minus w-7 h-7 rounded-full flex items-center justify-center border-solid border border-selectText text-selectText active:border-blue-800"
              @click="minus"
            >&#xe618;</view>
            <view class="w-9  flex items-center justify-center">{{num}}</view>
            <view
              @click="plus"
              class="iconfont w-7 h-7 rounded-full flex items-center justify-center bg-selectText text-white border border-solid border-selectText active:bg-blue-800"
            >&#xe62d;</view>

          </view>
        </view>
        <view class="grid grid-cols-2 gap-4 text-center ">
          <text
            class="border rounded-full py-2 border-solid bg-white text-orange-300 border-orange-300"
          >立即购买</text>
          <text
            class="border rounded-full py-2 border-solid bg-selectText text-white border-selectText"
          >加入购物车</text>
        </view>
      </view>

      <!-- ios 底部安全高度 -->
      <view class="page"></view>

      <!-- <uni-goods-nav /> -->
    </view>
  </view>
</template>

<script>
import { getProductInfo } from '@/api/productInfo'
import { _throttle, _debounce } from '@/utils/fn'

export default {
  name: "productInfo",
  data () {
    return {
      productId: this.$Route.query.productId,
      productData: {},
      num: 1
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
        // 金额转换 Number 类型
        this.productData.price = Number(this.productData.price)
        console.log("getProductInfo => this.productData", this.productData)


      })


    },

    // 减
    minus: _debounce(function () {
      if (this.num > 1) {
        var price = Number(this.productData.price) / this.num
        this.num = this.num - 1
        this.productData.price = Number(this.productData.price) - price
      }
    }),

    // 加
    plus: _debounce(function () {
      var price = Number(this.productData.price) / this.num
      this.num = this.num + 1
      this.productData.price = Number(this.productData.price) + price
    })
    ,

    // 选择规格
    selectRules (item, index) {
      console.log("selectRules => item", item)
      item.acticeIndex = index
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

// ios底部安全距离-padding
.goods-carts {
  // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}

.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
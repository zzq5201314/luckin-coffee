<!--
 * @Author: 清羽
 * @Date: 2022-12-12 23:32:41
 * @LastEditTime: 2022-12-27 22:32:55
 * @LastEditors: you name
 * @Description: 
-->
<!-- productInfo 页 -->
<template>
  <view class="productInfo ">

    <!-- 自定义导航栏 -->
    <view class="navBarBox absolute top-0 px-4 z-10">
      <!-- 状态栏占位 -->
      <view
        class="statusBar"
        :style="{ paddingTop: statusBarHeight + 'px' }"
      ></view>
      <!-- 真正的导航栏内容 -->

      <view class="navBar pt-1">
        <text
          class="iconfont z-10 bg-white bg-opacity-60 rounded-full w-8 h-8 flex justify-center items-center text-black text-3xl"
          @click="back"
        >
          &#xe685;</text>
        <!-- <view>我是导航栏标题</view> -->
      </view>
    </view>

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
      <text class="text-lg pt-2 block">{{productData.name}}</text>
      <view
        class="absolute right-0 top-0 flex flex-col text-center -mt-4 mr-3 w-14"
      >
        <view @click="likeProduct(productData.pid)">
          <text
            class="iconfont text-3xl bg-white rounded-full p-2 text-gray-500"
            :class="{'text-red-500':isLike}"
          >{{isLike?'&#xe851;':'&#xe7df;'}}</text>
        </view>
        <text class="text-sm">{{isLike?'已收藏':'收藏口味'}}</text>
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
              class=" py-2 bg-gray-50 rounded-md text-center border border-gray-50 text-gray-600 border-solid"
              :class="[{actice:(rulesItem.acticeIndex==keyIndex)}]"
            >{{keyItem.key}}</text>

          </view>
        </view>
      </view>
    </view>

    <view class="p-3 bg-gray-100">
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

      <view :style="{height:tabberHeight+'px'}"></view>
    </view>

    <view class="tabber fixed bottom-0 left-0 right-0 bg-white">
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
            @click="addShopCart('pay')"
          >立即购买</text>
          <text
            class="border rounded-full py-2 border-solid bg-selectText text-white border-selectText"
            @click="addShopCart('addShopCart')"
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
import { getProductInfo, likeProduct, findLike, notLike, addShopCart } from '@/api/productInfo'
import { _throttle, _debounce } from '@/utils/fn'
import { getToken } from '@/utils/auth'
export default {
  name: "productInfo",
  data () {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      productId: this.$Route.query.productId,
      productData: {},
      num: 1,
      tabberHeight: 0,
      isLike: false
    }
  },
  components: {},
  onReady () {

    //获取手机状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']

    uni.getSystemInfo({
      success: (res) => {
        console.log("created => res", res)
        let tabbar = uni.createSelectorQuery().select('.tabber')
        tabbar.boundingClientRect((data) => {
          // console.log(data);
          this.tabberHeight = data.height
          console.log("tabbar.boundingClientRect => this.tabberHeight", this.tabberHeight)
        }).exec()
      }
    })
    this.getData()
  },
  onLoad () {
    this.productId = this.$Route.query.productId



  },
  // 函数
  methods: {

    getData () {

      this.getProductData()

      // 获取token
      let token = getToken()
      if (token) {
        this.findLike()
      }
    },

    // 获取商品详情
    async getProductData () {
      await getProductInfo({ pid: this.productId }).then(response => {
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

    // 查询是否添加收藏
    async findLike () {
      await findLike(this.productId).then(response => {
        // console.log("findLike => response", response)
        if (response.result.length > 0) {
          this.isLike = true
        } else {
          this.isLike = false
        }
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
    },

    // 返回
    back () {
      this.$Router.back(1)
    },

    // 收藏商品
    likeProduct (id) {
      if (this.isLike === true) {
        // 取消收藏
        notLike(id).then(response => {
          // console.log("notLike => response", response.msg)
          this.findLike()
        })

      } else {
        // 添加收藏
        likeProduct(id).then(response => {
          // console.log("likeProduct => response", response.msg)
          this.findLike()
        })

      }

    },

    // 添加购物车
    addShopCart (type) {
      let arr = []
      // 循环遍历出规格
      this.productData.productRules.forEach(i => {
        arr.push(i.ruleItem[i.acticeIndex].key)
      })
      let data = {
        count: this.num,
        pid: this.productData.pid,
        rule: arr.join('/')
      }

      if (type == 'pay') {

        this.$store.dispatch("pay/setPayNowData", data).then(sid => {
          console.log("this.$store.dispatch => sid", sid)

        })

      } else if (type == 'addShopCart') {

        // 执行添加购物车 api
        addShopCart(data).then(response => {
          console.log("addShopCart => response", response)
          if (response.code == 3000) {
            uni.showToast({
              title: response.msg,
              icon: 'none'
            })
            //  更新购物车
            this.$store.dispatch('shopCart/getShopCartData')
            // 返回上一页
            setTimeout(() => {
              this.$Router.back(1)
            }, 500)
          }
        })

      }

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
.tabber {
  // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}

.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
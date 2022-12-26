<!--
 * @Author: 清羽
 * @Date: 2022-12-11 01:15:23
 * @LastEditTime: 2022-12-25 13:56:29
 * @LastEditors: you name
 * @Description: 
-->
<!-- menu 页 -->
<template>
  <view
    class="menuContent w-full"
    :style="{height:contentHeight+'px'}"
  >

    <view class=" bg-bgColor ">

      <view class="bg-white header">
        <view class="">
          <input
            class="mx-10 bg-gray-100 rounded-full mb-2 h-8 py-2 px-6"
            type="text"
            placeholder="搜索框"
          >
        </view>

        <!-- 通知 -->
        <view class="mx-3 py-2 ">
          <uni-notice-bar
            single
            background-color="#f4f7fc"
            color="#183df2"
            showIcon="true"
            text="[多行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
          >
          </uni-notice-bar>
        </view>
      </view>

      <view class="content flex">
        <view class="left overflow-y-scroll mt-2 ">
          <view class=" text-sm category-bar">
            <view
              v-for="(categoryItem , categoryIndex) in categoryList"
              :key="categoryIndex"
              @click="selectCate(categoryIndex)"
              class="py-3 mb-2 flex items-center  rounded-r-full mr-2 "
              :class="{rounded:categoryIndex==current}"
            >
              <!-- :class="[categoryIndex==activeKey?'opacity-100':'']" -->
              <view
                class=" rounded-r-full mr-1 bg-opacity-0 sign"
                :class="{signCheck:categoryIndex==current}"
              >
              </view>
              <text>{{categoryItem.typeDesc}}</text>

            </view>

          </view>
        </view>

        <!-- 侧边栏 end -->

        <view class="right h-full  ">
          <scroll-view
            class="product "
            :style="{height:menuHeight+ 'px'}"
            scroll-y
            @scroll="scroll"
            scroll-with-animation
            :scroll-top="scrollRightTop"
          >
            <view class=" mr-2 mt-2">
              <view
                v-for="(categoryItem , categoryIndex) in categoryList"
                :key="categoryIndex"
                class="rounded-xl bg-white p-4 mb-4 category-right-item flex flex-col"
              >

                <text
                  class="text-base font-semibold">{{categoryItem.typeDesc}}</text>
                <text class="text-xs text-gray-400 mb-4">羊羊必喝爆款，无限回购</text>
                <view
                  v-for="(productItem,productIndex) in categoryItem.productList"
                  :key="productIndex"
                  class="flex py-2"
                  @click="goProductInfo(productItem.pid)"
                >
                  <image
                    :src="productItem.largeImg"
                    class="w-20 h-20 rounded-full"
                    mode="aspectFill"
                  ></image>
                  <view class="flex flex-col ml-2 w-40">
                    <text class=" py-1">{{productItem.name}}</text>
                    <text
                      class="info text-xs text-gray-500">{{productItem.desc}}</text>
                    <view class="flex justify-between mt-3 items-center ">
                      <text
                        class="text-orange-500 tracking-tighter">{{productItem.price}}</text>
                      <view class="relative">
                        <text
                          class="iconfont bg-selectText text-white rounded-full w-6 h-6 flex items-center  justify-center"
                        >&#xe62d;</text>
                        <text
                          v-for="(numItem,numIndex) in numSelectList"
                          :key=numIndex
                        >
                          <text
                            v-if="numItem.pid == productItem.pid"
                            class="absolute top-0 right-0 -mt-3 -mr-2  flex justify-center items-center rounded-full bg-brown w-5 h-5 border-white border border-solid text-white"
                          >{{numItem.count}}</text>
                        </text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>

            </view>
            <text
              class="w-full flex justify-center text-xs text-gray-400 mb-3">我也是有底线的</text>
            <!-- 占位 （用于把商品全部显示出来） -->
            <view
              :style="{height:shopCartHeight+'px'}"
              class="w-full"
            >
            </view>
          </scroll-view>

        </view>
        <!-- 商品栏 end -->

      </view>

    </view>

    <view
      class="fixed right-2 pb-2 shopCartAnimation z-50 left-2"
      :style="{bottom:tabberHeight+ 'px'}"
      :class="{'capsule':shopCartUnfold,'suspension':!shopCartUnfold}"
    >
      <view
        class="flex bg-white items-center rounded-full overflow-hidden shadow-xl shopCartAnimation w-20 h-full"
        :class="{'w-full':shopCartUnfold}"
      >
        <view
          class="relative px-4 py-1 z-10 shopCart"
          @click="openShopCart"
        >
          <text class="iconfont text-5xl">&#xe621;</text>
          <text
            class="absolute top-0 right-4 bg-brown text-white w-6 h-6 rounded-full flex items-center justify-center border-solid border border-white"
          >{{shopCartSum}}</text>

          <!-- 展开按钮   -->
          <view
            class="absolute top-0 left-0 right-0 bottom-0 bg-white z-20 opacity-0"
            v-if="!shopCartUnfold"
            @click="unfoldCapsule()"
          >
          </view>

        </view>
        <!-- 已加购 数量、购物车logo end -->

        <view
          class="flex flex-col flex-1 px-2 py-1 overflow-hidden whitespace-nowrap "
          :class="{'hidden':!shopCartUnfold}"
          @click="openShopCart"
        >
          <text class="text-lg">预计到手<text
              class=" font-semibold text-xl"
              :class="{'text-orange-600':(shopCartMoney>0)}"
            >
              <text class="text-sm mr-1">¥</text>
              {{shopCartMoney}}</text></text>
          <!-- <text class="text-xs text-gray-500">已享受更低优惠</text> -->
        </view>
        <!-- 价格显示 end -->

        <view
          class="bg-selectText text-white px-5  font-bold h-14 flex items-center justify-center"
          :class="{'hidden':!shopCartUnfold,'bg-opacity-60':(shopCartSum==0)}"
          @click="commitOrder"
        >
          {{shopCartSum>0?"去结算":"不可结算"}}
        </view>
        <!-- 结算按钮 end -->
      </view>

    </view>

    <!-- 普通弹窗 -->
    <popup
      :show="popupShow"
      @show="showClick"
    >
      <view class="bg-white ">
        <view class="flex justify-between px-5 py-2">
          <view>

            <label
              class="radio"
              @click="checkAll(shopCartCheckAll)"
            >
              <radio
                :checked="shopCartCheckAll"
                color="#c2a379"
              />
            </label>
            <text class="ml-2">已选购商品（{{ shopCartSum }}件）</text>
          </view>
          <view
            @click="removeShopCart(shopCartList)"
            class="flex items-center"
          >
            <text class="iconfont text-xl">&#xe623;</text>
            <text>清空购物车</text>
          </view>
        </view>
        <!-- title end -->

        <view
          class="px-5 pt-2 border-t border-solid border-gray-100  max-h-96 overflow-y-scroll"
        >
          <view
            v-for="(shopCartItem , shopCartIndex) in shopCartList"
            :key="shopCartIndex"
            class="flex items-center gap-2 mb-2"
          >
            <view>
              <label
                class="radio"
                @click="selectShopCartProduct(shopCartItem)"
              >
                <radio
                  :checked="shopCartItem.activeKey"
                  color="#c2a379"
                />
              </label>
            </view>

            <image
              :src="shopCartItem.small_img"
              class="w-24 h-24 rounded-full"
            ></image>

            <view class="flex flex-col flex-1">
              <text class="text-lg">{{shopCartItem.name}}</text>
              <text class="text-sm text-gray-500">{{shopCartItem.rule}}</text>
              <view class="flex justify-between">
                <text
                  class="text-orange-600 text-lg">{{shopCartItem.price}}</text>
                <view class="flex">

                  <view
                    class="iconfont minus w-7 h-7 rounded-full flex items-center justify-center border-solid border border-selectText text-selectText active:border-blue-800"
                    @click="updateShopCartCount('minus',shopCartItem)"
                  >&#xe618;</view>
                  <view class="w-9  flex items-center justify-center">
                    {{shopCartItem.count}}</view>
                  <view
                    @click="updateShopCartCount('plus',shopCartItem)"
                    class="iconfont w-7 h-7 rounded-full flex items-center justify-center bg-selectText text-white border border-solid border-selectText active:bg-blue-800"
                  >&#xe62d;</view>
                  <!-- 
                  <text>-</text>
                  <text>{{ shopCartItem.count }}</text>
                  <text>+</text> -->
                </view>
              </view>
            </view>

          </view>
        </view>

        <!-- 占位 -->
        <view
          :style="{height:(shopCartHeight+tabberHeight)+'px'}"
          class="w-full"
        ></view>

      </view>
    </popup>
  </view>
</template>

<script>
import { getType } from "@/api/menu"
import { getProductList } from '@/api/home'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import popup from './components/popup'
import { _throttle, _debounce } from '@/utils/fn'
export default {
  // name: "menu",
  data () {
    return {
      categoryList: [],
      scrollTop: 0,
      windowWidth: 0,
      popupShow: false,
      tabberHeight: 0,
      current: 0,             //左边分类栏当前的选中的项
      rightScrollArr: [],     //右边栏每项高度组成的数组
      scrollRightTop: 0,      //当前右边栏滚动的高度
      shopCartUnfold: false,  // 购物车图标是否展开
      shopCartHeight: 0,      // 购物车卡片高度
      menuHeight: 0,          // 菜单 高度
      contentHeight: 0        // 内容 高度
    }
  },
  components: { popup },
  computed: {
    ...mapGetters(['shopCartSum', 'shopCartMoney', 'shopCartList', 'numSelectList', 'shopCartCheckAll'])
  },
  onLoad () {
    // 先获取到数据，再计算右边栏每项高度组成的数组
    this.getData().then(() => {
      this.getCateItemTop()
      let token = getToken()
      if (token && this.shopCartSum > 0) {
        // this.$store.dispatch('shopCart/getShopCartData')
        this.unfoldCapsule(true)
      } else {
        this.unfoldCapsule(false)
      }

    })
  },
  onReady () {
    uni.getSystemInfo({
      success: (res) => {
        console.log("onReady => res", res)
        this.contentHeight = res.windowHeight
        this.tabberHeight = res.windowBottom
        let shopCart = uni.createSelectorQuery().select('.shopCart')
        let header = uni.createSelectorQuery().select('.header')

        // 获取购物车样式
        shopCart.boundingClientRect((data) => {
          this.shopCartHeight = data.height
        }).exec()

        // 获取头部样式
        header.boundingClientRect((data) => {
          // 菜单（左右联动）高度 = 视窗高度 - 头部高度（搜索、通知的头部白色区域） 
          this.menuHeight = res.windowHeight - data.height

        }).exec()
      }
    })
  },
  // 函数
  methods: {

    showClick (e) {
      // console.log("showClick => e", e)
      this.popupShow = e
    },

    change (e) {
      this.show = e.show
    },

    async getData () {

      let data = []
      // 获取分类
      await getType().then(response => {
        console.log("awaitgetType => response", response)


        if (response.result.length > 0) {

          for (var i in response.result) {
            response.result[i]['key'] = 'type'
          }
          response.result = [{ typeDesc: '人气Top', type: 1, key: 'isHot' }, ...response.result]
        }
        data = response.result
      })


      for (var i in data) {
        let productList = []
        let params = { key: data[i].key, value: data[i].type }
        await getProductList(params).then(response => {
          productList = response.result
          data[i]['productList'] = productList
        })
      }


      this.categoryList = data
      console.log("getData => this.categoryList", this.categoryList)


    },


    scroll (event) {
      // 如果购物车是空的 关闭 购物车胶囊
      if (this.shopCartSum == 0) {
        this.unfoldCapsule(false)
      }

      // console.log("scroll => event", event)
      // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
      let scrollTop = event.detail.scrollTop;//这里的detail里有多个数据，可打印出来，根据需要使用
      // console.log("scroll => scrollTop", scrollTop)

      for (var i in this.rightScrollArr) {

        if (this.rightScrollArr[i] - 8 < scrollTop) {
          this.current = i
        }

      }
    },

    async selectCate (index) {

      if (index === this.current) return;
      //将右边的scroll高度重设
      this.scrollRightTop = this.rightScrollArr[index];
      // this.cateDataStatus(index);

    },

    // 获取右侧所有的高度
    getCateItemTop () {
      let query = uni.createSelectorQuery();
      query.selectAll('.category-right-item').boundingClientRect((rects) => {
        rects.forEach((rect) => {
          this.rightScrollArr.push(rect.top - rects[0].top)
        })
        // console.log("query.selectAll => this.rightScrollArr", this.rightScrollArr)
      }).exec(function () {

      })
    },

    // 跳转商品详情页
    goProductInfo (id) {
      this.$Router.push({
        path: '/pages/productInfo/productInfo',
        query: { productId: id },
      })
    },

    // 展开购物车胶囊
    unfoldCapsule (type) {
      // type : true 需要打开  false 需要关闭
      if (type == true) {       // 展开
        this.shopCartUnfold = true
        uni.getSystemInfo({
          success: (res) => {
            this.windowWidth = res.windowWidth
            // this.windowWidth = res.windowWidth - 16
          }
        })

        return
      } else if (type == false) {   // 收起
        this.shopCartUnfold = false
        uni.getSystemInfo({
          success: (res) => {
            this.windowWidth = res.windowWidth - 16
          }
        })

        let shopCart = uni.createSelectorQuery()
        shopCart.select('.shopCart').boundingClientRect((data) => {
          let _a = this.windowWidth - data.width
          this.windowWidth = this.windowWidth - _a
        }).exec()

        return
      }

    },

    // 打开购物车
    openShopCart () {

      if (this.shopCartUnfold == false) {
        this.unfoldCapsule(true)
        return;
      }

      if (this.shopCartList.length == 0) {
        uni.showToast({
          title: '请添加商品'
        })
      }
      else {
        this.popupShow = !this.popupShow
      }
    },

    // 更新 购物车商品数量
    updateShopCartCount: _debounce(function (type, item) {
      // console.log("updateShopCartCount => item", item)

      if (type === 'minus') {   // 减少
        if (item.count == 1) {
          this.removeShopCart(item.sid)
          return
        }
        item.count = item.count - 1


      } else if (type === 'plus') {  // 增加
        item.count = item.count + 1

      } else {
        return
      }

      let data = { sid: item.sid, count: item.count }
      this.$store.dispatch('shopCart/updateShopCartCount', data)
    }),

    // 选择 商品购物车商品
    selectShopCartProduct (item) {
      this.$store.dispatch('shopCart/selectShopCartProduct', item)
    },

    // 全选 购物车商品
    checkAll (type) {
      this.$store.dispatch('shopCart/checkAll', !type)
    },

    // 删除 一个或多个 购物车商品
    removeShopCart: _debounce(function (data) {

      let tempArr = []
      // 判断是否 单个删除 （数组代表删除多个）
      if (typeof data != 'string') {

        if (Array.isArray(data)) {
          data.forEach(item => {
            tempArr.push(item.sid)
          })
        }
        else {
          return
        }

      } else {
        tempArr.push(data)
      }

      // 执行 vuex里的删除
      this.$store.dispatch('shopCart/removeShopCart', tempArr).then(() => {
        // 重新获取数据
        this.$store.dispatch('shopCart/getShopCartData').then(() => {
          if (this.shopCartList.length == 0) {
            this.popupShow = false
          }
        })
      })
    }),


    commitOrder () {
      this.$Router.push({
        name: 'commitOrder'
      })
    }

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.menuContent {
  height: 100%;

  .shopCartAnimation {
    transition: 0.2s;
  }
}

.content {
  .left {
    flex: 1;
  }
  .right {
    flex: 3;
  }
}

.suspension {
  transform: translateX(80%);
}

.capsule {
  transform: translateX(0);
}

.uni-noticebar {
  padding-top: 0;
  padding-bottom: 0;
}

// /deep/ .uni-input-input::placeholder {
//   font-size: 12px !important;
// }

// .info {
//   white-space: nowrap; /*一行显示*/
//   word-break: keep-all;
//   overflow: hidden; /*超出部分隐藏*/

//   text-overflow: ellipsis; /*用...代替超出部分*/
// }

.info {
  // white-space: nowrap; /*一行显示*/
  word-break: break-all;
  // word-break: keep-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sign {
  //默认标记
  width: 4px;
  height: 10px;
}
.signCheck {
  // 选中的标记
  background: #0022ab;
  --tw-bg-opacity: 1;
}

.rounded {
  background: #e5e5e5;
  font-weight: 600;
}
</style>
<!--
 * @Author: 清羽
 * @Date: 2022-12-09 22:52:35
 * @LastEditTime: 2022-12-11 22:17:30
 * @LastEditors: you name
 * @Description: 
-->
<!-- home 页 -->
<template>
  <view class="home">

    <!-- 自定义导航栏 -->
    <view class="navBarBox absolute top-0 px-4">
      <!-- 状态栏占位 -->
      <view
        class="statusBar"
        :style="{ paddingTop: statusBarHeight + 'px' }"
      ></view>
      <!-- 真正的导航栏内容 -->

      <view class="navBar pt-1">
        <text
          class="iconfont z-10 bg-black bg-opacity-30 rounded-full w-8 h-8 flex justify-center items-center text-white text-3xl"
          @click="scanCode"
        >
          &#xe662;</text>
        <!-- <view>我是导航栏标题</view> -->
      </view>
    </view>

    <view class="">

      <uni-swiper-dot
        :info="swiperList"
        :current="swiperCurrent"
        field="content"
        styleType="text"
        :mode="mode"
        class="h-80"
        :dots-styles="dotsStyles"
      >
        <swiper
          :indicator-dots="indicatorDots"
          class="swiper-box h-80"
          @change="change"
          :autoplay="autoplay"
          :duration="duration"
          :interval="interval"
          :circular="circular"
        >
          <swiper-item
            class="h-full"
            v-for="(item ,index) in swiperList"
            :key="index"
          >
            <view class="h-full">
              <image
                :src="item.bannerImg"
                class=" w-full h-full"
                mode="aspectFill"
              ></image>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>

    </view>
    <!-- 轮播图end -->

    <view class="bg-bgColor px-3">

      <view class="-mt-12 relative shadow-lg rounded-xl">
        <view
          class="bg-Bluck text-goldenFont text-xs flex justify-between items-center p-4 py-3 rounded-t-xl"
        >
          <text class="">Lucky you~跟幸运打个招呼</text>
          <text
            class="bg-goldenFont text-black px-2 py-1 rounded-full">登录/注册</text>
        </view>

        <view class="grid grid-cols-3 text-center bg-white px-4">
          <view class="flex flex-col">
            <text class="iconfont text-blue-700 text-5xl mt-4">&#xe64e;</text>
            <text class="text-xl font-bold py-1">到店取</text>
            <text class="text-xs text-gray-400">提前下单自取</text>
          </view>
          <view class="flex flex-col">
            <text class="iconfont text-blue-700 text-5xl mt-4">&#xe636;</text>
            <text class="text-xl font-bold py-1">幸运送</text>
            <text class="text-xs text-orange-500">无接触即时送</text>
          </view>
          <view class="flex flex-col">
            <text class="iconfont text-blue-700 text-5xl mt-4">&#xe617;</text>
            <text class="text-xl font-bold py-1">买潮品</text>
            <text class="text-xs text-gray-400">羊羊颜值周边</text>
          </view>
        </view>

        <view
          class="grid grid-cols-4 text-center bg-white rounded-b-xl pb-3 px-4"
        >
          <view class="flex flex-col">
            <view class="mt-4">
              <view
                class="w-14 bg-gradient-to-t from-transparent rounded-t-full to-gray-50 mx-auto"
              >
                <text class="iconfont text-3xl ">&#xe682;</text>
              </view>
            </view>
            <text class="pt-1 text-sm">充4赠3</text>
            <text class="text-xs text-gray-400 py-1">咖啡钱包</text>
          </view>
          <view class="flex flex-col">
            <view class="mt-4">
              <view
                class="w-14 bg-gradient-to-t from-transparent rounded-t-full to-gray-50 mx-auto"
              >
                <text class="iconfont text-3xl ">&#xe663;</text>
              </view>
            </view>
            <text class="pt-1 text-sm">礼品卡</text>
            <text class="text-xs text-gray-400 py-1">传情达意</text>
          </view>
          <view class="flex flex-col">
            <view class="mt-4">
              <view
                class="w-14 bg-gradient-to-t from-transparent rounded-t-full to-gray-50 mx-auto"
              >
                <text class="iconfont text-3xl ">&#xe65b;</text>
              </view>
            </view>
            <text class="pt-1 text-sm">福利中心</text>
            <text class="text-xs text-gray-400 py-1">天天得福利</text>
          </view>
          <view class="flex flex-col">
            <view class="mt-4">
              <view
                class="w-14 bg-gradient-to-t from-transparent rounded-t-full to-gray-50 mx-auto"
              >
                <text class="iconfont text-3xl ">&#xe61c;</text>
              </view>
            </view>
            <text class="pt-1 text-sm">拼单满减</text>
            <text class="text-xs text-gray-400 py-1">一起点更划算</text>
          </view>
        </view>
      </view>
      <!-- 卡片 end -->

      <view class="mt-2">
        <uni-segmented-control
          :current="tabCurrent"
          :values="tabData"
          @clickItem="onClickItem"
          style-type="text"
          activeColor="#0f0f99"
        ></uni-segmented-control>

        <!-- <view class="flex">
        
            <view class="flex-1 text-center tabItem"  v-for="(item , index) in tabData"
            :key="index">
              {{item}}
            
          </view>

        </view> -->

        <view class="content py-3">
          <view
            v-show="tabCurrent === 0"
            class="grid grid-cols-2 gap-3"
          >
            <view
              v-for="(productItem, productIndex) in productList"
              :key="productIndex"
              class="flex flex-col rounded-xl bg-white overflow-hidden"
            >
              <image
                :src="productItem.smallImg"
                class="w-full h-44 "
                mode="aspectFill"
              ></image>
              <text class="px-2 py-1">{{productItem.name}}</text>
              <text class="px-2 py-1">{{productItem.price}}</text>
            </view>
          </view>
          <view v-show="tabCurrent === 1">
            选项卡2的内容
          </view>
          <view v-show="tabCurrent === 2">
            选项卡3的内容
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import { getBanner, getProductList } from '@/api/home'
export default {
  name: 'home',
  data () {
    return {
      value: '',
      swiperList: [
        { bannerImg: 'https://cdn.uviewui.com/uview/swiper/swiper1.png' },
        { bannerImg: 'https://cdn.uviewui.com/uview/swiper/swiper2.png' },
        { bannerImg: 'https://cdn.uviewui.com/uview/swiper/swiper3.png' },
      ],
      swiperCurrent: 0,
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,

      dotsStyles: {
        backgroundColor: 'rgba(193, 193, 193,0.5)',
        border: '1px rgba(193, 193, 193,0.5) solid',
        color: '#fff',
        selectedBackgroundColor: 'rgb(255, 255, 255)',
        selectedBorder: '1px rgb(255, 255, 255) solid',
        bottom: 60
      },
      mode: 'round',
      indicatorDots: false,//是否显示面板指示点
      autoplay: true,//是否自动切换
      interval: 4000,//自动切换时间间隔
      duration: 500,//滑动动画时长
      circular: true,//是否采用衔接滑动，即播放到末尾后重新回到开头
      tabCurrent: 0,
      tabData: ['热门推荐', '选项12', '选项13'],
      productList: []
    }

  },
  // components: { uniIcons },
  onLoad () {
    this.getData()
  },
  // 第一次加载时调用
  created () {
    //获取手机状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
    console.log('created => this.statusBarHeight', this.statusBarHeight)

  },
  methods: {
    getData () {
      getBanner().then(response => {
        this.swiperList = response.result
      })

      let params = { key: 'isHot', value: 1 }
      getProductList(params).then(response => {
        this.productList = response.result
        console.log("getHotProduct => this.productList", this.productList)
      })
    },
    change (e) {
      this.swiperCurrent = e.detail.current
    },
    onClickItem (e) {
      if (this.tabCurrent != e.currentIndex) {
        this.tabCurrent = e.currentIndex
      }
    },
    scanCode () {
      // 允许从相机和相册扫码
      uni.scanCode({
        success: function (res) {
          console.log('条码类型：' + res.scanType)
          console.log('条码内容：' + res.result)
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.home {
}

.navBarBox {
}
.navBarBox .statusBar {
}
.navBarBox .navBar {
  // padding: 3rpx 50rpx;
  // padding-bottom: 8rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
/deep/ .segmented-control__item--text {
  // position: relative;
  border-color: #0f0f99;
}
// /deep/ .segmented-control__item--text::after {
//   /* 必须设置 content 属性才能生效 */
//   content: '';
// }
</style>
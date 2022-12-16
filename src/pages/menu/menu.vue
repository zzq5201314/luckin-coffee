<!--
 * @Author: 清羽
 * @Date: 2022-12-11 01:15:23
 * @LastEditTime: 2022-12-16 18:21:57
 * @LastEditors: you name
 * @Description: 
-->
<!-- menu 页 -->
<template>
  <view class="menu fixed w-full">

    <view class="">
      <input
        class="mx-10 bg-gray-100 rounded-full mb-2 h-8 py-2 px-6"
        type="text"
        placeholder="搜索框"
      >
    </view>

    <!-- 显示图标 -->
    <view class="mx-3 my-4">
      <uni-notice-bar
        single
        background-color="#f4f7fc"
        color="#183df2"
        showIcon="true"
        text="[多行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"
      >
      </uni-notice-bar>
    </view>

    <view class=" py-3 pb-6 bg-bgColor ">

      <view class="content flex ">
        <view class="left overflow-y-scroll ">
          <view class="demo-uni-col text-sm category-bar">
            <view
              v-for="(categoryItem , categoryIndex) in categoryList"
              :key="categoryIndex"
              @click="switchCate(categoryIndex)"
              class="py-2 mb-2 flex items-center  rounded-r-full mr-2 "
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

        <view class="right ">
          <scroll-view
            class="product demo-uni-col  min-h-screen  h-screen "
            scroll-y
            @scroll="scroll"
            scroll-with-animation
            :scroll-top="scrollRightTop"
          >
            <view class="pb-48 mr-2 ">
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
                    <text
                      class="text-orange-500 tracking-tighter">{{productItem.price}}</text>
                  </view>
                </view>
              </view>

            </view>

          </scroll-view>
        </view>
        <!-- 商品栏 end -->

      </view>

    </view>

  </view>
</template>

<script>
import { getType } from "@/api/menu"
import { getProductList } from '@/api/home'
export default {
  name: "menu",
  data () {
    return {
      categoryList: [],
      scrollTop: 0,
      current: 0,         //左边分类栏当前的选中的项

      rightScrollArr: [], //右边栏每项高度组成的数组
      scrollRightTop: 0   //当前右边栏滚动的高度
    }
  },
  components: {},

  onLoad () {
    this.getData().then(() => {
      this.getCateItemTop()
    })
  },
  onReady () {

  },
  // 函数
  methods: {
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

    async switchCate (index) {

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







  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.menu {
  height: 100%;
}

.content {
  .left {
    flex: 1;
  }
  .right {
    flex: 3;
  }
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
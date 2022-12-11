<!--
 * @Author: 清羽
 * @Date: 2022-12-11 01:15:23
 * @LastEditTime: 2022-12-11 22:40:46
 * @LastEditors: you name
 * @Description: 
-->
<!-- menu 页 -->
<template>
  <view class="menu h-full">

    <view class=" py-3 bg-bgColor h-full">
      <uni-row class="demo-uni-row h-full">
        <uni-col
          :span="6"
          class="h-full"
        >
          <view class="demo-uni-col text-sm">
            <!-- <view
            class="py-2 bg-gray-400 rounded-r-full mr-2 mb-2 flex items-center"
          >
            <view class="w-2 h-2 bg-black rounded-r-full mr-1"></view>
            <text>人气Top</text>
          </view> -->
            <view
              v-for="(categoryItem , categoryIndex) in categoryList"
              :key="categoryIndex"
              class="py-2 mb-2 flex items-center bg-gray-400 rounded-r-full mr-2 "
            >
              <view class="w-2 h-2 bg-black rounded-r-full mr-1 opacity-0">
              </view>
              <text>{{categoryItem.typeDesc}}</text>

            </view>
          </view>
        </uni-col>
        <!-- 侧边栏 end -->

        <uni-col :span="18">
          <view class="demo-uni-col  min-h-screen mr-2">
            <view
              v-for="(categoryItem , categoryIndex) in categoryList"
              :key="categoryIndex"
              class="rounded-xl bg-white p-4 mb-4"
            >
              <text
                class="text-base font-semibold">{{categoryItem.typeDesc}}</text>
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
                  <text>{{productItem.price}}</text>
                </view>
              </view>
            </view>

          </view>
        </uni-col>
        <!-- 商品栏 end -->

      </uni-row>
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
      select: 0,
    }
  },
  components: {},
  onLoad () {
    this.getData().then()
  },
  // 函数
  methods: {
    async getData () {

      let data = []
      // 获取分类
      await getType().then(response => {


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


    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.menu {
  height: 100%;
}
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
</style>
<!--
 * @Author: 清羽
 * @Date: 2022-12-26 21:28:20
 * @LastEditTime: 2022-12-29 23:38:49
 * @LastEditors: you name
 * @Description: 
-->
<!-- address 页 -->
<template>
  <view
    class="address bg-bgColor p-3 overflow-y-scroll "
    :style="{height:windowHeight+'px'}"
    v-if="show"
  >

    <view
      class=" bg-white rounded-lg overflow-hidden"
      v-show="addressList.length>0"
    >

      <uni-swipe-action>

        <uni-swipe-action-item
          v-for="(item , index) in addressList"
          :key="index"
          class=""
          :threshold="0"
        >

          <!-- <template v-slot:left>
            <view><text>置顶</text></view>
          </template> -->

          <view
            @click="select(item.aid)"
            class="flex items-center py-3 px-3 border-0 border-b border-solid border-gray-100 gap-4"
          >
            <view v-if="item.isDefault==1">
              <text
                class="iconfont text-xl bg-selectText text-white rounded-full"
              >&#xe807;
              </text>
            </view>
            <!-- 选择按钮 end -->

            <view class="flex-auto">
              <view class="text-gray-500 text-sm">
                {{ item.province }}{{ item.city }}{{ item.county }}
              </view>
              <view class="text-lg font-semibold">{{ item.addressDetail }}
              </view>
              <view class="text-sm">
                <text>{{ item.name }}</text>
                <text class="ml-1 text-gray-500">{{ item.tel }}</text>
              </view>
            </view>
            <!-- 地址详情 end -->

            <view
              class="iconfont text-xl"
              @click="edit(item.aid)"
            >&#xe612;</view>
            <!-- 修改按钮 end -->
          </view>
          <template v-slot:right>
            <view
              @click="dleAddress(item.aid)"
              class="text-white bg-red-600 rounded-r-lg flex justify-center items-center w-20"
            >删除</view>
          </template>

        </uni-swipe-action-item>

        <uni-swipe-action-item @click="bindClick">
          <template v-slot:left>
            <view class="slot-button">
              <text
                class="slot-button-text"
                @click="bindClick({position:'left',content:{text:'置顶'}})"
              >置顶</text>
            </view>
          </template>
          <view
            class="content-box"
            @click="contentClick"
          >
            <text class="content-text">使用左右插槽</text>
          </view>
          <template v-slot:right>
            <view
              class="slot-button"
              @click="bindClick({position:'right',content:{text:'删除'}})"
            ><text class="slot-button-text">删除</text></view>
          </template>
        </uni-swipe-action-item>

      </uni-swipe-action>
      <!-- {{ addressList }} -->

      <!-- <view :style="{height:btnHeight+'px'}"></view> -->

    </view>

    <view class="btn fixed bottom-0 left-0 right-0 bg-white">
      <view
        class="text-white bg-selectText py-2 m-2  rounded-full text-center"
        @click="goAddAddress"
      >
        新增收货地址</view>

      <view class="page"></view>
    </view>

  </view>
</template>

<script>

import { findAddress, deleteAddress } from "@/api/address"
import { mapGetters } from "vuex"
export default {
  // name: "address",
  data () {
    return {
      windowHeight: 0,
      btnHeight: 0,
      startX: 0,
      delBtnWidth: 85,
      show: true
    }
  },
  components: {},
  computed: {
    ...mapGetters(['addressList'])
  },
  onLoad () {


  },

  onReady () {
    uni.getSystemInfo({
      success: (res) => {

        let bottom = uni.createSelectorQuery().select('.btn')
        bottom.boundingClientRect((data) => {
          this.btnHeight = data.height
          this.windowHeight = res.windowHeight - this.btnHeight
        }).exec()

      }
    })
  },
  // 函数
  methods: {

    goAddAddress () {
      this.$Router.push({
        name: "addAddress"
      })
    },

    select (aid) {

      if (this.$Route.query.select == "true") {

        this.$store.dispatch("address/selectAddress", aid).then(_ => {

          this.$Router.back(1)
        })
      }
    },

    dleAddress (aid) {
      var _this = this

      uni.showModal({
        title: "确认是否删除",
        success: function (res) {
          // console.log("dleAddress => res", res)
          // 点击确认
          if (res.confirm) {

            uni.showLoading({
              title: '加载中',
              mask: true
            });

            deleteAddress(aid).then(response => {

              uni.showToast({
                title: response.msg,
                icon: "none"
              })

              _this.show = false
              setTimeout(function () {
                _this.$store.dispatch("address/findAddress")
                _this.show = true
                uni.hideLoading();
              }, 1)

            })
          }

        }
      })


      //   // console.log("deleteAddress => response", response)

      //   if (response.code === 10000) {

      //     uni.showToast({
      //       title: response.msg,
      //       icon: "none"
      //     })

      //     // 获取数据
      //     this.$store.dispatch("address/findAddress")
      //   } else {

      //     uni.showToast({
      //       title: response.msg,
      //       icon: "none"
      //     })

      //   }

      //   this.show = true
      //   uni.hideLoading();
      // })
    },

    edit (aid) {
      console.log("edit => aid", aid)
      this.$Router.push({
        path: "/pages/address/addAddress",
        query: {
          aid
        }
      })

    },


    bindClick (e) {
      console.log(e);
      uni.showToast({
        title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
        icon: 'none'
      });
    },

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
}

.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
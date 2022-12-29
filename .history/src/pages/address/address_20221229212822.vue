<!--
 * @Author: 清羽
 * @Date: 2022-12-26 21:28:20
 * @LastEditTime: 2022-12-29 21:27:35
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
      <!-- {{ addressList }} -->
      <view
        v-for="(item , index) in addressList"
        :key="index"
        :data-index="index"
        class="flex items-center py-3 px-3 border-0 border-b border-solid border-gray-100 gap-4 relative  overflow-x-scroll addressItem overflow-hidden"
        @click="select(item.aid)"
      >

        <view v-if="item.isDefault==1">
          <text
            class="iconfont text-xl bg-selectText text-white rounded-full">&#xe807;
          </text>
        </view>
        <!-- 选择按钮 end -->

        <view class="flex-auto">
          <view class="text-gray-500 text-sm">
            {{ item.province }}{{ item.city }}{{ item.county }}
          </view>
          <view class="text-lg font-semibold">{{ item.addressDetail }}</view>
          <view class="text-sm">
            <text>{{ item.name }}</text>
            <text class="ml-1 text-gray-500">{{ item.tel }}</text>
          </view>
        </view>
        <!-- 地址详情 end -->

        <view class="iconfont text-xl">&#xe612;</view>
        <!-- 修改按钮 end -->

        <view
          class="remove absolute top-0 right-0 h-full text-white bg-red-600 border-white border-solid border rounded-r-lg -mr-3 flex justify-center items-center "
          @click="dleAddress(item.aid)"
        >删除
        </view>
      </view>

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
      // uni.showLoading({
      //   title: '加载中',
      //   mask: true
      // });
      // this.show = false
      var _this = this

      uni.showModal({
        title: "确认是否删除",
        success: function (res) {
          console.log("dleAddress => res", res)
          // 点击确认
          if (res.confirm) {

            uni.showLoading({
              title: '加载中',
              mask: true
            });

            _this.show = false
            deleteAddress(aid).then(response => {

              uni.showToast({
                title: response.msg,
                icon: "none"
              })

              setTimeout(function () {
                _this.$store.dispatch("address/findAddress")
                _this.show = true
                uni.hideLoading();
              }, 10)

            })
          }

        }
      })


      // deleteAddress(aid).then(response => {

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
    }

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
  .remove {
    width: 80px;

    transform: translateX(100%);
  }

  .addressItem::-webkit-scrollbar {
    display: none;
  }
}

.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
<!--
 * @Author: 清羽
 * @Date: 2022-12-09 23:20:43
 * @LastEditTime: 2022-12-16 23:53:14
 * @LastEditors: you name
 * @Description: 
-->
<!-- my 页 -->
<template>
  <view class="my bg-gray-100 ">
    <view class="relative">
      <image
        :src="bgUrl"
        class="w-full"
      ></image>

      <view class="relative px-2 w-full userCard">
        <view class="flex items-center text-white">
          <image
            :src="userImg"
            class="h-16 w-16 rounded-full border-2 border-solid border-white bg-white"
          ></image>
          <text>{{name}}</text>
          <text class="iconfont">&#xe605;</text>
        </view>
        <!-- 名字 头像 end -->

        <view class="p-3 bg-white rounded-xl mt-3 ">
          <view class="font-semibold">欢迎~Luckin新便宜</view>
          <view class="flex justify-between items-center mt-2">
            <text class="text-2xl">0</text>
            <text class="text-xs text-gray-600 iconfont">去喝一杯加入Luckin&#xe605;
            </text>
          </view>
          <view class="bg-gray-100 h-1 w-full rounded-full"></view>
        </view>
      </view>
      <!-- 用户信息卡片 end -->

      <view class="mt-7 px-2">
        <view class="grid grid-cols-5  text-xs text-center ">

          <view>
            <view class="iconfont text-4xl">&#xe663;</view>
            <text>我的订单</text>
          </view>
          <view>
            <view class="iconfont text-4xl">&#xe682;</view>
            <text>咖啡钱包</text>
          </view>
          <view>
            <view class="iconfont text-4xl">&#xe8ae;</view>
            <text>优惠劵</text>
          </view>
          <view>
            <view class="iconfont text-4xl">&#xe629;</view>
            <text>礼品卡</text>
          </view>
          <view>
            <view class="iconfont text-4xl">&#xe677;</view>
            <text>我的订单</text>
          </view>

        </view>
      </view>

      <view
        class=" mt-4 h-20 whitespace-nowrap overflow-hidden overflow-x-auto">
        <image
          src="https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/131926/15/25947/50682/630882a7E3b00d35c/7093c8692f6386d3.jpg!cr_1053x420_4_0!q70.jpg"
          class=" h-full rounded-lg mx-2"
        ></image>

        <image
          src="https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/213837/26/24267/185586/639689bcE88383783/0843f76a7813c526.png!cr_1053x420_4_0"
          class=" h-full rounded-lg mx-2"
        ></image>
      </view>

      <view class="">

      </view>

    </view>

  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser } from '@/api/user'
export default {
  name: "my",
  data () {
    return {
      bgUrl: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'userImg'])
  },
  onLoad () {
    this.getData()
  },
  // 函数
  methods: {
    getData () {
      getUser().then(response => {
        this.bgUrl = response.result[0].userBg
        console.log("getUser => response", response)

      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.my {
  .userCard {
    margin-top: -35%;
  }
}
</style>
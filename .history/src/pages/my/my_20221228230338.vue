<!--
 * @Author: 清羽
 * @Date: 2022-12-09 23:20:43
 * @LastEditTime: 2022-12-28 23:03:38
 * @LastEditors: you name
 * @Description: 
-->
<!-- my 页 -->
<template>
  <view class="my bg-gray-100 relative min-h-screen">
    <view class="relative">
      <image
        :src="bgUrl"
        class="w-full h-80 "
        mode="aspectFill"
      ></image>

      <view class=" px-2 userCard relative">
        <view class="flex items-center text-white">
          <image
            :src="userImg"
            class="h-16 w-16 rounded-full border-2 border-solid border-white bg-white"
            @click="goSettings"
          ></image>
          <text
            class="ml-2 font-semibold"
            @click="goSettings"
          >{{name}}</text>
          <text
            class="iconfont"
            @click="goSettings"
          >&#xe605;</text>
        </view>
        <!-- 名字 头像 end -->

        <view class="p-3 bg-white rounded-xl mt-3 ">
          <view
            class="font-semibold"
            v-if="name"
          >Lv1 {{name}}</view>
          <view
            class="font-semibold"
            v-else
          >欢迎~Luckin新便宜</view>
          <view class="flex justify-between items-center mt-2">
            <text class="text-2xl">0</text>
            <view
              class="text-xs text-gray-600 iconfont"
              v-if="name"
              @click="routerGo('/pages/menu/menu')"
            >已为您保级30天，去冲刺&#xe605;
            </view>
            <view
              class="text-xs text-gray-600 iconfont"
              v-else
              @click="routerGo('/pages/login/login')"
            >去喝一杯加入Luckin&#xe605;
            </view>
          </view>
          <view class="bg-gray-100 h-1 w-full rounded-full"></view>
        </view>
      </view>
      <!-- 用户信息卡片 end -->

      <view class="mt-4 px-2 ">
        <view
          class="grid grid-cols-5  text-xs text-center mt-3 "
          v-for="(item,index) in 2"
          :key="index"
          v-show="index ==0 |isUnfold"
        >

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

        <view class="flex items-center justify-center mt-2">
          <text
            class="iconfont text-lg"
            @click="unfold
"
          >{{isUnfold?'&#xe606;':'&#xe60d;'}}</text>
        </view>

      </view>

      <view
        class="w-screen mt-4 h-24 whitespace-nowrap overflow-hidden overflow-x-auto"
      >
        <image
          src="https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/131926/15/25947/50682/630882a7E3b00d35c/7093c8692f6386d3.jpg!cr_1053x420_4_0!q70.jpg"
          class=" h-full rounded-lg mx-2"
        ></image>

        <image
          src="https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/213837/26/24267/185586/639689bcE88383783/0843f76a7813c526.png!cr_1053x420_4_0"
          class=" h-full rounded-lg mx-2"
        ></image>
      </view>

      <view class="mt-4 px-2">
        <view class="flex justify-between items-center">
          <text class="font-semibold">送礼品卡</text>
          <text class="text-xs">查看全部</text>
        </view>

        <view class="mt-2 grid grid-cols-2 gap-2 pb-4">
          <image
            src="https://ts1.cn.mm.bing.net/th/id/R-C.fcc8ea37e1a59cb5d209504ab4f01be2?rik=1aonDodf7g1rEA&riu=http%3a%2f%2fi0.hdslb.com%2fbfs%2farchive%2fe2c01f968d4b844d3389362d55641ad7c45a0d25.jpg&ehk=8WV38hH9W3ztpRti1oNEQslftOnvLhxEKD0wFG3ff60%3d&risl=1&pid=ImgRaw&r=0"
            class="w-full h-32 rounded-lg"
          >
          </image>
          <image
            src="https://ts1.cn.mm.bing.net/th/id/R-C.fcc8ea37e1a59cb5d209504ab4f01be2?rik=1aonDodf7g1rEA&riu=http%3a%2f%2fi0.hdslb.com%2fbfs%2farchive%2fe2c01f968d4b844d3389362d55641ad7c45a0d25.jpg&ehk=8WV38hH9W3ztpRti1oNEQslftOnvLhxEKD0wFG3ff60%3d&risl=1&pid=ImgRaw&r=0"
            class="w-full h-32 rounded-lg"
          >
          </image>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser } from '@/api/user'
import myLink from 'uni-simple-router/dist/link.vue';
export default {
  name: "my",
  data () {
    return {
      bgUrl: '',
      isUnfold: false
    }
  },
  components: { myLink },
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
    },

    unfold () {
      this.isUnfold = !this.isUnfold
    },

    routerGo (path) {
      this.$Router.pushTab({
        path
      })
    },

    goSettings () {
      this.$Router.pushTab({
        name: "personalData"
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

  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
}
</style>
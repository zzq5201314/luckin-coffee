<!--
 * @Author: 清羽
 * @Date: 2022-12-10 15:34:40
 * @LastEditTime: 2022-12-10 18:53:22
 * @LastEditors: you name
 * @Description: 
-->
<!-- tabBar 页 -->
<template>
  <view>
    <!-- <u-tabbar
      v-model="current"
      :list="list"
      :mid-button="true"
      @change="ChangBar"
    ></u-tabbar> -->
    <u-tabbar
      zIndex="999"
      :value="current"
      @change="ChangBar"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item
        v-for="(item , index) in list"
        :key="index"
        :text="item.text"
        :icon="item.selectedIconPath"
      ></u-tabbar-item>

    </u-tabbar>
  </view>
</template>


<script>

export default {
  name: "tabBar",
  data () {
    return {
      list: [{
        "pagePath": "pages/home/home",
        iconPath: "home",
        selectedIconPath: "home-fill",
        text: '首页',
        // count: 2,
        // isDot: true,
        customIcon: false,
      },
      // {
      //   "pagePath": "pages/Projection/Projection",
      //   iconPath: "photo",
      //   selectedIconPath: "photo-fill",
      //   text: '放映厅',
      //   customIcon: false,
      // },
      // {
      //   "pagePath": "pages/order/order",
      //   iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
      //   selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
      //   text: '发布',
      //   midButton: true,
      //   customIcon: false,
      // },
      {
        "pagePath": "pages/order/order",
        iconPath: "file-text",
        selectedIconPath: "file-text-fill",
        text: '订单',
        customIcon: false,
      },
      {
        "pagePath": "pages/my/my",
        iconPath: "account",
        selectedIconPath: "account-fill",
        text: '我的',
        // "count": 23,
        isDot: false,
        customIcon: false,
      },
      ],
      current: 0
    }
  },
  components: {},
  onLoad () {

  },
  // 函数
  methods: {
    ChangBar (e) {
      this.current = e
      console.log("ChangBar => e", e)
      // uni.switchTab({
      //   url: '/' + this.list[e].pagePath
      // })
      this.$Router.push({
        path: '/' + this.list[e].pagePath
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>
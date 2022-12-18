<!--
 * @Author: 清羽
 * @Date: 2022-12-18 22:11:44
 * @LastEditTime: 2022-12-19 00:15:44
 * @LastEditors: you name
 * @Description: 
-->
<!-- popup 页 -->
<template>
  <view
    class="popup"
    v-if="show"
  >

    <!-- 遮罩层 -->
    <view
      class="overlay"
      @click="overlayClick"
      v-if="overlay"
    >
    </view>

    <view class="content ">
      <slot />
    </view>

  </view>
</template>

<script>

export default {
  name: "popup",
  props: {
    // 是否展示组件
    show: {
      type: Boolean,
      default: false
    },
    // 是否显示遮罩
    overlay: {
      type: Boolean,
      default: true
    },
    // 动画的执行时间，单位ms
    duration: {
      type: [String, Number],
      default: 3000
    },
    maxHeight: {
      type: Number,
    }
  },
  data () {
    return {
      inited: false,  // 是否显示/隐藏组件
      overlayDuration: this.duration + 50
    }
  },
  components: {},
  onLoad () {

  },
  // 函数
  methods: {
    // 点击遮罩
    overlayClick () {
      console.log("overlayClick => this.show", this.show)
      console.log('点击遮罩');
      this.$emit("show", !this.show);
    },
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;

  .overlay {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.383);
  }

  .content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}
</style>
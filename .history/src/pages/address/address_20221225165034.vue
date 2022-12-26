<!--
 * @Author: 清羽
 * @Date: 2022-12-25 16:47:44
 * @LastEditTime: 2022-12-25 16:50:34
 * @LastEditors: you name
 * @Description: 
-->
<!-- address 页 -->
<template>
  <view class="address">
    address 页

    <uni-data-picker
      placeholder="请选择班级"
      popup-title="请选择所在地区"
      :localdata="dataTree"
      v-model="classes"
      @change="onchange"
      @nodeclick="onnodeclick"
      @popupopened="onpopupopened"
      @popupclosed="onpopupclosed"
    >
    </uni-data-picker>
  </view>
</template>

<script>

export default {
  name: "address",
  data () {
    return {
      classes: '1-2',
      dataTree: [{
        text: "一年级",
        value: "1-0",
        children: [{
          text: "1.1班",
          value: "1-1"
        },
        {
          text: "1.2班",
          value: "1-2"
        }]
      },
      {
        text: "二年级",
        value: "2-0",
        children: [{
          text: "2.1班",
          value: "2-1"
        },
        {
          text: "2.2班",
          value: "2-2"
        }]
      },
      {
        text: "三年级",
        value: "3-0",
        disable: true
      }]
    }
  }
},
components: { },
onLoad() {

},
// 函数
methods: {
  onnodeclick(e) {
    console.log(e);
  },
  onpopupopened(e) {
    console.log('popupopened');
  },
  onpopupclosed(e) {
    console.log('popupclosed');
  },
  onchange(e) {
    console.log('onchange:', e);
  }
}
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
}
</style>
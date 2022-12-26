<!--
 * @Author: 清羽
 * @Date: 2022-12-25 16:47:44
 * @LastEditTime: 2022-12-25 20:14:02
 * @LastEditors: you name
 * @Description: 
-->
<!-- address 页 -->
<template>
  <view class="address">
    address 页

    <uni-data-picker
      placeholder="请选择 省 /市 /区"
      popup-title="请选择所在地区"
      v-model="value"
      :localdata="dataTree"
      @change="onchange"
      @nodeclick="onnodeclick"
    >
    </uni-data-picker>
  </view>
</template>

<script>

const cityRows = require('./data.json')
export default {
  // name: "address",
  data () {
    return {
      // classes: '1-2',
      // dataTree: [
      //   {
      //     text: "一年级",
      //     value: "1-0",
      //     children: [{
      //       text: "1.1班",
      //       value: "1-1"
      //     },
      //     {
      //       text: "1.2班",
      //       value: "1-2"
      //     }]
      //   },
      //   {
      //     text: "二年级",
      //     value: "2-0",
      //     children: [{
      //       text: "2.1班",
      //       value: "2-1"
      //     },
      //     {
      //       text: "2.2班",
      //       value: "2-2"
      //     }]
      //   },
      //   {
      //     text: "三年级",
      //     value: "3-0",
      //     disable: true
      //   }],
      dataTree: cityRows,
      value: [""],
    }

  },
  components: {},
  onLoad () {
    console.log(this.dataTree);
  },
  // 函数
  methods: {
    onnodeclick (e) {
      console.log(e);
    },
    onpopupopened (e) {
      console.log('popupopened');
    },
    onpopupclosed (e) {
      console.log('popupclosed');
    },
    onchange (e) {
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
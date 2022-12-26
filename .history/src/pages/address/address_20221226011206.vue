<!--
 * @Author: 清羽
 * @Date: 2022-12-25 16:47:44
 * @LastEditTime: 2022-12-26 01:12:06
 * @LastEditors: you name
 * @Description: 
-->
<!-- address 页 -->
<template>
  <view class="address">
    address 页

    <!-- <uni-data-picker
      placeholder="请选择省 / 市 / 区"
      :localdata="localData"
      :modelValue="value"
      popup-title="请选择省市区"
      @change="onchange"
      @nodeclick="onnodeclick"
    >
    </uni-data-picker> -->

    <van-area area-list="{{ areaList }}" />
  </view>
</template>

<script>
import { areaList } from '@vant/area-data';
// const cityRows = require('./data.json')

import varnArea from './components/area'
export default {
  // name: "address",
  data () {
    return {
      areaList,
      value: [""],
      // 省市区
      localData: []
    }

  },
  components: { varnArea },
  onLoad () {
    // console.log(this.dataTree);

    // 省市区数据树生成
    // this.localData = this.get_city_tree()
    // console.log("onLoad => this.localData", this.localData)

    console.log('areaList =>', this.areaList);
  },
  // 函数
  methods: {

    // 省市区数据树生成
    // get_city_tree () {
    //   let res = []
    //   if (cityRows.length) {
    //     // 递归生成
    //     res = this.handleTree(cityRows)
    //   }
    //   return res
    // },

    // 整体选择完成以后
    // onchange (e) {
    //   const value = e.detail.value
    //   console.log(JSON.stringify(value))
    // },

    // 节点变化后 （并非已经选择完毕）
    // onnodeclick (node) {
    //   // console.log(JSON.stringify(node))
    // },


    // handleTree (data, parent_code = null) {
    //   let res = []

    //   let keys = {
    //     id: 'code',
    //     pid: 'parent_code',
    //     children: 'children',

    //     text: 'name',
    //     value: 'code'
    //   }

    //   let oneItemDEMO = {
    //     text: '',
    //     value: '',
    //     children: []
    //   }
    //   let oneItem = {}

    //   // 循环
    //   for (let index in data) {
    //     // 判断
    //     if (parent_code === null) {
    //       // 顶级菜单 - 省
    //       if (!data[index].hasOwnProperty(keys.pid) || data[index][keys.pid] == parent_code) {
    //         // 不存在parent_code，或者已匹配
    //         oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
    //         oneItem.text = data[index][keys.text]
    //         oneItem.value = data[index][keys.value]

    //         // 递归下去
    //         oneItem.children = this.handleTree(data, data[index][keys.id])
    //         res.push(oneItem)

    //       } else {
    //         // 匹配不到，跳过
    //       }

    //     } else {
    //       // 非顶级菜单 - 市、区、街道
    //       if (data[index].hasOwnProperty(keys.pid) && data[index][keys.pid] == parent_code) {
    //         // 已匹配
    //         oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
    //         oneItem.text = data[index][keys.text]
    //         oneItem.value = data[index][keys.value]

    //         // 递归下去
    //         oneItem.children = this.handleTree(data, data[index][keys.id])
    //         res.push(oneItem)

    //       } else {
    //         // 匹配不到，跳过
    //       }

    //     }

    //   }

    //   return res
    // }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
}
</style>

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
    </uni-data-picker> --> -->

    <!-- {{ value }} -->

    <view>
      <text class="required"></text>
      <view class="title">所在地区</view>
      <picker
        mode="multiSelector"
        @change="selCity"
        @columnchange="selMonitor"
        :value="cityList"
        :range="address"
      >
        <view></view>
      </picker>
    </view>

    <!-- <picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker> -->

  </view>
</template>

<script>
import { areaList } from '@vant/area-data';
const cityRows = require('./data.json')

export default {
  // name: "address",
  data () {
    return {
      areaList,
      value: [""],
      // 省市区
      localData: [],

      provinceList: [],
      cityAllList: [],
      address: []
    }

  },
  components: {
  },
  onLoad () {
    // console.log(this.dataTree);

    // 省市区数据树生成
    this.localData = this.get_city_tree()
    console.log("onLoad => this.localData", this.localData)

    this.getAddressData()

    // console.log('cityRows => ', cityRows);


    console.log('areaList =>', this.areaList);
  },
  // 函数
  methods: {

    getAddressData () {
      let cityAllList = []

      let provinceList = []

      let address = this.localData
      for (let key in address) {
        let newDataList = [];
        if (address[key].children) {
          for (let key2 in address[key].children) {
            newDataList.push(address[key].children[key2].text)
          }
        }

        provinceList.push(address[key].text)
        cityAllList.push(newDataList)
      }

      this.provinceList = provinceList
      console.log("getAddressData =>  this.provinceList", this.provinceList)
      this.cityAllList = cityAllList;
      console.log("getAddressData => this.cityAllList", this.cityAllList)
      this.address = [provinceList, cityAllList[0]];
      console.log("getAddressData => this.address", this.address)
    },

    // 省市区数据树生成
    get_city_tree () {
      let res = []
      if (cityRows.length) {
        // 递归生成
        res = this.handleTree(cityRows)
      }
      return res
    },


    // 监听省市区滚动
    selMonitor (e) {
      const that = this
      let column = e.detail.column
      if (column == 0) {
        let index = e.detail.value
        let length = that.address[1].length
        // 改变市
        that.address[1].splice(0, length, ...that.cityAllList[index])
      }
    },
    // 选择省市
    // 获取地址信息
    selCity (e) {
      const that = this;
      let val = e.target.value
      this.cityList = val
      that.addressNode = {
        province: that.address[0][this.cityList[0]],
        city: that.address[1][this.cityList[1]]
      }
      console.log(val, that.addressNode, '123123123123123')
    },


    // 整体选择完成以后
    // onchange (e) {
    //   const value = e.detail.value
    //   console.log(JSON.stringify(value))
    // },

    // 节点变化后 （并非已经选择完毕）
    // onnodeclick (node) {
    //   // console.log(JSON.stringify(node))
    // },


    handleTree (data, parent_code = null) {
      let res = []

      let keys = {
        id: 'code',
        pid: 'parent_code',
        children: 'children',

        text: 'name',
        value: 'code'
      }

      let oneItemDEMO = {
        text: '',
        value: '',
        children: []
      }
      let oneItem = {}

      // 循环
      for (let index in data) {
        // 判断
        if (parent_code === null) {
          // 顶级菜单 - 省
          if (!data[index].hasOwnProperty(keys.pid) || data[index][keys.pid] == parent_code) {
            // 不存在parent_code，或者已匹配
            oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
            oneItem.text = data[index][keys.text]
            oneItem.value = data[index][keys.value]

            // 递归下去
            oneItem.children = this.handleTree(data, data[index][keys.id])
            res.push(oneItem)

          } else {
            // 匹配不到，跳过
          }

        } else {
          // 非顶级菜单 - 市、区、街道
          if (data[index].hasOwnProperty(keys.pid) && data[index][keys.pid] == parent_code) {
            // 已匹配
            oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
            oneItem.text = data[index][keys.text]
            oneItem.value = data[index][keys.value]

            // 递归下去
            oneItem.children = this.handleTree(data, data[index][keys.id])
            res.push(oneItem)

          } else {
            // 匹配不到，跳过
          }

        }

      }

      return res
    }


  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
}
</style>

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

    <view class="cu-form-group">
      <text class="required"></text>
      <view class="title">所在地区</view>
      <picker
        class="pickerS"
        mode="multiSelector"
        @change="selCity"
        @columnchange="selMonitor"
        :range="address"
      >
        <!-- <view>
          {{  address[0][0] }} --- {{ address[1][0]  }}
        </view> -->

        <view>
          {{ addressNode.province }}
          {{ addressNode.city ? ','+ addressNode.city : '' }}
        </view>
        <!-- <view
          class="setAns picker"
          :class="(addressNode.province === '请选择城市') ? 'opcity-half':''"
        >
          {{ addressNode.province }}
          {{ addressNode.city ? ','+ addressNode.city : '' }}
        </view> -->
      </picker>
    </view>

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

      countyList: [],
      address: [],
      cityList: [],
      addressNode: {
        province: "请选择城市",
      },

      provinceIndex: 0,
      cityIndex: 0,
      countyIndex: 0

    }

  },
  components: {
  },
  onLoad () {
    // console.log(this.dataTree);

    // 省市区数据树生成
    // this.localData = this.get_city_tree()
    // console.log("onLoad => this.localData", this.localData)

    this.getAddressData()

    // console.log('cityRows => ', cityRows);


    console.log('areaList =>', this.areaList);
  },
  // 函数
  methods: {


    getAddressData () {
      let cityAllList = []

      let provinceList = []

      let countyList = [] // 区县总集合

      let address = cityRows
      for (let key in address) {
        let newDataList = [];
        let newCounty = []

        if (address[key].children) {

          for (let cityIndex in address[key].children) {

            let newCountyList = []  // 区县集合

            newDataList.push(address[key].children[cityIndex].name)

            if (address[key].children[cityIndex].children) {

              for (let countyIndex in address[key].children[cityIndex].children) {

                newCountyList.push(address[key].children[cityIndex].children[countyIndex].name)
              }
            }


            // 当前市区下的所以 区县集合
            newCounty.push(newCountyList)

          }
        }

        provinceList.push(address[key].name)
        cityAllList.push(newDataList)
        countyList.push(newCounty)


      }

      this.countyList = countyList
      // console.log("getAddressData => this.countyList", this.countyList)

      this.provinceList = provinceList
      // console.log("getAddressData =>  this.provinceList", this.provinceList)
      this.cityAllList = cityAllList;
      // console.log("getAddressData => this.cityAllList", this.cityAllList)
      this.address = [provinceList, cityAllList[0], countyList[0][0]];
      // console.log("getAddressData => this.address", this.address)


    },

    // 省市区数据树生成
    // get_city_tree () {
    //   let res = []
    //   if (cityRows.length) {
    //     // 递归生成
    //     res = this.handleTree(cityRows)
    //   }
    //   return res
    // },


    // 监听省市区滚动
    selMonitor (e) {
      console.log("selMonitor => e", e.detail)
      let column = e.detail.column

      let index = e.detail.value
      if (column == 0) {  // 滚动省
        this.provinceIndex = index



        let cityLength = this.address[1].length

        let countyLength = this.address[2].length
        this.getAddressData()
        // 改变市
        this.address[1].splice(0, cityLength, ...this.cityAllList[index])

        this.address[2].splice(0, countyLength, ...this.countyList[index])
      }

      if (column == 1) {  // 滚动市区
        this.cityIndex = index


        let countyLength = this.address[2].length
        this.address[2].splice(0, countyLength, ...this.countyList[this.provinceIndex][this.cityIndex])
      }

      console.log("selMonitor =>  this.provinceIndex", this.provinceIndex)
      console.log("selMonitor =>  this.cityIndex", this.cityIndex)
    },
    // 选择省市
    // 获取地址信息
    selCity (e) {
      let val = e.target.value
      this.cityList = val

      this.addressNode = {
        province: this.address[0][this.cityList[0]],
        city: this.address[1][this.cityList[1]]
      }
      console.log("selCity => this.address", this.address)

      console.log(val, this.addressNode, '123123123123123')
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

<!-- address 页 -->
<template>
  <view class="address bg-bgColor p-2">

    <view class="bg-white p-3 rounded-lg">

      <view
        class="flex py-2 border-0 border-b border-solid border-gray-100 text-lg items-center"
      >
        <view>联系人</view>
        <input
          type="text"
          placeholder="用于取餐时对您的称呼"
        >
      </view>

      <view
        class="flex py-2 border-0 border-b border-solid border-gray-100 text-lg items-center"
      >
        <view>手机号</view>
        <input
          type="text"
          placeholder="请输入您的手机号"
        >
      </view>

      <view
        class="flex py-2 border-0 border-b border-solid border-gray-100 text-lg items-center"
      >
        <view>所在地区</view>
        <picker
          class="pickerS"
          mode="multiSelector"
          @change="selCity"
          @columnchange="selMonitor"
          :range="address"
        >

          <view>
            {{ addressNode.province }}
            {{ addressNode.city ? ','+ addressNode.city : '' }}
            {{ addressNode.county?','+addressNode.county : '' }}
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

      <view
        class="flex py-2 border-0 border-b border-solid border-gray-100 text-lg items-center"
      >
        <view>详细地址</view>
        <input
          type="text"
          placeholder="如：xx小区5号楼208室"
        >
      </view>

      <view class="flex py-2 text-lg items-center">
        <view>默认地址</view>
      </view>

    </view>

    <view class="bg-selectText text-white fixed bottom-0 left-0 right-0">保存
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

      provinceList: [], //省列表
      cityList: [],   // 市列表
      countyList: [], // 区县列表

      provinceIndex: 0,  // 省 index
      cityIndex: 0,   // 市 index

      address: [],

      addressNode: {
        province: "请选择所在地区",
      },



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

    // 省市区数据转换为二维数组
    getAddressData () {
      // 市 列表
      let cityList = []
      // 省 列表
      let provinceList = []
      // 区县 列表
      let countyList = []
      // address : 省市区的json数据
      let address = cityRows
      for (let key in address) {
        let newDataList = [];
        let newCounty = []

        if (address[key].children) {

          for (let cityIndex in address[key].children) {

            let newCountyList = []  // 区县集合

            if (address[key].children[cityIndex].name == "市辖区") {
              newDataList.push(address[key].children[cityIndex].province)
            } else {

              newDataList.push(address[key].children[cityIndex].name)

            }

            if (address[key].children[cityIndex].children) {

              for (let countyIndex in address[key].children[cityIndex].children) {

                if (address[key].children[cityIndex].children[countyIndex].name !== "市辖区") {

                  newCountyList.push(address[key].children[cityIndex].children[countyIndex].name)
                }

              }
            }


            // 当前市区下的所以 区县集合
            newCounty.push(newCountyList)

          }
        }

        if (address[key].children.length == 1 && address[key].children[0].name == "市辖区") {
          provinceList.push(address[key].name.replace("市", ""))
        } else {

          provinceList.push(address[key].name)
        }
        cityList.push(newDataList)
        countyList.push(newCounty)


      }

      this.countyList = countyList
      // console.log("getAddressData => this.countyList", this.countyList)

      this.provinceList = provinceList
      // console.log("getAddressData =>  this.provinceList", this.provinceList)
      this.cityList = cityList;
      console.log("getAddressData => this.cityList", this.cityList)
      this.address = [provinceList, cityList[0], countyList[0][0]];
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

      let column = e.detail.column
      let index = e.detail.value

      if (column == 0) {  // 滚动省
        // 记录 省 index
        this.provinceIndex = index
        // 每次滚动省区 重置 市 index
        this.cityIndex = 0
        // 改变市
        this.address[1] = this.cityList[this.provinceIndex]
      }

      if (column == 1) {  // 滚动市区
        // 记录 市 index
        this.cityIndex = index
      }
      // 裁剪 区县
      this.address[2] = this.countyList[this.provinceIndex][this.cityIndex]

      // console.log("selMonitor =>  this.provinceIndex", this.provinceIndex)
      // console.log("selMonitor =>  this.cityIndex", this.cityIndex)
    },
    // 选择省市
    // 获取地址信息
    selCity (e) {
      let val = e.target.value

      this.addressNode = {
        province: this.address[0][val[0]],
        city: this.address[1][val[1]],
        county: this.address[2][val[2]],
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
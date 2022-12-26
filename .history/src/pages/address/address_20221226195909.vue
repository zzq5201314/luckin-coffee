
<!-- address 页 -->
<template>
  <view class="address bg-bgColor p-2 ">

    <view class="bg-white px-3 rounded-lg">

      <view
        class="flex py-4 border-0 border-b border-solid border-gray-100 text-lg items-center gap-4"
      >
        <view class="w-24 text-gray-500">联系人</view>
        <input
          class="flex-auto"
          type="text"
          placeholder="用于取餐时对您的称呼"
          placeholder-class="text-gray-300 text-lg"
          v-model="from.name"
        >
      </view>

      <view
        class="flex py-4 border-0 border-b border-solid border-gray-100 text-lg items-center gap-4"
      >
        <view class="w-24 text-gray-500">手机号</view>
        <input
          class="flex-auto"
          type="text"
          placeholder="请输入您的手机号"
          placeholder-class="text-gray-300 text-lg"
          v-model="from.tel"
        >
      </view>

      <view
        class="flex py-4 border-0 border-b border-solid border-gray-100 text-lg items-center gap-4"
      >
        <view class="w-24 text-gray-500">所在地区</view>
        <picker
          class="flex-auto"
          mode="multiSelector"
          @change="selCity"
          @columnchange="selMonitor"
          :range="address"
        >

          <view
            class="text-lg"
            :class="{' text-gray-300':(addressNode.province=='请选择所在地区')}"
          >
            {{ addressNode.province }}
            {{ addressNode.city ? ' '+ addressNode.city : '' }}
            {{ addressNode.county?' '+addressNode.county : '' }}
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
        class="flex py-4 border-0 border-b border-solid border-gray-100 text-lg items-center gap-4"
      >
        <view class="w-24 text-gray-500">详细地址</view>
        <input
          class="flex-auto"
          type="text"
          placeholder="如：xx小区5号楼208室"
          placeholder-class="text-gray-300 text-lg"
          v-model="from.addressDetail"
        >
      </view>

      <view class="flex py-4 text-lg items-center gap-4">
        <view class="w-24 text-gray-500">默认地址</view>
        <view class="flex-auto flex justify-end">
          <switch :checked="from.isDefault" />
        </view>
      </view>

    </view>

    <view class="fixed bottom-0 left-0 right-0">
      <view
        class="bg-selectText text-white m-2 text-center  py-2 rounded-full text-lg"
        :class="{'bg-opacity-50':from.tel.length!==11||from.name==''||from.addressDetail==''||from.areaCode.length<1}"
        @click="save"
      >保存
      </view>

      <view class="page"></view>
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
      from: {
        name: "",
        tel: "",  // 电话
        addressDetail: "", // 详细地址
        areaCode: [],  // 地区编号
        postalCode: "000000",  // 邮政编码
        isDefault: true  // 默认地址
      }


    }

  },
  components: {
  },
  onLoad () {

    this.getAddressData()

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
      this.address = [provinceList, cityList[this.provinceIndex], countyList[this.provinceIndex][this.cityIndex]];
      // console.log("getAddressData => this.address", this.address)


    },


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

      this.from.areaCode = Object.values(this.addressNode)
      console.log("selCity => this.address", this.address)

      // console.log(val, this.addressNode, '123123123123123')
    },

    save () {
      if (this.from.tel.length == 11 && this.from.name !== '' && this.from.addressDetail !== '' && this.from.areaCode.length > 0) {
        console.log(this.from);

      }
    },


  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
  height: calc(100vh - 50px);
}
.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
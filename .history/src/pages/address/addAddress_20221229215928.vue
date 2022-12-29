
<!-- address 页 -->
<template>
  <view
    class="address bg-bgColor p-2 fixed w-full"
    :style="{height:windowHeight+'px'}"
  >

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
          <switch
            :checked="from.isDefault"
            color="#0028ab"
          />
        </view>
      </view>

    </view>

    <view class="fixed bottom-0 left-0 right-0 bg-white">

      <view
        class="bg-selectText text-white m-2 text-center  py-2 rounded-full text-lg border border-solid border-selectText"
        :class="{'bg-opacity-50':from.tel.length!==11||from.name==''||from.addressDetail==''||from.areaCode.length<1}"
        @click="save"
      >保存
      </view>

      <view
        v-if="aid"
        class="bg-white text-red-500 m-2 text-center  py-2 rounded-full text-lg border border-solid border-red-500"
        @click="delAddress"
      >删除</view>

      <view class="page"></view>
    </view>

  </view>
</template>

<script>

const cityRows = require('./components/area-data.json')
import { addAddress, findAddressInfo, editAddress, deleteAddress } from "@/api/address"
export default {
  // name: "address",
  data () {
    return {
      value: [""],
      // 省市区
      localData: [],

      provinceList: [], //省列表
      cityList: [],   // 市列表
      countyList: [], // 区县列表

      provinceIndex: 0,  // 省 index
      cityIndex: 0,   // 市 index
      windowHeight: 0,
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
      },

      aid: this.$Route.query.aid


    }

  },
  components: {
  },
  onLoad () {

    this.getAddressData()

    uni.getSystemInfo({
      success: (res) => {
        this.windowHeight = res.windowHeight
        // console.log("onLoad => res", res)
      }
    })

    if (this.aid) {
      this.findAddressInfo()
    }
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
        let data = {
          name: this.from.name,
          tel: this.from.tel,
          province: this.addressNode.province,
          city: this.addressNode.city,
          county: this.addressNode.county,
          addressDetail: this.from.addressDetail,
          areaCode: this.from.areaCode,
          postalCode: this.from.postalCode,
          isDefault: this.from.isDefault ? 1 : 0
        }

        if (this.aid) { //修改模式

          data["aid"] = this.aid
          // 修改地址
          editAddress(data).then(response => {
            if (response.code === 30000) {

              this.$store.dispatch("address/findAddress")

              uni.showToast({
                title: response.msg,
                icon: 'none'
              })

              setTimeout(() => {
                this.$Router.back(1)
              }, 500)

            }

          })

        } else { // 添加模式
          // 添加地址
          addAddress(data).then(response => {
            // console.log("addAddress => response", response)
            if (response.code === 9000) {

              this.$store.dispatch("address/findAddress")

              uni.showToast({
                title: response.msg,
                icon: 'none'
              })

              setTimeout(() => {
                this.$Router.back(1)
              }, 500)
            }

          })

        }
        // console.log("save => data", data)

      }
    },

    // 根据 aid 获取地址信息
    findAddressInfo () {
      findAddressInfo(this.aid).then(response => {
        console.log("findAddressInfo => response", response)

        if (response.code === 40000) {

          let address = response.result[0]

          this.addressNode = {
            province: address.province,
            city: address.city,
            county: address.county
          }

          this.from = {
            name: address.name,
            tel: address.tel,  // 电话
            addressDetail: address.addressDetail, // 详细地址
            areaCode: Object.values(this.addressNode),  // 地区编号
            postalCode: address.postalCode,  // 邮政编码
            isDefault: address.isDefault == 1 ? true : false  // 默认地址
          }


        }
      })
    },

    // 删除地址
    delAddress () {
      let _this = this
      uni.showModal({
        title: "确认是否删除",
        success: function (res) {
          if (res.confirm) { // 确认
            // 执行删除
            deleteAddress(_this.aid).then(response => {

              if (response.code === 10000) {

                _this.$store.dispatch("address/findAddress")

                uni.showToast({
                  title: response.msg,
                  icon: 'none'
                })

                setTimeout(() => {
                  _this.$Router.back(1)
                }, 500)

              }

            })
          }

        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.address {
  // height: calc(100vh - 40px);
}
.page {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
}
</style>
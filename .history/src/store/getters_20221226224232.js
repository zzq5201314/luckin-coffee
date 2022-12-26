/*
 * @Author: 清羽
 * @Date: 2022-12-15 21:59:41
 * @LastEditTime: 2022-12-26 22:42:31
 * @LastEditors: you name
 * @Description: 
 */
const getters = {
	token: state => state.user.token,
	name: state => state.user.name,
	userImg: state => state.user.userImg,
	shopCartSum: state => state.shopCart.shopCartSum,
	shopCartList: state => state.shopCart.shopCartList,
	shopCartMoney: state => state.shopCart.money,
	numSelectList: state => state.shopCart.numSelectList,
	shopCartCheckAll: state => state.shopCart.checkAll,
	checkSids: state => state.shopCart.checkSids,
	addressList: state => state.address.addressList
}
export default getters
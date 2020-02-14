// pages/pay/index.js
import { getsetting, openSetting, chooseAddress, login, requestPayment } from "../../utils/asyncAPI.js"
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    address: {},
    allPrice: 0,
    allNum: 0
  },
  // 地址选择函数
  // 1.获取用户当前的setting(设置)看setting有没有获取地址的权限
  // 2.如果没有权限，打开微信setting设置获取地址权限 wx.opensetting
  // 3.如果有权限，直接选择地址就可以了  wx.chooseAddress
  // 4.获取的地址拼接进存储到本地中
  handleGetAddress: async function () {
    // 防止代码出现错误
    try {
      const setting = await getsetting()
      if (setting.authSetting["scope.address"]) {
        await openSetting()
      }
      let address = await chooseAddress()
      let { provinceName, cityName, countyName, detailInfo } = address
      address.all = provinceName + cityName + countyName + detailInfo
      this.setData({
        address
      })
      wx.setStorageSync("address", address)
    } catch (err) {
      console.log(err)
    }
  },
  // 执行支付内容
  getUserInfo: async function (e) {
    // console.log(e.detail)
    try {
      const { encryptedData, rawData, iv, signature } = e.detail
      let { code } = await login()
      const res = await request({
        data: { encryptedData, rawData, iv, signature, code },
        method: "POST",
        url: "/users/wxlogin"
      })
      const { token } = res.data.message
      wx.setStorageSync("token",token)
      this.setOrder(token)
    } catch (err) {
      console.log(err)
    }
  },
  // 创建购物账单
  setOrder: async function (token) {
    const carts = wx.getStorageSync("carts")
    const goods = []
    const single = {}
    carts.forEach(v => {
      if (v.check) {
        single.goods_id = v.goods_id
        single.goods_number = v.num
        single.goods_price = v.goods_price
        goods.push(single)
      }
    })
    let consignee_add = this.data.address.all
    let order_price = this.data.allPrice + ""
    const orderCode = await request({
      header: {
        Authorization: token
      },
      data: {
        goods, consignee_add, order_price
      },
      method: "POST",
      url: "/my/orders/create"
    })
    let { order_number } = orderCode.data.message
    console.log(orderCode.data.message)
    const prePay = await request({
      header: {
        Authorization: token
      },
      url: "/my/orders/req_unifiedorder",
      method: "POST",
      data: {
        order_number
      }
    })
    const { pay } = prePay.data.message
    // 支付账单
    const orderResult = await requestPayment(pay)
    // 查询账单是否支付
    const checkOrder = await request({
      header:{
        Authorization: token
      },
      url:"/my/orders/chkOrder",
      method:"POST",
      data:{
        order_number
      }
    })
    // console.log(checkOrder.data.message)
    wx.showToast({
      title: checkOrder.data.message,
      icon:"success",
      mask:true
    })
    // 删除已经支付过的商品
    const noPayCarts = carts.filter(v => !v.check)
    console.log(noPayCarts)
    wx.setStorageSync("carts", noPayCarts)
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/order/index',
      })
    }, 1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const carts = wx.getStorageSync("carts") || []
    const address = wx.getStorageSync("address") || []
    this.setCart(carts)
    this.setData({
      carts, address
    })
  },
  // 已选商品列表函数
  setCart: function (carts) {
    let allPrice = 0
    let allNum = 0
    carts.forEach(v => {
      if (v.check) {
        allPrice += v.goods_price * v.num
        allNum += v.num
      }
    })
    this.setData({
      allPrice, allNum
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
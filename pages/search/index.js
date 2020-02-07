// pages/search/index.js
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    goods_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 输入框值的获取
  getInputValue: function (e) {
    // console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 获取查找货物信息
  handleGoodslist: async function (e) {
    const { inputValue } = this.data
    // console.log(inputValue)
    if (inputValue === '') {
      wx.showToast({
        title: '请输入查找商品',
        icon: "none"
      })
      return false
    }
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query: inputValue
      }
    })
    // console.log(res)
    this.setData({
      goods_list: res.data.message
    })
    const { goods_list } = this.data
    console.log(goods_list)
    if (goods_list.length === 0) {
      wx.showToast({
        title: '查无此商品',
        icon: "none"
      })
    }
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
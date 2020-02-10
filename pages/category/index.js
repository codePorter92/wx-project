// pages/category/index.js
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryItem: [],
    good_list: [],
    scrollTop: 0,
    currentIndex: 0
  },
  // 封装请求数据的函数
  getCategoryItem: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    const cart = wx.getStorageSync("cart")
    if(!cart){
      this.askData()
    }else{
      if (Date.now() - cart.time >100 * 1000){
       this.askData()
      }else{
        this.setData({
          categoryItem: cart.data,
          good_list: cart.data[0].children,
          scrollTop:0,
          currentIndex:0
        })
      }
    }
    // this.askData()
  },
  // 封装请求数据的函数
  askData: async function () {
    // 获取数据，渲染数据
    const category_item = await request({
      url: "/categories"
    })
    this.setData({
      categoryItem: category_item.data.message
    })
    wx.setStorageSync('cart', {
      time: Date.now(),
      data: category_item.data.message
    })
    this.getGoodList()
  },
  // 封装获取货物列表的函数
  getGoodList: function () {
    const { children } = this.data.categoryItem[this.data.currentIndex]
    this.setData({
      good_list: children
    })
    // 本地存储,每次只能存储一个信息
   
  },
  // 点击每一项时的事件
  getItemGoods: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    this.getGoodList()
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
// pages/category/index.js
// 引入请求头
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys:[],
    children:[],
    aa:{} 
  },
  // 点击事件
  clickMe(e){
    console.log(e.currentTarget.dataset)
    console.log(this.categorys)
    console.log(this.children)
    console.log(this.aa)
  },
  // 监听
  observers:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
   let res = await request({
      url:"/categories"
    })
    console.log(res.data.message)
    this.aa=res
    this.setData({
      categorys:res.data.message
    })
    // console.log(this.categorys)
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
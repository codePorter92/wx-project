// pages/order/index.js
import {request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  tab_list:[
    {
      id:0,
      value:"全部",
      isActive:true
    }, 
    {
      id: 1,
      value: "待付款",
      isActive: false
    }, 
    {
      id: 2,
      value: "待发货",
      isActive: false
    },
  ],
  type:1,
  orderList:[]  
  },
  // tab栏的函数
  handleTabChange:function(e){
    this.setData({
      tab_list:e.detail
    })
    // console.log(this.data.tab_list)
    let {tab_list} =this.data
    let type = 0
    tab_list.forEach(v=>{
      if(v.isActive){
        type=++v.id
      }
    })
    this.getOrderList(type)
  },
  // 渲染列表
  /**
   * 生命周期函数--监听页面加载
   */
  // 监听tab栏
  
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
  onShow: function () {
    this.getOrderList(this.data.type)
  },
  // 请求数据
  getOrderList: async function(type){
    const token = wx.getStorageSync("token")||''
    const res = await request({
      header:{
        Authorization:token
      },
      url:"/my/orders/all",
      data:{
        type
      }
    })
    console.log(res.data.message.orders)
    this.setData({
      orderList:res.data.message.orders
    })
    
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

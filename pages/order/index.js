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
      isActive:true,
      type:1
    }, 
    {
      id: 1,
      value: "待付款",
      isActive: false,
      type:2
    }, 
    {
      id: 2,
      value: "待发货",
      isActive: false,
      type:3
    },
  ],
  orderList:[]  
  },
  // tab栏的函数
  handleTabChange:function(e){
    this.setData({
      tab_list:e.detail
    })
    this.getOrderList()
  },
  // 渲染列表
  /**
   * 生命周期函数--监听页面加载
   */
  // 监听tab栏
  
  onLoad: function (options) {
    this.getOrderList()
  },
  getOrderList: async function(){
    let type=0
    this.data.tab_list.forEach(v=>{
      if(v.isActive){
        type=v.type
      }
    })
    const res= await request({
      url:"/my/orders/all",
      data:{
        type
      }
    })
    res.data.message.orders.map(v=>{
      v.create_time_cn = new Date(v.create_time*1000).toLocaleString()
    })
    this.setData({
      orderList:res.data.message.orders
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
  // 请求数据
  
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

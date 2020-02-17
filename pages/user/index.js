// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    tabBar:[
      {
        id:0,
        class:"icon-icon-test",
        value:"待付款"
      },
      {
        id: 1,
        class: "icon-daishouhuo",
        value: "待收货"
      },
      {
        id: 2,
        class: "icon-tuikuan",
        value: "退货/退款"
      }, 
      {
        id: 3,
        class: "icon-quanbudingdan",
        value: "全部订单"
      }
    ]
  },
  // 用户信息获取
  handleUserInfo(e){
    console.log(e.detail)
    const {userInfo}=e.detail
    this.setData({
      userInfo
    })
    wx.setStorageSync("userInfo",userInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync("userInfo")||{}
    this.setData({
      userInfo
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
// pages/goods_list/index.js
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tabList:[
     {
       id:0,
       value:"综合",
       isActive:true
     },
     {
       id: 1,
       value: "销量",
       isActive: false
     },
     {
       id: 2,
       value: "价格",
       isActive: false
     }
   ],
  //  请求回来的数据
   goods:[]
  },
  // 参数
  Queryparams:{
      pagenum:1,
      pagesize:10
  },
  totalPages:0,
  // 子传父返回来的数据处理
  handleTabChange:function(e){
    this.setData({
      tabList:e.detail
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const pages = getCurrentPages()
      const currentPages = pages[pages.length-1]
      const {cid,query} = currentPages.options
      if(cid){
        this.Queryparams["cid"]=cid
      }
       if(query){
        this.Queryparams["query"]=query
      }
      this.getGoodList()
  },
  getGoodList: async function(){
    const res = await request({
      url:"/goods/search",
      data: this.Queryparams
    })
    console.log(res)
    this.setData({
      goods: [...this.data.goods, ...res.data.message.goods]
    })
    this.totalPages = Math.ceil(res.data.message.total / this.Queryparams.pagesize)
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
    this.setData({
      goods:[]
    })
    this.Queryparams.pagenum = 1
    this.getGoodList() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.totalPages>this.Queryparams.pagenum){
      this.Queryparams.pagenum++
      this.getGoodList()
    } else if (this.totalPages = this.Queryparams.pagenum){
      wx.showToast({
        title: '亲，已加载到最后一页了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
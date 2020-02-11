// pages/goods_detail/index.js
import {request} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetail:{},
    isCollect:false
  },
  handleGoodClick:function(e){
    console.log(e)
    const {current,pics}=e.currentTarget.dataset
    // console.log(pics.map(v=>v.pics_mid))
    wx.previewImage({
      current:current,
      urls: pics.map(v=>v.pics_mid),
    })
    
  },
  handleGoodCollect:function(e){
    console.log(e.currentTarget.dataset.good)
      let isCollect = false
      const goodId = e.currentTarget.dataset.good.goods_id
      //从本地存储中获取数据
      const good = wx.getStorageSync('good')||[]
      //判断
      if(good.findIndex(v=>v.goods_id===goodId)===-1){
        good.push(e.currentTarget.dataset.good)
        wx.setStorageSync("good", good)
        isCollect = true
        wx.showToast({
          title: '已收藏',
          icon:'success',
          mask:true
        })
      }else{
        const index = good.findIndex(v=>v.goods_id===goodId)
        good.splice(index,1)
        wx.setStorageSync('good', good)
        isCollect = false 
        wx.showToast({
          title: '已取消收藏',
          icon:'success'
        })
      } 
      this.setData({
        isCollect: isCollect
      })
  },
  handleCartClick:function(e){
     const carts = wx.getStorageSync("carts")||[]
     let index = carts.findIndex(v=>v.goods_id===this.data.goodDetail.goods_id)
     if(index===-1){
       this.data.goodDetail.num=1
       this.data.goodDetail.check=true
       carts.push(this.data.goodDetail)
       wx.setStorageSync('carts',carts)
     } else {
       carts[index].num++
       wx.setStorageSync('carts', carts)
     }
     wx.showToast({
       title: '已添加入购物车',
       icon:"success",
       mask:true
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getGoodDetail()
    // 判断是否已收藏

  },
  getGoodDetail: async function(){
    const page = getCurrentPages()
    const {goods_id} = page[page.length-1].options
    const res = await request({
      url:"/goods/detail",
      data:{
       goods_id:goods_id 
      }
    })
    // console.log(res)
    // 判断是否收藏
    const good = wx.getStorageSync('good') || []
    console.log(good)
    let iscollect = good.some(v => v.goods_id == goods_id)
    this.setData({
      goodDetail: res.data.message,
      isCollect: iscollect
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
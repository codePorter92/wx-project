// pages/cart/index.js
import { showModal } from "../../utils/asyncAPI"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts_good: [],
    isAllSeclect:false,
    allPrice:0,
    allNumber:0
  },
  // 控制选中与不选中
  handleGoodSelect:function(e){
    const carts = wx.getStorageSync('carts')||[]
    const index = carts.findIndex(v=>v.goods_id===e.currentTarget.dataset.good_id)
    carts[index].check=!carts[index].check
    let { allPrice, allNumber, isAllSeclect}=this.data
    // if (carts[index].check){
    //   allPrice += carts[index].num * carts[index].goods_price
    //   allNumber += carts[index].num
    // }else{
    //   allPrice -= carts[index].num * carts[index].goods_price
    //   allNumber -= carts[index].num
    // }
    // carts.forEach(v=>{
    //   if(v.check){
    //     isAllSeclect=true
    //   }else{
    //     isAllSeclect=false
    //   }
    // })
    // this.setData({
    //   carts_good:carts,
    //   allPrice, allNumber, isAllSeclect
    // })
    this.setCartData(carts)
  },
  // 控制全选全不选
  handleAllSeclect: function () {
    // let isAllSeclect = !this.data.isAllSeclect
    // let allPrice = 0
    // let allNumber = 0 
    // if (isAllSeclect){
    //   carts.forEach(v=>{
    //     allPrice += v.num * v.goods_price
    //     allNumber += v.num
    //     v.check = isAllSeclect
    //   })
    // }else{
    //   carts.map(v => v.check = isAllSeclect)
    // }
    // this.setData({
    //   carts_good: carts,
    //   isAllSeclect, allPrice, allNumber
    // })
    // wx.setStorageSync("carts",carts)
    const carts = wx.getStorageSync("carts") || []
    let { isAllSeclect } = this.data
    carts.forEach(v=>v.check=!isAllSeclect)
    this.setCartData(carts)
  },
  // 自己的+-做法
  myFunction:function(){
  // handleGoodDecrease:function(e){
  //   const carts = wx.getStorageSync('carts') || []
  //   const index = carts.findIndex(v => v.goods_id === e.currentTarget.dataset.good_id)
  //   let { allPrice, allNumber } = this.data
  //   carts[index].num--
  //   if (carts[index].check && carts[index].num>=0) {
  //     allPrice -= carts[index].goods_price
  //     allNumber--
  //   } 
  //   if (!carts[index].num){
  //     carts.splice(index,1)
  //   }
  //   this.setData({
  //     carts_good: carts,
  //     allPrice, allNumber
  //   })
  //   wx.setStorageSync("carts", carts)
  // },
  // 控制数量增加
  // handleGoodIncrease:function(e){
  //   const carts = wx.getStorageSync('carts') || []
  //   const index = carts.findIndex(v => v.goods_id === e.currentTarget.dataset.good_id)
  //   let { allPrice, allNumber } = this.data
  //   carts[index].num++
  //   if (carts[index].check){
  //     allPrice +=  carts[index].goods_price
  //     allNumber++
  //   }
  //   this.setData({
  //     carts_good: carts,
  //      allPrice, allNumber
  //   })
  //   wx.setStorageSync("carts", carts)
  // },
  },
 
  // 控制数量
  handleGoodNumber: async function(e){
    let { good_id, operation} = e.currentTarget.dataset
    const carts = wx.getStorageSync("carts")||[]
    let index = carts.findIndex(v=>v.goods_id===good_id)
    carts[index].num += operation
    if(operation===-1 && carts[index].num ===0){
      console.log("333")
      const res = await showModal({
        content:"亲，你确定放弃改商品吗？"
      })
      if (res.confirm) {
        carts.splice(index,1)
      }else if(res.cancel){
        carts[index].num = 1
      }
    }
    this.setCartData(carts)
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
  onShow: function () {
    const carts = wx.getStorageSync("carts") || []
    this.setCartData(carts)
  },
  // 购物车结账逻辑
  setCartData:function(carts){
    let allPrice = 0
    let allNumber = 0
    let isAllSeclect = true
    carts.forEach(v=>{
      if(v.check){
        allPrice += v.num*v.goods_price
        allNumber += v.num
       }else{
        isAllSeclect = false
      }
    })
    this.setData({
      carts_good: carts,
      isAllSeclect,
      allPrice, allNumber
    })
    wx.setStorageSync('carts', carts)
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
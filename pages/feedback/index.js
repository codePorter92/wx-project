// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tempFilePaths:[],
   uploadPicNumber:0 
  },
  // 选择图片上传
  handleChooseImage(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=>{
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          tempFilePaths:[...this.data.tempFilePaths,...tempFilePaths]
        })
      }
    })
  },
  // 删除图片
  handleDeleteImage(e){
    let { index } = e.currentTarget.dataset
    this.data.tempFilePaths.splice(index,1)
    this.setData({
      tempFilePaths: this.data.tempFilePaths
    })
  },
  // 上传文件
  handleUploadFile(){
    const { tempFilePaths } = this.data
    tempFilePaths.forEach((v,index)=>{
      wx.showLoading({
        title: '文件上传中',
        mask:true
      })
      wx.uploadFile({
        url: 'https://images.ac.cn/Home/Index/UploadAction/',
        filePath: v,
        name: 'file',
        formData:{},
        success:(res)=>{
          console.log(res)
        }
      })
       if (index === tempFilePaths.length - 1) {
         wx.hideLoading()
      }
      let uploadPicNumber = index
      this.setData({
        uploadPicNumber: uploadPicNumber+1
      })
    })
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
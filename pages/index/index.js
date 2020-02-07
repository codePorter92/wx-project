Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: "搜索",
    images:[],
    menus:[],
    floors:[]
  },
  getValue(e){
    console.log(e.detail)
  },
  // 获取首页选项菜单
  getmenu(){
   wx.request({
      url:"https://api.zbztb.cn/api/public/v1/home/catitems",
      success:res=>{
        console.log(res)
        this.setData({
          menus:res.data.message
        })
      }
    })
  },
  // 获取首页楼层数据
   getfloorData(){
     wx.request({
       url:"https://api.zbztb.cn/api/public/v1/home/floordata",
       success:res=>{
        //  console.log(res)
         this.setData({
           floors:res.data.message
         })
       }
     })
   },
  // 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:"https://api.zbztb.cn/api/public/v1/home/swiperdata",
      success:res=>{
        // console.log(res)
        // 把变量放在setData中,赋值后可以自动更新页面
        this.setData({
          images:res.data.message
        })
      }
    })
    this.getmenu()
    this.getfloorData()
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
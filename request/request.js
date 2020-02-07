import { BASE_URL } from "./url.js"


export const request = parmas => {
    //  编写遮罩的接口
    wx.showLoading({
      title: "正在加载中.....",
      mask:true
    })
    //返回一个promise
    return new Promise(function(resolve,reject){
        wx.request({
          // 在使用过程中，输入的参数必须以对象的形式输入,可以传参
          ...parmas,
          url: BASE_URL + parmas.url,
          success:res => {
            resolve(res)
          },
          fail:err => {
            reject(err)
          },
          complete:res => {
            // 当完成之后，把遮罩取出的接口
            wx.hideLoading()
          }
        })
    })  

}
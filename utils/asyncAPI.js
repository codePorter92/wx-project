
// 微信模态框的同步封装
export const showModal= (params)=>{
  return new Promise(function(resolve,reject){
    wx.showModal({
      ...params,
      success:res=>{
        resolve(res)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}

// 获取用户的地址设置的权限封装
export const getsetting=(params)=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}

// 获取用户个人授权地址
export const openSetting=(params)=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
// 获取用户编辑地址页面
export const chooseAddress=(params)=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}

// 获取用户登录凭证
export const login= (params)=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
// 发起支付情况
export const requestPayment = (params)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...params,
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
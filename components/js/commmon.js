// 用户是否授权
export const getSetting = ()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success : (res)=>{
        if (res.authSetting['scope.userInfo']) {
          resolve()
        }else {
          reject()
        }
      }
    })
  })
}
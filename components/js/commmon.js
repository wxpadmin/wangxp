import host from '../../api/index.js'
const app = getApp()

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


 //  请求封装
export const Request = (method,url,data,SuccessCallback,ErrorCallback)=>{
    wx.request({
      url: host + url,
      data,
      method,
      success : (res)=>{
        if (res.statusCode == 200 && res.data.code && res.data.code == 0) {
          //  请求正常
          typeof SuccessCallback == 'function' && SuccessCallback(res)
        }else {
          // 请求异常
          typeof ErrorCallback == 'function' && ErrorCallback(res)
        } 
      },
      fail : (err)=> {
        // 网络错误  => 404 页面
        app._RedirectToError('err')
      }
    })
}




//  注册验证规则
export const registrules = {
  phonerule : function (phonenumber){
    var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0-1,35678]|18[0-9]|19[89])\d{8}$/;
    if (!reg.test(phonenumber)) {
      // 手机号错误
      return false
    }else {
      return true
    }


  }

}
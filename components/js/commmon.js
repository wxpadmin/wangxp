import host from '../../api/index.js'

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


 //  注册
// export const Regist = ()=> {
//    wx.request({
//       url: '/wxhy/login/sendCode1',
//       data : {
//         mobile : 13351591816,
//         type: 'regist'
//       },
//       success : (res)=>{
//         console.log(res,111)
//       },
//       fail : (err)=>{
//         console.log(err,222)
//       }
//     })
// }


export const Request = (method,url,data,SuccessCallback,ErrorCallback)=>{
    wx.request({
      url: host + url,
      data,
      method,
      success : (res)=>{
        if (res.statusCode == 200) {
          //  请求正常
          console.log('不是200')
        }else {
          typeof SuccessCallback == 'function' && SuccessCallback(res)
        } 
      },
      fail : (err)=> {
        console.log('-----------')
        ErrorCallback && ErrorCallback(err)
      }
    })
}



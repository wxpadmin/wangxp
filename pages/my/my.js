import { 
  getSetting,
  Request
 } from '../../components/js/commmon.js'
import { tabbarData } from '../../components/data/my_data.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tabbarData : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://47.104.200.127:8080/wxhy/login/sendCode1',
    //   data : {
    //     mobile : 13351591816,
    //     type: 'regist ',
    //   },
    //   header : {
    //     'content-type': 'application/json'
    //   },
    //   success : (res) => {
    //     console.log(res,111)
    //   },
    //   fail : (err) => {
    //     console.log(err,222)
    //   }
    // })




    Request( 'GET',"/wxhy/login/sendCode1", { mobile: 13351591816, type: 'regist' },(res)=>{
      console.log(res,111)
    },(err)=>{
      console.log(err,222)
    })
    // console.log(app.globalData)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    // }else {
    //   app.userInfoReadyCallback = res =>{
    //     this.setData({
    //       userInfo: res.userInfo
    //     })
    //   }
    // }
    // this.setData({
    //   tabbarData
    // })
  },
  getUserInfo (userInfo) {
        if (userInfo.detail.userInfo) {
          this.setData({
            userInfo : userInfo.detail.userInfo
          })
        }else {
          wx.showToast({
            title : '需要重新登录',
            icon : 'none'
          }) 
        }
        
  },
})
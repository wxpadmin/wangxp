import { getSetting } from '../../components/js/commmon.js'
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
    console.log(app.globalData)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else {
      app.userInfoReadyCallback = res =>{
        this.setData({
          userInfo: res.userInfo
        })
      }
    }


    this.setData({
      tabbarData
    })
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
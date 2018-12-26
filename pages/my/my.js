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
    tabbarData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  Login : function () {
    wx.redirectTo({
      url: '../login/login',
    })
  }
})
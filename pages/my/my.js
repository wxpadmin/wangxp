import { 
  getSetting,
  Request
 } from '../../components/js/commmon.js'
import { actionList } from '../../components/data/my_data.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    messagecount : 2,  // 消息数量
    registercount : 100,  // 发布数量
    collectcount : 10,   // 收藏数量
    actionList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  Login : function () {
    wx.redirectTo({
      url: '../register/register',
    })
  }
})
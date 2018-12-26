// pages/error/error.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  goback : function () {
    let url = "../../" + getCurrentPages()[0].options.type
    wx.reLaunch({
        url
      })
  }
})
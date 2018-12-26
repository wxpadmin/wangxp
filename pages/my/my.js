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
    // 注册
    // Request( 'GET',"/wxhy/login/sendCode1", { mobile: 13351591816, type: 'regist' },(res)=>{
    //   console.log(res,111)
    // },(err)=>{
    //   console.log(err,222)
    // })
  },


  Login : function () {
    wx.redirectTo({
      url: '../login/login',
    })
  }
})
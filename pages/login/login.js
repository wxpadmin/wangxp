// pages/login/login.js
import { loginway } from '../../components/data/my_data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginway : [],
    idx : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loginway
    })
  },

  //  tab 切换
  ChangeTab : function (e) {
    this.setData({
      idx : e.target.dataset.index
    })
  },


  clickme : function () {
    console.log(11)
  },

  // 去注册
  GoRegister () {
    
  }

})
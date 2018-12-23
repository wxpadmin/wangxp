//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      clickitemstyle : 0,
      scrollitem : [
        '精选',
        '女装',
        '男装',
        '食品',
        '母婴',
        '日用美妆',
        '穿戴用品',
        '家居',
        '虚拟物品',
        '其他'
      ]
  },
  chooseitem (e) {
    this.setData({
      clickitemstyle : e.target.id
    })
  },

  GoDetail : function () {
    wx.navigateTo({
      url: '/pages/detail/detail',
      success : () => {
      }
    })
  },


  onLoad: function () {
    
  },

  onReachBottom: function () {
    // 分页加载
  }
})

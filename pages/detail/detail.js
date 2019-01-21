Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../assets/images/beauty.jpg',
      '../../assets/images/beauty.jpg',
      '../../assets/images/beauty.jpg',
    ],
    iscollect : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  Collect : function () {
    this.setData({
      iscollect: !this.data.iscollect
    })
  },
})
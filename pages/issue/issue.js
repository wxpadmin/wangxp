const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgList : [],
      addimage : true,
      address : '',
      deleteimg : false
  },

  // 添加图片
  AddImage : function () {
    // 添加图片时清除删除状态
    this.setData({
      deleteimg: false
    })
    const imgList = this.data.imgList
    wx.chooseImage({
      count: 3,
      sizeType: 'compressed',
      success: (res) => {
        res.tempFilePaths.forEach((item)=>{
          imgList.push(item)
        })
        this.setData({
          imgList
        })
        if (this.data.imgList.length >= 3) {
          this.setData({
            addimage: false
          })
        }
      },
    })
  },

  // 选择地址
  ChooseAddress : function () {
    var _this = this
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        _this.setData({
          address : res.address + res.name
        })
      },
    })
  },


  // 长按图片执行删除操作
  DeleteImg : function (e) {
    this.setData({
      deleteimg: true
    })
  },


  // 点击减号删除按钮
  Delete : function (e) {
    let imgList = this.data.imgList
    imgList.splice(e.target.dataset.index,1)
    this.setData({
      imgList
    })
    if (this.data.imgList.length < 3) {
      this.setData({
        addimage: true
      })
    }
  },


  onTabItemTap: function () {
    this.setData({
      address: '',
      imgList: [],
      addimage: true,
    })
  },
})
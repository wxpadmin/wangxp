const app = getApp()
import { classifyarr } from '../../components/data/my_data.js' 



Page({


  // onShow : function () {
  //   const value = wx.getStorageSync('phonenumber')
  //   if (value) {
      
  //   }else {
  //     wx.redirectTo({
  //       url: '../register/register',
  //     })
  //   }
  // },



  /**
   * 页面的初始数据
   */
  data: {
      imgList : [],  // 上传商品图列表
      addimage : true,   // 是否能继续添加商品图
      address : '',      //  商家地址
      deleteimg : false,      //  是否长按显示删除商品图
      classifyarr: classifyarr,   // 类别列表
      classifitem: '请选择 >'
  },

  // 添加图片
  AddImage : function () {
    // 添加图片时清除删除状态
    this.setData({
      deleteimg: false
    })
    const imgList = this.data.imgList
    wx.chooseImage({
      count: 6,
      sizeType: 'compressed',
      success: (res) => {
        res.tempFilePaths.forEach((item)=>{
          imgList.push(item)
        })
        this.setData({
          imgList
        })
        if (this.data.imgList.length >= 6) {
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
    imgList.splice(e.target.dataset.num,1)
    this.setData({
      imgList
    })
    if (this.data.imgList.length < 6) {
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


  // 选择类别
  ChooseType : function (e) {
    this.setData({
      classifitem: classifyarr[e.detail.value]
    })
  }
})
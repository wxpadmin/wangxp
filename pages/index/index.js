//index.js
//获取应用实例
import { Request } from '../../components/js/commmon.js'
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
      ],
  },
  chooseitem (e) {
    this.setData({
      clickitemstyle: e.target.id
    })
    this.SearchItem()
  },


  //   跳详情
  GoDetail : function () {
    wx.navigateTo({
      url: '/pages/detail/detail',
      success : () => {
      }
    })
  },


  // 搜索
  SearchProduct : function (e) {
    let inputvalue = e.detail.value
    Request('Get', '/wxhy/login/register', { abc: inputvalue},(res)=>{
      console.log(res)
    },(err)=>{
      console.log(err)
    })
  },


  SearchItem : function () {
    let id = this.data.clickitemstyle
    Request('Get', '/wxhy/login/register', { abc: this.data.scrollitem[id] }, (res) => {
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  },



  onLoad: function () {
    this.SearchItem()
  },

  onReachBottom: function () {
    // 分页加载
  }
})

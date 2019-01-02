// pages/login/login.js
import { Request, registrules } from "../../components/js/commmon.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time : '获取动态码',
    timeLock : true,
    phonenumber : '',
    popshow : false
  },

  /*
    手机号
   */
  GetPhone : function (e) {
    this.setData({
      phonenumber : e.detail.value
    })
  },




  /*
    获取验证码
  */

  GetCode () {
    if (!this.data.timeLock) {
      return
    }
    if (this.data.phonenumber.length != 11) {
      wx.showToast({
        title: '您输入的手机号有误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let timer = 60
    /*
     注册
    */
    Request('GET', "/wxhy/login/sendCode", { mobile: this.data.phonenumber, type: 'regist' },(res)=>{
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      })
    },(err)=>{
      wx.showToast({
        title: '出错啦,请重试',
        icon: 'none',
        duration: 2000
      })
    })
    let interval = setInterval(()=>{
      timer --
      this.setData({
        time: timer + "秒后重新发",
        timeLock : false
      })    
      if (timer <= 0) {
        clearInterval(interval)
        timer = 60
        this.setData({
          time: '获取动态码',
          timeLock : true
        })
      }
    },1000)
  },



  /*
    提交表单
    表单提交前验证信息，验证顺序自上而下
   */
  FormSubmit (e) {
    function verifyrule () {
      return new Promise((resolve,reject)=>{
        if (e.detail.value.mobile.length == 11 || registrules.phonerule(e.detail.value.mobile)) {
         resolve()
       }else {
          reject('您输入的手机号有误')
       }
      })
    }
    verifyrule()
      .then((res)=>{
      //  手机号验证成功
        return Promise.resolve(e.detail.value);
      })
      .then((res)=>{
        if (res.code.length == 6) {
          return Promise.resolve(e.detail.value)
        }else {
          return Promise.reject('请输入正确的验证码')
        }
      })
      .then((res)=>{
        res.mobile = Number(res.mobile)
        Request('POST', '/wxhy/login/register', res, (data) => {
          /*
            注册成功
          */
          wx.showToast({
            title: data.data.message,
            icon: 'none',
            duration: 2000
          })
       },(err)=>{
         /*
            注册失败
          */
         wx.showToast({
           title: err.data.message,
           icon: 'none',
           duration: 2000
         })
       })
      })
      .catch((err)=>{
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      })
  }
})
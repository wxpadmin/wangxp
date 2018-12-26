// pages/login/login.js
import { Request, registrules } from "../../components/js/commmon.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time : '获取验证码',
    timeLock : false,
    phonenumber : ''
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
    if (this.data.timeLock || this.data.length != 11) {
      console.log('请输入正确的手机号')
      return
    }
    let timer = 60
    /*
     注册
    */
    Request( 'GET',"/wxhy/login/sendCode1", { mobile: 13351591816, type: 'regist' },(res)=>{
      console.log(res,111)
    },(err)=>{
      console.log(err,222)
    })
    let interval = setInterval(()=>{
      timer --
      this.setData({
        time: timer,
        timeLock : true
      })    
      if (timer <= 0) {
        clearInterval(interval)
        timer = 60
        this.setData({
          time: '获取验证码',
          timeLock : false
        })
      }
    },1000)
  },



  /*
    提交表单
    表单提交前验证信息，验证顺序自上而下
   */

  FormSubmit (e) {
    var util = require('../../utils/util.js') 
    function verifyrule () {
      return new Promise((resolve,reject)=>{
        if (e.detail.value.mobile.length == 11 || registrules.phonerule(e.detail.value.mobile)) {
         resolve()
       }else {
         reject('请输入正确的手机号')
       }
      })
    }
    verifyrule()
      .then((res)=>{
      //  手机号验证成功
        return Promise.resolve(e.detail.value);
      })
      .then((res)=>{
        if (res.nickName.length == 5) {
          return Promise.resolve(e.detail.value)
        }else {
          return Promise.reject('请输入正确的用户名')
        }
      })
      .then((res)=>{
        if (res.password.length == 6) {
          return Promise.resolve(e.detail.value)
        }else {
          return Promise.reject('请输入正确的密码')
        }
      })
      .then((res)=>{
        if (res.code.length == 6) {
          return Promise.resolve(e.detail.value)
        }else {
          return Promise.reject('请输入正确的验证码')
        }
      })
      .then((res)=>{
        res.password = util.sha1(res.password)
        Request('GET', '/wxhy/login/register', res, (data) => {
          /*
            注册成功
          */
          console.log(data.data.message)
       },(err)=>{
         /*
            注册失败
          */
         console.log(err.data.message)
       })
      })
      .catch((err)=>{
        console.log(err)
      })







  }
})
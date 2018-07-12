var _Wx = {}
//微信是否初始化
_Wx.isInit = false
//微信获取签名，支持回调
_Wx.init = function (callback){
      var shareUrl = window.location.href.replace(/#.*$/,"");
      $.ajax({
          url: "/api/wx/jsapi/signature?url="+encodeURIComponent(shareUrl),
          type: "get",
          dataType:"json",
          success: function (result) {
              result = result.data;
              wx.config({
                  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: result.appid, // 必填，公众号的唯一标识
                  timestamp: result.timestamp, // 必填，生成签名的时间戳
                  nonceStr: result.noncestr, // 必填，生成签名的随机串
                  signature: result.signature,// 必填，签名，见附录1
                  jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
              _Wx.isInit = true 
              // ready方法后再去触发回调
              wx.ready(function(){
                callback && callback();
              })
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(textStatus);
          }
      });
   
}
//监听WeixinJSBridgeReady
_Wx.onBridgeReady = function(callback){
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', function(){
                callback && callback ()
            }, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', function(){
                callback && callback ()
            }); 
            document.attachEvent('onWeixinJSBridgeReady', function(){
                callback && callback ()
            });
        }
    }else{
        callback && callback ()
    }
}
//微信分享方法（分享成功后可以回调）
_Wx.share = function(info,success,cancel){
    
     var option =  {
          title: info.title, // 分享标题
          desc: info.desc, // 分享描述
          link:  location.protocol + "//"+location.host+info.link,
          imgUrl: info.imgUrl?info.imgUrl:"https://img.ruwe.cn/group1/M00/01/6D/Chmdpln5RZuAdEtfAACNwU25SIU893.jpg", // 分享图标
          success: function () {// 用户确认分享后执行的回调函数
              // alert('分享成功')
              success && success();
          },
          cancel: function () {// 用户取消分享后执行的回调函
              //alert('分享失败')
              cancel && cancel();
          }
      };
      //判断是否已经签名
      if (_Wx.isInit){
           _shareOption(option)
      }else{
          _Wx.init(function(){
               _shareOption(option)
            });
      }
      //微信分享初始化
      function _shareOption(option){
          //分享朋友圈
          wx.onMenuShareTimeline(option);
          //分享好友
          wx.onMenuShareAppMessage(option);
          wx.onMenuShareQQ(option);
          wx.onMenuShareWeibo(option);
          wx.onMenuShareQZone(option);
      }
      wx.error(function(res){
          // alert("error:"+JSON.stringify(res));
          console.log('error:'+JSON.stringify(res));
      });
}
//隐藏微信菜单
_Wx.hideMenu = function(){
    _Wx.onBridgeReady(function(){
        // 通过下面这个API隐藏右上角按钮
        WeixinJSBridge.call('hideOptionMenu');
    })
}
//仅在微信中打开
_Wx.onlyWeixin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) != 'micromessenger') {
        document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">';
        document.body.innerHTML = '<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请在微信客户端打开链接</h4></div></div>';
    }
}
//返回按钮跳转到指定链接
_Wx.backTo = function(path,callback){
    window.addEventListener("popstate", function(e){
        e.preventDefault();
        window.removeEventListener("popstate", function(e){})
        callback && callback ()
        if(path){
          window.location.href = path
        }
    })
    
}
//关闭微信webview
_Wx.closeWindow = function(callback){
    _Wx.onBridgeReady(function(){
      WeixinJSBridge.invoke('closeWindow',{},function(res){
        callback && callback()
      });
    })
}
window['_Wx'] = _Wx
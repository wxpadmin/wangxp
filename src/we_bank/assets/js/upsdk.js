var _upsdk = {}


_upsdk.isInit = false
//初始化
_upsdk.init = function (callback){
	  var url = window.location.href.replace(/#.*$/,"");
	  $.ajax({
          url: "/api/upsdk/get/url/signature?url="+encodeURIComponent(url),
          type: "get",
          dataType:"json",
          success: function (result) {
              result = result.data;
              upsdk.config({  
	              appId: result['appId'],  //必填，接入方的唯一标识   
	              timestamp:result['timestamp'] ,  //必填，生成签名的时间戳，从 1970 年 1 月 1 日 00:00:00 至今的秒数 
	              nonceStr: result['nonceStr'],  //必填，生成签名的随机串  
	              signature: result['signature'],  //必填，生成签名的摘要，采用 sha256 算法, 详见最后一章 FAQ 
	              debug: false  //开发阶段可打开此标记，钱包 APP 会将调试信息 toast 出来 
              });

              _upsdk.isInit  = true ; 
              upsdk.ready(function(){ 
              	callback && callback();
              })
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(textStatus);
          }
      });

}
 
//分享
_upsdk.share = function (info){

	if(_upsdk.isInit){
		_showSharePopup()
	}else{
		_upsdk.init(function(){
			_showSharePopup()
		})
	}


	function _showSharePopup(){
		upsdk.showSharePopup({     
			title: info.title,     
			desc: info.desc,     
			shareUrl: info.shareUrl || 'https://youhui.95516.com',     
			picUrl: info.picUrl || 'https://youhui.95516.com/web/image/mchnt/coupon/Z00000000138804_logo_list_web.jpg' 
		});  
	}
}

//支付
_upsdk.pay = function(ticket,success,fail){
	if(_upsdk.isInit){
		upsdk.pay({     
			tn: ticket,     
			success: function(){      
				success && success ()
				// 支付成功, 开发者执行后续操作。    
			},    
			fail: function(err){ 
				fail && fail(err)        
				// 支付失败, err.msg 是失败原因描述, 比如 TN 号不合法, 或者用户取消了交易等等。    
			} 
		})
	}else{
		_upsdk.init(function(){
			upsdk.pay({     
				tn: ticket,     
				success: function(){  
					success && success ()
					// 支付成功, 开发者执行后续操作。    
				},    
				fail: function(err){   
					fail && fail(err)        
					// 支付失败, err.msg 是失败原因描述, 比如 TN 号不合法, 或者用户取消了交易等等。    
				} 
			})
		})
	}
	
},

//设置标题，暂时不用
_upsdk.setTitle = function(title){
	if(!title){
		title = '流量银行'
	}

	if(_upsdk.isInit){
		upsdk.setNavigationBarTitle({     
			title: title 
		});
	}else{
		_upsdk.init(function(){
			upsdk.setNavigationBarTitle({     
				title: title 
			});
		})
	}

}



window['_upsdk'] = _upsdk